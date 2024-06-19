import './App.css';
import Menu from './Menu/Menu';
import Header from './Header/Header';
import SidePanel from './SidePanel/SidePanel';
import Profile from './Pages/Profile/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Investments from './Pages/Investments/Investments';
import Leaderboard from './Pages/Leaderboard/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div class="Panels">
          <div class="Menu">
              <Menu/>
          </div>
          <header className="App-header">
            <div class="Header">
              <Header/>
            </div>
            <div class="Pages">
              <Routes>
                <Route path="" element={<></>} />
                <Route path="investments" element={<Investments />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="profile" element={<Profile />} />
              </Routes>
            </div>
          </header>
          <div class="SidePanel">
            <SidePanel/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
