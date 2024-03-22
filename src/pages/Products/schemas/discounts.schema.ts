import { z } from "zod";

const discountSchema = z.object({
    id: z.string().optional(),
    coupon:z.string(),
    tokens:z.string(),
    percentage:z.string(),
    status: z.enum(["inactive", "active"]),
    type:z.enum(["STANDARD", "BOGO", "MNP"])
})

export type TDiscount = z.infer<typeof discountSchema>

export default discountSchema