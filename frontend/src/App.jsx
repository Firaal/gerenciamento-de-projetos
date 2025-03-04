import { Outlet } from "react-router-dom";
import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function App() {
    return (
        <>
            <Header />

            <Container customClass="min-height">
                <Outlet />
            </Container>

            <Footer />
        </>
    );
}

export default App;
