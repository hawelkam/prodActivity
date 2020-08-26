import React from 'react'
import { withFirebase } from '../firebase';
import {
    IonIcon,
    IonItem,
    IonLabel,
    IonMenuToggle,
  } from '@ionic/react';
import { logOutOutline, logOutSharp } from 'ionicons/icons';

const LogoutMenuItem = ({ firebase }) => (
    <IonMenuToggle key={10} autoHide={false}>
        <IonItem button onClick={() => {firebase.logout()}} lines="none" detail={false}>
        <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
        <IonLabel>Log Out</IonLabel>
        </IonItem>
    </IonMenuToggle>
);

export default withFirebase(LogoutMenuItem);