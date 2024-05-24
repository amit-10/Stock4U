import './App.css';
import Menu from './Menu/Menu';
import Header from './Header/Header';
import SidePanel from './SidePanel/SidePanel';

function App() {
  return (
    <div className="App">

      <div class="Panels">
        <div class="Menu">
            <Menu></Menu>
        </div>
      <header className="App-header">
        <div class="Header">
          <Header></Header>
        </div>
      </header>
        <div class="SidePanel">
          <SidePanel></SidePanel>
        </div>
      </div>
    </div>
  );
}

export default App;
