import { FaArrowDown } from "react-icons/fa6"

function Hero() {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="/hero.svg" className="lg:max-w-md rounded-lg " />
        <div>
          <h1 className="text-5xl font-bold max-w-2xl">Discover, Share, Engage: Blog2Buzz Makes it Effortless! </h1>
          <p className="py-6">The ultimate tool for seamlessly transforming trending blog posts into captivating tweets.</p>
          <div className="flex flex-wrap space-x-5">
            <a href="#explore">
              <button className="btn bg-white text-black hover:text-white px-12 rounded-full">Explore <FaArrowDown className="text-" /></button>
            </a>
            <a href="https://www.producthunt.com/posts/blog2buzz?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-blog2buzz" target="_blank">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=455352&theme=dark"
                alt="blog2buzz - Automating&#0032;Blog&#0032;Discovery&#0032;and&#0032;AI&#0032;Summarization&#0032; | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250" height="54" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero