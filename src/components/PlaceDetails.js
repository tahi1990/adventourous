import React, { PureComponent } from 'react'

class PlaceDetails extends PureComponent {

    render() {
        const data = this.props.data;
        const image = this.props.image;

        return(
            <div>
                <img src={image}/>
                <h2>{data}</h2>
            </div>
        );
    }

}

export default PlaceDetails
