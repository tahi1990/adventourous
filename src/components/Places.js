import React, { PureComponent } from 'react'
// import { List, Image } from 'semantic-ui-react'
import { Image, Item } from 'semantic-ui-react'

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class Places extends PureComponent {

    createPlaces = place => {
        return (
            <Item key={place.id} onClick={() => this.props.getDirection(place.geometry.location.lng, place.geometry.location.lat)}>
                <Item.Image size='tiny' src={place.image} />
                <Item.Content>
                    <Item.Header>{place.name}</Item.Header>
                    <Item.Meta>
                        <div>
                            <div>
                                <span className='address'>Address: {place.vicinity}</span>
                            </div>
                            <div>
                                <span className='rating'>Rating: {place.rating}</span>
                            </div>
                        </div>
                    </Item.Meta>
                    {/* <Item.Description>test</Item.Description> */}
                </Item.Content>
            </Item>
        );
    };

    render() {
        const places = this.props.data;
        
        if(places) {
            places.forEach(place => {
                if(place.photos)
                    place.image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference='
                                    + place.photos[0].photo_reference + '&key='
                                    + GOOGLE_API_KEY;
            
                //place.image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0&sensor=false&key=AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc'
            });
            return (
                <Item.Group>
                    {places.map(this.createPlaces)}
                </Item.Group>

            );
        } else {
            return(
                <div/>
            );
        }
    }


}

export default Places;
