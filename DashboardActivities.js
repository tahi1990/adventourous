import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, List, Image } from 'semantic-ui-react'

const GOOGLE_API_KEY = 'AIzaSyDT85pn4ikmOV8W7cqULptXomgW5U4bWYc';

class DashboardActivities extends PureComponent{
    state ={
        mounted:false
    }

    constructor(props){
        super(props)
        
    }

    place_id = ''

    componentDidMount () {
        this.setState({ mounted: true });
        console.log(this.place_id)
        this.requestPlace(this.place_id).then((data) => {
            console.log('mount')
            console.log(data)
            this.setState({
                data: data.result
            })
        })

    }

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
        this.place_id = this.props.data
        this.setState({
            place_id: this.props.data
        })
        
        return(
            <div></div>    
        )
    }
}

export default DashboardActivities