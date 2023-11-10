import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage';
import WatchHistory from './Pages/WatchHistory';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div>

      <Header/>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>              {/* / means base url */}
        <Route path='/Home' element={<Home/>}/>                 {/* base url Home */}
        <Route path='/WatchHistory' element={<WatchHistory/>}/> {/* base url WatchHistory */}
      </Routes>

      <Footer/>
      
    </div>
  );
}

export default App;
