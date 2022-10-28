import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./component/common/sidebar/Sidebar";
import Main from "./component/pages/main/MainPage";
import Detail from "./component/pages/detail/DetailPage";
import Mint from "./component/pages/minting/MintingPage";
import Mypage from "./component/pages/mypage/MyPage";
import SignPage from "./component/pages/sign/SignPage";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Sidebar />
          <div style={{ paddingLeft: "14rem" }}>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/detail" element={<Detail />}></Route>
              <Route path="/mint" element={<Mint />}></Route>
              <Route path="/mypage2" element={<Mypage />}></Route>
              {/* sign은 Sidebar 컴포넌트 밑으로 빼고 redux로 on/off 관리 */}
              <Route path="/sign" element={<SignPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
