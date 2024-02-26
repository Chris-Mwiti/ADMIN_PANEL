import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TUserDetails } from "./InvoicesCreate";
import useGetInvoiceById from "../services/getInvoiceById";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TInvoicesSchema, { invoicesSchema } from "../schemas/invoices.schema";
import useUpdateInvoice from "../services/updateInvoiceById";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardContent } from "@/components/ui/card";
import FromInvoiceForm from "./FromInvoiceForm";
import ToInvoiceForm from "./ToInvoiceForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import invoiceData from "../data/invoiceData";

const InvoicesView = () => {
  //Badge Backgrounds
  const bgClass: { [key: string]: string } = {
    overdue: "bg-red-400/30 text-red-200",
    paid: "bg-green-300/30 text-green-500",
    pending: "bg-orange-300/30 text-orange-500",
    draft: "bg-gray-300/30 text-gray-200",
  };

  const navigate = useNavigate();
  //Local states
  const { invoiceId } = useParams();
  //   const {
  //     data,
  //     isLoading,
  //     isError: fetchError,
  //     error,
  //     refetch,
  //   } = useGetInvoiceById(invoiceId!);

  const data = invoiceData.find((value) => value.id === invoiceId);
  //Invoice Sender & Receiver info
  const [receiverUserInfo, setReceiverUserInfo] = useState<TUserDetails>({
    name: data?.invoiceInfo.to.name || "",
    email: data?.invoiceInfo.to.email || "",
    address: data?.invoiceInfo.to.address || "",
    phone: data?.invoiceInfo.to.phone || "",
  });
  const [senderUserInfo, setSenderUserInfo] = useState<TUserDetails>({
    name: data?.invoiceInfo.from.name || "",
    email: data?.invoiceInfo.from.email || "",
    address: data?.invoiceInfo.from.address || "",
    phone: data?.invoiceInfo.from.phone || "",
  });

  const [status, setStatus] = useState(data?.status || "pending");

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
  //   const { isPending, mutate, isError, reset } = useUpdateInvoice(invoiceId!);
  const { toast } = useToast();
  const onSubmit = (values: TInvoicesSchema) => {
    form.setValue("invoiceInfo.from", senderUserInfo);
    form.setValue("invoiceInfo.to", receiverUserInfo);
    console.log(values);

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

  //   if (isLoading) return <TableLoading />;
  //   if (fetchError) return <TableError error={error} retry={refetch} />;
  if (data) {
    return (
      <div className="container flex flex-col space-y-5">
        <div className="space-x-3 flex items-center">
          <p className="font-medium text-2xl text-slate-100">
            Edit invoice {data.id}
          </p>
          <div
            className={`${
              bgClass[status!]
            } p-2 rounded-md text-center shadow-lg`}>
            {status}
          </div>
        </div>
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
                          value={status}
                          onValueChange={(value) => setStatus(value)}
                          defaultValue={status}>
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
                    defaultValue={data.status}
                  />
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>INVOICE ID</FormLabel>
                        <FormControl>
                          <Input defaultValue={data?.id} disabled />
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
                    {data.invoiceDetails.map((item, index) => (
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
                          defaultValue={item.title}
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
                          defaultValue={item.description}
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
                          defaultValue={item.quantity}
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
                          defaultValue={item.price}
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
                          defaultValue={item.total}
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
                          defaultValue={item.shipping}
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
                          defaultValue={item.discounts}
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
                          defaultValue={item.taxes}
                        />
                      </div>
                    ))}
                    <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 justify-between my-3">
                      <Button
                        onClick={() => data?.invoiceDetails.length + 1}
                        type="button">
                        <Plus className="mr-3 size-6" />
                        Add Item
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          if (data?.invoiceDetails.length == 0) return;
                          data?.invoiceDetails.length - 1;
                        }}
                        type="button">
                        <Minus className="mr-3 size-6" />
                        Remove Item
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-slate-300 w-full" type="submit">
                  Update & Send
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default InvoicesView;
