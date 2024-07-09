import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { UserContext } from "./UserContext"
 
export default function BookingWidget({place}){
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [numberOfGuests,setNumberOfGuests]=useState(1)
    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [redirect,setRedirect]=useState('')
    const {user}=useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfDays=0
    if(checkIn && checkOut){
        numberOfDays=differenceInCalendarDays(new Date (checkOut),new Date(checkIn))
    }
   
   
  async  function bookThisPlace(){

   const response= await axios.post("/bookings", {checkIn,checkOut,numberOfGuests,
        name,phone,
        place:place._id,
        price:numberOfDays*place.price
    })
    const bookingId=response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
}
   if(redirect){
    return <Navigate to={redirect} />
   }
   
   


    return (
        <div className="bg-white p-1 rounded-2xl shadow shadow-black   ">
        <div className="text-center font-bold text-xl">
        Price: ${place.price} / night <br />
        </div>
       <div className="border rounded-2xl  pr-4 ">
            <div className="flex">
            <div className="  py-3 px-1 ">
            <label>Check-In:</label>
            <input type="date" 
            value={checkIn} 
            onChange={event=>setCheckIn(event.target.value)} />
        </div>
        <div className="  py-3 px-1 border-l">
            <label>Check-Out:</label>
            <input type="date" 
            value={checkOut} 
            onChange={event=>setCheckOut(event.target.value)} />
        </div>
        
         </div>
         <div className="  py-3 px-1 border-t">
            <label>Max-Guests:</label>
            <input type="number" 
            value={numberOfGuests} 
            onChange={event=>setNumberOfGuests(event.target.value)} />
        </div>
        {numberOfDays>0 &&(
            <div className="  py-3 px-1 border-t">
            <label>Full Name</label>
            <input type="text" 
            value={name} 
            onChange={event=>setName(event.target.value)} />

            <label>Mobile No.</label>
            <input type="tel" 
            value={phone} 
            onChange={event=>setPhone(event.target.value)} />
        </div>
        
        
        )}
       </div>
      

        <button onClick={bookThisPlace} className="bg-red-500 text-white rounded-2xl mx-10 px-10 py-2 mt-2 mb-2">
            Book&nbsp;this&nbsp;Place <br />
           {numberOfDays>0 && (
                    <span>${numberOfDays*place.price*numberOfGuests}</span>
           )}
            </button>
        
        
    </div>
    )
}