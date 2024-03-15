import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import dummyNotifications from "../data/notifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotificationSheet = () => {
  const notificationItems = dummyNotifications.length;
  const productNotifications = dummyNotifications.filter(
    (notf) => notf.type === "products"
  );
  const ordersNotifications = dummyNotifications.filter(
    (notf) => notf.type === "orders"
  );
  const usersNotifications = dummyNotifications.filter(
    (notf) => notf.type === "users"
  );

  return (
    <Sheet>
      <SheetTrigger asChild className="block">
        <div className="relative w-max h-max">
          <Bell color="#ffffff" className="group-hover:stroke-[#1c1917]" />
          <span
            className="
            size-5 rounded-full grid place-items-center bg-red-500 text-white
            absolute -top-3 left-3
            ">
            {notificationItems}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[#1c1917]/90 flex flex-col space-y-3">
        <SheetHeader>
          <SheetTitle>
            <p className="text-white text-3xl text-center">Notifications</p>
          </SheetTitle>
          <SheetDescription>You have new notifications</SheetDescription>
          <div className="flex w-full flex-col space-y-3 h-full border rounded-md">
            <Tabs defaultValue="all" className="w-full space-y-4">
              <TabsList className="grid w-full grid-cols-4 gap-2 bg-[#1c1917]">
                <TabsTrigger value="all" className="text-white bg-white/50">
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="text-white bg-white/50">
                  Products
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-white bg-white/50">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="users" className="text-white bg-white/50">
                  Users
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card className="bg-[#1c1917] max-h-full">
                  <CardHeader>
                    <CardTitle className="text-white">
                      All notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-full overflow-y-auto">
                    {dummyNotifications.map((notf) => (
                      <div className="w-full flex space-x-3">
                        {notf.imageUrl ? (
                          <span className="size-14 rounded-md">
                            <img
                              src={notf.imageUrl}
                              alt="N"
                              className="size-full rounded-md"
                            />
                          </span>
                        ) : (
                          <span className="size-14 rounded-md bg-primary grid place-items-center text-xl font-bold text-white">
                            N
                          </span>
                        )}
                        <div className="space-y-3">
                          <p className="text-white font-bold text-base">
                            {notf.title}
                          </p>
                          <p className="text-muted-foreground">
                            {notf.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Product tab */}
              <TabsContent value="products">
                <Card className="bg-[#1c1917] max-h-full">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Products notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-full overflow-y-auto">
                    {productNotifications.map((notf) => (
                      <div className="w-full flex space-x-3">
                        {notf.imageUrl ? (
                          <span className="size-14 rounded-md">
                            <img
                              src={notf.imageUrl}
                              alt="N"
                              className="size-full rounded-md"
                            />
                          </span>
                        ) : (
                          <span className="size-14 rounded-md bg-primary grid place-items-center text-xl font-bold text-white">
                            N
                          </span>
                        )}
                        <div className="space-y-3">
                          <p className="text-white font-bold text-base">
                            {notf.title}
                          </p>
                          <p className="text-muted-foreground">
                            {notf.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders tab */}
              <TabsContent value="orders">
                <Card className="bg-[#1c1917] max-h-full">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Orders notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-full overflow-y-auto">
                    {ordersNotifications.map((notf) => (
                      <div className="w-full flex space-x-3">
                        {notf.imageUrl ? (
                          <span className="size-14 rounded-md">
                            <img
                              src={notf.imageUrl}
                              alt="N"
                              className="size-full rounded-md"
                            />
                          </span>
                        ) : (
                          <span className="size-14 rounded-md bg-primary grid place-items-center text-xl font-bold text-white">
                            N
                          </span>
                        )}
                        <div className="space-y-3">
                          <p className="text-white font-bold text-base">
                            {notf.title}
                          </p>
                          <p className="text-muted-foreground">
                            {notf.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users tab */}
              <TabsContent value="users">
                <Card className="bg-[#1c1917] max-h-full">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Users notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-full overflow-y-auto">
                    {usersNotifications.map((notf) => (
                      <div className="w-full flex space-x-3">
                        {notf.imageUrl ? (
                          <span className="size-14 rounded-md">
                            <img
                              src={notf.imageUrl}
                              alt="N"
                              className="size-full rounded-md"
                            />
                          </span>
                        ) : (
                          <span className="size-14 rounded-md bg-primary grid place-items-center text-xl font-bold text-white">
                            N
                          </span>
                        )}
                        <div className="space-y-3">
                          <p className="text-white font-bold text-base">
                            {notf.title}
                          </p>
                          <p className="text-muted-foreground">
                            {notf.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
