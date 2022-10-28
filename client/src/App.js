import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Sidebar from "./component/common/sidebar/Sidebar";
import Main from "./component/pages/main/MainPage";
import Detail from "./component/pages/detail/DetailPage";
import Mint from "./component/pages/minting/MintingPage";
import Mypage from "./component/pages/mypage/MyPage";
import SignPage from "./component/pages/sign/SignPage";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/mint" element={<Mint />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/sign" element={<SignPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
