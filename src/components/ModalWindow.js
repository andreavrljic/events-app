import { useState } from "react";
import Modal from 'react-modal'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./Header.css"

const ModalWindow = (props) => {
console.log(props)

    const [summary, setSummary] = useState(''); 
    const [date, setDate] = useState(new Date()); 
    const [timeStart, setTimeStart] = useState(); 
    const [timeEnd, setTimeEnd] = useState(); 
    let today = new Date();    

    console.log(summary,"111", date,"111", timeStart,"111", timeEnd)

    return (<form className="formModal">
            <div class="form-group">
                <label>Event name</label>
                <input type="text"                
                placeholder="Input event name"
                value={summary}
                onChange={(e) =>setSummary(e.target.value)}
                />
                <div className="calendar">
                <label>Date:</label>
                    <DatePicker
                        dateFormat={"yyyy/MM/dd"}
                        onChange={(e)=>setDate(e)}
                        minDate={today}
                        selected={date}
                />
                <label>Start time:</label>
                    <DatePicker
                        dateFormat={"hh:mm"}
                        onChange={(e)=>setTimeStart(e)}
                        timeIntervals={30}
                        showTimeSelectOnly
                        showTimeSelect  
                        selected={timeStart}   
                />
                <label>End time:</label>
                    <DatePicker
                        dateFormat={"hh:mm"}
                        onChange={(e)=>setTimeEnd(e)}
                        timeIntervals={30}
                        showTimeSelectOnly
                        showTimeSelect   
                        selected={timeEnd}  
                />
                <button onClick={()=>props.add(summary)}>Save new event</button>
                </div>


            </div>
            </form> 
        )


}
export default ModalWindow;