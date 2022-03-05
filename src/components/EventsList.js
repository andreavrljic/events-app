import EventBlock from './EventBlock'
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import NewEvent from './NewEvent';
import Label from 'react-bootstrap/FormLabel'
import './EventsList.css'

const EventsList = (props) => {

    const removeFromCalendar = (eventId) => {

        props.deleteEvent(eventId);
    }

    const createDataList = (elementList) => {
        console.log(elementList.items)
        return elementList.items?.map((element) => { return <EventBlock eventDetails={element} key={element.id} deleteEvent={removeFromCalendar} /> })
    }

    return (
        <div className="tableContainer">
            <NewEvent addEvent={(eventInfo)=>props.addEvent(eventInfo)} />
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Label>Select</Label>
                <Button className="button" onClick ={() => {props.listOfEvents(1)}}>1</Button>
                <Button className="button" onClick ={() => {props.listOfEvents(7)}}>7</Button>
                <Button className="button" onClick ={() => {props.listOfEvents(30)}}>30</Button>
            </ButtonGroup>
            <div className='tableList'>
                <div>Datum</div>
                {createDataList(props.events)}
            </div>
            
        </div>
    )
}

export default EventsList