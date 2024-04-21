import Link from 'next/link'
import Loading from '../Components/Loading'

function Tags() {
  const tags = ["#3d", "#ai", "#android", "#aws", "#beginners", "#career", "#css", "#database", "#datascience", "#devops", "#discuss", "#djnago", "#frontend", "#html", "#java", "#javascript", "#learning", "#linux", "#machinelearning", "#news", "#nextjs", "#node", "#opensource", "#php", "#productivity", "#programming", "#react", "#security", "#testing", "#tutorial", "#typescript", "#webdev"];
  return (
    <div className='mt-12' id="tags">
      <h2 className="text-xl text-white text-center font-bold mb-4">Blog Categories</h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {tags ? (
          tags.map((data,index) => (
            <Link 
              className='btn w-auto rounded-full hover:bg-purple hover:text-white' 
              key={index} 
              href={`/tags/${data.slice(1)}`}>{data}</Link>
          ))
        ) : <Loading/>}
        </div>
    </div>
  )
}

export default Tags