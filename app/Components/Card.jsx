"use client"
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../Components/ui/3d-card"

function Card({ textContent, image }) {
    const imageUrlWithoutParams = image.replace(/\width=1000,height=420,fit=cover,gravity=auto,format=auto\//, '/');
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {textContent}
                </CardItem>
                {/* //! this card item is with opacity zero if it remove card structure got broke */}
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 opacity-0"
                >
                    Hover over this card to unleash the power of CSS perspective
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src={imageUrlWithoutParams}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-end items-center mt-10">
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        View More
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>

        // <div className="w-72 border border-gray-200 rounded-lg shadow h-[24rem]">
        //     <a href="#">
        //         <Image
        //             height={420}
        //             width={1000}
        //             className="w-full rounded-t-lg h-44" 
        //             src={imageUrlWithoutParams} alt="Image Not Found" />
        //     </a>
        //     <div className="p-5">
        //         <a href="#">
        //             <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
        //                 {textContent.slice(0, 64)}...
        //             </h5>
        //         </a>
        //         <div className="">
        //             <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg focus:ring-4 focus:outline-none ">
        //                 Read more
        //                 <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        //                 </svg>
        //             </a>
        //         </div>
        //     </div>
        // </div>

    )
}

export default Card