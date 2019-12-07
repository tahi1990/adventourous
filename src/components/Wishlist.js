import React, { PureComponent, Component } from 'react'
import { Card, Grid, Header, List, Image } from 'semantic-ui-react'
import placeholder from '../assets/images/placeholder.png';
import {userService} from '../services';

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
            console.log(data)
        })
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default Wishlist