import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check, filtering } from "../../../store/slice";
import { registerUser, loginUser, registerInfo } from "../../../api/sign";
import { useRef } from "react";

const SignPageBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(131, 131, 131, 0.8);
  z-index: 100;

  .signBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 600px;
    background-color: #f8f8f8;
    .signHeader {
      width: 200px;
      margin-top: 50px;
      padding-bottom: 5px;
      border-bottom: ${(props) =>
        props.signUpCheck
          ? "3px solid rgb(255, 82, 82)"
          : "3px solid rgb(82, 192, 255)"};
      text-align: center;
      font-weight: 500;
      transition: 0.3s;
    }
    .signBody {
      text-align: center;
      width: 400px;
      height: ${(props) => (props.signUpCheck ? "400px" : "400px")};
      margin-top: 50px;
      border: 2px solid black;
      transition: 0.3s;

      .signBodyBox {
        position: relative;
        margin-top: 50px;
        .nb {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          .n {
            width: 100px;
            text-align: left;
            font-size: 18px;
            font-weight: 500;
          }
          input {
            padding-left: 10px;
            width: 200px;
            height: 30px;
          }
        }
        .error {
          position: absolute;
          margin-top: 55px;
          font-size: 14px;
          color: red;
        }
        .errE {
          display: ${(props) => (props.error.email ? "block" : "none")};
        }
        .errN {
          display: ${(props) => (props.error.nickname ? "block" : "none")};
        }
        .errP {
          display: ${(props) => (props.error.password ? "block" : "none")};
        }
        .errA {
          display: ${(props) => (props.error.address ? "block" : "none")};
        }

        .signBO {
          display: flex;
          flex-direction: ${(props) => (props.signUpCheck ? "row" : "column")};
          justify-content: center;
          align-items: center;
          transform: translateY(
            ${(props) => (props.signUpCheck ? "30px" : "0px")}
          );
          margin-top: ${(props) => (props.signUpCheck ? "40px" : "50px")};
          transition: 0.3s;

          .signB {
            line-height: 25px;
            width: 100px;
            height: 30px;
            color: white;
            background-color: ${(props) =>
              props.signUpCheck ? "rgb(255, 82, 82)" : "rgb(82, 192, 255)"};
            cursor: pointer;
            transition: 0.2s;
            :hover {
              background-color: ${(props) =>
                props.signUpCheck
                  ? "rgba(255, 82, 82, 0.7)"
                  : "rgba(82, 192, 255, 0.7)"};
            }
          }
          .or {
            position: relative;
            margin: ${(props) => (props.signUpCheck ? "10px 0px" : "30px 0px")};
            transform: translateY(
              ${(props) => (props.signUpCheck ? "-40px" : "0px")}
            );

            ::after {
              position: absolute;
              top: 50%;
              right: -170px;
              content: "";
              width: 150px;
              border-bottom: 2px solid rgba(107, 107, 107, 0.8);
            }
            ::before {
              position: absolute;
              top: 50%;
              left: -170px;
              content: "";
              width: 150px;
              border-bottom: 2px solid rgba(107, 107, 107, 0.8);
            }
          }
        }
      }
    }
  }
