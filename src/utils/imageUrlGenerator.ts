import cloudinaryConfig from "@/config/clooudinary";
import { scale } from "@cloudinary/url-gen/actions/resize";

const handleImageTransformation = (publicId: string) => {
  const image = cloudinaryConfig.image(publicId);
  image.resize(scale().width(56).height(56));
  return image.toURL();
};

export default handleImageTransformation


