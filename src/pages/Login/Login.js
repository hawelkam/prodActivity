import React, { Component } from 'react'
import { IonHeader, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonLoading, IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton } from '@ionic/react'
import { RegisterLink } from '../Register/Register';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

const LoginPage = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Log In</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Log In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <LoginForm />
            <RegisterLink />
        </IonContent>
    </IonPage>
)

class LoginFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    };

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .login(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE})
                this.props.history.push(ROUTES.INBOX);
            })
            .catch(error => {
                this.setState({ error })
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value}); 
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <>
                <IonItem lines="null">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={email} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={password} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" onClick={this.onSubmit} disable={isInvalid} expand="block">
                            Log In
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    {error && <p>{error.message}</p>}
                </IonRow>
            </>
        )
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(LoginFormBase);

export default LoginPage;

export { LoginForm };