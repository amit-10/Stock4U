import Menu from './Menu/Menu';
import Header from './Header/Header';
import SidePanel from './SidePanel/SidePanel';
import Profile from './Pages/Profile/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Investments from './Pages/Investments/Investments';
import Leaderboard from './Pages/Leaderboard/Leaderboard';
import Statistics from './Pages/Statistics/Statistics';
import Home from './Pages/Home/Home';
import AuthProvider from './Context/auth.context';
import { styled } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Panels>
            <AppMenu>
                <Menu/>
            </AppMenu>
            <AppHeader>
              <div>
                <Header/>
              </div>
              <div>
                <Routes>
                  <Route path="" element={<Home />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="investments" element={<Investments />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </div>
            </AppHeader>
            <AppSidePanel>
              <SidePanel/>
            </AppSidePanel>
          </Panels>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

const Container = styled('div')`
  text-align: center;
  height: 100vh;
`

const AppHeader = styled('div')`
  background-color: #FFF8F3;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Panels = styled('div')`
  display: flex;
  height: 100%;
`

const AppMenu = styled('div')`
  margin-right: auto; 
  margin-left: 0;
  float: left;
`

const AppSidePanel = styled('div')`
  margin-left: auto; 
  margin-right: 0;
  float: right;
  height: 100%;
`

export default App;
