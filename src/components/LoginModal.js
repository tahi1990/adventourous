import React from 'react';
import { Button } from 'tabler-react';
import { Modal, ModalBody } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class LoginModal extends React.Component {

    state = {
        show: false,
        // authState: 'STATE_LOGIN',
    };

    toggle = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    render() {

        const responseFacebook = (response) => {
            console.log(response);
        };

        const responseGoogle = (response) => {
            console.log(response);
        };

        return (
            <div>
                <Button color="danger" onClick={this.toggle}>
                    Login
                </Button>
                <Modal
                    isOpen={this.state.show}
                    toggle={this.toggle}
                    size="sm"
                    fade={false}
                    centered>
                    <ModalBody>
                        <FacebookLogin
                            appId="453251752046824"
                            fields="name,email,picture"
                            callback={responseFacebook}
                        />

                        <GoogleLogin
                            clientId="316554476346-as93qvh4ij65kth8o3kme3ve851p66n4.apps.googleusercontent.com"
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LoginModal
