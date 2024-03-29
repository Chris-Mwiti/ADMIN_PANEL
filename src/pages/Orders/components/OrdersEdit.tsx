import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useGetOrderById from "./services/getOrderById";
import { addHours, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, Printer } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SelectValue } from "@radix-ui/react-select";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import { TOrdersSchema } from "./schemas/orders.schema";
import {
  AdvancedImage,
  lazyload,
  responsive,
  placeholder,
} from "@cloudinary/react";
import cloudinaryConfig from "@/config/clooudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";
import useUpdateOrder from "./services/updateOrderById";
import orderData, { findOrder, replaceOrders } from "./data/orderData";
import { useToast } from "@/components/ui/use-toast";

// Tag Object Propeties
const bgClass: { [key: string]: string } = {
  canceled: "bg-red-400/30 text-red-200",
  refunded: "bg-gray-400/30 text-gray-200",
  completed: "bg-green-300/30 text-green-500",
  pending: "bg-orange-300/30 text-orange-500",
};

const OrdersEdit = () => {
  const { orderId } = useParams();
  if (!orderId)
    return (
      <div className="w-full flex items-center justify-center text-slate-100">
        No Order Id Provided
      </div>
    );

  const { data, isLoading, isError, error, refetch } = useGetOrderById(orderId);
  const { mutate, isPending } = useUpdateOrder(orderId);
  const [status, setStatus] = useState(data?.status);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  if(isLoading) return <TableLoading />
  if(isError) return <TableError error={error} retry={refetch} />

  //@TODO: CREATE CUSTOM SKELETON LOADER AND ERROR TEMPLATE

  if (data) {
    // Date formatting
    const formatedDate = format(data.createdAt, "do MMM yyy");
    const formatedTime = format(addHours(data.createdAt, 3), "hh:mm aaa");
    const completionDate = format(data.updatedAt, "do MMM yyy");
    const completionTime = format(data.updatedAt, "hh:mm aaa");
    const paymentDate = format(data.payment[0].createdAt, "do MMM yyy");
    const shippingDate = format(data.shippingInfo[0].createdAt, "do MMM yyy");
    const paymentTime = format(data.payment[0].createdAt, "hh:mm aaa");
    const shippingTime = format(data.shippingInfo[0].createdAt, "hh:mm aaa");

    //HandleChanges
    const isChangesAvailable = data.status !== status;
    const handleUpdateOrder = () => {
      mutate(status, {
        onSuccess(data, variables, context) {
          toast({
            description: "Update success",
            title: "UPDATE SUCCESS",
          });
          setTimeout(() => navigate("/orders"), 2000);
        },
      });
    };

    const transformImage = (imageUrl: string) => {
      const image = cloudinaryConfig.image(imageUrl);
      image.resize(fill().width(64).height(64));
      return image.toURL();
    };
    return (
      <div className="w-full p-3 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 items-center">
            <p className="text-xl text-slate-100 font-medium">{data.id}</p>
            <div
              className={`${
                bgClass[status || data.status]
              } p-2 rounded-md text-center shadow-lg`}>
              {status || data.status}
            </div>
          </div>
          <div className="flex space-x-2">
            <p className="text-slate-100 text-lg font-medium">{formatedDate}</p>
            <p className="text-muted-foreground"> {formatedTime}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end item-center space-x-3 w-full">
          <Select
            onValueChange={(value) =>
              setStatus(value as TOrdersSchema["status"])
            }>
            <SelectTrigger className="text-slate-100">
              <SelectValue placeholder="Change Status">{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={"outline"}>
            <Printer color="#efefef" className="size-4 mr-3" />
            Print
          </Button>

          <Button
            className="bg-slate-200"
            disabled={isPending}
            type="button"
            onClick={handleUpdateOrder}>
            {isPending ? (
              <span className="flex items-center">
                <Loader className="animate-spin mr-3" />
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
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
                    {paymentDate}
                  </p>
                  <p className="text-muted-foreground"> {paymentTime}</p>
                </div>
              </span>
              <Separator />
              <span className="space-y-1">
                <p className="text-muted-foreground">Delivery time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {shippingDate}
                  </p>
                  <p className="text-muted-foreground"> {shippingTime}</p>
                </div>
              </span>
              <Separator />
              <span className="space-y-1">
                <p className="text-muted-foreground">Completion time</p>
                <div className="flex space-x-2 m-auto">
                  <p className="text-slate-100 text-lg font-medium">
                    {completionDate}
                  </p>
                  <p className="text-muted-foreground"> {completionTime}</p>
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
                {data.items.map((item, index) => (
                  <>
                    <div
                      className="flex items-center space-x-3 rounded-md p-2"
                      key={index}>
                      <span className="size-16">
                        <img
                          src={transformImage(
                            data.items[0].product.asset[0].images[0]
                          )}
                          alt="Product"
                          className="size-12 rounded-md"
                        />
                      </span>
                      <span className="space-y-2">
                        <p className="text-slate-100 font-medium ">
                          {item.product.productName}
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

        {/* User info  */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-4">
              <span className="size-12">
                {data.user.avatarUrl ? (
                  <img
                    src={data.user.avatarUrl}
                    alt="A"
                    className="size-full rounded-full"
                  />
                ) : (
                  <span className="size-full rounded-full bg-primary text-card-foreground flex items-center justify-center font-bold">
                    U
                  </span>
                )}
              </span>
              <div className="space-y-2">
                <p className="text-slate-100">{data.user.id}</p>
                <p className="text-muted-foreground">{data.user.firstName}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Delivery</CardTitle>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">Ship by</p>
                <p className="font-medium">DTL</p>
              </span>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">
                  Tracking No.
                </p>
                <p className="font-medium">{data.shippingInfo[0].id}</p>
              </span>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Shipping</CardTitle>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">Address</p>
                <p className="font-medium">{data.shippingInfo[0].county}</p>
              </span>
              <span className="flex space-x-4">
                <p className="text-muted-foreground font-medium">
                  Phone number
                </p>
                <p className="font-medium">{data.user.phone}</p>
              </span>
            </div>
            <Separator />
            <div className="space-y-3">
              <CardTitle>Payment</CardTitle>
              <span className="flex space-x-4 items-center">
                <p className="text-muted-foreground font-medium">
                  Payment type
                </p>
                <span className="bg-green-400/10 text-green-400 p-3 rounded-md shadow-lg">
                  {data.payment[0].provider}
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
