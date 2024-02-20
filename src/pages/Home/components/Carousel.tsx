import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCarouseImages } from "@/contexts/component.store"

export const CarouselComponent = () => {
    const carouselImage = useCarouseImages();
  return (
    <Carousel className="w-full max-w-xs">
        <CarouselContent>
            {
                carouselImage.map((url,index) => (
                    <CarouselItem key={index} className="pl-1">
                        <Card>
                            <CardContent
                                className="w-[800px] h-[400px] p-0"
                            >
                                <img src={url} alt={`Carousel ${index + 1}`} className="w-full h-full object-cover " />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
    </Carousel>
  )

}

export const HomeIllustratorCarousel = () => {
    const carouselImages = useCarouseImages()
    return (
        <div
            className="
                w-full h-max
                sm:w-max
            "
        >
            <img src={carouselImages[1]} alt="illustrator-alt" className="w-full xl:w-[500px] md:w-[700px] h-[400px] object-cover  rounded-md" />
        </div>
    )
}
