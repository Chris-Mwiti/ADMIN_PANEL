import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TProductDetails } from "../components/ProductDetailsForm";
import productData from "./productData";
import { TProductFormSchema } from "../schemas/product.schema";
import TUser from "@/pages/Users/schemas/users.schema";

export interface ICartItems {
  quantity: number;
  productId: string;
  price: string;
  assetImage: string;
  productName: string;
}

interface IProductStore {
  products: TProductFormSchema[];
  cartItems: ICartItems[];
  actions: {
    addProduct: (values: TProductFormSchema) => void;
    findProduct: (id: string) => TProductFormSchema | null | undefined;
    addToCart: (item: ICartItems) => void;
    removeFromCart: (itemIndex: number) => void;
    removeAllFromCart: () => void;
  };
}

const useProductStore = create<IProductStore>((set, get) => ({
  products: productData,
  cartItems: [],
  actions: {
    addProduct(values) {
      set((state) => ({
        ...state,
        products: [...get().products, values],
      }));
    },
    findProduct(id) {
      return get().products.find((product) => product.id == id);
    },
    addToCart(item) {
      return set((state) => ({
        ...state,
        cartItems: [...get().cartItems, item],
      }));
    },
    removeFromCart(itemIndex) {
      const filteredItems = get().cartItems.filter(
        (item, index) => index != itemIndex
      );
      return set((state) => ({
        ...state,
        cartItems: filteredItems,
      }));
    },
    removeAllFromCart() {
        return set((state) => ({
            ...state,
            cartItems: []
        }))
    },
  },
}));

const useProducts = () => useProductStore((state) => state.products);
const useCartItems = () => useProductStore((state) => state.cartItems);
const useProductActions = () => useProductStore((state) => state.actions);

export default useProductStore;
export { useCartItems, useProducts, useProductActions };
