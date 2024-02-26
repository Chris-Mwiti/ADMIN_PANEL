import { UseFormReturn } from "react-hook-form";
import TInvoicesSchema from "../schemas/invoices.schema";
import { TUserDetails, TUserInfo } from "./InvoicesCreate";
import UsersModal from "./UsersModal";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IToFormProps {
  form: UseFormReturn<TInvoicesSchema>;
  setSenderUserInfo: React.Dispatch<React.SetStateAction<TUserDetails>>;
  senderUserInfo: TUserDetails;
}

const FromInvoiceForm = ({
  form,
  setSenderUserInfo,
  senderUserInfo,
}: IToFormProps) => {
  return (
    <div className="w-full p-2 space-y-2">
      <span className="flex justify-between w-full items-center">
        <p className="text-muted-foreground font-medium">From:</p>
        <UsersModal setCurrentUser={setSenderUserInfo} />
      </span>
      <div className="w-full space-y-1">
        <FormField
          control={form.control}
          name="invoiceInfo.from.name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  value={senderUserInfo.name}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={senderUserInfo.name}
        />
        <FormField
          control={form.control}
          name="invoiceInfo.from.email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={senderUserInfo.email}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={senderUserInfo.email}
        />

        <FormField
          control={form.control}
          name="invoiceInfo.from.address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={senderUserInfo.address}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={senderUserInfo.address}
        />

        <FormField
          control={form.control}
          name="invoiceInfo.from.phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={senderUserInfo.phone}
                  disabled
                  className="border-none text-slate-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          defaultValue={senderUserInfo.phone}
        />
      </div>
    </div>
  );
};

export default FromInvoiceForm;
