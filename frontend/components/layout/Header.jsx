import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Header.module.css";
import logo from "../../src/imgs/costs_logo.png";

function Header() {
    return (
        <header className={styles.header}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>

                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="projects">My Projects</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="company">Company</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="contact">Contact</Link>
                    </li>
                </ul>
            </Container>
        </header>
    );
}

export default Header;
