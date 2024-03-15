import { TNotifications } from "../schemas/notifications.schema";

const dummyNotifications: TNotifications[] = [
  {
    title: "STOCK LEVEL CRITICAL",
    message: "Stock level for PRODUCT-123EF is critical",
    status: "urgent",
    imageUrl: "/public/RedGrapeJuice.jfif",
    type: "products",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/public/avatar.jpg",
    type: "users",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/public/avatar.jpg",
    type: "users",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/public/avatar.jpg",
    type: "users",
  },
  {
    title: "NEW USER REGISTERED",
    message: "A new user has been created",
    status: "minor",
    imageUrl: "/public/avatar.jpg",
    type: "users",
  },
  {
    title: "NEW ORDER HAS BEEN PLACED",
    message: "A new order has been placed",
    status: "important",
    type: "orders",
  },
  {
    title: "STOCK LEVEL CRITICAL",
    message: "Stock level for PRODUCT-123EF is critical",
    status: "urgent",
    imageUrl: "/public/RedGrapeJuice.jfif",
    type: "products",
  },
];

export default dummyNotifications;
