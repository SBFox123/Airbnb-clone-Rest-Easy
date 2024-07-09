import {Link} from "react-router-dom"
import Header from "../Header"
import { useEffect, useState } from "react"
import axios from "axios"


export default function IndexPage(){
    const [places,setPlaces]=useState([])
    useEffect(()=>{
        axios.get("/places").then(response=>{
           setPlaces(response.data)
        })
    },[])
    return(
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6" >
      {places.length > 0 && places.map(place=>(
        <Link to={'/place/'+place._id}>
           <div className="bg-gray-500 rounded-2xl flex mb-2">
           {place.photos?.[0] && (  
                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/" +place.photos?.[0]} alt=""/>)}

           
           </div>
            <h2 className="text-sm font-bold  leading-4">{place.title}</h2>
            <h3 className="text-sm font-bold text-gray-500 ">{place.address}</h3>
            <h3 className="text-lg font-semibold">${place.price} per night</h3>
        </Link>
      ))}
    </div>
      )
}