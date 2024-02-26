import ProductFormSchema, {
  TProductFormSchema,
} from "../schemas/product.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductDetailsForm from "./ProductDetailsForm";
import ProductPropertiesForm from "./ProductPropertiesForm";
import ProductPriceForm from "./ProductPriceForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useThumbnails } from "@/contexts/component.store";
import { useToast } from "@/components/ui/use-toast";
import useCreateProduct from "../services/createProducts";
import { ToastAction } from "@/components/ui/toast";
import productData from "@/pages/Products/data/productData";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const thumbnails = useThumbnails();
  const { toast } = useToast();
  const navigate = useNavigate();
  // const { isPending, isError, error, data, mutate, reset } = useCreateProduct();
  const form = useForm<TProductFormSchema>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      productDescription: "",
      productCode: "",
      productLabel: "",
      productImages: [],
      productSku: "",
      productQuantity: "1",
      productTag: "",
      sellingPrice: "",
      stockStatus: "in stock",
    },
  });
  const onSubmit = (values: TProductFormSchema) => {
    console.log(thumbnails);
    values.productImages = [
      "/carousel2.jfif",
      "/carousel3.jfif",
      "/carousel1.jfif",
    ];

    productData.push(values);
    toast({
      className: "bg-[#7cf988]",
      title: "Success",
      description: "Product creation is successful",
    });
    setTimeout(() => navigate("/products"), 2000);
    // mutate(values, {
    //   onSuccess(data, variables, context) {
    //     toast({
    //       className: "bg-[#7cf988]",
    //       title: "Success",
    //       description: "Product creation is successful",
    //     });
    //   },
    //   onError(error, variables, context) {
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: error.message,
    //       action: (
    //         <ToastAction altText="Retry" onClick={reset}>
    //           Retry
    //         </ToastAction>
    //       ),
    //     });
    //   },
    // });
  };

  return (
    <section
      className="
            w-full min-h-full p-3 space-y-3
        ">
      <p className="text-3xl text-[#efefef] font-bold">Create a new product</p>
      {/* Product Details */}
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6">
            <ProductDetailsForm form={form} onSubmit={onSubmit} />
            <ProductPropertiesForm form={form} onSubmit={onSubmit} />
            <ProductPriceForm form={form} onSubmit={onSubmit} />

            <FormField
              name="published"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex space-x-3 items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-secondary-foreground text-lg items-center">
                    Publish
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-slate-100">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateProduct;
