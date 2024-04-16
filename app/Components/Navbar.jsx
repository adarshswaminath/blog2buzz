import Link from "next/link"
import { FaGithub } from "react-icons/fa";

function Navbar() {
    return (
        <nav className='navbar p-3 flex items-center justify-between'>
            <div className="flex items-center gap-6">
                <h3 className='text-2xl font-bold'>Blog2Tweet</h3>
                <div className="flex space-x-12">
                    <Link href="/">Home</Link>
                    <Link href="/">Tags</Link>
                    <Link href="/">Saved</Link>
                </div>
            </div>
            {/* //? logo */}
            <div>
                    <a href="#" className="btn rounded-full text-white flex items-center">
                        Follow On <FaGithub className="text-2xl"/>
                    </a>
                </div>
        </nav>
    )
}

export default Navbar