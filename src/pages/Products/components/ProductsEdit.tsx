import { useNavigate, useParams } from "react-router";
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
import { Barcode, Loader, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import StockBar from "./StockBar";
import { useForm } from "react-hook-form";
import ProductFormSchema, {
  TProductFormSchema,
} from "../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import useUpdateProduct from "../services/updateProduct";
import { useToast } from "@/components/ui/use-toast";

const bgClass: { [key: string]: string } = {
  IN_STOCK: "bg-green-400/30 text-green-200",
  OUT_STOCK: "bg-red-300/30 text-red-500",
};

const ProductsEdit = () => {
  const { productId } = useParams();

  const { data, isLoading, isError, error, refetch } =
    useGetProductsById(productId);
  const { mutate, isPending } = useUpdateProduct(productId);

  const [isPerishable, setIsPerishable] = useState(false);
  const updateForm = useForm<TProductFormSchema>({
    resolver: zodResolver(ProductFormSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const handleUpdate = (values: TProductFormSchema) => {
    mutate(values, {
      onSuccess(data, variables, context) {
        toast({
          description: "Update success",
          title: "UPDATE SUCCESS",
        });
        setTimeout(() => navigate("/products"), 2000);
      },
    });
  };

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
          <div className="w-full p-2 space-y-2">
            <div
              className={`${
                bgClass[data.stockStatus]
              } p-3 w-max shadow-lg rounded-md`}>
              {data.stockStatus}
            </div>
            <Form {...updateForm}>
              <form
                className="grid grid-cols-2 gap-4"
                onSubmit={updateForm.handleSubmit(handleUpdate)}>
                <FormField
                  control={updateForm.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Product Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product name"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productName}
                />
                <FormField
                  control={updateForm.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Product Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product description"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productDescription}
                />
                <FormField
                  control={updateForm.control}
                  name="productBarCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Product Bar Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Bar Code"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productBarCode}
                />
                <FormField
                  control={updateForm.control}
                  name="inventory.quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Inventory
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quantity"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={String(data.inventory.quantity)}
                />

                <FormField
                  control={updateForm.control}
                  name="productSku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Product Sku
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product SKU"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productSku}
                />
                <FormField
                  control={updateForm.control}
                  name="buyingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Buying Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Buying price"
                          className="text-foreground text-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={String(data.buyingPrice)}
                />
                <FormField
                  control={updateForm.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-xl">
                        Selling Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Selling price"
                          className="text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={String(data.sellingPrice)}
                />
                <FormField
                  control={updateForm.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-5 jusify-center">
                      <FormLabel className="text-foreground">Publish</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.published}
                />
                <Button className="col-span-2" type="submit">
                  {isPending ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin mr-3" /> Updating...
                    </span>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductsEdit;
