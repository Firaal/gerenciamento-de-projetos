import styles from "./NewProject.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";

function NewProject() {
    const [project, setProject] = useState({});

    const navigate = useNavigate();

    function createPost(project) {
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>

            <ProjectForm btnText={"Criar Projeto"} handleSubmit={createPost} projectData={project} />
        </div>
    );
}

export default NewProject;
