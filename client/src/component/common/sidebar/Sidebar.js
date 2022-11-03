import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { check, logout } from "../../../store/slice";
import { validate } from "../../../libs/validate";
import { logoutUser } from "../../../api/sign";
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

const StyledButton = styled.div`
  padding: 25px 23px 11px 49px;
  font-size: 20px;
  color: black;
  display: block;
  transition: 0.3s;
  cursor: pointer;
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
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
`;

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <StyledAll>
      <StyledSidebar>
        <StyledLogo>F4</StyledLogo>
        <div style={{ padding: "1px 10px 306px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <StyledButton>
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "white", marginRight: "15px" }}
              />
              Home
            </StyledButton>
          </Link>

          {validate() ? (
            <div>
              <Link to="/mint" style={{ textDecoration: "none" }}>
                <StyledButton>
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ color: "white", marginRight: "15px" }}
                  />
                  Minting
                </StyledButton>
              </Link>
              <Link to="/mypage" style={{ textDecoration: "none" }}>
                <StyledButton>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "white", marginRight: "15px" }}
                  />
                  Mypage
                </StyledButton>
              </Link>
            </div>
          ) : null}
        </div>

        <div style={{ padding: "10px 10px 40px 10px" }}>
          {validate() ? (
            <a href="/" style={{ textDecoration: "none" }}>
              <StyledButton2
                style={{ backgroundColor: "tomato", cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </StyledButton2>
            </a>
          ) : (
            <div>
              <StyledButton2 onClick={() => dispatch(check({ type: "login" }))}>
                SignIn
              </StyledButton2>
              <StyledButton2
                onClick={() => dispatch(check({ type: "logout" }))}
              >
                SignUp
              </StyledButton2>
            </div>
          )}
        </div>
      </StyledSidebar>
    </StyledAll>
  );
}

export default Sidebar;
