import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
const StyledAll = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const StyledLogo = styled.div`
  width: 54px;
  height: 54px;
  border: 2px solid #03a9f4;
  border-radius: 8px;
  text-align: center;
  line-height: 53px;
  font-size: 25px;
  display: inline-block;
  margin: 44px 30px 13px 91px;
  color: var(--mainColor);
  /* color: #03a9f4; */
`;

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  height: 100vh;
  width: 14rem;
  background-color: #e0e0e0;
`;

const StyledButton = styled.a`
  padding: 25px 23px 11px 49px;
  font-size: 20px;
  color: black;
  display: block;
  transition: 0.3s;
  &:hover {
    color: white;
  }
`;

const StyledButton2 = styled.div`
  font-size: 17px;
  text-align: center;
  color: white;
  padding: 5px 1px 1px 5px;
  width: 92px;
  height: 29px;
  border-radius: 15px 15px 15px 15px;
  margin: 13px 10px 7px 63px;
  background-color: #5fc4fd;
  &:hover {
    background-color: tomato;
  }
`;

function Sidebar() {
  return (
    <StyledAll>
      <StyledSidebar>
        <StyledLogo>F4</StyledLogo>
        <div style={{ padding: "1px 10px 306px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <StyledButton>
              <FontAwesomeIcon icon={faHouse} style={{ color: "white" }} />{" "}
              &nbsp; Home
            </StyledButton>
          </Link>
          <Link to="/mint" style={{ textDecoration: "none" }}>
            <StyledButton>
              <FontAwesomeIcon icon={faImage} style={{ color: "white" }} />
              &nbsp;&nbsp; Minting
            </StyledButton>
          </Link>
          <Link to="/mypage2" style={{ textDecoration: "none" }}>
            <StyledButton>
              <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
              &nbsp;&nbsp;&nbsp;Mypage
            </StyledButton>
          </Link>
        </div>

        {/* <StyledButton></StyledButton>
        <StyledButton></StyledButton> */}

        <div style={{ padding: "10px 10px 40px 10px" }}>
          <Link to="/sign?type=in" style={{ textDecoration: "none" }}>
            <StyledButton2>SignIn</StyledButton2>
          </Link>
          <Link to="/sign?type=up" style={{ textDecoration: "none" }}>
            <StyledButton2>SignUp</StyledButton2>
          </Link>
        </div>
      </StyledSidebar>
    </StyledAll>
  );
}

export default Sidebar;
