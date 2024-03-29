import { z } from "zod";

const ProductFormSchema = z.object({
  id:z.string().optional(),
  productName: z
    .string({
      invalid_type_error: "A string value is required",
      required_error: "A product name is required",
    })
    .min(5, {
      message: "The product name should be more than 5 digits",
    }),
  productDescription: z
    .string({
      invalid_type_error: "A string value is required",
      required_error: "A product description must be provided",
    })
    .min(10, {
      message: "The product description should be greater than 10 letters",
    }),
  productImages: z.string().array().optional(),
  productBarCode: z.string({
    required_error: "Product bar code required"
  }),

  productCode: z
    .string()
    .min(5, {
      message: "The product code is short",
    })
    .max(10, { message: "The product code is too long" })
    .optional(),
  productSku: z.string().length(6, { message: "SKU should be 6 digits" }),
  inventory: z.object({
    quantity:z.string()
  }),
  category:z.object({
    id:z.string().optional(),
    categoryName:z.string().optional()
  }).optional(),
  productTag: z
    .string({
      invalid_type_error: "String value is required",
      required_error: "Please provide a minimum of 2 tags for the product",
    })
    .optional(),
  productLabel: z.string().optional(),
  buyingPrice: z.string({
    required_error: "Buying price required",
  }),
  sellingPrice: z.string({
    required_error: "Selling price required",
  }),
  asset: z.object({
    id:z.string().optional(),
    images:z.string().array(),
  }).array().optional(),
  tax: z
    .number({
      required_error: "Product tax is required",
    })
    .optional(),
  published: z.boolean({
    required_error: "Publish status is required",
  }),
  isPerishable: z.boolean({
    required_error: "Status required"
  }).optional(),
  expireDate: z.date({
    required_error: "Expiry date required"
  }).optional(),
  discountId: z.string().optional(),
  createdAt: z.date().default(new Date()).optional(),
  stockStatus: z.enum(["IN_STOCK", "OUT_STOCK"]).optional(),

  categoryName:z.string().optional(),
  categoryDescription:z.string().optional()
});

export type TProductFormSchema = z.infer<typeof ProductFormSchema>;

export default ProductFormSchema;
