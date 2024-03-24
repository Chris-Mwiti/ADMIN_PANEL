import { Progress } from "@/components/ui/progress";

type TStockBarProps = {
  productQuantity: string;
  stockStatus: "IN_STOCK" | "OUT_STOCK";
  max?: number;
};

const StockBar = ({ productQuantity, stockStatus, max }: TStockBarProps) => {
  const stockBgClass = (stockStatus: TStockBarProps["stockStatus"]) => {
    switch (stockStatus) {
      case "IN_STOCK":
        return "#e2e42b";
      case "OUT_STOCK":
        return "#e11d48";
    }
  };
  return (
    <div className="w-[120px] space-y-2">
      <Progress
        value={Number(productQuantity)}
        className={`
            w-full
        `}
        color={stockBgClass[stockStatus]}
        max={max}
      />
      <p className="text-muted-foreground">
        {stockStatus === "OUT_STOCK"
          ? "out of stock"
          : `${productQuantity} in stock`}
      </p>
    </div>
  );
};

export default StockBar;
