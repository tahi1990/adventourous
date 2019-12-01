// @flow

import * as React from 'react'

import {
    Page,
} from 'tabler-react'

import SiteWrapper from './SiteWrapper';

function Home() {


    return (
        <SiteWrapper>
            <Page.Content title="Dashboard">
                {process.env.REACT_APP_NAME}
            </Page.Content>
        </SiteWrapper>
    )
}

export default Home
