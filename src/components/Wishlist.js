import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, List, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';
import {userService} from '../services';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';


class Wishlist extends PureComponent{
    state = {
        mounted: false
    }

    constructor(props){
        super(props)

        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        })

        this.loadWishlist()
    }

    loadWishlist = () => {
        userService.getUser(this.state.user).then((data) => {
            let results = data.wishlist

            if(results){
                if(results.length > 4)
                results = results.slice(results.length - 4)
                
                return results.map((result, index) => {
                    result.imageURL = GOOGLE_PLACE_PHOTO_REQ
                                    + result.image + '&key='
                                    + GOOGLE_API_KEY;
                    
                    let img = result.imageURL ? result.imageURL : placeholder;
                    return(
                        <Grid.Column key={index}>
                            <Image src={img} size='medium' wrapped/>
                            <span><Header as='h3'>{result.name}</Header></span>
                            <span>{result.address}</span>
                        </Grid.Column>
                    )
                })
            }

        })
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default Wishlist