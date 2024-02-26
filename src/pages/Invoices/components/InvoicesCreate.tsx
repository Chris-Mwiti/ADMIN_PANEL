import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import TInvoicesSchema, { invoicesSchema } from "../schemas/invoices.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TUser from "@/pages/Users/schemas/users.schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ToInvoiceForm from "./ToInvoiceForm";
import FromInvoiceForm from "./FromInvoiceForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import useCreateInvoices from "../services/createInvoices";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import invoiceData from "../data/invoiceData";

export type TUserDetails = {
  name: string;
  email: string;
  address: string;
  phone: string;
  company?: string;
};

export type TUserInfo = Pick<
  TUser,
  "name" | "email" | "address" | "phone" | "company"
>;

const InvoicesCreate = () => {
  //Local states
  const [items, setItems] = useState(1);
  const increaseItems = () => setItems((prev) => prev + 1);
  const decreaseItems = () =>
    setItems((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });

  //Invoice Sender & Receiver info
  const [receiverUserInfo, setReceiverUserInfo] = useState<TUserDetails>({
    name: "Lucian Obrien",
    email: "lucian@gmail.com",
    address: "Nairobi",
    phone: "0712345678",
  });
  const [senderUserInfo, setSenderUserInfo] = useState<TUserDetails>({
    name: "Lucian Obrien",
    email: "lucian@gmail.com",
    address: "Nairobi",
    phone: "0712345678",
  });

  const form = useForm<TInvoicesSchema>({
    resolver: zodResolver(invoicesSchema),
    defaultValues: {
      invoiceInfo: {
        from: {
          name: senderUserInfo.name,
          email: senderUserInfo.email,
          phone: senderUserInfo.phone,
          address: senderUserInfo.address,
        },
        to: {
          name: receiverUserInfo.name,
          address: receiverUserInfo.address,
          phone: receiverUserInfo.phone,
          email: receiverUserInfo.email,
        },
      },
      invoiceDetails: [],
      status: "pending",
      createdAt: new Date(),
      dueDate: new Date(),
    },
  });

  // Submit handler
  //   const { isPending, mutate, isError, reset } = useCreateInvoices();
  const { toast } = useToast();
  const onSubmit = (values: TInvoicesSchema) => {
    form.setValue("invoiceInfo.from", senderUserInfo);
    form.setValue("invoiceInfo.to", receiverUserInfo);
    const navigate = useNavigate();
    invoiceData.push(values);

    toast({
      title: "Invoice created successfully",
      className: "bg-[#7cf988]",
      description: "The Invoice was created successfully",
    });

    setTimeout(() => navigate("/invoices"), 2000);
    
    // mutate(values, {
    //   onSuccess(data, variables, context) {
    //     toast({
    //       title: "Invoice created successfully",
    //       className: "bg-[#7cf988]",
    //       description: "The Invoice was created successfully",
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
    <div className="container flex flex-col space-y-5">
      <p className="font-medium text-2xl text-slate-100">
        Create a new invoice
      </p>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col space-y-1 md:flex-row md:space-y-1">
                {/* From Section */}
                <FromInvoiceForm
                  setSenderUserInfo={setSenderUserInfo}
                  senderUserInfo={senderUserInfo}
                  form={form}
                />
                {/* To Reciever */}
                <ToInvoiceForm
                  setReceiverUserInfo={setReceiverUserInfo}
                  form={form}
                  receiverUserInfo={receiverUserInfo}
                />
              </div>
              <Separator color="#efefef" className="my-4" />

              {/* Properties */}

              <div className="w-full items-center flex flex-col space-y-2 md:flex-row md:justify-evenly">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="w-full">
                          <SelectTrigger className="border w-full rounded-md h-10">
                            <SelectValue
                              placeholder="Status"
                              className="w-full"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>INVOICE ID</FormLabel>
                      <FormControl>
                        <Input defaultValue={"INV_0012"} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Created At</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              {/* Detail Section */}
              <div className="space-y-3 w-full">
                <p className="text-slate-100 font-medium">Details</p>
                <div className="w-full">
                  {Array.from({ length: items }).map((item, index) => (
                    <div
                      className="w-full grid grid-cols-0 md:grid-cols-2 gap-3"
                      key={index}>
                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Title"
                                {...field}
                                className="md:w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Quantity"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Price"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.total`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Price"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.shipping`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Shipping"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.discounts`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discounts</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Discounts"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`invoiceDetails.${index}.taxes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taxes</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Taxes"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 justify-between my-3">
                    <Button onClick={increaseItems} type="button">
                      <Plus className="mr-3 size-6" />
                      Add Item
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={decreaseItems}
                      type="button">
                      <Minus className="mr-3 size-6" />
                      Remove Item
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="bg-slate-300 w-full" type="submit">
                Create & Send
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesCreate;
