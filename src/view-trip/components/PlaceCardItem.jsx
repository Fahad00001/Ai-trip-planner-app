/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { IoLocationSharp } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import { useState,useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';


function PlaceCardItem({place}) {
  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    GetPlacePhoto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[place])
  const GetPlacePhoto= async()=>{
    const data={
      textQuery:place.placename
    }
    // eslint-disable-next-line no-unused-vars
    const result= await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name,)
      setPhotoUrl(PhotoUrl);
      
      

    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placename} target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:"https://wallpaperaccess.com/full/5932023.jpg"} className=' object-cover w-[130px] h-[130px]  rounded-xl' alt="" />
      <div>
     
        <h2 className='font-bold tetx-lg'>{place.placename}</h2>
        <p className='text-sm  text-gray-400'>{place.placedetails}</p>
        <h2 className='mt-2'>🕙{place.timetravel}</h2>
       <Button size="sm" className="mt-3"><IoLocationSharp /> </Button>
        
      </div>
    </div>
    </Link>

  )
}

export default PlaceCardItem
