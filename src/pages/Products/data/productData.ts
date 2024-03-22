import { TProductFormSchema } from "@/pages/Products/schemas/product.schema";
import { TCategory } from "../schemas/category.schema";
import { TDiscount } from "../schemas/discounts.schema";

const productData: TProductFormSchema[] = [
  {
    id: "1",
    productName: "Bread",
    productDescription: "Bread is on sale",
    productName: "Mafuko Bread",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/packedBread1.jfif",
      "/packedBread2.jfif",
      "/ProductsBreadIllustrator.jpg",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: true,
  },
  {
    id: "2",
    productName: "Superloaf Bread",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/ProductsBreadIllustrator.jpg",
      "/packedBread1.jfif",
      "/packedBread2.jfif",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "3",
    productName: "Festive bread",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/packedBread2.jfif",
      "/packedBread1.jfif",
      "/ProductsBreadIllustrator.jpg",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "4",
    productName: "Broadways",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/packedBread1.jfif",
      "/packedBread2.jfif",
      "/ProductsBreadIllustrator.jpg",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: true,
  },
];

const addProduct = (product: TProductFormSchema) => productData.push(product);
const findProduct = (id: string) =>
  productData.find((product) => product.id == id);
const categories: TCategory[] = [
  {
    id: "CATEGORY_123",
    categoryName: "White Bread",
    categoryDescription: "Food on sale",
  },
  {
    id: "CATEGORY_124",
    categoryName: "Brown bread",
    categoryDescription: "Food on sale",
  },
];

const discountIds: TDiscount[] = [
  {
    id: "DISCOUNT_WERT",
    coupon: "ADCER",
  },
  {
    id: "DISCOUNT_ERTY",
    coupon: "ASDER",
  },
  {
    id: "DISCOUNT_FERT",
    coupon: "REFDE",
  },
];

const addCategory = (categoryDto: TCategory) => categories.push(categoryDto);

export { addProduct, addCategory, categories, findProduct, discountIds };

export default productData;
