import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { getServerSession } from "next-auth";
import { authoptions } from "../../../../../lib/auth-options";

export async function GET(req: NextRequest, { params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const session = await getServerSession(authoptions);
  console.log(jobId, "[yash]");

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
    const job = await prisma.job.findUnique({
      where: {
        id: jobId, // Find the job by ID
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Job fetched successfully",
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

export async function PUT(req: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const { jobId } = params; // Correctly destructuring jobId
    const body = await req.json(); // Get request body

    // Ensure body only contains fields that are part of the Job model
    const { title, description, company, jobtype, location, salary, experience } = body;

    const update = await prisma.job.update({
      where: {
        id: jobId, // Use jobId from params
      },
      data: {
        title,
        description,
        company,
        jobtype, // Ensure this matches the expected format (array, enum, etc.)
        location,
        salary,
        experience
      },
    });

    return NextResponse.json(
      {
        message: "Job updated successfully",
        job: update, // Optionally return the updated job
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error while updating Job",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const { jobId } = params; // Correctly destructuring jobId
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });
    return NextResponse.json(
      {
        message: "Job deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error while deleting Job",
      },
      {
        status: 500,
      }
    );
  }
}
