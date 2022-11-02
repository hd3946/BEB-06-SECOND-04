import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./component/common/sidebar/Sidebar";
import Main from "./component/pages/main/MainPage";
import Detail from "./component/pages/detail/DetailPage";
import Mint from "./component/pages/minting/MintingPage";
import Mypage from "./component/pages/mypage/MyPage";
import Modal from "./component/common/modal/Modal";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Sidebar />
          <Modal />
          <div style={{ paddingLeft: "14rem" }}>
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
