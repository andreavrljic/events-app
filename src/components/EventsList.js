// import EventBlock from './EventBlock'
// import React, {Component, useState, useEffect } from 'react';

// class EventsList extends Component{

//    constructor(props){
//        super(props);
//        this.state ={
//            eventData:[]
//        }
//    }

//    componentWillMount() {
//        console.log(props)
//    }

//     // const createDataList = () => {
//     //     console.log(s, s.length)
//     //     return s.map((element) =>{ return  <EventBlock eventDetails={element} /> })
//     // }
// render{
//     return (
//     <div > {
//     console.log(props)}
//     {createDataList()}
//     <EventBlock />    
//     </div>
// )}
    
// }

// export default EventsList



import EventBlock from './EventBlock'
import { useState, useEffect } from 'react';

const EventsList  = (props) => {
    const [s, setS]= useState(props.events.items)
    
    useEffect(()=> {
        console.log("annn",s)

    },)


    const createDataList = (ele) => {
        
        return ele.events.items?.map((element,index) =>{ return  <EventBlock eventDetails={element} id={index}/> })
    }

    return (
        <div className="tableContainer">
        {/* {createDataList(props)}   */}
        <EventBlock data={props}/>
        </div>
    )
}

export default EventsList