// CSS
import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// hooks
import { useAuth } from './hooks/useAuth';
// components
import Navbar from './components/surfaces/Navbar';
import Footer from './components/surfaces/Footer';

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminProfile from './pages/Admin/Profile/AdminProfile';
import AdminHome from './pages/Admin/AdminHome';
import ExpositionDashboard from './pages/Admin/Expositions/ExpositionDashboard';
import ArtistsDashboard from './pages/Admin/Artists/ArtistsDashboard';
import ArtWorksDashboard from './pages/Admin/ArtWorks/ArtWorksDashboard';
import ArtWorksRegister from './pages/Admin/ArtWorks/ArtWorksRegister';
import TimeLineDashboard from './pages/Admin/TimeLine/TimeLineDashboard';
import AdminDashboard from './pages/Admin/Administrators/AdminDashboard';
import ArtWorks from './pages/ArtWorks/ArtWorks';
import ArtWorksEdit from './pages/Admin/ArtWorks/ArtWorksEdit';
import ArtWork from './pages/ArtWork/ArtWork';
import Search from './pages/Search/Search';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={auth ? <AdminHome /> : <Home />} />
            <Route path='/artworks' element={<ArtWorks />} />
            <Route path='/artworks/:id' element={<ArtWork />} />
            <Route path='/about' element={<About />} />
            <Route path='/admin' element={!auth ? <Login /> : <Navigate to='/' />} />
            <Route path='/admin/register' element={<Register />} />
            {/* <Route path='/admin/register' element={auth ? <Register /> : <Navigate to='/' />} /> */}
            <Route path='/admin/profile' element={auth ? <AdminProfile /> : <Navigate to='/' />} />
            <Route path='/admin/expositions' element={auth && <ExpositionDashboard />} />
            <Route path='/admin/artworks' element={auth && <ArtWorksDashboard />} />
            <Route path='/admin/artworks/register' element={auth && <ArtWorksRegister />} />
            <Route path='/admin/artworks/:id' element={auth && <ArtWorksEdit />} />
            <Route path='/admin/dashboard' element={auth && <AdminDashboard />} />
            <Route path='/admin/timeline' element={auth && <TimeLineDashboard />} />
            <Route path='/admin/artists' element={auth && <ArtistsDashboard />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;