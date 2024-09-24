import React from 'react'

const Footer = () => {
  return (
   <><footer className="flex flex-wrap justify-around items-start gap-8 bg-gray-800 py-6">
   <div className="flex flex-col justify-center items-center text-white space-y-2">
     <h6 className="text-xl font-medium">Features</h6>
     <p className="mt-2">To-do List</p>
     <p>Docs</p>
     <p>White Boards</p>
     <p>Chat</p>
   </div>
 
   <div className="flex flex-col justify-center items-center text-white space-y-2">
     <h6 className="text-xl font-medium">Learn</h6>
     <p className="mt-2">Blog</p>
     <p>Team Hub</p>
     <p>About</p>
   </div>
 
   <div className="flex flex-col justify-center items-center text-white space-y-2">
     <h6 className="text-xl font-medium">Resources</h6>
     <p className="mt-2">API Documentation</p>
     <p>Help Center</p>
     <p>Contact Support</p>
   </div>
 
   <div className="flex flex-col justify-center items-center text-white space-y-4">
     <h6 className="text-xl font-medium text-center">Subscribe to Our Newsletter</h6>
     <p className="text-center">Subscribe to get updates and notifications</p>
     <div className="flex items-center justify-center gap-2">
       <input
         type="text"
         placeholder="Enter your email"
         className="py-2 px-3 rounded-md text-black"
       />
       <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
         Subscribe
       </button>
     </div>
   </div>
 
   {/* Underline and copyright section */}
   <div className="w-full mt-6">
     <hr className="border-t border-gray-500 mb-4" />
     <div className="text-center text-white text-sm lg:text-base">
       © 2024 Work-Way. All rights reserved.
     </div>
   </div>
 </footer>
 
   </>
  )
}

export default Footer
