import { useNavigate, useParams } from "react-router";
import useGetProductsById from "../services/getProductsById";
import TableError from "@/components/ui_fallbacks/TableError";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import cloudinaryConfig from "@/config/clooudinary";
import { useForm } from "react-hook-form";
import { TProductDetails } from "./ProductDetailsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductFormSchema, {
  TProductFormSchema,
} from "../schemas/product.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUpdateProduct from "../services/updateProduct";
import { useToast } from "@/components/ui/use-toast";
import CreateButton from "@/components/ui_fallbacks/CreateButton";
import { z } from "zod";
const updateProductFormSchema = z.object({
  productName: z.string(),
  productDescription: z.string(),
  inventory: z.object({
    quantity: z.string(),
  }),
  productLabel: z.string(),
});

type TUpdateProductDto = z.infer<typeof updateProductFormSchema>;

const ProductEdit = () => {
  const { productId } = useParams();

  const { data, isError, isLoading, refetch, error } =
    useGetProductsById(productId);

  const { mutate, isPending } = useUpdateProduct(productId);
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateForm = useForm<TUpdateProductDto>({
    resolver: zodResolver(updateProductFormSchema),
  });

  const handleSubmitUpdate = (value: Partial<TProductFormSchema>) => {
    mutate(value, {
      onSuccess(data, variables, context) {
          toast({
            title: "Update Success",
            description: "Your update was successful"
          })
        },
    });
    setTimeout(() => navigate("/products"),2000)
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
            />
          </span>
          <div className="w-full">
            <Form {...updateForm}>
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={updateForm.handleSubmit(handleSubmitUpdate)}>
                <FormField
                  control={updateForm.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-lg">
                        Product name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-foreground" />
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
                      <FormLabel className="text-foreground text-lg">
                        Product Description
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productDescription}
                />

                <FormField
                  control={updateForm.control}
                  name="inventory.quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-lg">
                        Product Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-foreground"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.inventory.quantity}
                />

                <FormField
                  control={updateForm.control}
                  name="productLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground text-lg">
                        Product Label
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="text-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={data.productLabel}
                />

                <CreateButton isPending={isPending} />
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductEdit;
