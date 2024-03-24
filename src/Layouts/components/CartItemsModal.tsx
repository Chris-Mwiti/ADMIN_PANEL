import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import cloudinaryConfig from "@/config/clooudinary";
import useCreateOrder, {
  IOrder,
} from "@/pages/Orders/components/services/createOrder";
import {
  useCartItems,
  useProductActions,
} from "@/pages/Products/data/data.store";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Loader, ShoppingBasket } from "lucide-react";

const CartItemsModal = () => {
  const cartItems = useCartItems();
  const { removeFromCart, removeAllFromCart } = useProductActions();
  const { mutate, isPending } = useCreateOrder();
  const handleImageTransformation = (publicId: string) => {
    const image = cloudinaryConfig.image(publicId);
    image.resize(scale().width(56).height(56));
    return image.toURL();
  };

  const findTotalPrice = () => {
    return cartItems.reduce((accum, curr) => {
      return (accum += curr.quantity * parseInt(curr.price));
    }, 0);
  };

  const checkOut = () => {
    const orderInfo = {
      total: findTotalPrice(),
      items: cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };
    mutate(orderInfo as IOrder, {
        onSuccess(data, variables, context) {
            removeAllFromCart()
        },
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="relative size-max">
          <ShoppingBasket className="group-hover:stroke-[#1c1917] stroke-white" />
          <span className="size-5 rounded-full absolute -top-2 left-4 text-foreground bg-red-500 flex items-center justify-center">
            {cartItems.length}
          </span>
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="bg-[#1c1917] p-4 rounded-md z-600 w-[300px] min-h-4"
        align="end"
        alignOffset={20}>
        <div className="w-full p-2 space-y-5">
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <div className="flex space-x-3" key={item.productId}>
              <span className="size-16 rounded-md">
                <img
                  src={handleImageTransformation(item.assetImage)}
                  alt="CT"
                  className="size-full rounded-md"
                  loading="lazy"
                />
              </span>
              <div className="space-y-1">
                <p className="text-white font-medium">{item.productName}</p>
                <p className="text-white font-bold">
                  Quantity: {item.quantity}
                </p>
                <p className="text-white font-bold text-lg">
                  Total:{" "}
                  <span className="text-primary font-bold">
                    sh {item.quantity * parseInt(item.price)}
                  </span>
                </p>
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(index)}
                  className="w-full">
                  Remove
                </Button>
              </div>
            </div>
          )) : (<p className="text-white font-bold">No Items</p>)}
          <Button
            onClick={checkOut}
            className={`w-full ${
              cartItems.length >= 1 ? "visible" : "invisible"
            }`}
            disabled={isPending}>
            {isPending ? (
              <span className="flex item-center">
                <Loader className="animate-spin mr-3" /> Checking out...
              </span>
            ) : (
              "CHECKOUT"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartItemsModal;
