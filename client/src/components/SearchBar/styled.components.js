import styled from "styled-components";

export const ContainerSearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 1.5rem;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
`;

export const InputSearchBar = styled.input`
  background-color: transparent;
  border: 3px solid skyblue;
  border-radius: 1.5rem;
  font-size: 16px;
  padding: 0.9375rem 1.25rem;
  width: 250px;
  outline: none;
`;

export const ButtonSearchBar = styled.button`
  border: 1.5px solid black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: 0.4s;

  &:hover {
    background-color: skyblue;
    transition: 0.4s;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  position: absolute;
  bottom: -50px;
  right: 28%;
`;
