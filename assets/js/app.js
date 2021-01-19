import ReactDOM from 'react-dom';
import React from 'react';

import Form from './form';
import Report from './reports';
import SearchPlaces from './search-places';

import {store} from './actions';


try{
    ReactDOM.render(
    <Form store={store}/>, 
     document.getElementById('mydiv'));
}catch(e){
    // 
}

try{
    ReactDOM.render( 
    <Report store={store}/>,
    document.getElementById("reports")
    );
}catch(e){
    // 
}

try{
    ReactDOM.render(
        <SearchPlaces store={store}/>, 
        document.getElementById("search-places")
        );
}catch(e){
    // 
}







