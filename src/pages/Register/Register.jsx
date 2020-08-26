import { IonItem, IonLabel, IonRow, IonCol, IonButton, IonInput, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React from 'react';
import { toast } from '../../helpers/toast'
import useForm from '../../hooks/useForm'
import firebase from '../../firebase'
import validateSignup from '../../validators/validateRegistration'
import UserContext from "../../contexts/UserContext";
import { Redirect } from 'react-router';

const INITIAL_STATE = {
    name: "",
    email: "",
    password: ""
}

const Register = (props) => {
    const { handleSubmit, handleChange, values, isSubmitting } = useForm(INITIAL_STATE, validateSignup, authenticateUser);
    const [busy, setBusy] = React.useState(false);
    const {user} = React.useContext(UserContext);

    
    async function authenticateUser() {
        const { name, email, password } = values;
        try {
            await firebase.registerUser(name, email, password);
            toast("Registration successful!");
            props.history.push("/");
        } catch (err) {
            console.error('Authentication Error', err);
            toast(err.message);
        }
        setBusy(false);
    }

    if (user) {
        return (
          <Redirect to="/"/>
        )
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonLoading message={"Please wait..."} isOpen={busy} />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem lines="null">
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="name" type="text" value={values.name} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonItem lines="null">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={values.password} onIonChange={handleChange} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disable={isSubmitting}>
                            Sign Up
                        </IonButton>
                    </IonCol>
                </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
