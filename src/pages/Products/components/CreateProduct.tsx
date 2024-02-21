import ProductFormSchema, {
  TProductFormSchema,
} from "../schemas/productFormSchema";
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

const CreateProduct = () => {
  const thumbnails = useThumbnails();
  const { toast } = useToast();
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
    },
  });
  const onSubmit = (values: TProductFormSchema) => {
    console.log(thumbnails);
    values.productImages = thumbnails as string[];
    console.log(values);
    toast({
      title: "Product creation is successful",
      description: "Your product has been created successfully",
    })
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
