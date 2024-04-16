import Explore from "./Explore";
import Hero from "./Hero";
import Tags from "./Tags";

export default function Home() {
  return (
    <main className="p-2 lg:p-4">
        <div className="p-3 lg:p-5 rounded-[24px] bg-background min-h-screen">
          <Hero/>
          <Explore/>
          <Tags/>
        </div>
    </main>
  )
}
