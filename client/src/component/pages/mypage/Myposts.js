import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { postlist } from "../../../store/slice";
import { postListCall } from "../../../api/post";

const MypostsBox = styled.div`
  width: 100%;
  margin-top: 30px;
  a {
    text-decoration: none;
    color: black;
  }
  .mypostsHeader {
    font-size: 18px;
    font-weight: 500;
  }
  .mypostsList {
    height: 203px;
    margin-top: 10px;
    border: 1px solid black;
    overflow-y: auto;

    .mypost {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid black;
      transition: 0.2s;
      :hover {
        background-color: aliceblue;
      }
      :last-child {
        border-bottom: 0px;
      }
      .mypostIndex {
        width: 50px;
        margin-left: 10px;
        font-size: 20px;
        font-weight: 500;
      }
      .mypostdesc {
        width: 550px;
      }
      .mypostDay {
        width: 150px;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .empty {
      height: 100%;
    }
  }
`;

const Myposts = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const listCall = async () => {
    const { data } = await postListCall();
    dispatch(postlist({ list: data.postList }));
  };

  const myList = list.filter(
    (a) => a.User.email === JSON.parse(localStorage["userData"]).email
  );

  useEffect(() => {
    listCall(); // mypage에서 새로고침 되면 list 가 empty .. 한번더 call
  }, []);

  return (
    <MypostsBox>
      <div className="mypostsHeader">My Posts</div>
      <div className="mypostsList">
        {myList.length > 0 ? (
          myList.map((data, index) => (
            <Link to={"/detail"} key={index} state={{ pageId: 0, data: data }}>
              <div className="mypost" key={index}>
                <div className="mypostIndex">#{data.postId}</div>
                <div className="mypostdesc">{data.content}</div>
                <div className="mypostDay">{data.createdAt.slice(0, 10)}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty cc">작성한 글이 없습니다!</div>
        )}
      </div>
    </MypostsBox>
  );
};

export default Myposts;
