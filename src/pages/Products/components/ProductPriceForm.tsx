import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TProductDetails } from "./ProductDetailsForm";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import useGetDiscounts from "../services/getDiscounts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";

const ProductPriceForm = ({ form, onSubmit }: TProductDetails) => {
  const [isInputActive, setInputActive] = useState(false);
  const { data, error, isError, isLoading, refetch } = useGetDiscounts();

  if (isLoading) return <TableLoading />;
  if (isError) return <TableError error={error} retry={refetch} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="buyingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buying Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Buying Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selling Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a discount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.data.length >= 1 &&
                        data.data.map((discountId) => (
                          <SelectItem key={discountId.id} value={discountId.id}>
                            {discountId.coupon}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <div className="flex space-x-3 mt-5">
                    <Switch
                      checked={isInputActive}
                      onCheckedChange={setInputActive}
                    />
                    <p className="text-[#efefef]">Price includes taxes</p>
                  </div>
                  <FormLabel>Tax</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="% 0.00"
                      {...field}
                      disabled={isInputActive}
                    />
                  </FormControl>
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

export default ProductPriceForm;
