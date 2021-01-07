import PlacesAutocomplete, 
    {geocodeByAddress, 
    getLatLng} from '../../node_modules/react-places-autocomplete/dist/index';
import React from '../../node_modules/react/index'
import ReactDOM from '../../node_modules/react-dom/index'
import axios from '../../node_modules/axios/index'

function Notification({me, ty}){
    
    const [message, setMessage] = React.useState(me)
    const [type, setType] = React.useState(ty)
    const [display, setDisplay] = React.useState('')

    const close=()=>{       
        setDisplay('display-none')     
    }

    return(
        <div className={`notification ${type} m-4 ${display}`}>
        <button className="delete" onClick={()=>close()}></button>
            {message}
        </div>
    )
}

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '', 
            coordinates: '', 
            category: '', 
            details: '',
            notification: ''
        };
      }

    handleSubmit=()=>{
        axios.post('/api/datapoints/', {
            name: this.state.address,
            coordinates: this.state.coordinates,
            category: this.state.category
        }).then(res=>{
            console.log(res)
            this.setState({notification: <Notification ty='is-success' me={res.statusText}  />})
            setTimeout(()=>{
                this.setState({notification: '' })    
            }, 5000)
                    

        }).catch(e=>{
            console.log(e)
            this.setState({notification: <Notification ty='is-danger' me={e.message}  />})
            setTimeout(()=>{
                this.setState({notification: ''})
            }, 5000)
            
        })
    }

    handleSelectCategory=(value)=>{
        console.log(value.target.value)
        this.setState({category: value.target.value})
    }

    setText=(value)=>{
        console.log(value.target.value)
        this.setState({details: value.target.value})
    }
    
    handleChange =(address)=>{
        this.setState({ address });
    };
    
    handleSelect=(address)=>{
        
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                this.setState({address: results[0].formatted_address})
                return getLatLng(results[0])
                
            })
            .then(latLng => {console.log('Success', latLng); this.setState({coordinates: latLng});})
            .catch(error => console.error('Error', error));
      };
    

    render() {
        return (
            <div id="form" className="p-4 container is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
                {this.state.notification}
                <p class="is-size-4">Report a crime</p>
                <div className="field">
                    <div className="field-label is-normal">
                        <label className="label is-orange">Location</label>
                    </div>
                    {/*  */}
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
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
                                onChange={(value)=>this.handleSelectCategory(value)}
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
                            onChange={(value)=>this.setText(value)}
                        ></textarea>
                    </div>
                </div>

                <a className="button is-rounded btn-banner mt-6" onClick={()=>this.handleSubmit()}>
                    submit
                </a> 
            </div>
        )
    }
}

ReactDOM.render(<Form />, document.getElementById('mydiv'))
