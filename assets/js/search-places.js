import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';


export default function SearchPlaces({store}){
    const [address, setAddr] = React.useState('');

    function handleChange (value){
        store.dispatch({ type: 'SETNAME', name:  value});
        setAddr(value);
    };

    function handleSelect(address){

        geocodeByAddress(address)
            .then(results => {
                store.dispatch({ type: 'SETNAME', name:  results[0].formatted_address});
                setAddr(results[0].formatted_address);
                return getLatLng(results[0]);

            })
            .then(latLng =>{
                store.dispatch({
                    type: 'SETCOORDS',
                    coordinates: {type: 'Point', coordinates: [latLng.lng, latLng.lat]}
                });
            })
            .catch(error =>
                console.error('Error', error));
      };

    return (
        <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                    <div
                        {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        })}
                        key={Math.random()}
                    >
                        <span>{suggestion.description}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>

    );

};


