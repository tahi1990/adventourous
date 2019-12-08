import React, { PureComponent } from 'react'
import { Card, Grid, Header, List, Container, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';
import {userService} from '../services';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';


class Wishlist extends PureComponent{
    state = {
        mounted: false
    };

    constructor(props){
        super(props);
        // this.loadWishlist()
    }

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
            <List.Item>
                <List.Content>
                    <Image src={image} fluid/>
                    <List.Header as='h3'>{wishlist.name}</List.Header>
                    <List.Description>{wishlist.address}</List.Description>
                </List.Content>
            </List.Item>
        )
        // const image =
        // const user = JSON.parse(localStorage.getItem('user'));
        //
        // userService.getUser(user.id).then((data) => {
        //     console.log(data);
        //     let results = data.wishlist;
        //
        //     if(results) {
        //         if(results.length > 2)
        //         results = results.slice(results.length - 2);
        //
        //         return results.map((result, index) => {
        //             result.imageURL = GOOGLE_PLACE_PHOTO_REQ
        //                             + result.image + '&key='
        //                             + GOOGLE_API_KEY;
        //
        //             let img = result.imageURL ? result.imageURL : placeholder;
        //             return(
        //                 <Grid.Column key={index}>
        //                     <Image src={img} size='medium' wrapped/>
        //                     <span><Header as='h3'>{result.name}</Header></span>
        //                     <span>{result.address}</span>
        //                 </Grid.Column>
        //             )
        //         })
        //     }
        //
        // })
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
