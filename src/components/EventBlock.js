
import { useState } from "react"
import './EventBlock.css'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus} from "@fortawesome/free-regular-svg-icons";

const EventBlock  = (props) => {

   let event = props.eventDetails;
//    const [a,setA] = useState(props.data)

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
            {console.log(event.start.dateTime)}
            <div className="summary">{event.summary}</div>
            <div className="startDate"> {setDate(event.start.dateTime)}</div>
            <div className="endDate">{setDate(event.end.dateTime)}</div>
            <FontAwesomeIcon className ="deleteIcon" icon={faCalendarMinus} onClick={() => props.deleteEvent(event.id)} />

        </div>
    )
}

export default EventBlock