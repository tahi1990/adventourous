// @flow

import * as React from 'react'
import { Grid, Container, Image } from 'semantic-ui-react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import WeatherDashboard from './components/WeatherDashboard'

import {
    Page,
} from 'tabler-react'

import SiteWrapper from './SiteWrapper';

function Home() {


    return (
        <SiteWrapper>
            <Page.Content title="Dashboard">
                {process.env.REACT_APP_NAME}
                <GooglePlacesAutocomplete
                    onSelect = {console.log}
                    autocompletionRequest = {{
                        types: ['(cities)']    
                    }}
                />
                <Container style={{ padding: '1em' }}>
                    <Grid>
                        <Grid.Column width={4}>
                            <WeatherDashboard />
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src='/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <WeatherDashboard />
                        </Grid.Column>
                    </Grid>
                </Container>
            </Page.Content>
        </SiteWrapper>
    )
}

export default Home
