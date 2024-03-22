import UserData from "@/pages/Users/data/userData";
import { TOrdersSchema } from "../schemas/orders.schema";
import productData from "@/pages/Products/data/productData";
import { addHours } from "date-fns";

let orderData: TOrdersSchema[] = [
  {
    id: "ORDER_WERT",
    user: UserData[0],
    total: 300,
    status: "completed",
    createdAt: new Date(),
    updatedAt: addHours(new Date(), 4),
    payment: [
      {
        id: "PAYM-123",
        amount: 300,
        provider: "mpesa",
        status: "completed",
        createdAt: new Date(),
      },
    ],
    items: [
      {
        id: "ITEM-1234",
        price: 200,
        quantity: 10,
        product: {
          productName: productData[0].productName,
          sellingPrice: parseInt(productData[0].sellingPrice),
          assetIds: [
            {
              id: "ASSET-123",
              images: {
                id: "IMAGE-123",
                imageUrl: productData[0].productImages[0],
              },
            },
          ],
        },
      },
    ],
    shippingInfo: [
      {
        id: "SHIPPING-123",
        county: "Nairobi",
        street: "Nairobi",
        town: "Nairobi",
        locationDesc: "Madaraka",
        status: "completed",
        createdAt: new Date(),
      },
    ],
  },

  {
    id: "ORDER_WERR",
    user: UserData[1],
    total: 300,
    status: "refunded",
    createdAt: new Date(),
    updatedAt: addHours(new Date(), 4),
    payment: [
      {
        id: "PAYM-123",
        amount: 300,
        provider: "mpesa",
        status: "canceled",
        createdAt: new Date(),
      },
    ],
    items: [
      {
        id: "ITEM-1234",
        price: 200,
        quantity: 10,
        product: {
          productName: productData[1].productName,
          sellingPrice: parseInt(productData[1].sellingPrice),
          assetIds: [
            {
              id: "ASSET-123",
              images: {
                id: "IMAGE-123",
                imageUrl: productData[1].productImages[0],
              },
            },
          ],
        },
      },
    ],
    shippingInfo: [
      {
        id: "SHIPPING-123",
        county: "Nairobi",
        street: "Nairobi",
        town: "Nairobi",
        locationDesc: "Madaraka",
        status: "completed",
        createdAt: new Date(),
      },
    ],
  },

  {
    id: "ORDER_WDER",
    user: UserData[0],
    total: 300,
    status: "pending",
    createdAt: new Date(),
    updatedAt: addHours(new Date(), 6),
    payment: [
      {
        id: "PAYM-123",
        amount: 300,
        provider: "mpesa",
        status: "pending",
        createdAt: new Date(),
      },
    ],
    items: [
      {
        id: "ITEM-1234",
        price: 200,
        quantity: 10,
        product: {
          productName: productData[2].productName,
          sellingPrice: parseInt(productData[0].sellingPrice),
          assetIds: [
            {
              id: "ASSET-123",
              images: {
                id: "IMAGE-123",
                imageUrl: productData[0].productImages[0],
              },
            },
          ],
        },
      },
    ],
    shippingInfo: [
      {
        id: "SHIPPING-123",
        county: "Nairobi",
        street: "Nairobi",
        town: "Nairobi",
        locationDesc: "Madaraka",
        status: "pending",
        createdAt: new Date(),
      },
    ],
  },

  {
    id: "ORDER_FERT",
    user: UserData[1],
    total: 300,
    status: "completed",
    createdAt: new Date(),
    updatedAt: addHours(new Date(), 4),
    payment: [
      {
        id: "PAYM-123",
        amount: 300,
        provider: "mpesa",
        status: "completed",
        createdAt: new Date(),
      },
    ],
    items: [
      {
        id: "ITEM-1234",
        price: 200,
        quantity: 10,
        product: {
          productName: productData[0].productName,
          sellingPrice: parseInt(productData[0].sellingPrice),
          assetIds: [
            {
              id: "ASSET-123",
              images: {
                id: "IMAGE-123",
                imageUrl: productData[0].productImages[0],
              },
            },
          ],
        },
      },
    ],
    shippingInfo: [
      {
        id: "SHIPPING-123",
        county: "Nairobi",
        street: "Nairobi",
        town: "Nairobi",
        locationDesc: "Madaraka",
        status: "completed",
        createdAt: new Date(),
      },
    ],
  },

  {
    id: "ORDER_SERT",
    user: UserData[2],
    total: 300,
    status: "completed",
    createdAt: new Date(),
    updatedAt: addHours(new Date(), 4),
    payment: [
      {
        id: "PAYM-123",
        amount: 300,
        provider: "mpesa",
        status: "completed",
        createdAt: new Date(),
      },
    ],
    items: [
      {
        id: "ITEM-1234",
        price: 200,
        quantity: 10,
        product: {
          productName: productData[0].productName,
          sellingPrice: parseInt(productData[0].sellingPrice),
          assetIds: [
            {
              id: "ASSET-123",
              images: {
                id: "IMAGE-123",
                imageUrl: productData[0].productImages[0],
              },
            },
          ],
        },
      },
    ],
    shippingInfo: [
      {
        id: "SHIPPING-123",
        county: "Nairobi",
        street: "Nairobi",
        town: "Nairobi",
        locationDesc: "Madaraka",
        status: "completed",
        createdAt: new Date(),
      },
    ],
  },
];

export const findOrder = (id: string) =>
  orderData.find((order) => order.id == id);
export const replaceOrders = (orders: TOrdersSchema[]) => (orderData = orders);

export default orderData;
