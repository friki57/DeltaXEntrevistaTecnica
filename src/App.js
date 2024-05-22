import './Pets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import List from './pages/list';
import Create from './pages/create';

function App() {
  return (
    <Router>
      <div className="bodyBackground">
        <div>
          <header className="w-100 bg-primary p-3 d-flex flex-row justify-content-between align-items-center">
            <Link className='fs-1 text-light text-decoration-none' to="/">
              My Pets
            </Link>
            <div className='d-flex gap-4 px-4'>
              <Link className='text-light text-decoration-none' to="/pets/create">Create</Link>
              <Link className='text-light text-decoration-none' to="/pets/list">List</Link>
            </div>
          </header>
        </div>

        <Routes>
          <Route path="/pets/create" element={<Create />} />
          <Route path="/pets/list" element={<List />} />
          <Route path="/" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
