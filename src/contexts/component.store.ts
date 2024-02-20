import { create } from 'zustand';

type TThumbnailsArray = Array<string | ArrayBuffer | null>;
type TThumbnails = string | ArrayBuffer ;
type TComponentStates = {
    drawerOpen:boolean;
    carouselImages:string[];
    thumbnails:TThumbnailsArray;
}

type TComnponentActions = {
    actions:{
        openDrawer: () => void;
        closeDrawer: () => void;
        addCarouselImage: (imageUrl:string) => void;
        removeCarouselImage: (imageIndex:number) => void;
        updateThumbnails: (thumbnails:TThumbnailsArray) => boolean;
        deleteThumbnail: (thumbnail:TThumbnails) => void;
    }
}

type TComponent = TComponentStates & TComnponentActions;

const useComponentStore = create<TComponent>((set,get) => ({
    drawerOpen: false,
    carouselImages:[
        "/public/carousel1.jfif",
        "/public/carousel2.jfif",
        "/public/carousel3.jfif",
        "/public/carousel4.jfif"
    ],
    thumbnails: [],
    actions:{
        openDrawer() {
            return set(state => ({drawerOpen: true}))
        },
        closeDrawer() {
            return set(state => ({drawerOpen: false}))
        },
        addCarouselImage(imageUrl) {
            return set(state => {
                return {
                    ...state,
                    carouselImages:[...state.carouselImages,imageUrl]
                }
            })
        },
        removeCarouselImage(imageIndex) {
            const filteredImages = get().carouselImages.filter((_,index) => index !== imageIndex);
            return set(state => ({
                ...state,
                carouselImages:filteredImages
            }))
        },
        updateThumbnails(thumbnails) {
            const currentThumbnails = get().thumbnails;
            set(state => ({
                ...state,
                thumbnails: thumbnails
            }))
            const updatedThumbanails = get().thumbnails;
            if(currentThumbnails !== updatedThumbanails) return true;
            return false;
        },

        deleteThumbnail(thumbnail) {
            const updatedThumbnails = get().thumbnails.filter(image => image !== thumbnail);
            set((state) => ({
                ...state,
                thumbnails: updatedThumbnails
            }))
        },
    }
}))

export const useDrawerStatus = () => useComponentStore(state => state.drawerOpen);
export const useCarouseImages = () => useComponentStore(state => state.carouselImages);
export const useThumbnails = () => useComponentStore(state => state.thumbnails);
export const useActions = () => useComponentStore(state => state.actions);
