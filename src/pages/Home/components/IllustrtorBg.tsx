import { useCarouseImages } from "@/contexts/component.store"
import { useUserInfo } from "@/contexts/data.store";

const IllustrtorBg = () => {

  const carouselImages = useCarouseImages();
  const { username } = useUserInfo();
  return (
     <div
      className="
        w-full h-max relative
      "
     >
      <img src="/public/illustratorImage2.jfif" alt="illustratorImage-alt" className="w-full h-[300px] sm:object-cover rounded-lg"/>
      <div
        className="
          absolute z-10 flex flex-col items-start
          space-y-5
          top-2 translate-x-1/2 right-1/2
          md:items-center
        "      
      >
        <p
          className="
            text-blueRibbon-600 text-wrap font-bold text-3xl
          "
        >
          {`Welcome back ${username}`}
        </p>
      </div>
     </div>
  )
}

export default IllustrtorBg