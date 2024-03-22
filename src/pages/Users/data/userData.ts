import TUser from "../schemas/users.schema";

let UserData: TUser[] = [
  {
    id: "1290",
    firstName: "Chris",
    lastName: "Mwiti",
    email: "mwitichris@gmail.com",
    emailVerified: true,
    phone: "0712345678",
    address: "Nairobi",
    company: "Safaricom",
    role: "Data Analyst",
    avatarUrl: "/avatar.jpg",
    createdAt: new Date("2024-02-25T10:04:12.192Z"),
    status: "active",
  },
  {
    id: "129r",
    firstName: "Jason",
    lastName: "Iringu",
    email: "mwitichris@gmail.com",
    emailVerified: true,
    phone: "0712345678",
    address: "Nairobi",
    company: "Safaricom",
    role: "Data Analyst",
    avatarUrl: "/avatar.jpg",
    createdAt: new Date("2024-02-25T10:04:12.192Z"),
    status: "banned",
  },
  {
    id: "129i",
    firstName: "Simon",
    lastName: "Mutai",
    email: "mwitichris@gmail.com",
    emailVerified: true,
    phone: "0712345678",
    address: "Nairobi",
    company: "Safaricom",
    role: "Data Analyst",
    avatarUrl: "/avatar.jpg",
    createdAt: new Date("2024-02-25T10:04:12.192Z"),
    status: "pending",
  },
  {
    id: "fdcc",
    firstName: "Fredrick",
    lastName: "Robert",
    email: "mwitichris@gmail.com",
    emailVerified: true,
    phone: "0712345678",
    address: "Nairobi",
    company: "Safaricom",
    role: "Data Analyst",
    avatarUrl: "/avatar.jpg",
    createdAt: new Date("2024-02-25T10:05:24.364Z"),
    status: "active",
  },
  {
    id: "7f52",
    firstName: "Isaac",
    lastName: "Shimenga",
    email: "isaac@gmail.com",
    emailVerified: true,
    phone: "0712345679",
    address: "Kakamega",
    company: "Airtel",
    role: "Analyst",
    avatarUrl: "/avatar.jpg",
    createdAt: new Date("2024-02-25T10:06:51.206Z"),
    status: "active",
  },
];

const findUser = (id:string) => UserData.find(user => user.id == id);
const replaceUsers = (users:TUser[]) => UserData = users;
const addUser = (user:TUser) => UserData.push(user);

export default UserData


export {
  findUser,
  replaceUsers,
  addUser
}