import React, { useState } from "react";
import { useParams } from "react-router";
import useGetOrderById from "./services/getOrderById";
import { addHours, format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car, ChevronDown, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SelectValue } from "@radix-ui/react-select";

const OrdersEdit = () => {
  const { orderId } = useParams();
  if (!orderId)
    return (
      <div className="w-full items-center justify-center">
        No Order Id Provided
      </div>
    );

  const { data, isLoading, isError, error, refetch } = useGetOrderById(orderId);
  const [status, setStatus] = useState(data?.orderStatus)

  // Tag Object Propeties
  const bgClass: { [key: string]: string } = {
    refunded: "bg-gray-400/30 text-gray-200",
    completed: "bg-green-300/30 text-green-500",
    pending: "bg-orange-300/30 text-orange-500",
  };

  if(data){
    // Date formatting
    const formatedDate = format(data.orderDate, "do MMM yyy");
    const formatedTime = format(addHours(data.orderDate, 3), "hh:mm aaa");

    //HandleChanges
    const isChangesAvailable = data.orderStatus !== status
    return (
      <div className="w-full p-3 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 items-center">
            <p className="text-xl text-slate-100 font-medium">
              Order {data.id}
            </p>
            <div
              className={`${
                bgClass[status || data.orderStatus]
              } p-2 rounded-md text-center shadow-lg`}>
              {status || data.orderStatus}
            </div>
          </div>
          <div className="flex space-x-2">
            <p className="text-slate-100 text-lg font-medium">{formatedDate}</p>
            <p className="text-muted-foreground"> {formatedTime}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end item-center space-x-3 w-full">
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="text-slate-100">
              <SelectValue placeholder="Change Status">{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={"outline"}>
            <Printer color="#efefef" className="size-4 mr-3" />
            Print
          </Button>

          <Button className="bg-slate-200" disabled={!isChangesAvailable}>
            Save Changes
          </Button>
        </div>

        {/* History Section Card */}
        {/* @TODO: Extract the date-time component */}
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full border border-dotted rounded-md p-3 space-y-4">
              <span className="space-y-1">
                <p className="text-muted-foreground">Order time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {formatedDate}
                  </p>
                  <p className="text-muted-foreground"> {formatedTime}</p>
                </div>
              </span>
              <Separator color="#efefef" />
              <span className="space-y-1">
                <p className="text-muted-foreground">Payment time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {formatedDate}
                  </p>
                  <p className="text-muted-foreground"> {formatedTime}</p>
                </div>
              </span>
              <Separator />
              <span className="space-y-1">
                <p className="text-muted-foreground">Delivery time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {formatedDate}
                  </p>
                  <p className="text-muted-foreground"> {formatedTime}</p>
                </div>
              </span>
              <Separator />
              <span className="space-y-1">
                <p className="text-muted-foreground">Completion time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {formatedDate}
                  </p>
                  <p className="text-muted-foreground"> {formatedTime}</p>
                </div>
              </span>
            </div>
          </CardContent>
        </Card>

        {/*Order Detail Card Section  */}
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full space-y-3">
              <div className="w-full space-y-4">
                {data.orderItems.map((item, index) => (
                  <>
                    <div
                      className="flex items-center space-x-3 rounded-md p-2"
                      key={index}>
                      <span className="size-16">
                        <img
                          src={item.productImage}
                          alt="PR"
                          className="size-full rounded-md"
                        />
                      </span>
                      <span className="space-y-2">
                        <p className="text-slate-100 font-medium ">
                          {item.productName}
                        </p>
                        <p className="text-muted-foreground">
                          {item.productCategory}
                        </p>
                      </span>
                    </div>
                    <Separator />
                  </>
                ))}
              </div>
              <div className="w-full flex justify-end p-2">
                <div className="space-y-3 w-2/3  p-2">
                  <span className="flex items-center w-ful justify-between l">
                    <p className="text-muted-foreground font-medium">
                      Subtotal
                    </p>
                    <p className="text-slate-100 font-medium">sh 300</p>
                  </span>
                  <span className="flex items-center w-ful justify-between l">
                    <p className="text-muted-foreground font-medium">
                      Shipping
                    </p>
                    <p className="text-destructive font-medium">-sh100</p>
                  </span>
                  <span className="flex items-center w-ful justify-between l">
                    <p className="text-muted-foreground">Discount</p>
                    <p className="text-destructive font-medium">-sh100</p>
                  </span>
                  <span className="flex items-center w-ful justify-between l">
                    <p className="text-muted-foreground font-medium">Taxes</p>
                    <p className="text-destructive font-medium">-sh100</p>
                  </span>
                  <span className="flex items-center w-ful justify-between l">
                    <p className="text-slate-100 font-medium text-lg">Total</p>
                    <p className="text-slate-100 font-medium">sh500</p>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-4">
              <span className="size-12">
                <img
                  src={data.customerAvatar}
                  alt="A"
                  className="size-full rounded-full"
                />
              </span>
              <div className="space-y-2">
                <p className="text-slate-100">{data.customerName}</p>
                <p className="text-muted-foreground">{data.customerEmail}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Delivery</CardTitle>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">Ship by</p>
                <p className="font-medium">{data.orderInfo.shipBy}</p>
              </span>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">
                  Tracking No.
                </p>
                <p className="font-medium">{data.orderInfo.trackingNo}</p>
              </span>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Shipping</CardTitle>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">Address</p>
                <p className="font-medium">{data.orderInfo.address}</p>
              </span>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">
                  Phone number
                </p>
                <p className="font-medium">{data.orderInfo.recipientPhone}</p>
              </span>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Payment</CardTitle>
              <span className="flex space-x-4 items-center">
                <p className="text-muted-foreground font-medium">Payment type</p>
                <span className="bg-green-400/10 text-green-400 p-3 rounded-md shadow-lg">
                    {data.orderInfo.paymentType}
                </span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default OrdersEdit;
