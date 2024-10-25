import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Special from "@/components/Special";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Special/> 
      <Featured/>
      <Offer/>
    </main>
  )
}
