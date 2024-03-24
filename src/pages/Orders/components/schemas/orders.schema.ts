import { z } from "zod";

const OrderSchema = z.object({
  id: z
    .string()
    .min(5, {
      message: "Order id should be greater than 5 characters",
    })
    .optional(),
  total: z.number(),
  status: z.enum(["pending", "completed", "canceled", "refunded"]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
  user: z
    .object({
      id: z.string(),
      avatarUrl: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      phone:z.string(),
    }),
  payment: z
    .object({
      id: z.string(),
      amount: z.number(),
      provider: z.enum(["mpesa", "paypal"]),
      status: z.enum(["completed", "canceled", "pending"]),
      createdAt: z.date().default(new Date()),
      updatedAt: z.date().default(new Date()),
    })
    .array(),
  items: z
    .object({
      id: z.string(),
      price: z.number(),
      quantity: z.number(),
      product: z.object({
        productName: z.string(),
        sellingPrice: z.number(),
        asset: z
          .object({
            id: z.string(),
            images: z.string().array()
          })
          .array(),
      }),
    })
    .array(),
  shippingInfo: z.object({
    id: z.string(),
    county: z.string(),
    street: z.string(),
    town: z.string(),
    locationDesc: z.string(),
    status: z.enum(["pending", "completed", "canceled"]),
    createdAt: z.date(),
    updatedAt: z.date(),
  }).array(),
});

export type TOrdersZSchema = z.infer<typeof OrderSchema>
type TOrderItems = TOrdersZSchema & {
    productName:string;
    productImage:string;
    sellingPrice:string;
    orderQty:string;
    productCategory:string;
}
export type TOrdersSchema = TOrdersZSchema 

