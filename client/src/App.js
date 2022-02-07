import './App.css';
import AllUsers from './Component/AllUsers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Component/NavBar';
import Add from './Component/Add';



function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
          <Route exact path="/" element={<AllUsers />}/>
          <Route exact path="/add" element={<Add />}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
