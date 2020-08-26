import React from 'react'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonBackButton } from '@ionic/react';

const ProjectDetails = (props) => {
    const { id } = useParams();
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                    <IonBackButton icon="add" />
                </IonButtons>
                <IonTitle>{ id }</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon="add" />
                    </IonButtons>
                    <IonTitle size="large">{ id }</IonTitle>
                </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    )
}

export default ProjectDetails
