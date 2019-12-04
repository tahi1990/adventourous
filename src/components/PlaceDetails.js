import React, { PureComponent } from 'react'
import { Container, Header, Image } from 'semantic-ui-react'

class PlaceDetails extends PureComponent {

    render() {
        const data = this.props.data;
        const image = this.props.image;

        return(
            <Container>
                <Image src={image} fluid />
                <Header as='h3'>{data.name}</Header>
            </Container>
        );
    }

}

export default PlaceDetails
