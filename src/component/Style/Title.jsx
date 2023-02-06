import styled from "styled-components/macro";

export const Title = styled.h1`
  font-family: "Roboto";
  font-size: ${(props) => props.size || "20px"};
  font-weight: ${(props) => props.we || 700};
  color: ${(props) => props.color || "#171a22"};
  text-align: left;
`;

export const LabeFormlStyled = styled.label`
  color: ${(props) => (props.error ? "red" : "#454546")};
  font-size: 0.75rem;
`;
