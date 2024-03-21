import { TProductFormSchema } from "@/pages/Products/schemas/product.schema";

const productData: TProductFormSchema[] = [
  {
    id: "1",
    productName: "Mango juice",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/carousel1.jfif",
      "/carousel2.jfif",
      "/carousel3.jfif",
      "/carousel4.jfif",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "in stock",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: true,
  },
  {
    id: "2",
    productName: "Mango juice",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/carousel1.jfif",
      "/carousel2.jfif",
      "/carousel3.jfif",
      "/carousel4.jfif",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "in stock",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "3",
    productName: "Mango juice",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/carousel1.jfif",
      "/carousel2.jfif",
      "/carousel3.jfif",
      "/carousel4.jfif",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "in stock",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "4",
    productName: "Mango juice",
    productDescription: "Mango juice is on sale",
    productImages: [
      "/carousel1.jfif",
      "/carousel2.jfif",
      "/carousel3.jfif",
      "/carousel4.jfif",
    ],
    category: {
      categoryName: "Food"
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "in stock",
    published: true,
    inventory: {
      quantity: "40"
    },
    createdAt: new Date(),
    isPerishable: true,
  },
];

export default productData;