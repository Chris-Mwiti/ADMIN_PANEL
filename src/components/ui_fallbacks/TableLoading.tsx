import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TableLoading = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Skeleton className="w-full" />
      </CardContent>
    </Card>
  );
};


export default TableLoading
