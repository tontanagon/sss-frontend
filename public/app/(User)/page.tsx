import ImagePlaceHoder from "@/ui/frontend/user/home-page/inc/image-placehoder";
import CategorySelector from "@/ui/frontend/user/home-page/category-selector";
import ItemList from "@/ui/frontend/user/home-page/item-list";
import BannerCarousel from "@/ui/frontend/user/home-page/banner-carousel";
import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";

export const metadata: Metadata = {
  title: `หน้าแรก - ${metaConstants.title}`,
};


export default function Home() {
  return (
    <div className="container mx-auto min-h-screen px-4">
      {/* <ImagePlaceHoder /> */}
      <BannerCarousel /> 
      <CategorySelector />
      <ItemList/>
    </div>
  );
}
