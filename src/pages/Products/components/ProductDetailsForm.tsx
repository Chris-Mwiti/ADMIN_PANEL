import { UseFormReturn, UseFormStateReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TProductFormSchema } from "../schemas/productFormSchema";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useActions } from "@/contexts/component.store";

export type TProductDetails = {
  form: UseFormReturn<TProductFormSchema>;
  onSubmit: (values: TProductFormSchema) => void;
};

const ProductDetailsForm = ({ form, onSubmit }: TProductDetails) => {

  const  { updateThumbnails } = useActions();
  const thumbnailImages: Array<string | ArrayBuffer | null> = [];
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isUploadComplete, setUploadComplete] = useState(true);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      setUploadComplete(false);
      for (const file of files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          thumbnailImages.push(reader.result);
          setThumbnails(thumbnailImages as string[]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productImages"
              render={({ field, formState, fieldState }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Choose a file"
                      {...field}
                      accept="image/*"
                      value={[""]}
                      onChange={handleImageChange}
                      multiple
                    />
                  </FormControl>
                  <div className="w-full grid grid-cols-4 gap-3 xl:grid-col-8 md:grid-cols-12 lg:grid-cols-8">
                    {thumbnails?.map((image) => (
                      <div
                        className="size-16 rounded-md border"
                        key={image as string}>
                        <img
                          src={image as string}
                          alt="selected"
                          className="size-full rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    className="bg-slate-200 flex justify-around items-center space-x-2"
                    onClick={() => {
                      const isUploadComplete = updateThumbnails(thumbnailImages);
                      if(isUploadComplete) return setUploadComplete(true);
                    }}
                    type="button"
                    disabled={isUploadComplete}>
                    <UploadCloudIcon size={"20px"} color="#000" />
                    <p className="text-black">upload</p>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsForm;
