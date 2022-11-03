import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./component/common/sidebar/Sidebar";
import Main from "./component/pages/main/MainPage";
import Detail from "./component/pages/detail/DetailPage";
import Mint from "./component/pages/minting/MintingPage";
import Mypage from "./component/pages/mypage/MyPage";
import Modal from "./component/common/modal/Modal";
import { useSelector } from "react-redux";

function App() {
  // 메모 훅 사용해서 리랜더링 최소화 하기 (목요일 할 것)
  const { side } = useSelector((state) => state.state);

  return (
    <div>
      <div>
        <BrowserRouter>
          <Sidebar />
          <Modal />
          <div
            style={{ paddingLeft: side ? "0rem" : "14rem", transition: "0.2s" }}
          >
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/detail" element={<Detail />}></Route>
              <Route path="/mint" element={<Mint />}></Route>
              <Route path="/mypage" element={<Mypage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
