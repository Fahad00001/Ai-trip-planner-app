/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import { useState } from 'react';
// const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


// eslint-disable-next-line react/prop-types
// const [photoUrl,setPhotoUrl]=useState();
function Infosection({trip}) {
  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    GetPlacePhoto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[trip])
  const GetPlacePhoto= async()=>{
    const data={
      textQuery:trip?.userselection?.location?.label
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
      <img src={photoUrl?photoUrl:"https://wallpaperaccess.com/full/5932023.jpg"} className='h-[340px] w-full object-cover rounded-xl' alt="" />
      <div className='flex justify-between items-center'>
      <div className='my-5  flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userselection?.location?.label}</h2>
        <div className='flex gap-5'>
            <h2 className=' p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs  md:text-md'> 📅{trip.userselection?.noOfDays}Day </h2>
            <h2 className=' p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs  md:text-md'> 💰{trip.userselection?.budget}Budget</h2>
            <h2 className=' p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs  md:text-md'>🥂 No Of Traveller: {trip.userselection?.traveler}</h2>
        </div>
      </div>
      <Button><FaShareAlt /></Button>
      </div>
    </div>
  )
}

export default Infosection
