import { Progress } from "@/components/ui/progress";

type TStockBarProps = {
  productQuantity: string;
  stockStatus: "out of stock" | "in stock" | "low stock";
};

const StockBar = ({ productQuantity, stockStatus }: TStockBarProps) => {
  const stockBgClass = (stockStatus: TStockBarProps["stockStatus"]) => {
    switch (stockStatus) {
      case "out of stock":
        return "bg-destructive";
      case "in stock":
        return "bg-greeen-300";
      case "low stock":
        return "bg-orange-300";
    }
  };
  return (
    <div className="w-[120px] m-auto space-y-2">
      <Progress
        value={Number(productQuantity)}
        className={`
            ${stockBgClass(stockStatus)}
            w-full
        `}
        color="#e2e42b"
      />
      <p className="text-muted-foreground">
        {stockStatus === "out of stock"
          ? "out of stock"
          : `${productQuantity} in stock`}
      </p>
    </div>
  );
};

export default StockBar;
