import { z } from "zod";

const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  email: z
    .string({
      required_error: "Email required",
    })
    .email(),
  emailVerified: z.boolean({
    required_error: "Email verification is required",
  }),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .length(10, {
      message: "Phone number is too short",
    }),
  address: z.string({
    required_error: "Address is required",
  }).optional(),
  company: z.string().optional(),
  role: z.string(),
  avatarUrl: z.string().optional(),
  createdAt: z.date().default(new Date()),
  status: z.string().default("active"),
});

type TUser = z.infer<typeof userSchema>;

export default TUser;

export { userSchema };
