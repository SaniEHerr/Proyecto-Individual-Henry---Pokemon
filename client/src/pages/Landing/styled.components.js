import styled from "styled-components";
import { NavLink } from "react-router-dom";
import imagen from "../../assets/images/bgLanding.webp";

export const LandingContainer = styled.div`
  background-image: url(${imagen});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
  /* padding: 0.625rem 1.25rem; */
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  background-color: skyblue;
  color: #000;
  border: 4px solid black;
  border-radius: 0.8rem;
  cursor: pointer;
  text-align: center;
  transition: 0.5s;

  &:hover {
    background-color: #ffcb05;
    transition: 0.5s;
  }
`;

export const HomeNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: 700;
`;

export const HomeButton = styled.div`
  /* border-radius: 1rem; */
`;
