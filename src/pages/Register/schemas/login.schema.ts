import {z} from "zod";

const loginSchema = z.object({
    email: z.string({
        required_error: "Email required"
    }).email(),
    password: z.string({
        required_error: "Password required"
    })
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export default loginSchema;
