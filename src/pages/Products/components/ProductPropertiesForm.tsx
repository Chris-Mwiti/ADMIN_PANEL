import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TProductDetails } from "./ProductDetailsForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const ProductPropertiesForm = ({ form, onSubmit }: TProductDetails) => {
  const [activeLabel, setActiveLabel] = useState(false);
  const [isPerishable, setIsPerishable] = useState(true);
  const handlePerishableChange = (value:boolean, onChange:(e:any) => void) => {
    setIsPerishable(value);
    onChange(value);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="productCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product code</FormLabel>
                  <FormControl>
                    <Input placeholder="Product code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productSku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Product SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Qty" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Label</FormLabel>
                  <div className="flex space-x-3 w-full items-center justify-center">
                    <Switch
                      checked={activeLabel}
                      onCheckedChange={setActiveLabel}
                    />
                    <FormControl>
                      <Input
                        placeholder="Label"
                        disabled={activeLabel}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="perishable"
              render={({field}) => (
                <FormItem className="flex space-x-4 items-center">
                  <FormControl>
                    <Switch onCheckedChange={(v) => handlePerishableChange(v,field.onChange)} checked={field.value} />
                  </FormControl>
                  <FormLabel>Perishable</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expireDate"
              render={({field}) => (
                <FormItem className={`${isPerishable ? "block space-x-2" : "hidden"}`}>
                  <FormLabel>Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < new Date()
                            }
                            initialFocus
                          />  
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of expiration is used to calculate the remaining days for the product
                    </FormDescription>
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

export default ProductPropertiesForm;
