import React, { PureComponent } from 'react'
import {Container, Header, Image, Item, Rating, Divider, List, Button, Icon, Accordion} from 'semantic-ui-react'
import { Form } from 'tabler-react'

const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class PlaceDetails extends PureComponent {

    state = {
        active: true,
        type: 'Driving'
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

        const {active, type} = this.state;

        return(
            <div>
                <Button.Group basic icon fluid>
                    <Button disabled={type === 'Driving'} basic color='red' onClick={() => {
                        this.props.getDirection(data.geometry.location.lng, data.geometry.location.lat, 'driving');
                        this.setState({
                            type: 'Driving'
                        });
                    }}>
                        <Icon name='car' color='red'/>
                    </Button>
                    <Button disabled={type === 'Cycling'} basic color='green' onClick={() => {
                        this.props.getDirection(data.geometry.location.lng, data.geometry.location.lat, 'cycling');
                        this.setState({
                            type: 'Cycling'
                        });
                    }}>
                        <Icon name='bicycle' color='green' />
                    </Button>
                    <Button disabled={type === 'Walking'} basic color='blue' onClick={() => {
                        this.props.getDirection(data.geometry.location.lng, data.geometry.location.lat, 'walking');
                        this.setState({
                            type: 'Walking'
                        });
                    }}>
                        <Icon name='male' color='blue' />
                    </Button>
                </Button.Group>

                { !direction && (
                    <Header as='h3'>No route available.</Header>
                )}

                { direction && (
                    <Accordion>
                        <Accordion.Title active={active} onClick={this.handleClick}>
                            <Icon name='dropdown' />{type} - {direction[0].duration} ({direction[0].distance + 'm'})
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

            </div>
        );
    }

}

export default PlaceDetails
