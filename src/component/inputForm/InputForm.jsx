import styled from "styled-components";

export const InputForm = styled.input`
  width: 100%;
  height: 38px;
  /* background-color: #ffffff87; */
  border: none;
  outline: none;
  border: 1px solid ${(props) => (props.error ? "red" : "#bababa")};
  border-radius: 10px;
  font-size: 1rem;
  display: inline-block;
`;

export const LabelStyled = styled.label`
  color: ${(props) => (props.error ? "red" : "#454546")};
  font-size: 0.88rem;
`;
