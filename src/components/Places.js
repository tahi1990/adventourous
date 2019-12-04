import React, { PureComponent } from 'react'
// import { List, Image } from 'semantic-ui-react'
import { Item, Rating } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class Places extends PureComponent {

    createPlaces = place => {
        let img = place.image ? place.image : placeholder;

        return (
            <Item key={place.id} onClick={() => {
                this.props.getPlace(place.place_id);
                if(place.photos && place.photos.length > 0) {
                    this.props.getPlacePhoto(place.photos[0].photo_reference);
                }
                this.props.getDirection(place.geometry.location.lng, place.geometry.location.lat);
            }}>
                <Item.Image size='tiny' src={img} />
                <Item.Content>
                    <Item.Header>{place.name}</Item.Header>
                    <Item.Meta>{place.vicinity}</Item.Meta>
                    {/*<Item.Description>Address: {place.vicinity}</Item.Description>*/}
                    <Item.Extra>
                        <Rating maxRating={5} defaultRating={parseInt(place.rating)} icon='star' size='mini'/>({place.rating})
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
                    place.image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference='
                                    + place.photos[0].photo_reference + '&key='
                                    + GOOGLE_API_KEY;
            
                //place.image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0&sensor=false&key=AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc'
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
