import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const location = useLocation();
    let message = "";

    if (location.state) {
        message = location.state.message;
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="newproject" text="Novo projeto" />
            </div>

            {message && <Message type="success" msg={message} />}

            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} />
                    ))}
            </Container>
        </div>
    );
}

export default Projects;
