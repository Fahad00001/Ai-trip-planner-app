import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/service/firebaseConfig";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/option";
import { chatSession } from "@/service/AIModal";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,

} from "@/components/ui/dialog";
import { setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { stringify } from "postcss";

function CreateTrip() {
  const [place, setplace] = useState();
  const [opendialog, setopendialog] = useState(false);
  const[loading,setloading]=useState(false)
  const [formdata, setformdata] = useState([]);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserprofile(codeResp),
    onError:(error)=>console.log(error)

  })

  const Ongeneratetrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setopendialog(true);
      return;
    }
    if (
      (formdata?.noOfDays > 5 && !formdata?.location) ||
      !formdata?.budget ||
      !formdata?.traveler
    ) {
      toast("Please fill all details");
      return;
    }
    setloading(true)
    // console.log(formdata);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formdata?.location?.label
    )
      .replace("{totalDays}", formdata?.noOfDays)
      .replace("{traveler}", formdata?.traveler)
      .replace("{budget}", formdata?.budget);

 

    const result = await chatSession.sendMessage(FINAL_PROMPT);
  console.log("--",result?.response.text());
  setloading(false)
  
    SaveAiTrip(result?.response?.text())
  };

  const SaveAiTrip=async(TripData)=>{
    setloading(true)
  const user= JSON.parse(localStorage.getItem('user'));
const docId=Date.now().toString()
 
await setDoc(doc(db, "AITrips", docId), {
 userselection:formdata,
 TripData:JSON.parse(TripData),
 userEmail:user?.email,
 id:docId


});
setloading(false)
navigate('/view-trip/'+docId)

  }

  // eslint-disable-next-line no-unused-vars
  const GetUserprofile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
        headers:{

        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
    
    }
}).then((resp)=>{
    console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp.data));
    setopendialog(false);
    Ongeneratetrip()
})

  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setplace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div className="text-xl my-3 font-medium">
          <h2>How many days are you planning your trip?</h2>
          <Input
            placeholder={"EX.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* budget */}
      <div>
        <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 cursor-pointer  border  rounde-lg hover:shadow-lg
                        ${
                          formdata?.budget == item.title &&
                          "shadow-lg border-black"
                        }
                     `}
            >
              <h2 className="text-4xl ">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* travellist */}

      <div>
        <h2 className="text-xl font-medium my-3">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 cursor-pointer  border  rounde-lg hover:shadow-lg
                        ${
                          formdata?.traveler == item.people &&
                          "shadow-lg border-black"
                        }
                     `}
            >
              <h2 className="text-4xl ">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button
        disabled={loading}
         onClick={Ongeneratetrip}>
          {
            loading?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />: "Generate trip"

          }

         
          </Button>
      </div>
      <Dialog open={opendialog}>
      
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription>
          <img src="/logo.svg" alt="" />
          <h2 className="font-bold text-lg mt-7">Sign In with google</h2>
          <p>Sign in to app with google authentication security</p>
          <Button
          
          onClick={login}
           className="w-full mt-5 flex gap-4 items-center">
          <FcGoogle  className="h-7 w-7"/>
            Sign in with google</Button>


            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
// AIzaSyA30mR-d07CLqZpuokQsmcHmQgglozghQU
// AIzaSyCx6F3erJ9kPfH3m9EgI2fGMoxgIvcVX7Q
