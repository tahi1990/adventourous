import React,{ useState } from 'react'
import MapGL, {GeolocateControl } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoidGFoaTE5OTAiLCJhIjoiY2szNzZ4eWlpMDhxdTNjbzltMGJvYzAzZSJ9.IRSxzzNjXV8Wc5sQ73i7lQ';

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10
};

const Map = () => {

    const [viewport, setViewPort ] = useState({
        width: "100%",
        height: 900,
        latitude: 0,
        longitude: 0,
        bearing: 0,
        pitch: 0,
        zoom: 3
    });

    const _onViewportChange = viewport => setViewPort({...viewport});

    return (
        <div style={{ margin: '0 auto'}}>
            <MapGL
                {...viewport}
                mapboxApiAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={_onViewportChange}
            >
                <GeolocateControl
                    style={style}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />
            </MapGL>
        </div>
    )
};

export default Map
