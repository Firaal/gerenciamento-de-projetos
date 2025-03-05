import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>
                <li className={styles.list__item}>
                    <FaFacebook />
                </li>
                <li className={styles.list__item}>
                    <FaInstagram />
                </li>
                <li className={styles.list__item}>
                    <FaLinkedin />
                </li>
            </ul>

            <p className={styles.copy__right}>
                <span>Costs</span> &copy; 2025
            </p>
        </footer>
    );
}

export default Footer;
