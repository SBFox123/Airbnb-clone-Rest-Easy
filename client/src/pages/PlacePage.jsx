import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    const {id}=useParams();
    const [place,setPlace]=useState(null)
    
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data)
        })
    },[id])

    if(!place) return '';

        return(
        <div className="mt-5 pt-4 bg-gray-100 -m-8 px-8 py-8">
            
                
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place}/>
               
                <div className="mt-8 gap-8 grid grid-cols-2 md:grid-cols-[2fr_1fr]">
                        <div>
                        <h2 className="mt-4 text-3xl underline font-semibold">Description</h2>
                <div className="mt-2 ">
                    {place.description}
                </div>
                            Check-in: {place.checkIn} <br />
                            Check-Out: {place.checkOut} <br />
                            Max-Guests:{place.maxGuests} 
                            
                        </div>
                        <div>
                           <BookingWidget place={place}/>
                           
                        </div>
                        
                </div>
                     <div className="bg-white -mx-8 px-8 py-4 rounded-2xl">
                     <div className="text-gray-600 mt-4">
                        <h2 className="text-xl underline font-semibold">Extra Info</h2>
                        <div className="mb-4 mt-2 text-md leading-5">{place.extraInfo}</div>
                    </div>
                     </div>
                </div>
    )
}