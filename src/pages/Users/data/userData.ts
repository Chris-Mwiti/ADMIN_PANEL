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