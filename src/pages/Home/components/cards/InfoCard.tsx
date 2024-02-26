import { LucideIcon, ShoppingBag } from "lucide-react"

interface IInfoCardProps {
    icon: React.ReactComponentElement<LucideIcon>;
    title: string;
    bgColor: string;
    textColor:string;
    data:string;
}

const bgColors: { [key: string]: string } = {
  d6f7fa: "bg-[#d6f7fa]",
  e8dcf9: "bg-[#e8dcf9]",
  fff5dd: "bg-[#fff5dd]",
  ffe8e0: "bg-[#ffe8e0]",
};

const textColors: { [key: string]: string } = {
  "003768": "text-[#003768]",
  "7e6dad": "text-[#7e6dad]",
  ab8248: "text-[#ab8248]",
  "963740": "text-[#963740]",
};

export const InfoCard = (props: IInfoCardProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center space-y-3
        w-full h-[250px] border rounded-lg
        md:h-[200px]
        ${bgColors[props.bgColor]}
        xl:w-[250px]
    
      `}>
      <span className="block">{props.icon}</span>
      <div
        className="
            flex flex-col space-y-2
        ">
        <p
          className={`
            text-bold text-center text-5xl ${textColors[props.textColor]}
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
