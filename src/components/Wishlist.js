import React, { PureComponent } from 'react'
import { Card, List, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';


class Wishlist extends PureComponent{
    state = {
        mounted: false
    };

    loadWishlist = (wishlist) => {

        let image = '';
        if(wishlist.image) {
            image = GOOGLE_PLACE_PHOTO_REQ
                    + wishlist.image + '&key='
                    + GOOGLE_API_KEY;
        } else {
            image = placeholder;
        }

        return (
            <List.Item key={wishlist.place}>
                <List.Content>
                    <Image src={image} fluid/>
                    <List.Header as='h3'>{wishlist.name}</List.Header>
                    <List.Description>{wishlist.address}</List.Description>
                </List.Content>
            </List.Item>
        )
    };

    render(){
        const user = JSON.parse(localStorage.getItem('user'));
        const wishlist = user.wishlist.slice(0,2);

        return(
            <Card>
                <Card.Content>
                    <Card.Header>Your wishlist</Card.Header>
                    <List>
                        {wishlist.map(this.loadWishlist)}
                    </List>
                </Card.Content>
            </Card>
        )
    }
}

export default Wishlist
