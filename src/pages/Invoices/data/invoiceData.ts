import TInvoicesSchema from "../schemas/invoices.schema";

const invoiceData: TInvoicesSchema[] = [
  {
    invoiceInfo: {
      from: {
        name: "James Mwangi",
        address: "Meru",
        email: "address@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Natasha Kanana",
        address: "Nairobi",
        email: "natasha@gmail.com",
        phone: "012345678",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "100",
        total: "200",
      },
    ],
    status: "pending",
    createdAt: new Date("2024-02-26T06:08:00.944Z"),
    dueDate: new Date("2024-02-26T06:08:00.944Z"),
    id: "7eb1",
  },
  {
    id: "2e0c",
    invoiceInfo: {
      from: {
        name: "Lucian Obrien",
        address: "Nairobi",
        email: "lucian@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Lucian Obrien",
        address: "Nairobi",
        email: "lucian@gmail.com",
        phone: "0712345678",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "100",
        total: "200",
      },
    ],
    status: "pending",
    createdAt: new Date("2024-02-26T04:33:58.971Z"),
    dueDate: new Date("2024-03-14T21:00:00.000Z"),
  },
  {
    id: "3ca8",
    invoiceInfo: {
      from: {
        name: "Chris Mwiti",
        address: "Nairobi",
        email: "mwitichris@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Sandra Namu",
        address: "Kakamega",
        email: "derrick@gmail.com",
        phone: "0712345679",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "100",
        total: "200",
      },
    ],
    status: "pending",
    createdAt: new Date("2024-02-26T04:33:58.971Z"),
    dueDate: new Date("2024-03-14T21:00:00.000Z"),
  },

  {
    id: "3ca3",
    invoiceInfo: {
      from: {
        name: "Chris Mwiti",
        address: "Nairobi",
        email: "mwitichris@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Vingoka Company",
        address: "Kakamega",
        email: "derrick@gmail.com",
        phone: "0712345679",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "300",
        total: "200",
      },
    ],
    status: "paid",
    createdAt: new Date("2024-02-26T04:33:58.971Z"),
    dueDate: new Date("2024-03-14T21:00:00.000Z"),
  },

  {
    id: "3ca5",
    invoiceInfo: {
      from: {
        name: "Chris Mwiti",
        address: "Nairobi",
        email: "mwitichris@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Simon Wanjohi",
        address: "Kakamega",
        email: "derrick@gmail.com",
        phone: "0712345679",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "300",
        total: "200",
      },
    ],
    status: "draft",
    createdAt: new Date("2024-02-26T04:33:58.971Z"),
    dueDate: new Date("2024-03-14T21:00:00.000Z"),
  },

  {
    id: "3cad",
    invoiceInfo: {
      from: {
        name: "Chris Mwiti",
        address: "Nairobi",
        email: "mwitichris@gmail.com",
        phone: "0712345678",
      },
      to: {
        name: "Charles Mwangi",
        address: "Kakamega",
        email: "derrick@gmail.com",
        phone: "0712345679",
      },
    },
    invoiceDetails: [
      {
        title: "Fruit Purchasing",
        description: "Purchasing of fruits",
        quantity: "20",
        price: "500",
        total: "200",
      },
    ],
    status: "overdue",
    createdAt: new Date("2024-02-26T04:33:58.971Z"),
    dueDate: new Date("2024-03-14T21:00:00.000Z"),
  },
];

export default invoiceData;
