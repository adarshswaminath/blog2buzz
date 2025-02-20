"use client"
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../Components/ui/3d-card"

function Card({ textContent, image,href }) {
    const imageUrlWithoutParams = image.replace(/\width=1000,height=420,fit=cover,gravity=auto,format=auto\//, '/'); 
    return (
        <Link href={`/details/${href}`}>
        <CardContainer className="inter-var w-[24rem]">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[30rem] h-auto min-h-[32rem] rounded-xl p-6 border  ">
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
                    <img
                        src={image ? imageUrlWithoutParams : "/empty.jpg"}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <Link href={`/details/${href}`} className="flex justify-end items-center mt-10">
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Explore More
                    </CardItem>
                </Link>
            </CardBody>
        </CardContainer>
        </Link>
    )
}

export default Card
