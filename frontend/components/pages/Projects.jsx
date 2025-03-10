import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }, 300);
    }, []);

    const location = useLocation();
    let message = "";

    if (location.state) {
        message = location.state.message;
    }

    function handleRemove(id) {
        fetch(`http://localhost:3000/projects/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id));
                console.log("Projeto removido: ", data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to={"/newproject"} text="Novo projeto" />
            </div>

            {message && <Message type="success" msg={message} />}

            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={handleRemove}
                        />
                    ))}
                {loading && <Loading />}
                {projects.length === 0 && !loading && <p>Não há projetos</p>}
            </Container>
        </div>
    );
}

export default Projects;
