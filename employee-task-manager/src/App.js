import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskListPage from './pages/TaskListPage';
import EmployeeTasks from './pages/EmployeeTasks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/employee/:id/tasks" element={<EmployeeTasks />} />
          <Route path='/tasks' element={<TaskListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
