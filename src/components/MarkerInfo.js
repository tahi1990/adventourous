import React, {PureComponent} from 'react';
import placeholder from '../assets/images/placeholder.png';
import {Header, Image} from 'semantic-ui-react';

const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

export default class MarkerInfo extends PureComponent {
    render() {
        const {info} = this.props;
        const displayName = `${info.name}`;

        let image =  info.image ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference='
            + info.image + '&key='
            + GOOGLE_API_KEY : placeholder;

        return (
            <div>
                <Header>
                    {displayName}
                </Header>
                <Image src={image} size='medium' fluid />
            </div>
        );
    }
}
