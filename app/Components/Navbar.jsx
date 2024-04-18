import Link from "next/link"
import { FaGithub } from "react-icons/fa";

function Navbar() {
    return (
        <nav className='navbar p-3 flex items-center justify-between text-white'>
            <div className="flex items-center gap-6">
                <h3 className='text-2xl font-bold'>Blog2Buzz</h3>
                <div className="flex space-x-6 lg:space-x-12">
                    <Link href="/">Home</Link>
                    <Link href="/#tags">Tags</Link>
                    <Link href="/saved">Saved</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar