import { z } from "zod";

const categorySchema = z.object({
    id: z.string().optional(),
    categoryName: z.string({
        required_error: "Category name is required"
    }),
    categoryDescription: z.string({
        required_error: "Category description is required"
    }),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date())
})

export type TCategory = z.infer<typeof categorySchema>;
export default categorySchema