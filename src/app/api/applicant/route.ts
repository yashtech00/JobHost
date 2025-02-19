import { getServerSession } from "next-auth";
import { authoptions } from "../../../../lib/auth-options";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
// import { S3 } from 'aws-sdk';
// import multer from 'multer';
// import { promisify } from 'util';
// import fs from 'fs';
// import path from 'path';

// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const upload = multer({ dest: 'uploads/' });
// const uploadMiddleware = promisify(upload.single('resume'));

export async function POST(req: NextRequest, { params }: { params: { jobId: string } }) {
  const session = await getServerSession(authoptions);
  const { jobId } = params;
  if (!session?.user.id) {
    return NextResponse.json({
      message: "Unauthenticated"
    }, {
      status: 401
    });
  }

  try {
    // Parse the form data
    // await uploadMiddleware(req, res);
    // const file = req.file;
    

    // if (!file) {
    //   return NextResponse.json({
    //     message: "No file uploaded."
    //   }, {
    //     status: 400
    //   });
    // }

    // Read the file content
    // const fileContent = fs.readFileSync(file.path);
    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: `${Date.now()}_${file.originalname}`,
    //   Body: fileContent,
    // };

    // Upload the file to S3
    // const data = await s3.upload(params).promise();
    // const resumeUrl = data.Location;

    const resumeUrl = "https://www.google.com";

    // Create the applicant record in the database
    const applicant = await prisma.applicant.create({
      data: {
        resume: resumeUrl,
        userId: session.user.id,
        jobId,
      },
    });

    // Clean up the local file
    // fs.unlinkSync(file.path);

    return NextResponse.json(applicant, {
      status: 200
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Internal server error"
    }, {
      status: 500
    });
  }
}

export async function GET(req: NextRequest, { params }: { params: { jobId: string } }) {
  const session = await getServerSession(authoptions);
    const {jobId} = params;
  if (!session?.user.id) {
    return NextResponse.json({
      message: "Unauthenticated"
    }, {
      status: 401
    });
  }

  try {
    // const url = new URL(req.url);
    // const jobId = url.searchParams.get('jobId');

    let applicants;
    if (jobId) {
      applicants = await prisma.applicant.findMany({
        where: {
          jobId,
        },
        include: {
          user: true,
          job: true,
        },
      });
    } else {
      applicants = await prisma.applicant.findMany({
        include: {
          user: true,
          job: true,
        },
      });
    }

    return NextResponse.json(applicants, {
      status: 200
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Internal server error"
    }, {
      status: 500
    });
  }
}