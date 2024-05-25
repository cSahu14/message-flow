import logo from './logo.svg';
import './App.css';
import DnDFlow from './DndFlow/DnDFlow';
import Navbar from './DndFlow/Navbar';

function App() {
  return (
    <div style={{ width: "100%", height: "93vh" }}>
      <Navbar />
      <DnDFlow />
    </div>
  );
}

export default App;