`;

const SignPage = ({ control }) => {
  const dispatch = useDispatch();
  const idRef = useRef();
  const [signUpCheck, setSignUpCheck] = useState(false);
  const [errorData, setErrorData] = useState({
    dis: { email: false, address: false, nickname: false, password: false },
    msg: { email: "", address: "", nickname: "", password: "" },
  });
  const [userInfo, setUserInfo] = useState({
    email: "",
    address: "",
    nickname: "",
    password: "",
  });

  const inputCheck = (type) => {
    const { email, nickname, password, address } = userInfo;
    if (!email) {
      setErrorData({
        dis: { ...errorData.dis, email: true },
        msg: { ...errorData.msg, email: "email을 입력해 주세요!" },
      });
      return false;
    } else {
      if (email.search(/@/g) === -1 || email.search(/[.]/g) === -1) {
        setErrorData({
          dis: { ...errorData.dis, email: true },
          msg: { ...errorData.msg, email: "email 형식이 맞지 않습니다!" },
        });
        return false;
      }
    }

    if (!nickname && type === "signup") {
      setErrorData({
        dis: { ...errorData.dis, nickname: true },
        msg: { ...errorData.msg, nickname: "nickname을 입력해 주세요!" },
      });
      return false;
    }
    if (!password) {
      setErrorData({
        dis: { ...errorData.dis, password: true },
        msg: { ...errorData.msg, password: "password를 입력해 주세요!" },
      });
      return false;
    }
    if (!address && type === "signup") {
      setErrorData({
        dis: { ...errorData.dis, address: true },
        msg: { ...errorData.msg, address: "address를 입력해 주세요!" },
      });
      return false;
    }
    return true;
  };

  const signin = async () => {
    try {
      if (!inputCheck()) {
        return;
      }
      dispatch(check({ type: "loading" }));

      const userData = {
        email: userInfo.email,
        password: userInfo.password,
      };

      const { status } = await loginUser(userData);

      if (status === 200) {
        const userInfoData = await registerInfo();
        const { address, nickname, email, profileurl } =
          userInfoData.data.loginData;

        dispatch(filtering({ list: userInfoData.data.postList }));
        localStorage.setItem(
          "userData",
          JSON.stringify({
            nickname,
            email,
            profileImg: profileurl,
            address,
            tokenBalance: userInfoData.data.ethBalance,
          })
        );
        window.location.href = "/";
        dispatch(check({ type: "" }));
      } else {
        alert("로그인 실패!");
        dispatch(check({ type: "" }));
      }
    } catch (err) {
      console.log(err);
      dispatch(check({ type: "" }));
    }
  };

  const signup = async () => {
    try {
      const { email, nickname, password, address } = userInfo;
      if (!inputCheck("signup")) {
        return;
      }
      dispatch(check({ type: "loading" }));
      if (email && nickname && password && address) {
        const userData = {
          email,
          nickname,
          password,
          address,
        };
        const { status } = await registerUser(userData);
        if (status === 200) {
          return dispatch(check({ type: "login" }));
        }
      }
      dispatch(check({ type: "logout" }));
    } catch (err) {
      console.log(err);
      dispatch(check({ type: "" }));
    }
  };

  useEffect(() => {
    setSignUpCheck(control === "login" ? false : true);
  }, [control]);

  useEffect(() => {
    if (idRef.current) {
      idRef.current.focus();
    }
  }, [control]);

  return (
    <SignPageBox
      error={errorData.dis}
      signUpCheck={signUpCheck}
      onClick={(e) => {
        dispatch(check({ type: "" }));
      }}
    >
      <div
        className="signBox"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="signHeader">{signUpCheck ? "signUp" : "signin"}</div>
        <div className="signBody">
          <div className="signBodyBox">
            <div className="emailBox nb">
              <div className="n">Email : </div>
              <input
                ref={idRef}
                type="email"
                placeholder="email을 입력하세요!"
                value={userInfo.email}
                onChange={(e) => {
                  setErrorData({
                    ...errorData,
                    dis: { ...errorData.dis, email: false },
                  });
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
              <div className="error errE">{errorData.msg.email}</div>
            </div>
            {signUpCheck ? (
              <div className="nickNameBox nb">
                <div className="n">Nick name : </div>
                <input
                  placeholder="별명을 입력하세요!"
                  value={userInfo.nickname}
                  onChange={(e) => {
                    setErrorData({
                      ...errorData,
                      dis: { ...errorData.dis, nickname: false },
                    });
                    setUserInfo({ ...userInfo, nickname: e.target.value });
                  }}
                />
                <div className="error errN">{errorData.msg.nickname}</div>
              </div>
            ) : null}
            <div className="passwordBox nb">
              <div className="n">Password : </div>
              <input
                type={"password"}
                placeholder="비밀번호를 입력하세요!"
                value={userInfo.password}
                onChange={(e) => {
                  setErrorData({
                    ...errorData,
                    dis: { ...errorData.dis, password: false },
                  });
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
              />
              <div className="error errP">{errorData.msg.password}</div>
            </div>
            {signUpCheck ? (
              <div className="addressBox nb">
                <div className="n">address : </div>
                <input
                  placeholder="주소를 입력하세요!"
                  value={userInfo.address}
                  onChange={(e) => {
                    setErrorData({
                      ...errorData,
                      dis: { ...errorData.dis, address: false },
                    });
                    setUserInfo({ ...userInfo, address: e.target.value });
                  }}
                />
                <div className="error errA">{errorData.msg.address}</div>
              </div>
            ) : null}

            <div className="signBO">
              <div
                className="signB"
                onClick={() => {
                  if (!signUpCheck) {
                    signin();
                  } else {
                    setSignUpCheck(false);
                  }
                }}
              >
                {signUpCheck ? "Go Sign In" : "Sign In"}
              </div>

              <div className="or">or</div>
              <div
                className="signB"
                onClick={() => {
                  if (signUpCheck) {
                    //회원 가입 요청
                    signup();
                  } else {
                    setSignUpCheck(true);
                  }
                }}
              >
                {signUpCheck ? "Sign Up" : "Go Sign Up"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignPageBox>
  );
};

export default SignPage;
