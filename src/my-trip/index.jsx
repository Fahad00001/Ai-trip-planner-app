/* eslint-disable no-undef */
import { collection, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

// import { Query } from 'firebase/firestore'
import { db } from "@/service/firebaseConfig";
import { getDocs } from "firebase/firestore";
// import UserTripCard from './Component/UserTripCard'
import UserTripCardItem from "./Component/UserTripCardItem";

function MyTrip() {
  const navigation = useNavigation();
  const [userTrips, setuserTrips] = useState([]);
  useEffect(() => {
    GetUserTrip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    

    if (!user) {
      navigation("/");
      return;
    }
    setuserTrips([]);
    const q = query(
      collection(db, "AITrip"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
      setuserTrips (prevVal=>[...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div>
        {userTrips.map((trip,index) => (
          <div key={index}>
            <UserTripCardItem trip={trip}  />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrip;
