import { IonItem, IonLabel, IonRow, IonCol, IonButton, IonInput, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component } from 'react';
import { withFirebase } from '../../firebase';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null
}

const RegisterPage = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Register</IonTitle>
            </IonToolbar>
        </IonHeader>
                
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                <IonTitle size="large">Register</IonTitle>
                </IonToolbar>
            </IonHeader>

            <RegisterForm />
        </IonContent>
    </IonPage>
)

class RegisterFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { name, email, password } = this.state;

        this.props.firebase
            .registerUser(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE});
                this.props.history.push(ROUTES.INBOX);
            })
            .catch(error => {
                this.setState({ error });
            });
        
        event.preventDefault();
    }

    render() {
        const {
            name,
            email,
            password,
            confirmPassword,
            error
        } = this.state;

        const isInvalid = password !== confirmPassword ||
            password === '' ||
            email === '' ||
            name === '';

        return (
            <>
                <IonItem lines="null">
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="name" type="text" value={name} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={email} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={password} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Repeat Password</IonLabel>
                    <IonInput name="confirmPassword" type="password" value={confirmPassword} onIonChange={this.onChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={this.onSubmit} disabled={isInvalid}>
                            Sign Up
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    {error && error.message}
                </IonRow>
            </>
        )
    }
}

const RegisterForm = compose(
    withRouter,
    withFirebase,
)(RegisterFormBase);

const RegisterLink = () => (
    <IonRow>
        Don't have an account? <Link to={ROUTES.SIGN_IN}>Register</Link>
    </IonRow>
)

export default RegisterPage;

export { RegisterForm, RegisterLink }
