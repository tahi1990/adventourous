import React, { PureComponent } from 'react'
import {Container, Header, Image, Item, Rating, Divider, List, Button, Icon, Accordion} from 'semantic-ui-react'
import { Form } from 'tabler-react'

const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class PlaceDetails extends PureComponent {

    state = {
        active: true
    };

    handleClick = () => {
        this.setState({
            active: !this.state.active
        })
    };

    createIntrucstions = (instruction, index) => {
        return (
            <List.Item key={index}>
                {/*<List.Icon name='github' size='large' verticalAlign='middle' />*/}
                <List.Content>
                    <List.Header>{instruction.maneuver.instruction}</List.Header>
                    <List.Description>{instruction.distance + 'm'}</List.Description>
                </List.Content>
            </List.Item>
        );
    };

    render() {
        const data = this.props.data;
        const direction = this.props.direction ? this.props.direction : null;
        const steps  = this.props.direction && this.props.direction.length > 0 ? this.props.direction[0].steps : [];

        let price_level = '';
        for(let i = 0; i < data.price_level; i++) {
            price_level += '€';
        }

        let image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
            + data.photos[0].photo_reference + '&key='
            + GOOGLE_API_KEY;

        const {active} = this.state;

        return(
            <Container>
                <Button.Group basic icon fluid>
                    <Button active basic color='red'>
                        <Icon name='car' color='red'/>
                    </Button>
                    <Button basic color='green'>
                        <Icon name='bicycle' color='green' />
                    </Button>
                    <Button basic color='blue'>
                        <Icon name='male' color='blue' />
                    </Button>
                </Button.Group>
                { direction && (
                    <Accordion>
                        <Accordion.Title active={active} onClick={this.handleClick}>
                            <Icon name='dropdown' />Driving - {direction[0].duration} ({direction[0].distance + 'm'})
                        </Accordion.Title>
                        <Accordion.Content active={active}>
                            <List divided relaxed>
                                { steps.map((step, index) => this.createIntrucstions(step, index)) }
                            </List>
                        </Accordion.Content>
                    </Accordion>
                )}

                <Divider/>

                <Image src={image} fluid />
                <Header as='h3'>{data.name}</Header>
                {data.rating} - <Rating maxRating={5} defaultRating={parseInt(data.rating)} icon='star' size='mini' disabled/> ({data.user_ratings_total}) · {price_level}

                <Divider />

                <List>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>{data.formatted_address}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='phone' />
                        <List.Content>
                            <a href={'tel:' + data.international_phone_number}>{data.international_phone_number}</a>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='linkify' />
                        <List.Content>
                            <a target='_blank' href={data.website}>{data.website}</a>
                        </List.Content>
                    </List.Item>
                </List>
                {/*<p>{data.formatted_address}</p>*/}

            </Container>
        );
    }

}

export default PlaceDetails
