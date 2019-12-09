// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
    Site,
    Nav,
    Button,
    RouterContextProvider,
} from "tabler-react";

import { ProgressBar } from 'react-fetch-progressbar';

import { Modal } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import { userService } from './services';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type Props = {|
    +children: React.Node,
|};

type State = {|

|};

type subNavItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +LinkComponent?: React.ElementType,
    +useExact?: boolean,
|};

type navItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +active?: boolean,
    +LinkComponent?: React.ElementType,
    +subItems?: Array<subNavItem>,
    +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [
    {
        value: "Home",
        to: "/",
        icon: "home",
        LinkComponent: NavLink,
        useExact: true,
    },
    {
        value: "Maps",
        to: "/maps",
        icon: "map",
        LinkComponent: NavLink,
        useExact: false,
    },
];

const style = {
    backgroundColor: 'red',
    height: '3px'
};

class SiteWrapper extends React.Component<Props, State> {
    state = {
        open: false,
        accountDropdownProps: null
    };

    componentDidMount(): void {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user) {
            userService.getUser(user.id).then(data => {
                if(data && data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            });
        }
    }

    toggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    responseGoogle = (response) => {
        const user = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            id: response.profileObj.googleId,
            image: response.profileObj.imageUrl
        };

        userService.getUser(user.id).then(data => {
           if (data.user) {
               localStorage.setItem('user', JSON.stringify(data.user));
               this.setData(data.user)
           } else {
               userService.addUser(user)
               .then(data => {
                   localStorage.setItem('user', JSON.stringify(data.user));
                   this.setData(data.user);
               });
           }
        });

        this.setState({
            open: false
        });
    };

    logout = () => {
        localStorage.removeItem('user');
        this.setState({
            accountDropdownProps: null
        })
    };

    setData = (user) => {
        this.setState({
            accountDropdownProps: {
                avatarURL: user.image,
                name: user.name,
                description: user.email,
                options: [
                    { icon: "log-out", value: "Sign out", onClick: this.logout }
                ],
            }
        });
    };

    render(): React.Node {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user && !this.state.accountDropdownProps) {
            this.setData(user);
        }

        const {open, accountDropdownProps} = this.state;

        return (
            <div>
                <ProgressBar style={style}/>
                <ToastContainer
                    autoClose={2000}

                />
                <Site.Wrapper
                    headerProps={{
                        href: "/",
                        alt: "Adventourous",
                        imageURL: "../images/logo.png",
                        navItems: (
                            <Nav.Item type="div" className="d-none d-md-flex">
                                { !localStorage.getItem('user') && (
                                    <Modal
                                        open={open}
                                        closeOnDimmerClick={true}
                                        onClose={this.toggle}
                                        size='tiny' trigger={
                                        <Button color="danger" onClick={this.toggle}>
                                            Login
                                        </Button>
                                    } centered={false}>
                                        <Modal.Header>Login</Modal.Header>
                                        <Modal.Content>
                                            <GoogleLogin
                                                clientId="484363137484-u1toqlta0ca22ffea62kllqnios1j6ds.apps.googleusercontent.com"
                                                buttonText="LOGIN WITH GOOGLE"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                            />
                                        </Modal.Content>
                                    </Modal>
                                )}
                            </Nav.Item>
                        ),
                        accountDropdown: accountDropdownProps,
                    }}
                    navProps={{ itemsObjects: navBarItems }}
                    routerContextComponentType={withRouter(RouterContextProvider)}
                    footerProps={{
                        copyright: (
                            <React.Fragment>
                                Copyright © 2019
                                <a href="."> Adventourous</a>. Theme by
                                <a
                                    href="https://codecalm.net"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    codecalm.net
                                </a>{" "}
                                All rights reserved.
                            </React.Fragment>
                        ),
                        nav: (
                            <React.Fragment>

                            </React.Fragment>
                        ),
                    }}
                >
                    {this.props.children}
                </Site.Wrapper>
            </div>
        );
    }
}

export default SiteWrapper;
