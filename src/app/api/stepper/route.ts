import { getServerSession } from "next-auth";
import { authoptions } from "../../../../lib/auth-options";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

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

    const response = await prisma.userProfile.create({
      data: {
        username: body.username || "",
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        email: body.email || "",
        country: body.country || "",
        streetAddress: body.streetAddress || "",
        city: body.city || "",
        state: body.state || "",
        postalCode: body.postalCode || "",
        workingYear: body.workingYear || 0,
        workingMonth: body.workingMonth || 0,
        currentLocations: body.currentLocations || "",
        links: body.links || "",
        resume: body.resume || "",
        education: body.education || "",
        gender: body.gender || "OTHER", // Default to "OTHER" if not provided
        profilePic: body.profilePic || "",
        preferedJobTitle: body.preferedJobTitle || "",
        preferedLocation: body.preferedLocation || "",
        skills: body.skills || "",
      },
    });

    return NextResponse.json({
        ...response
    })
  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json(
      {
        message: "Error while creating User Profile",
      },
      {
        status: 500,
      }
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
  try{
    const user = await prisma.user.findUnique({
        where:{
            email:session.user.email || ""
        }
    })
    return NextResponse.json({
        message:"user detail fetch successfully",
        user
    })

  }catch(e){
    console.error(e);
    return NextResponse.json({
        message:"Inter server Get error"
    },{
        status:500
    })    
  }
}
