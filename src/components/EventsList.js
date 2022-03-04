import EventBlock from './EventBlock'
import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const EventsList  = (props) => {

    const removeFromCalendar= (eventId) =>{

         props.deleteEvent(eventId);
    }


    const createDataList = (ele) => {
        return ele.items?.map((element) =>{ return  <EventBlock eventDetails={element} key={element.id} deleteEvent={removeFromCalendar}/> })
    }

    return (
        <div className="tableContainer">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
        {createDataList(props.events)}
        </div>
    )
}

export default EventsList