import { useState } from "react";
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./Header.css"

const NewEvent = (props) => {

    let today = new Date();
    const [summary, setSummary] = useState('');
    const [timeStart, setTimeStart] = useState(today);
    const [timeEnd, setTimeEnd] = useState(today);

    return (
        <div className="form-group">
            <label className="label">Event name</label>
            <input 
                type="text"
                placeholder="Input event name"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />

        <label className="label">Start:</label>
            <DatePicker
                dateFormat={"dd/MM/yyyy hh:mm"}
                onChange={(e) => setTimeStart(e)}
                timeIntervals={30}
                showTimeInput  
                selected={timeStart}
            />
            <label className="label">End:</label>
            <DatePicker
                dateFormat={"dd/MM/yyyy hh:mm"}
                onChange={(e) => setTimeEnd(e)}
                timeIntervals={30}
                showTimeInput  
                selected={timeEnd}
                minDate={new Date(timeStart)}
            />
           
            <Button className="button save" 
            onClick={() =>props.addEvent({summary, timeStart, timeEnd})}>SAVE</Button>
            {/* <Button className="button save" onClick={() => props.closeAddingEvent()}>CLOSE</Button> */}
        </div>

    )


}
export default NewEvent;