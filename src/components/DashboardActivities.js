import React, { PureComponent } from 'react'
import { Grid, Header, Rating, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png'
import { Link } from "react-router-dom";

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class DashboardActivities extends PureComponent{

    generateItem = () => {
        const data = this.props.data;

        if(data){
            let results = data;
            if(results.length > 4)
                results = results.slice(results.length - 4);
            
            return results.map((result, index) => {
                if(result.photos)
                    result.image = GOOGLE_PLACE_PHOTO_REQ
                                    + result.photos[0].photo_reference + '&key='
                                    + GOOGLE_API_KEY;
                
                let img = result.image ? result.image : placeholder;
                result.rating = result.rating ? result.rating : 0;

                return(
                    <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                        <Image src={img} fluid/>
                        <Header as='h3'>
                            <Link to={`/maps/${result.place_id}`}>
                                {result.name}
                            </Link>
                            <Header.Subheader>
                                {result.vicinity}
                            </Header.Subheader>
                        </Header>

                        <Rating disabled maxRating={5} defaultRating={parseInt(result.rating)} icon='star' size='mini'/>({result.rating})
                    </Grid.Column>
                )
            })
        }
        else{
            return(
                <div>

                </div>
            )
        }
    };

    render() {
        return(
            <Grid.Row>
                {this.generateItem()}
            </Grid.Row>
        )
    }
}

export default DashboardActivities
