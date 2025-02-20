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
    console.log(body, "yash body stepper");  
    
    const {  
      personalInfo,  
      accountInfo  
    } = body;  
  
    const response = await prisma.userProfile.create({  
      data: {  
        username: accountInfo.username || "",  
        firstName: personalInfo.firstName || "",  
        lastName: personalInfo.lastName || "",  
        email: personalInfo.email || "",  
        country: personalInfo.country || "",  
        streetAddress: personalInfo.streetAddress || "",  
        city: personalInfo.city || "",  
        state: personalInfo.state || "",  
        postalCode: personalInfo.postalCode || "",  
        workingYear: accountInfo.workingYear || 0,  
        workingMonth: accountInfo.workingMonth || 0,  
        links: accountInfo.links || null,  
        resume: accountInfo.resume || "", // Ensure you handle this case  
        education: accountInfo.education || "",  
        gender: personalInfo.gender || "OTHER", // Default to "OTHER"  
        profilePic: body.profilePic || null,  
        preferedJobTitle: accountInfo.preferedJobTitle || "",  
        preferedLocation: accountInfo.preferedLocation || "",  
        skills: accountInfo.skills || "",  
        userId: session?.user.id || ""  
      },  
    });  
    console.log(response);
       // Ensure 'response' is an object before spreading it  
       if (response && typeof response === 'object') {  
        return NextResponse.json({ ...response });  
      } else {  
        // Catch any unexpected non-object response  
        throw new Error("Received an unexpected response format from Prisma");  
      }    
    
  } catch (error) {  
    console.error("Error creating user profile:", error);  
  
    // Better error handling  
    return NextResponse.json(  
      {  
        message: "Error while creating User Profile",  
        error: error instanceof Error ? error.message : "Unknown error occurred"  
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
    console.log("hello before ");
    
    const getprofile = await prisma.userProfile.findUnique({
        where:{
            email:session.user.email || ""
        }
    })
    return NextResponse.json({
        getprofile
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
