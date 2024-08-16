/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {

    const [photoUrl,setPhotoUrl]=useState();

    useEffect(()=>{
      GetPlacePhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[hotel])
    const GetPlacePhoto= async()=>{
      const data={
        textQuery:hotel?.hotelname
      }
      // eslint-disable-next-line no-unused-vars
      const result= await GetPlaceDetails(data).then(resp=>{
        console.log(resp.data.places[0].photos[3].name);
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name,)
        setPhotoUrl(PhotoUrl);
        
        
  
      })
    }
  return (


    <div>
     
      <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelname + ','+ hotel?.hoteladdress} target="_blank">
                <div  className="hover:scale-105 cursor-pointer transition-all">
                    <img src={photoUrl?photoUrl:"https://wallpaperaccess.com/full/5932023.jpg"}alt="" className='rounded-xl h-[180px] w-full object-cover'/>
                    <div className="my-3 flex flex-col gap-2">
                        <h2 className="font-medium">{hotel?.hotelname}</h2>
                        <h2 className="text-xs text-gray-500">📍 {hotel?.hoteladdress}</h2>
                        <h2 className="text-sm">💰{hotel?.price}</h2>
                        <h2 className="text-sm">⭐{hotel?.rating}</h2>
                    </div>
                </div>
                </Link>
    </div>
  )
}

export default HotelCardItem
