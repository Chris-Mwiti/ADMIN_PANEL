import { UseFormReturn } from "react-hook-form";
import TInvoicesSchema from "../schemas/invoices.schema";
import { TUserDetails, TUserInfo } from "./InvoicesCreate";
import UsersModal from "./UsersModal";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IToFormProps {
  form: UseFormReturn<TInvoicesSchema>;
  setReceiverUserInfo: React.Dispatch<React.SetStateAction<TUserDetails>>;
  receiverUserInfo: TUserDetails;
}

const ToInvoiceForm = ({
  form,
  setReceiverUserInfo,
  receiverUserInfo,
}: IToFormProps) => {
  return (
    <div className="w-full p-2 space-y-5">
      <span className="flex justify-between w-full items-center">
        <p className="text-muted-foreground font-medium">To:</p>
        <UsersModal setCurrentUser={setReceiverUserInfo} />
      </span>
      <div className="w-full space-y-1">
        <FormField
          control={form.control}
          name="invoiceInfo.to.name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={receiverUserInfo.name}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={receiverUserInfo.name}
        />
        <FormField
          control={form.control}
          name="invoiceInfo.to.email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={receiverUserInfo.email}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={receiverUserInfo.email}
        />

        <FormField
          control={form.control}
          name="invoiceInfo.to.address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={receiverUserInfo.address}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoiceInfo.to.phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={receiverUserInfo.phone}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ToInvoiceForm;
