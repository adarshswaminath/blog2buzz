import Hero from "./Hero";

export default function Home() {
  return (
    <main className="p-2 lg:p-4">
        <div className="p-3 lg:p-5 rounded-[24px] bg-background min-h-screen">
          <Hero/>
        </div>
    </main>
  )
}
