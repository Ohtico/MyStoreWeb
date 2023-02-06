import styled from "styled-components";

export const ButtonHeader = styled.button`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "#03C39A"} !important;
  color: #fff;
  width: ${(props) => (props.wd ? props.wd : "190px")} !important;
  height: ${(props) => (props.hg ? props.hg : "40px")} !important;
  margin-top: 1rem;
  border: none;

  /* font-size: 12px; */
  &:hover {
    color: #fff;
    background-color: ${(props) =>
      props.bgColor ? `${props.bgColor}90` : "#03C39A80"} !important;
  }
`;
