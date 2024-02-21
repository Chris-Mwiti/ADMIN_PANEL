import { z } from "zod";

const ProductFormSchema = z.object({
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
  productImages: z.string().array(),
  productCode: z
    .string()
    .min(5, {
      message: "The product code is short",
    })
    .max(10, { message: "The product code is too long" })
    .optional(),
  productSku: z.string().length(6, { message: "SKU should be 6 digits" }),
  productQuantity: z
    .string({
      invalid_type_error: "An interger must be provided",
      required_error: "Product quantity must be provided",
    })
    .min(1, { message: "Value must be greater than 1" }),
  productCategory: z.string({
    invalid_type_error: "String value required",
    required_error: "Please select a product category or create a new one",
  }),
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
  tax: z
    .number({
      required_error: "Product tax is required",
    })
    .optional(),
  published: z.boolean({
    required_error: "Publish status is required",
  }),
  perishable: z.boolean({
    required_error: "Status required"
  }),
  expireDate: z.date({
    required_error: "Expiry date required"
  }).optional()
});

export type TProductFormSchema = z.infer<typeof ProductFormSchema>;

export default ProductFormSchema;
