import { TNotifications } from "../schemas/notifications.schema";

const dummyNotifications: TNotifications[] = [
  {
    title: "STOCK LEVEL CRITICAL",
    message: "Stock level for PRODUCT-123EF is critical",
    status: "urgent",
    imageUrl: "/packedBread1.jfif",
    type: "products",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/packedBread2.jfif",
    type: "users",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/avatar.jpg",
    type: "users",
  },
  {
    title: "NEW ORDER HAS BEEN PLACED",
    message: "A new order has been placed",
    status: "important",
    type: "orders",
  },
];

export default dummyNotifications;
