import { TOrdersSchema } from "../schemas/orders.schema";

const orderData: TOrdersSchema[] = [
  {
    id: "12345",
    customerName: "Fredrick Irumba",
    customerEmail: "fredrick@gmail.com",
    customerAvatar: "/public/avatar.jpg",
    orderDate: new Date("2024-02-27T21:00:00.000Z"),
    itemsCount: "10",
    totalOrderPrice: "500",
    orderStatus: "pending",
    orderItems: [
      {
        productName: "Grape juice",
        productImage: "/public/carousel1.jfif",
        sellingPrice: "300",
        orderQty: "5",
        productCategory: "Food",
      },
    ],
    orderInfo: {
      shipBy: "Direct Expresss",
      trackingNo: "SPXIRDEFGVE134",
      address: "Nairobi",
      recipientPhone: "071234567",
      paymentType: "MPESA",
    },
  },
  {
    id: "24957",
    customerName: "Fredrick Irumba",
    customerEmail: "fredrick@gmail.com",
    customerAvatar: "/public/avatar.jpg",
    orderDate: new Date("2024-02-27T21:00:00.000Z"),
    itemsCount: "10",
    totalOrderPrice: "500",
    orderStatus: "completed",
    orderItems: [
      {
        productName: "Grape juice",
        productImage: "/public/carousel1.jfif",
        sellingPrice: "300",
        orderQty: "5",
        productCategory: "Food",
      },
    ],
    orderInfo: {
      shipBy: "Direct Expresss",
      trackingNo: "SPXIRDEFGVE134",
      address: "Nairobi",
      recipientPhone: "071234567",
      paymentType: "MPESA",
    },
  },
  {
    id: "34345",
    customerName: "Fredrick Irumba",
    customerEmail: "fredrick@gmail.com",
    customerAvatar: "/public/avatar.jpg",
    orderDate: new Date("2024-02-27T21:00:00.000Z"),
    itemsCount: "10",
    totalOrderPrice: "500",
    orderStatus: "refunded",
    orderItems: [
      {
        productName: "Grape juice",
        productImage: "/public/carousel1.jfif",
        sellingPrice: "300",
        orderQty: "5",
        productCategory: "Food",
      },
      {
        productName: "Grape juice",
        productImage: "/public/carousel2.jfif",
        sellingPrice: "300",
        orderQty: "5",
        productCategory: "Food",
      },
      {
        productName: "Grape juice",
        productImage: "/public/carousel3.jfif",
        sellingPrice: "300",
        orderQty: "5",
        productCategory: "Food",
      },
    ],
    orderInfo: {
      shipBy: "Direct Expresss",
      trackingNo: "SPXIRDEFGVE134",
      address: "Nairobi",
      recipientPhone: "071234567",
      paymentType: "MPESA",
    },
  },
];

export default orderData