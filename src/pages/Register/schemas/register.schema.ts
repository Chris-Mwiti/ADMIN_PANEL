import {z} from "zod";


//@TODO: Add regex properties to both the phone and password properties
const registerSchema = z.object({
    firstName: z.string({
        required_error: "First name is required"
    }),
    lastName: z.string({
        required_error: "Last name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email(),
    password: z.string({
        required_error: "Password is required"
    }),
    phone: z.string({
        required_error: "Phone number is required"
    }).length(10, {
        message: "Phone number is too short or too long"
    }),
    role: z.enum(["admin","user"]).optional()
})

export type TRegisterSchema = z.infer<typeof registerSchema>;

export default registerSchema