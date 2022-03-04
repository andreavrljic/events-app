
import { useState,useEffect } from "react"
import './EventBlock.css'

const EventBlock  = (props) => {

   let event = props.eventDetails;
   console.log(props.data.events.items)
    const setDate =(date)=>{

        let d = new Date().toISOString();

        var utc = new Intl.DateTimeFormat("en", { 
            timeZone: "Europe/Belgrade",
            minute: "numeric",
            hour: "numeric",
            day: "numeric", 
            month: "long", 
            year:"numeric"
        });
        
        return utc.format(new Date(date));
    }

    return (
        <div className="rowEvent" id={props.id}>
            {/* <div className="summary">{event.summary}</div>
            <div className="startDate"> {setDate(event.start.dateTime)}</div>
            <div className="endDate">{setDate(event.end.dateTime)}</div> */}
        </div>
    )
}

export default EventBlock