import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export function PlacesFormPage(){
    const {id}=useParams();
    const [title,setTitle]=useState("");
    const [address,setAddress]=useState("")
    const [description,setDescription]=useState("")
    const [addedPhotos,setAddedPhotos]=useState([])
     const [perks,setPerks]=useState([])
    const [extraInfo,setExtraInfo]=useState("")
    const [checkIn,setCheckIn]=useState("")
    const [checkOut,setCheckOut]=useState("")
    const [maxGuests,setMaxGuests]=useState(1)
    const [price,setPrice]=useState(100)
    const [redirect,setRedirect]=useState(false)
    useEffect( ()=>{
        if(!id){
            return;
        }
        axios.get("/places/"+id).then(response=>{
            const {data}=response
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
            setAddedPhotos(data.photos)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)

        })
    },[id])

    function inputHeader(text){
        return <h2 className="text-2xl font-bold mt-4">{text}</h2>
 
     }
     function inputDescription(text){
        return <p className="text-gray-500 text-md">{text}</p>
 
     }
 
     function preInput(header,description){
         return (
             <>
                 {inputHeader(header)}
                 {inputDescription(description)}
             </>
         )
     }
 
 
     async function savePlace(event){
         event.preventDefault();
         const placeData={
            title,address,description,
                addedPhotos,perks,extraInfo,
                checkIn,checkOut,maxGuests,price
         }
         if(id){
            //update
            await axios.put("/places",{
                id, ...placeData
            })
               setRedirect(true)
         }
         else{
            //newp place
            await axios.post("/places", placeData)
               setRedirect(true)
         }
         
     }
    
     if(redirect){
        return <Navigate to={'/account/places'} />
     }
     return(
        <div>
            <AccountNav/>
                    <form onSubmit={savePlace}>
                        {preInput("Title","Title of Your Place. Do keep it short")}
                        
                        <input type="text" 
                        value={title} 
                        onChange={event=>setTitle(event.target.value)} 
                        placeholder="title, for example:My lovely apt" />
                        
                        {preInput("Address","Address of your place")}
                        <input type="text" 
                        value={address} 
                        onChange={event=>setAddress(event.target.value)} 
                        placeholder="address" />
                        
                        {preInput("Photos","The More....The Better")}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                       
                        {preInput("Description","Description of the Place")}
                        <textarea 
                        value={description} 
                        onChange={event=>setDescription(event.target.value)}/>
                        
                        {preInput("Perks","What facilities doe your place provide?")}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-2">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        
                        {preInput("Extra Info","Some Special Qualities about your Place ")}
                        <textarea 
                        value={extraInfo}
                        onChange={event=>setExtraInfo(event.target.value)}/>
                        
                        {preInput("Check-In & Check-Out","Add Check-In and Check-Out times and Maximum Number of Guests"
                            
                        )}
                        <div className="grid sm:grid-cols-2 md:grid-cols-4  gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check-In Time</h3>
                                <input type="text" 
                                value={checkIn}
                                onChange={event=>setCheckIn(event.target.value)} 
                                placeholder="14" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check-Out Time</h3>
                                <input type="text" 
                                value={checkOut}
                                onChange={event=>setCheckOut(event.target.value)} 
                                placeholder="21"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Maximum Guests </h3>
                                <input type="number" 
                                value={maxGuests}
                                onChange={event=>setMaxGuests(event.target.value)} 
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night </h3>
                                <input type="number" 
                                value={price}
                                onChange={event=>setPrice(event.target.value)} 
                                />
                            </div>
                            
                        </div>
                        
                        <button className="bg-red-500 px-2 py-2 rounded-full text-white w-full mt-4 ">Save</button>
                        
                    </form>
                </div>
    )
}