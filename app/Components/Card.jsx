import Image from "next/image";

function Card({ textContent, image }) {
    const imageUrlWithoutParams = image.replace(/\width=1000,height=420,fit=cover,gravity=auto,format=auto\//, '/');
    return (
        <div className="h-72 w-72 p-2">
            <Image
                height={400}
                width={200}
                src={imageUrlWithoutParams}
                alt="Image not found"
                className="h-60  w-60 object-cover rounded-[24px]" />
            <h2 className="text-white font-bold">{textContent.slice(0, 64)}...</h2>
        </div>
    )
}

export default Card