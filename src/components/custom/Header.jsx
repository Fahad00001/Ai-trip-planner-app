import { useEffect,useState } from 'react'
import { Button } from '../ui/button' 
import { Popover,PopoverContent,PopoverTrigger } from '@radix-ui/react-popover'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
// import { useNavigation } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,

} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const user=JSON.parse(localStorage.getItem('user'))
  const [opendialog, setopendialog] = useState(false);
  // const navigation=useNavigation();
  useEffect(()=>{
    console.log(user);
    
  })
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserprofile(codeResp),
    onError:(error)=>console.log(error)

  })
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
    // Ongeneratetrip()
    window.location.reload();
})

  }
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-3'>
        <img src="/logo.svg" alt="" />
        <div>
          {user?
          <div className='flex items-center gap-3'>
              <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trip'>
            <Button variant="outline" className="rounded-full"> My Trips</Button>
            </a>

    
        
            <Popover>
  <PopoverTrigger>
  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full ' alt="" />
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='cursor-pointer mt-5 font-medium animate-accordion-down shadow-sm  hover:text-orange-400' onClick={()=>{
      googleLogout();
      localStorage.clear();
      window.location.reload();
      

    }}>Logout</h2>
  </PopoverContent>
</Popover>
      
    
          </div>
          :
          <Button onClick={()=>setopendialog(true)}>Sign In</Button>
          }
           
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
  )
}

export default Header
