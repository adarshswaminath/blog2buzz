import Image from "next/image";

function Card({ textContent, image }) {
    const imageUrlWithoutParams = image.replace(/\width=1000,height=420,fit=cover,gravity=auto,format=auto\//, '/');
    return (


        <div className="w-72 border border-gray-200 rounded-lg shadow h-[24rem]">
            <a href="#">
                <img className="w-full rounded-t-lg h-44" src={imageUrlWithoutParams} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                        {textContent.slice(0, 64)}...
                    </h5>
                </a>
                <div className="">
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg focus:ring-4 focus:outline-none ">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                </div>
            </div>
        </div>

    )
}

export default Card