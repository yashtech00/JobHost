import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../../../lib/auth-options";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";

export async function POST(req: NextRequest) {
  console.log("POST request received at /api/jobstream");
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
    console.log(body, "yash body");
    console.log(session?.user.id);
    
    
      const salary = parseInt(body.salary, 10) || 0; // Default to 0 if parsing fails  
      const experience = parseInt(body.experience, 10) || 0; // Default to 0 if parsing fails  
      console.log(body.id,"yash id");
      
      
      const response = await prisma.job.create({  
        data: {  

          title: body.title || "",  
          description: body.description || "",  
          company: body.company || "",  
          salary: salary,  
          location: body.location || "",  
          jobtype: body.jobtype || "",  
          experience: experience,  
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
