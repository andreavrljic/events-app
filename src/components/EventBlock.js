
import { useState } from "react"
import './EventBlock.css'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus} from "@fortawesome/free-regular-svg-icons";

const EventBlock  = (props) => {

    let event = props.eventDetails;

    const getTime = (date) => {
        if(!date){
            return "No time"
        }
        return (new Date(date).toLocaleTimeString("hr", {
            hour: "2-digit",
            minute: "2-digit"
        }));
    }

    const getDate =(date)=>{
        if(!date){
            return "No date"
        }
        let d = new Date().toISOString();

        var utc = new Intl.DateTimeFormat("en", { 
            timeZone: "Europe/Belgrade",
            day: "numeric", 
            month: "long", 
            year:"numeric"
        });
        
        return utc.format(new Date(date));
    }

    return (
        <div className="rowEvent" id={props.id}>
            <div className="summary">{event.summary}</div>
            <div className="startDate">{getDate(event.start.dateTime, event.summary)}</div>
            <div className="startTime">Start: {getTime(event.start.dateTime)}</div>
            <div className="endTime">End: {getTime(event.end.dateTime)}</div>
            <FontAwesomeIcon className ="deleteIcon" icon={faCalendarMinus} onClick={() => props.deleteEvent(event.id)} />

        </div>
    )
}

export default EventBlock