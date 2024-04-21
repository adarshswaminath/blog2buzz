import About from "./About";
import Explore from "./Explore";
import Hero from "./Hero";
import Tags from "./Tags";

export default function Home() {
  return (
    <main className="p-2 lg:p-4">
        <div className="p-2 lg:p-5 rounded-[24px] bg-background min-h-screen">
          <Hero/>
          <About/>
          <Explore/>
          <Tags/>
        </div>
    </main>
  )
}
