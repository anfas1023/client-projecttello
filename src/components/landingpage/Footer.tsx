import React from 'react'

const Footer = () => {
  return (
   <>
<footer className="flex justify-around items-center gap-4 bg-gray-800 py-6 ">
    <div className="flex flex-col justify-center items-center text-white">
        <h6 className="text-xl font-medium">Features</h6>
        <p className="mt-2">To-do List</p>
        <p>Docs</p>
        <p>White Boards</p>
        <p>Chat</p>
    </div>

    <div className="flex flex-col justify-center items-center text-white">
        <h6 className="text-xl font-medium">Learn</h6>
        <p className="mt-2">Blog</p>
        <p>Team Hub</p>
        <p>About</p>
    </div>


    <div className="flex flex-col justify-center items-center text-white">
        <h6 className="text-xl font-medium">Features</h6>
        <p className="mt-2">To-do List</p>
        <p>Docs</p>
        <p>White Boards</p>
        <p>Chat</p>
    </div>


    <div className="flex flex-col justify-center items-center text-white">
        <h6 className="text-xl font-medium">Subscribe to Our New Channel</h6>
        <p>Subscribe to get Our New Updations And Notification</p>
       <div className='flex items-center justify-center'>
       <input type='text'></input>
        <button>Subscribe</button>
        </div>
    </div>
    
</footer>

   </>
  )
}

export default Footer
