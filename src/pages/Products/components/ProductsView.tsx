import { useParams } from "react-router";
import useGetProductsById from "../services/getProductsById";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import cloudinaryConfig from "@/config/clooudinary";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { useState, lazy, Suspense } from "react";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Barcode, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import StockBar from "./StockBar";

const BarcodeElement = lazy(() => import("react-barcode"));
const SuspenseBarCode = () => {
  return (
    <div className="w-ful h-10">
      <Skeleton className="size-full rounded-md" />
    </div>
  );
};

const bgClass: { [key: string]: string } = {
  IN_STOCK: "bg-green-400/30 text-green-200",
  OUT_STOCK: "bg-red-300/30 text-red-500",
};

const ProductsView = () => {
  const { productId } = useParams();

  const { data, isLoading, isError, error, refetch } =
    useGetProductsById(productId);

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
              src={handleImageTransformation(data.asset[0].images[0])}
              alt="Product"
              className="size-full rounded-md"
              loading="lazy"
            />
          </span>
          <div className="w-full flex flex-col space-y-3">
            <div
              className={`${
                bgClass[data.stockStatus]
              } p-3 shadow-lg w-max rounded-md`}>
              {data.stockStatus}
            </div>
            <p className="text-foreground text-4xl font-bold">
              {data.productName}
            </p>
            <p className="text-primary text-2xl font-bold">
              sh{data.sellingPrice}
            </p>
            <p className="text-foreground text-lg font-medium">
              {data.productDescription}
            </p>
            <StockBar
              productQuantity={String(data.inventory.quantity)}
              stockStatus={data.stockStatus}
              max={2000}
            />
            <div className="flex items-center  w-full space-x-6">
              <div className="flex flex-col space-y-4 w-full">
                <p className="text-foreground font-bold text-3xl">BARCODE</p>
                <Suspense fallback={<SuspenseBarCode />}>
                  <BarcodeElement
                    value={data.productBarCode}
                    textAlign="center"
                    displayValue
                    background="#34d399"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsView;
