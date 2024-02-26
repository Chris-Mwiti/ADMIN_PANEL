import { z } from "zod";

const invoicesSchema = z.object({
  id: z.string().optional(),
  invoiceInfo: z.object({
    from: z.object({
      name: z.string({
        required_error: "Sender name is required",
      }),
      address: z.string({
        required_error: "Senders address is required",
      }),
      email: z.string(),
      phone: z.string()
    }),
    to: z.object({
      name: z.string({
        required_error: "Receiver name is required",
      }),
      address: z.string({
        required_error: "Receivers address is required",
      }),
      email: z.string(),
      phone: z.string(),
    }),
  }),
  invoiceDetails: z.object({
    title:z.string({
        required_error: "Title required"
    }),
    description:z.string({
        required_error: "Description must be provided"
    }),
    service:z.string().optional(),
    quantity:z.string({
        required_error: "Quantity required"
    }),
    price:z.string({
        required_error:"Price required"
    }),
    total:z.string({
        required_error: "Total value required"
    }),
    shipping:z.string({
        required_error: "Shipping fee required"
    }).optional(),
    discounts:z.string().optional(),
    taxes:z.string().optional()
  }).array(),
  status:z.string(),
  createdAt:z.date(),
  dueDate:z.date(),

});

type TInvoicesSchema = z.infer<typeof invoicesSchema>
export default TInvoicesSchema
export  {
    invoicesSchema, 
}