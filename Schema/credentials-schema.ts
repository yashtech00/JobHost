import {z} from "zod"

export const emailSchema = z
    .string({message:"Email Reaquired"})
    .email({message:"Invail Email"})

export const passwordSchema = z
    .string({message:"Invalid password"})
    .min(8,{message:"Password length should be 8 Character"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{
        message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })

export const nameSchema = z
    .string({message:"Invaild name"})
    

export const empjobSchema = z.object({
    title:z.string({message:"Invaild name"}),
    description:z.string({message:"Invaild description"}),
    company:z.string({message:"Invaild company"}),
    salary:z.number({message:"Invaild salary"}),
    location:z.string({message:"Invaild location"}),
    jobtype:z.string({message:"Invaild jobtype"}),
    experience:z.number({message:"Invaild experience"}),
})

export const empboardSchema = z.object({
    name:z.string({message:"Invaild experience"}),
    email:z.string().email({message:"Invaild experience"}),
    phonenumber:z.string({message:"Invaild experience"}),
    companyname:z.string({message:"Invaild experience"}),
})

export const ProfileSchema = z.object({
    username:z.string({message:"Invaild experience"}),
    firstName:z.string().email({message:"Invaild experience"}),
    lastName:z.string({message:"Invaild experience"}),
    email:z.string({message:"Invaild experience"}),
    country:z.string({message:"Invaild country"}),
    streetAddress:z.string({message:"Invaild streetAddress"}),
    city:z.string({message:"Invaild city"}),
    state:z.string({message:"Invaild state"}),
    postalCode:z.string({message:"Invaild postalCode"}),
    workingYear:z.number({message:"Invaild workingYear"}),
    workingMonth:z.number({message:"Invaild workingMonth"}),
    links:z.string({message:"Invaild links"}),
    resume:z.string({message:"Invaild resume"}),
    education:z.string({message:"Invaild education"}),
    gender:z.string({message:"Invaild gender"}),
   
    profilePic:z.string({message:"Invaild profilePic"}),
    preferedJobTitle:z.string({message:"Invaild preferedJobTitle"}),
    preferedLocation:z.string({message:"Invaild profilePic"}),
    skills:z.string({message:"Invaild profilePic"}),
})

