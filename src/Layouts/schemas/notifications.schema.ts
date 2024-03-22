import { z } from "zod";

const notificationSchema = z.object({
    title: z.string(),
    message:z.string(),
    imageUrl:z.string().optional(),
    status:z.enum(["urgent", "minor", "important"]),
    type: z.enum(["products","orders","users"])
})

export type TNotifications = z.infer<typeof notificationSchema>;
export default notificationSchema