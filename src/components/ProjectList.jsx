import React from 'react'
import firebase from '../firebase'
import { IonList } from '@ionic/react';
import UserContext from '../contexts/UserContext';
import Project from './Project';

const ProjectList = (props) => {
    const [projects, setProjects] = React.useState([]);
    const {user} = React.useContext(UserContext);

    React.useEffect(() => {
        const unsubscribe = getProjects();
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [])

    function getProjects() {
        return firebase.db.collection("projects")
            .where("userId", "==", user.uid)
            .where("state", "==", "open")
            .onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const projects = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setProjects(projects);
    }
    return (
        <IonList lines="full">
            {projects.map((project, index) => ( 
                <Project key={project.id} project={project} />
            ))}
        </IonList>
    )
}

export default ProjectList