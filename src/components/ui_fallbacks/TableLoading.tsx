import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TableLoading = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex items-center justify-center">
        <Loader className="size-7 animate-spin" />
      </CardContent>
    </Card>
  );
};

export default TableLoading;
