import { differenceInCalendarDays, format } from "date-fns";

export default function BookingDates({booking}){
    return (
       <div>
         <div className="py-2 pr-3 grow">
         <h2 className="text-xl py-2 pr-3 grow">{booking.place.title}</h2>
                            <div>
                            {format(new Date(booking.checkIn),"yyyy-MM-dd")} to {format(new Date(booking.checkOut),"yyyy-MM-dd")}
                            </div>
                        </div>
                        <div className="mt-5 pr-3" >
                           
                            Total Price: ${booking.price} <br />
                            Number of Days: {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}
                        </div>
       </div>
    )
}