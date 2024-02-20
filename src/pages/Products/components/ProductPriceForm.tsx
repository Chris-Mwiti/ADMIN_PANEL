import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { TProductDetails } from "./ProductDetailsForm"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

const ProductPriceForm = ({form,onSubmit}: TProductDetails) => {
    const [isInputActive, setInputActive] = useState(false);
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
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Buying Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Buying Price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="sellingPrice"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Selling Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Selling Price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tax"
                        render={({field}) => (
                            <FormItem>
                                <div
                                    className="flex space-x-3 mt-5"
                                >
                                    <Switch checked={isInputActive} onCheckedChange={setInputActive} />
                                    <p className="text-[#efefef]">Price includes taxes</p>
                                </div>
                                <FormLabel>Tax</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="% 0.00" {...field} disabled={isInputActive} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default ProductPriceForm