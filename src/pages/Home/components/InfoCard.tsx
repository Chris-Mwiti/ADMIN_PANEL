import { LucideIcon, ShoppingBag } from "lucide-react"

interface IInfoCardProps {
    icon: React.ReactComponentElement<LucideIcon>;
    title: string;
    bgColor: string;
    textColor:string;
    data:string;
}

export const InfoCard = (props: IInfoCardProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center space-y-3
        w-full h-[250px] border rounded-lg
        md:h-[200px]
        bg-[#${props.bgColor}]
        xl:w-[250px]
    
      `}>
      <span className="block">{props.icon}</span>
      <div
        className="
            flex flex-col space-y-2
        ">
        <p
          className={`
            text-bold text-center text-5xl text-[#${props.textColor}]
        `}>
          {props.data}
        </p>
        <p
          className={`
            text-center text-[#${props.textColor}]
        `}>
          {props.title}
        </p>
      </div>
    </div>
  );
}
