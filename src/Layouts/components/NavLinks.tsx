import {
  Boxes,
  Contact2,
  Home,
  HomeIcon,
  Kanban,
  ReceiptText,
  ShoppingCart,
  Users,
} from "lucide-react";
import NavLink from "./NavLink";
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
    <nav className="w-full min-h-screen  flex flex-col space-y-3">
      <ul className="w-full list-none flex flex-col space-y-7 px-3 py-4">
        <NavLink urlPath="/" icon={HomeIcon} title="Home" />
        <NavLink urlPath="/users" icon={Users} title="Users" subUrlLinks={["create", "edit"]} />
        <NavLink
          urlPath="/products"
          icon={Boxes}
          title="Products"
          subUrlLinks={["/create", "list"]}
        />
        <NavLink urlPath="/orders" icon={ShoppingCart} title="Order"  />
        <NavLink urlPath="/invoices" icon={ReceiptText} title="Invoices" subUrlLinks={["create"]} />
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
          subUrlLinks={["/create", "/list"]}
          icon={Boxes}
          title="Products"
        />
        <MobileNavLinks
          urlPath="invoices"
          icon={ReceiptText}
          title="Invoices"
          subUrlLinks={["/create"]}
        />
      </ul>
    </nav>
  );
};
