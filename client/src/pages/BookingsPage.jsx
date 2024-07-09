import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage(){
    const [bookings,setBookings]=useState([])
    useEffect(()=>{
            axios.get('/bookings').then(response=>{
                setBookings(response.data)
            })
    },[])
    return(
        
        <div>
            <AccountNav/>
            <div>
                {bookings?.length>0 && bookings.map(booking=>(
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                        <div className="w-56 mb-2">
                       
                            <PlaceImg place={booking.place}/>
                        </div>
                        <BookingDates booking={booking} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

