import { TProductFormSchema } from "@/pages/Products/schemas/product.schema";
import { TCategory } from "../schemas/category.schema";
import { TDiscount } from "../schemas/discounts.schema";

const productData: TProductFormSchema[] = [
  {
    id: "PRODUCT-1234",
    productName: "Superloaf Bread",
    productDescription: "Super loaf is on sale",
    productImages: [
      "https://cdnprod.mafretailproxy.com/sys-master-root/h1b/h63/12681389899806/82689_main.jpg_480Wx480H",
      "https://cdnprod.mafretailproxy.com/sys-master-root/h10/h4e/12681389244446/74584_main.jpg_480Wx480H",
      "https://th.bing.com/th/id/R.ee444789c9be4e14aa9d4b585cd6463f?rik=tuEqCDB5E38gZw&riu=http%3a%2f%2fwww.supaloaf.co.ug%2fwp-content%2fuploads%2f2021%2f12%2fmibisco-supa_loaf-mini-bakeries-kenya-uganda-tanzania-east_africa-mombasa-nairobi-kingsmil-bread-festive-bread-mini_group-fayaz_bakery-best-mkate-kenyan-slices_of_life-39-1170x1170.jpg&ehk=FinL%2fGzzb5TTn2NbePWkBDjhw9xdqYieAzVHMVkyBwc%3d&risl=&pid=ImgRaw&r=0",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "PRODUCT-WER1",
    productName: "Festive bread",
    productDescription: "Festive bread is on sale",
    productImages: [
      "https://th.bing.com/th/id/OIP.s4X7t8ERR2ECAF6Hhrw3GgHaHa?rs=1&pid=ImgDetMain",
      "https://cdnprod.mafretailproxy.com/sys-master-root/h15/h3a/17290375692318/124822_main.jpg_480Wx480H",
      "https://cdnprod.mafretailproxy.com/sys-master-root/h98/h64/28763174273054/25920_main.jpg_480Wx480H",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: false,
  },
  {
    id: "PRODUCT-1124",
    productName: "Broadways",
    productDescription: "Broadways bread is on sale",
    productImages: [
      "https://th.bing.com/th/id/OIP.2VN9VgV_npiEtEuBZU59LgHaHa?rs=1&pid=ImgDetMain",
      "https://cdnprod.mafretailproxy.com/sys-master-root/hfa/hd5/12461841743902/5_Main.jpg_480Wx480H",
      "https://cdnprod.mafretailproxy.com/sys-master-root/h13/h7a/27631903080478/7_main.jpg_480Wx480H",
    ],
    category: {
      categoryName: "Food",
    },
    productSku: "123456",
    productCode: "M1234",
    buyingPrice: "300",
    sellingPrice: "400",
    stockStatus: "IN STOCK",
    published: true,
    inventory: {
      quantity: "40",
    },
    createdAt: new Date(),
    isPerishable: true,
  },
];

const addProduct = (product: TProductFormSchema) => productData.push(product);
const findProduct = (id: string) =>
  productData.find((product) => product.id == id);
const categories: TCategory[] = [
  {
    id: "CATEGORY_123",
    categoryName: "White Bread",
    categoryDescription: "Food on sale",
  },
  {
    id: "CATEGORY_124",
    categoryName: "Brown bread",
    categoryDescription: "Food on sale",
  },
];

const discountIds: TDiscount[] = [
  {
    id: "DISCOUNT_WERT",
    coupon: "ADCER",
  },
  {
    id: "DISCOUNT_ERTY",
    coupon: "ASDER",
  },
  {
    id: "DISCOUNT_FERT",
    coupon: "REFDE",
  },
];

const addCategory = (categoryDto: TCategory) => categories.push(categoryDto);

export { addProduct, addCategory, categories, findProduct, discountIds };

export default productData;
