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
    description:z.string({message:"Invaild name"}),
    

})
