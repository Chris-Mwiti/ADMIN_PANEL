import { create } from "zustand";

type TThumbnailsArray = Array<string | ArrayBuffer | null>;
type TThumbnails = string | ArrayBuffer;
type TComponentStates = {
  drawerOpen: boolean;
  carouselImages: string[];
  thumbnails: TThumbnailsArray;
};

type TComnponentActions = {
  actions: {
    openDrawer: () => void;
    closeDrawer: () => void;
    addCarouselImage: (imageUrl: string) => void;
    removeCarouselImage: (imageIndex: number) => void;
    updateThumbnails: (thumbnails: TThumbnailsArray) => void;
    deleteThumbnail: (thumbnail: number) => void;
    removeAllThumbnails: () => void;
  };
};

type TComponent = TComponentStates & TComnponentActions;

const useComponentStore = create<TComponent>((set, get) => ({
  drawerOpen: false,
  carouselImages: [
    "/public/carousel1.jfif",
    "/public/carousel2.jfif",
    "/public/carousel3.jfif",
    "/public/carousel4.jfif",
  ],
  thumbnails: [],
  actions: {
    openDrawer() {
      return set((state) => ({ drawerOpen: true }));
    },
    closeDrawer() {
      return set((state) => ({ drawerOpen: false }));
    },
    addCarouselImage(imageUrl) {
      return set((state) => {
        return {
          ...state,
          carouselImages: [...state.carouselImages, imageUrl],
        };
      });
    },
    removeCarouselImage(imageIndex) {
      const filteredImages = get().carouselImages.filter(
        (_, index) => index !== imageIndex
      );
      return set((state) => ({
        ...state,
        carouselImages: filteredImages,
      }));
    },
    updateThumbnails(thumbnails) {
      set((state) => ({
        ...state,
        thumbnails,
      }));
    },

    deleteThumbnail(index) {
      return set((state) => ({
        ...state,
        thumbnails: state.thumbnails.filter((_,i) => i !== index),
      }));
    },

    removeAllThumbnails() {
      return set((state) => ({
        ...state,
        thumbnails: [],
      }));
    },
  },
}));

export const useDrawerStatus = () =>
  useComponentStore((state) => state.drawerOpen);
export const useCarouseImages = () =>
  useComponentStore((state) => state.carouselImages);
export const useThumbnails = () =>
  useComponentStore((state) => state.thumbnails);
export const useActions = () => useComponentStore((state) => state.actions);
