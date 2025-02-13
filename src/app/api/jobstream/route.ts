
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../../../lib/auth-options";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";


export async function POST(req:NextRequest){
    const session =await getServerSession(authoptions);

    if(!session?.user.id){
        return NextResponse.json({
            message:"Unauthenticated"
        },{
            status:401
        })
    }
    try{
        const body = await req.json();
        const job= await prisma.job.create({
            data:{
                title:body.title,
                description:body.description,
                company:body.company,
                salary:body.salary,
                skill:body.skill,
                userId:body.id,
                location:body.location,
                jobtype:body.jobtype,
            }
        })
        return NextResponse.json({
            message:"job posted Successfully",
            job
        },{
            status:201
        })
    }catch(err){
        console.error(err);
        
        return NextResponse.json(  
            { error: "Failed to post the job." },  
            { status: 500 }
        );  
    }
   

}

export async function GET(){
    const session =await getServerSession(authoptions);

    if(!session?.user.id){
        return NextResponse.json({
            message:"Unauthenticated"
        },{
            status:401
        })
    }
    try{
        const job = await prisma.job.findMany({
            where:{
                userId:session?.user?.id
            },
            orderBy:{
                createdAt:'desc'
            }

        })
        return NextResponse.json({
            message:"jobs fetch successfully",
            job,
            
        },{
            status:200
        })
    }catch(e){
        return NextResponse.json({
            message:"Internal server error"
        },{
            status:500
        })
    }
}