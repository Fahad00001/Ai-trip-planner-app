import { doc,getDoc } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import Infosection from '../components/infosection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';


function Viewtrip() {
    const {tripId}=useParams();
    const[trip,setTrip]=useState([])
    useEffect(()=>{

       tripId && GetTripData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tripId])

    
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Dodocument:",docSnap.data());
            setTrip(docSnap.data())
            
        }
        else{
            console.log('No such document');
            toast('No trip found')
            
        }
    }
  return (
    <div className=' p-10 md:px-10 lg:px-44 xl:px-56'>
      <h1>
        {/* information section */}
        <Infosection trip={trip}/>

        {/* recommmeded hoitels */}
        <Hotels trip={trip}/>


        {/* daily plans */}
        <PlacesToVisit trip={trip}/>

        {/* footer */}

        <Footer trip={trip}/>
        </h1>
    </div>
  )
}

export default Viewtrip
