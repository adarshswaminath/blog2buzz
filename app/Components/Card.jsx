function Card({textContent,image}) {
  return (
    <div className="card card-side bg-base-100 w-full shadow-xl lg:flex items-center p-2 grid">
      {image && <img src={image} className="rounded h-full w-72 object-contain" alt="Banne Image"/>}
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="px-12 py-2 bg-white text-black rounded-lg">Get It</button>
    </div>
  </div>
</div>
  )
}

export default Card