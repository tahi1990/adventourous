import React, { PureComponent } from 'react'
import { Item, Rating } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class Places extends PureComponent {

    createPlaces = place => {
        let img = place.image ? place.image : placeholder;

        return (
            <Item key={place.id} onClick={() => {
                this.props.getPlace(place.place_id);
                this.props.getDirection(place.geometry.location.lng, place.geometry.location.lat, 'driving');
            }}>
                <Item.Image size='tiny' src={img} />
                <Item.Content>
                    <Item.Header>{place.name}</Item.Header>
                    <Item.Meta>{place.vicinity}</Item.Meta>
                    {/*<Item.Description>Address: {place.vicinity}</Item.Description>*/}
                    <Item.Extra>
                        <Rating disabled maxRating={5} defaultRating={parseInt(place.rating)} icon='star' size='mini'/>({place.rating})
                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    };

    render() {
        const places = this.props.data;
        
        if(places) {
            places.forEach(place => {
                if(place.photos)
                    place.image = GOOGLE_PLACE_PHOTO_REQ
                                    + place.photos[0].photo_reference + '&key='
                                    + GOOGLE_API_KEY;
            });
            return (
                <Item.Group divided>
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
