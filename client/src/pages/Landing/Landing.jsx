// import react from "react";
import { LandingContainer, ButtonContainer, HomeNavLink, HomeButton } from "./styled.components";

const Landing = () => {
    return (
        <LandingContainer>
            <ButtonContainer>
                <HomeNavLink  to="/home">
                    <HomeButton>
                        VAMO AL PAMI
                    </HomeButton>
                </HomeNavLink>
            </ButtonContainer>
        </LandingContainer>
    )
}

export default Landing;