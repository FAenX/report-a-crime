import React from 'react';
import axios from 'axios';
import SearchPlaces from './search-places';
// import {submit} from './api';

// console.log(submit);



  



function Notification({me, ty}){
    
    const [message, setMessage] = React.useState(me);
    const [type, setType] = React.useState(ty);
    const [display, setDisplay] = React.useState('');

    const close=()=>{       
        setDisplay('display-none');     
    };

    return(
        <div className={`notification ${type} m-4 ${display}`}>
        <button className="delete" onClick={()=>close()}></button>
            {message}
        </div>
    );
}

export default function Form({store}) {
    
    const [notification, setNotification] = React.useState('');

    function handleSubmit (){ 
        axios.post('/api/datapoints/', {            
            name: store.getState().name,
            details: store.getState().details,
            coordinates: store.getState().coordinates,
            category: store.getState().category             
        }).then(res=>{
            // console.log(res.status);
            
            setNotification(<Notification ty='is-success' me={res.statusText}  />);
            setTimeout(()=>{
                setNotification('' );    
            }, 2000);
            axios.get('/api/datapoints/').then(res=>console.log(res)).catch(e=>console.log(e));

        }).catch(e=>{
            // console.log(e);
            setNotification(
               <Notification ty='is-danger' me={e.message}  />
            );
            setTimeout(()=>{
                setNotification('');
            }, 2000);
            
        });
    };

    function handleSelectCategory(value){
        store.dispatch({ type: 'SETCATEGORY', category:  value.target.value});
    };

    function setDetails (value){
        store.dispatch({ type: 'SETDETAILS', details:  value.target.value});   
    };
   
    return (
        <div id="form" className="p-4 container is-flex 
        is-flex-direction-column is-justify-content-center is-align-content-center">
            {notification}
            <p className="is-size-4">Report a crime</p>
            <div className="field">
                <div className="field-label is-normal">
                    <label className="label">Location</label>
                </div>
                {/*  */}
                <SearchPlaces store={store}/>
                
            {/*  */}
            </div>

            <div className="field">
                <div className="field-label is-normal">
                    <label className="label is-orange">Category</label>
                </div>
                <div className="control is-flex">
                    <div className="select is-primary">
                        <select 
                            style={{color: '#FFFF00'}} 
                            className='my-input' 
                            onChange={handleSelectCategory}
                        >
                            <option value="">Select dropdown</option>
                            <option value="Theft">Theft</option>
                            <option value="Burglary">Burglary</option>
                            <option value="Assault">Assault</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <div className="field-label is-normal">
                    <label className="label">Details</label>
                </div>
                <div className="control">
                    <textarea 
                        className="textarea is-primary my-input" 
                        style={{color: '#FFFF00'}} 
                        placeholder="Primary textarea"
                        onChange={setDetails}
                    ></textarea>
                </div>
            </div>

            <a className="button is-rounded btn-banner mt-6" onClick={({submit})=>handleSubmit(submit)}>
                submit
            </a> 
        </div>
    );
    
};


