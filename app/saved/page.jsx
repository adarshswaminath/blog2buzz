
import Loading from '../Components/Loading';
import Image from 'next/image';
import { BackgroundGradient } from '../Components/ui/background-gradient';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { deleteBlog } from '../server-actions/deleteBlog';
import { BsFillTrash3Fill } from "react-icons/bs";


export default async function Page() {

  const cookieStore = cookies()
  const supabase = createServerComponentClient({cookies: () => cookieStore})
  const {data: {session}} = await supabase.auth.getSession()
  const user = session?.user
  const {data: blog2buzz,error} = await supabase.from("blog2buzz")
    .select("*")
    .eq('user_id',user.id)
    // .order('id',{ascending: true})

    console.log(blog2buzz)
  if(error){
    console.log("error fetching blogs",error)
  }
  
 
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-between p-3 px-12">
        <h2 className='text-center lg:text-4xl text-3xl font-bold text-white mb-4'><span className='text-gray'>#</span>Your Bucket List</h2>

        <form action="/auth/signout" method='POST'>
          <button className='px-12 py-2 bg-background rounded-xl text-white font-bold hover:bg-gradient-to-br hover:from-purple hover:to-white'>Sign Out</button>
        </form>
      </div>
      <div className='flex flex-wrap gap-2 justify-center items-center mt-6'>
        {(blog2buzz.length != 0) ?
         (
          <p>No save data</p>
         )
        :blog2buzz.map((data, index) => (
          <BackgroundGradient key={index} className="rounded-[22px] min-h-96 max-w-sm p-4 sm:p-10 bg-background">
            <Image
              src={data.image_url}
              alt="jordans"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 ">
              {data.title}
            </p>

            <p className="text-sm text-white">
              {data.body}...
            </p>
            <div className="flex items-center justify-between mt-3">
              <a href={`https://dev.to/${data.url}`} target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-2 text-base rounded-full bg-black text-white">
                  <span>Read full Article</span>
                </button>
              </a>
              {/* button to delete */}
              <form action={deleteBlog}>
                <input type="hidden" name="id" value={data.id} />
                <button 
                className='btn bg-black hover:bg-black hover:text-red px-6 py-2 rounded-full hover:rounded-lg  font-bold text-white'>
                  Delete <BsFillTrash3Fill/>
                </button>
              </form>
            </div>
          </BackgroundGradient>
        ))}
      </div>

    </main>
  );
}
