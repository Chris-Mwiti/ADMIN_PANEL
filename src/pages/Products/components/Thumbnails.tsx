import { useActions } from "@/contexts/component.store";
import { X } from "lucide-react";
import { useState } from "react";

const Thumbnails = ({ index, image }: { index: number, image: string }) => {
  const [isThumbnailDisplayed, setDisplayed] = useState(true);
  const { deleteThumbnail } = useActions();

  const handleClose = () => {
    setDisplayed(false);
    deleteThumbnail(index);
  };
  return (
    <div
      className={`
        size-16 rounded-md border relative
        md:size-14
        lg:size-20
        ${isThumbnailDisplayed ? "block" : "hidden"}    
    `}
      key={index}>
      <img
        src={image}
        alt="selected"
        className="size-full rounded-md"
      />
      <span
        className="size-7 rounded-full bg-black/40 absolute top-2 right-1 flex items-center justify-center hover:bg-black/60 cursor-pointer"
        onClick={handleClose}>
        <X color="#efefef" size={"18px"} />
      </span>
    </div>
  );
};

export default Thumbnails;
