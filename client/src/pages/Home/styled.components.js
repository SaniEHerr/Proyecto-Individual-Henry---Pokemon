import styled from "styled-components";
import imagen from "../../assets/images/bgHome.jpg";

export const BackImage = styled.div`
  background-image: url(${imagen});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const MainContainer = styled.div``;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #f3f2ef;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const ActionsContainer = styled.nav`
  position: relative;
  height: calc(8.5rem + 3.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rem;
  margin-inline: auto;
`;

export const FilterOrderContainer = styled.div`
  /* background-color: red; */
`;

export const CardsContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto; */

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  row-gap: 10px;
  column-gap: 40px;
  max-width: 1780px;
  margin: 15rem auto 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-items: center;
    padding: 0 20px;
  }
`;
