import './App.css';
import Menu from './Menu/Menu';
import Header from './Header/Header';
import SidePanel from './SidePanel/SidePanel';
import Profile from './Pages/Profile/Profile';
import { useState } from 'react';
import { AppContext } from './AppContext';


function App() {
  const [user,setUser] = useState({ email: 'etst', password: 'asdasd' });

  return (
    <AppContext.Provider value={user, setUser}>
      <div className="App">
          <div class="Panels">
            <div class="Menu">
                <Menu></Menu>
            </div>
          <header className="App-header">
            <div class="Header">
              <Header></Header>
            </div>
            <div class="Pages">
              <Profile></Profile>
            </div>
          </header>
            <div class="SidePanel">
              <SidePanel></SidePanel>
            </div>
          </div>
        </div>
    </AppContext.Provider>
   
  );
}

export default App;
