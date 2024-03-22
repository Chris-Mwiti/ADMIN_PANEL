import { create } from 'zustand';
import {persist, createJSONStorage } from 'zustand/middleware';import { TProductDetails } from '../components/ProductDetailsForm';
import productData from './productData';
import { TProductFormSchema } from '../schemas/product.schema';
;

interface IProductStore {
    products:TProductFormSchema[],
    actions:{
        addProduct: (values:TProductFormSchema) => void,
        findProduct: (id:string) => TProductFormSchema | null | undefined,
    }
}

const useProductStore = create<IProductStore>((set,get) => ({
    products: productData,
    actions: {
        addProduct(values) {
            set((state) => ({
                ...state,
                products: [...get().products,values]
            }))
        },
        findProduct(id) {
            return get().products.find(product => product.id == id);
        },
    }
}))

const persistedState = JSON.parse(localStorage.getItem("products")) as IProductStore;
const store = useProductStore.getState();
if(persistedState){
    useProductStore.setState(persistedState);
}else {
    localStorage.setItem("products", JSON.stringify(store));
}

useProductStore.subscribe(state => {
    localStorage.setItem("products", JSON.stringify(state))
})


const useProducts = () => useProductStore(state => state.products);
const useProductActions = () => useProductStore(state => state.actions);

export default useProductStore
export {
    useProducts,
    useProductActions
}
