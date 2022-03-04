import EventBlock from './EventBlock'
import { useState, useEffect } from 'react';

const EventsList  = (props) => {

    const removeFromCalendar= (eventId) =>{

         props.deleteEvent(eventId);
    }


    const createDataList = (ele) => {
        return ele.items?.map((element) =>{ return  <EventBlock eventDetails={element} key={element.id} deleteEvent={removeFromCalendar}/> })
    }

    return (
        <div className="tableContainer">
        {createDataList(props.events)}
        </div>
    )
}

export default EventsList