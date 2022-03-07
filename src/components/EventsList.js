import EventBlock from './EventBlock'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import NewEvent from './NewEvent';
import './EventsList.css'

const EventsList = (props) => {

    let currentWeekNumber = require('current-week-number');
    let uniqueDays;
    let uniqueWeeks;

    const removeFromCalendar = (eventId) => {

        props.deleteEvent(eventId);
    }

    const createDataList = (elementList) => {
        let currentList = elementList.items;
        if (props.defaultDays !== 30) {

            uniqueDays = [...new Set(currentList?.map(item => new Date(item.start.dateTime).toLocaleDateString()))]

            return uniqueDays.map((day) => {
                return <div key={day}>
                    <h3 className="tableLabel">{new Date(day).toLocaleDateString("de-DE")}</h3>
                    {currentList?.map(element => {
                        if (new Date(element.start.dateTime).toLocaleDateString() === day)
                            return <EventBlock eventDetails={element} key={element.id} deleteEvent={removeFromCalendar} />

                    })}
                </div>
            })
        } else {


            uniqueWeeks = [...new Set(currentList?.map(item => currentWeekNumber(new Date(item.start.dateTime))))]

            return uniqueWeeks.map((week) => {
                return <div key={week}>
                    <h3 className="tableLabel">Week no.{week}</h3>
                    {currentList?.map(element => {
                        if (currentWeekNumber(new Date(element.start.dateTime)) === week)
                            return <EventBlock eventDetails={element} key={element.id} deleteEvent={removeFromCalendar} />
                    })}
                </div>

            })
        }

    }

    return (
        <div className="tableContainer">
            <NewEvent addEvent={(eventInfo) => props.addEvent(eventInfo)} />
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button className="buttonSmall" onClick={() => { props.listOfEvents(1) }}>1</Button>
                <Button className="buttonSmall" onClick={() => { props.listOfEvents(7) }}>7</Button>
                <Button className="buttonSmall" onClick={() => { props.listOfEvents(30) }}>30</Button>
            </ButtonGroup>
            <div className='tableList'>
                {createDataList(props.events)}
            </div>

        </div>
    )
}

export default EventsList