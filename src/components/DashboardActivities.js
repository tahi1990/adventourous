import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, Rating, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';

const GOOGLE_PLACE_PHOTO_REQ = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=';
const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class DashboardActivities extends PureComponent{
    state ={
        mounted:false
    };

    componentDidMount () {
        this.setState({ mounted: true });
        if(this.props.place_id){
            this.requestPlace(this.props.data.place_id).then((data) => {
                this.setState({
                    lat: data.result.geometry.location.lat,
                    lng: data.result.geometry.location.lng,
                    keyword: this.props.data.keyword
                }, () => {
                    this.searchNearBy();
                });
            });
        }
        if(this.props.data.lat && this.props.data.lng){
            console.log('2222')
            this.setState({
                lat: this.props.data.lat,
                lng: this.props.data.lng,
                keyword: this.props.data.keyword
            }, () => {
                this.searchNearBy();
            })
        }
    }

    generateItem = () => {
        if(this.state.data){
            let results = this.state.data;
            if(results.length > 4)
                results = results.slice(results.length - 4);
            
            return results.map((result, index) => {
                if(result.photos)
                    result.image = GOOGLE_PLACE_PHOTO_REQ
                                    + result.photos[0].photo_reference + '&key='
                                    + GOOGLE_API_KEY;
                
                let img = result.image ? result.image : placeholder;

                return(
                    <Grid.Column key={index}>
                        <Image src={img} fluid/>
                        <span><Header as='h3'>{result.name}</Header></span>
                        <span>{result.vicinity}</span>
                        <Rating maxRating={5} defaultRating={parseInt(result.rating)} icon='star' size='mini'/>({result.rating})
                    </Grid.Column>
                )
            })
        }
        else{
            return(
                <div></div>
            )
        }
    };

    searchNearBy = () => {
        if(this.state.lat && this.state.lng){
            const params = {
                location: this.state.lat + ',' + this.state.lng,
                radius: 2000,
                type: this.state.keyword,
                key: GOOGLE_API_KEY
            };
    
            const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json');
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            return fetch(url).then(res => res.json())
                .then((data) => {
                    this.setState({
                        data: data.results
                    })
                })
        }
    };

    requestPlace = (id) => {
        const params = {
            place_id: id,
            key: GOOGLE_API_KEY,
            language: 'en'
        };

        const url = new URL('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url).then(res => res.json());
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
