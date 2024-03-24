import { useNavigate, useParams } from "react-router";
import useGetProductsById from "../services/getProductsById";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import cloudinaryConfig from "@/config/clooudinary";
import {  useState } from "react";
import QRCode from "qrcode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ICartItems, useProductActions } from "../data/data.store";
import { useToast } from "@/components/ui/use-toast";


const bgClass: { [key: string]: string } = {
  instock: "bg-red-400/30 text-gray-200",
  completed: "bg-green-300/30 text-green-500",
  pending: "bg-orange-300/30 text-orange-500",
  refunded: "bg-gray-400/30 text-gray-200",
};

const ProductsView = () => {
  const { productId } = useParams();
  const {addToCart} = useProductActions();
  const navigate = useNavigate();
  const {toast} = useToast();

  const { data, isLoading, isError, error, refetch } =
    useGetProductsById(productId);

  const [qrCodeSrc, setQrCodeSrc] = useState(
    "https://admin-panel-madrigal.vercel.app/products/view/" + productId
  );
  const [productQty, setProductQty] = useState(1);
  const [total, setTotal] = useState(productQty * parseInt(data?.sellingPrice));

  if (isLoading) return <TableLoading />;
  if (isError) return <TableError error={error} retry={refetch} />;

  const handleAddToCart = () => {
    const orderItem = {
      productId,
      quantity:productQty,
      price:data.sellingPrice,
      assetImage:data.asset[0].images[0],
      productName:data.productName
    } as ICartItems
    addToCart(orderItem);
    toast({
      title: "Item added successfully",
      description: "The Item has been added successfully"
    })
    setTimeout(() => navigate("/products"),2000);
  }

  if (data) {
    const handleImageTransformation = (publicId: string) => {
      const image = cloudinaryConfig.image(publicId);
      return image.toURL();
    };

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductQty(parseInt(e.target.value));
      setTotal(parseInt(data?.sellingPrice) * parseInt(e.target.value));
    };

    const qrCodeString = QRCode.toDataURL(qrCodeSrc).then(setQrCodeSrc);
    return (
      <div className="w-full flex flex-col space-y-3">
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <span className="size-full rounded-md">
            <img
              src={handleImageTransformation(data.asset[0].images[0])}
              alt="Product"
              className="size-full rounded-md"
            />
          </span>
          <div className="w-full flex flex-col space-y-3">
            <p className="text-primary font-medium">{data.stockStatus}</p>
            <p className="text-foreground text-4xl font-bold">
              {data.productName}
            </p>
            <p className="text-foreground text-lg font-bold">
              sh{data.sellingPrice}
            </p>
            <p className="text-muted text-lg font-medium">
              {data.productDescription}
            </p>

            <div className="w-full flex space-x-10 items-center">
              <div className="space-y-3">
                <Label
                  htmlFor="productQty"
                  className="text-foreground font-medium">
                  Quantity
                </Label>
                <Input
                  type="number"
                  id="productQty"
                  className="text-foreground"
                  value={productQty}
                  onChange={handleQtyChange}
                />
              </div>
              <div className="space-y-3">
                <p className="text-foreground font-medium">Total</p>
                <p className="text-primary font-bold text-lg">sh{total}</p>
              </div>
            </div>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="size-6 mr-3" />
              Add to cart
            </Button>

            <div className="flex flex-col space-y-4">
              <p className="text-foreground font-bold text-3xl">QR CODE</p>

              <span className="size-40 rounded-md">
                <img
                  src={qrCodeSrc}
                  alt="QR CODE"
                  className="size-full rounded-md"
                  loading="lazy"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsView;
