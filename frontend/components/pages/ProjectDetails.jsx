import { useState, useEffect } from "react";

import styles from "./ProjectDetails.module.css";

import { data, useParams } from "react-router-dom";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [projectDetails, setProjectDetails] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/projects/${id}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    setProject(data);
                    setProjectDetails(true);
                })
                .catch((err) => console.log(err));
        }, 200);
    }, []);

    function toggleProjectForm() {
        if (projectDetails == true) {
            setProjectDetails(false);
        } else {
            setProjectDetails(true);
        }
    }

    function editPost(project) {
        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => setProject(data))
            .catch((err) => console.log(err));
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {projectDetails ? "Editar Projeto" : "Fechar"}
                            </button>
                            {projectDetails ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default ProjectDetails;
