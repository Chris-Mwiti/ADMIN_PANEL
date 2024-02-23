import { z } from "zod";

const OrderSchema = z.object({
  id: z
    .string()
    .min(5, {
      message: "Order id should be greater than 5 characters",
    })
    .optional(),
  customerName: z.string({
    required_error: "Customer name required",
  }),
  customerEmail: z
    .string({
      required_error: "Customer Email required",
    })
    .email(),
  customerAvatar: z.string({
    required_error: "Image avatar required",
  }),
  orderDate: z.date({
    required_error: "Order date required",
  }),
  itemsCount: z.string({
    required_error: "No of items required",
  }),
  totalOrderPrice: z.string({
    required_error: "Total order price required",
  }),
  orderStatus: z.string({
    required_error: "Order status required",
  }),
  orderItems: z
    .object({
      productName: z.string(),
      productImage: z.string(),
      sellingPrice: z.string(),
      discount: z.string().optional(),
      shippingFee: z.string().optional(),
      orderQty: z.string(),
      productCategory: z.string(),
    })
    .array(),
  orderInfo: z.object({
    shipBy: z.string(),
    trackingNo: z.string(),
    address: z.string(),
    recipientPhone: z.string(),
    paymentType: z.string(),
  }),
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

