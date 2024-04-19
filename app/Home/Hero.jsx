import { FaArrowDown } from "react-icons/fa6"

function Hero() {
  return (
    <div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="/hero.svg" className="lg:max-w-md rounded-lg " />
    <div>
      <h1 className="text-5xl font-bold max-w-2xl">Discover, Share, Engage: Blog2Buzz Makes it Effortless! </h1>
      <p className="py-6">The ultimate tool for seamlessly transforming trending blog posts into captivating tweets.</p>
     <a href="#explore">
     <button className="btn bg-white text-black hover:text-white px-12 rounded-full">Explore <FaArrowDown className="text-"/></button>
     </a>
    </div>
  </div>
</div>
  )
}

export default Hero