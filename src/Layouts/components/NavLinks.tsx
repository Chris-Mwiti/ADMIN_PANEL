import {
  Boxes,
  Home,
  HomeIcon,
  LogIn,
  ReceiptText,
  ShoppingCart,
  Users,
} from "lucide-react";
import NavLinkItem from "./NavLink";
import MobileNavLinks from "./MobileNavLinks";

interface INavLinksProps {
  isResizable: boolean;
  children?: React.ReactNode;
  isWidthAdjusted: boolean;
}

interface IDesktopNavLinksProps {
  isWidthAdjusted: boolean;
}

const DesktopNavLinks = (props: IDesktopNavLinksProps) => {
  return (
    <nav className="w-full min-h-screen  flex flex-col space-y-3 py-3">
      <p className="text-primary font-logo text-center text-4xl rubik-glitch-regular">
        MADRIGAL
      </p>
      <ul className="w-full list-none flex flex-col space-y-7 px-3 py-4">
        <NavLinkItem urlPath="/" icon={HomeIcon} title="Home" />
        <NavLinkItem
          urlPath="/users"
          icon={Users}
          title="Users"
          subUrlLinks={["create", "edit"]}
        />
        <NavLinkItem
          urlPath="/products"
          icon={Boxes}
          title="Products"
          subUrlLinks={["list"]}
        />
        <NavLinkItem urlPath="/orders" icon={ShoppingCart} title="Order" subUrlLinks={["myOrders",""]} />
        <NavLinkItem
          urlPath="/invoices"
          icon={ReceiptText}
          title="Invoices"
          subUrlLinks={["create"]}
        />
        <NavLinkItem urlPath="/register" icon={LogIn} title="Login" />
      </ul>
    </nav>
  );
};

export const NavLinks = (props: INavLinksProps) => {
  if (props.isResizable) {
    return <DesktopNavLinks isWidthAdjusted={props.isWidthAdjusted} />;
  }
  return (
    <nav className="w-full min-h-full  flex flex-col space-y-3">
      <ul className="w-full list-none flex flex-col space-y-4 px-3 py-4 divide-y">
        <MobileNavLinks urlPath="/" icon={Home} title="Home" />
        <MobileNavLinks
          urlPath="users"
          subUrlLinks={["/create", "/list"]}
          icon={Users}
          title="Users"
        />
        <MobileNavLinks urlPath="orders" icon={ShoppingCart} title="Orders" />
        <MobileNavLinks
          urlPath="products"
          subUrlLinks={["/list"]}
          icon={Boxes}
          title="Products"
        />
        <MobileNavLinks
          urlPath="invoices"
          icon={ReceiptText}
          title="Invoices"
          subUrlLinks={["/create"]}
        />
        <MobileNavLinks 
          urlPath="register"
          icon={LogIn}
          title="Login"
        />
      </ul>
    </nav>
  );
};
