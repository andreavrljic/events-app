import './Header.css'
import key from '../keys.json'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import ModalWindow from './ModalWindow';
import { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';

const Header =(props)=>{

    const name= {
        "summary":"OnClick"
    }
    let user = {
        name : window.localStorage.getItem("userName"),
        email: window.localStorage.getItem("userEmail")
        };
    
    const [open, setOpen] = useState(false)
  
    const closeModal =()=>{
        setOpen(false)
    }

    return(
    <header className="header">
        <div className='headerContainer'>
            <div>User: {user.name}</div>
            <div>Email: {user.email}</div>
            <div className="buttonGroup">
            <button type="button" className="button" onClick={() => setOpen(true)}> Add New Event</button>
            <GoogleLogout
                    clientId={key.CLIENT_ID}
                    buttonText='LOGOUT'
                    onLogoutSuccess={() => props.logout()}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}
                        className="button"
                        >
                            LOGOUT</button> 
                      )}
            /></div>
            <Modal 
                isOpen={open} 
                ariaHideApp={false}
                centered
                size="lg"
                closeModal={closeModal}
                style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    marginTop: "-50px",
                    marginLeft: "-50px"
                }}
                >
                <ModalWindow add={props.addEvent} close={closeModal}/>
            </Modal>
        </div>
         </header>
    )


}
export default Header;