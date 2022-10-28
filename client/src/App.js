import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./component/common/sidebar/Sidebar";
// import Main from './component/pages/sidebar/Main';
// import Detail from './component/pages/sidebar/Detail';
// import Mint from './component/pages/sidebar/Mint';
// import Mypage from './component/pages/sidebar/Mypage';
// import Signin from './component/pages/sidebar/Signin';
// import Signup from './component/pages/sidebar/Signup';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            {/* <Route path="/" element={<Main />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/mint" element={<Mint />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
