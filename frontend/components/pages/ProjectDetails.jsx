import { useState, useEffect } from "react";

import styles from "./ProjectDetails.module.css";

import { data, useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [projectDetails, setProjectDetails] = useState(true);
    const [serviceDetails, setServiceDetails] = useState(true);

    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/projects/${id}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    setProject(data);
                    setProjectDetails(true);
                    console.log(data);
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
        setMessage("");

        if (project.budget < project.cost) {
            setMessage("O orçamento não pode ser menor que o custo do projeto");
            setType("error");
            return false;
        }

        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
                setMessage("Projeto Atualizado");
                setType("success");
                setProjectDetails(true);
            })
            .catch((err) => console.log(err));
    }

    function toggleServiceForm() {
        if (serviceDetails == true) {
            setServiceDetails(false);
        } else {
            setServiceDetails(true);
        }
    }

    function createService(project) {
        const newService = project.services[project.services.length - 1];

        newService.id = uuidv4();

        const newServiceCost = newService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(newServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
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

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {serviceDetails ? "Fechar" : "Adicionar Serviço"}
                            </button>
                            <div className={styles.project_info}>
                                {serviceDetails && <ServiceForm handleSubmit={createService} btnText="Adicionar Serviço" projectData={project} />}
                            </div>
                        </div>

                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>itens de Serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default ProjectDetails;
