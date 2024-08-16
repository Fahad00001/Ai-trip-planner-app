/* eslint-disable react/prop-types */
// import React from 'react'

// import { Link } from "react-router-dom"
import HotelCardItem from "./HotelCardItem"


// eslint-disable-next-line react/prop-types
function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendtaion</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">   
           {trip?.TripData?.hotels?.map((hotel,index)=>(
                // eslint-disable-next-line react/jsx-key
                // <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelname + ','+ hotel?.hoteladdress} target="_blank">
                // <div key={index} className="hover:scale-105 cursor-pointer transition-all">
                //     <img src="https://wallpaperaccess.com/full/5932023.jpg" alt="" className='rounded-xl'/>
                //     <div className="my-3 flex flex-col gap-2">
                //         <h2 className="font-medium">{hotel?.hotelname}</h2>
                //         <h2 className="text-xs text-gray-500">📍 {hotel?.hoteladdress}</h2>
                //         <h2 className="text-sm">💰{hotel?.price}</h2>
                //         <h2 className="text-sm">⭐{hotel?.rating}</h2>
                //     </div>
                // </div>
                // </Link>
                <HotelCardItem hotel={hotel}/>
                
            ))}
      </div>
    </div>
  )
}

export default Hotels
