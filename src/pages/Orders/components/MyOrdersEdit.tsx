import { useNavigate, useParams } from "react-router";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import cloudinaryConfig from "@/config/clooudinary";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useGetOrderById from "./services/getOrderById";
import { Select, SelectItem } from "@/components/ui/select";
import { TOrdersSchema } from "./schemas/orders.schema";
import useUpdateOrder from "./services/updateOrderById";

const bgClass: { [key: string]: string } = {
  completed: "bg-green-300/30 text-green-500",
  pending: "bg-orange-300/30 text-orange-500",
  refunded: "bg-gray-400/30 text-gray-200",
  canceled: "bg-red-400/30 text-red-200",
};

const MyOrdersEdit = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useGetOrderById(orderId);
  const { mutate, isPending } = useUpdateOrder(orderId);

  if (isLoading) return <TableLoading />;
  if (isError) return <TableError error={error} retry={refetch} />;

  if (data) {
    const handleImageTransformation = (publicId: string) => {
      const image = cloudinaryConfig.image(publicId);
      return image.toURL();
    };

    return (
      <div className="w-full flex flex-col space-y-3">
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <span className="size-full rounded-md">
            <img
              src={handleImageTransformation(
                data.items[0].product.asset[0].images[0]
              )}
              alt="Product"
              className="size-full rounded-md"
            />
          </span>
          <div className="w-full flex flex-col space-y-3">
            <div className={`w-max p-3 ${bgClass[data.status]} rounded-md`}>
              {data.status}
            </div>
            <p className="text-foreground text-4xl font-bold">
              {data.items[0].product.productName}
            </p>
            <p className="text-foreground text-lg font-bold">
              sh{data.items[0].product.sellingPrice}
            </p>
            <p className="text-foreground font-bold">
              Quantity:{" "}
              <p className="text-primary">{data.items[0].quantity} items</p>
            </p>
            <p className="text-foreground font-bold text-lg">
              Total: <p className="text-primary font-medium">sh{data.total}</p>
            </p>
            <Button
              variant="destructive"
              className="w-full"
              disabled={data.status == "completed" || isPending}
              onClick={() => mutate("canceled")}>
              {isPending ? (
                <span className="size-max flex items-center">
                  <Loader className="animate-spin mr-2" />
                  Updating...
                </span>
              ) : (
                "Cancel Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default MyOrdersEdit;
