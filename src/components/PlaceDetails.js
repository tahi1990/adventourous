import React, { PureComponent } from 'react'
import {Container, Header, Image, Item, Rating} from 'semantic-ui-react'

class PlaceDetails extends PureComponent {

    render() {
        const data = this.props.data;
        const image = this.props.image;

        let price_level = '';
        for(let i = 0; i < data.price_level; i++) {
            price_level += '€';
        }

        return(
            <Container>
                <Image src={image} fluid />
                <Header as='h3'>{data.name}</Header>
                <p>{data.formatted_address}</p>
                {data.rating} - <Rating maxRating={5} defaultRating={parseInt(data.rating)} icon='star' size='mini' disabled/> ({data.user_ratings_total}) · {price_level}
            </Container>
        );
    }

}

export default PlaceDetails
