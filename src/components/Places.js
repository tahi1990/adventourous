import React, { PureComponent } from 'react'
import { List, Image } from 'semantic-ui-react'

class Places extends PureComponent {

    createPlaces = place => {
        return (
            <List.Item key={place.id}>
                <List.Content>
                    <List.Header as='a'>{place.name}</List.Header>
                    <List.Description>
                        Last seen watching{' '}
                        <a>
                            <b>Arrested Development</b>
                        </a>{' '}
                        just now.
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    };

    render() {
        const places = this.props.data;
        if(places) {
            return (
                <List>
                    {places.map(this.createPlaces)}
                </List>

            );
        } else {
            return(
                <div/>
            );
        }
    }


}

export default Places;
