import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../../../lib/auth-options";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";
import { empjobSchema } from "../../../../Schema/credentials-schema";


export async function POST(req: NextRequest) {
 
  const session = await getServerSession(authoptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const body = await req.json();
   
    const empjobparse = empjobSchema.safeParse(body)
    if(!empjobparse.success){
      return NextResponse.json({
        message:"Invaild job data",
        error:empjobparse.error
      },{
        status:400
      })
    }
    
     const {title, description,company, salary, location, jobtype, experience} = empjobparse.data;
      
      
      const response = await prisma.job.create({  
        data: {  
          title,  
          description,  
          company,  
          salary,  
          location,  
          jobtype,  
          experience,  
          userId: session?.user.id,  
        },  
      });
    console.log(response,"yash job");
    
    return NextResponse.json(
      {
        message: "job posted Successfully",
        ...response,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to post the job." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authoptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const job = await prisma.job.findMany({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        message: "jobs fetch successfully",
        job,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}


// Add this GET method for fetching a job by ID  
