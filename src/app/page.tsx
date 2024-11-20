import Featured from "@/components/Featured";
import Menu from "@/components/Menu";
import Offer from "@/components/Offer";
import Special from "@/components/Special";
import Image from "next/image";
import CategoryPage from "./menu/[category]/page";
import MenuPage from "./menu/page";
import HomeMenu from "@/components/HomeMenu";

export default function Home() {
  return (
    <main>
      <Special/> 
      <HomeMenu/>
      {/* <Offer/> */}
    </main>
  )
}
