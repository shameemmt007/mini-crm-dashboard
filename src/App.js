
import './App.css';
import {FaHome, FaUsers, FaChartBar, FaCog, FaBell, FaUserCircle} from 'react-icons/fa';

import { useState } from 'react';

import { Routes, Route, NavLink } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';

function App() {
  const [customers, setCustomers] = useState(()=>{
          const savedCustomerse = localStorage.getItem('customers');
  
          return savedCustomerse ? JSON.parse(savedCustomerse):[
              {
                  id:1,
                  name:'arun',
                  email:'arun@gmail.com',
                  phone:954325678,
                  company:'abc technologies',
                  status:'Active',
                  date:'01-10-2026'
              },
  
              {
                  id:2,
                  name:'arjun',
                  email:'arjun@gmail.com',
                  phone:954325678,
                  company:'kbc technologies',
                  status:'Inactive',
                  date:'30-10-2026'
              },
              {
                  id:3,
                  name:'salam',
                  email:'salam@gmail.com',
                  phone:954325678,
                  company:'unity technologies',
                  status:'Active',
                  date:'30-10-2026'
              },
              {
                  id:4,
                  name:'rafidha',
                  email:'rafidha@gmail.com',
                  phone:954325678,
                  company:'logics technologies',
                  status:'Inactive',
                  date:'15-10-2026'
              }
          ];
      });
  return (
    <div className='app-container'>
      <aside className='sidebar'>
        <h3 className='logo'>Mini CRM</h3>

        <nav>
          <NavLink to='/' className='nav-link' >
              <FaHome />dashboard
          </NavLink>
            

          <NavLink to='/customers' className='nav-link'>
            <FaUsers />Customers
          </NavLink>
            
          

          <a href='#reports' className='nav-link'>
            <FaChartBar /> reports
          </a>

          <a href='#settings' className='nav-link'>
            <FaCog /> Settings
          </a>
        </nav>
      </aside>


      <main className='main-content'>

        <header className='topbar'>
          <h4>Dashboard</h4>

          <div className='profile'>
            <FaBell />
            <FaUserCircle size={25}/>
            <span>Admin</span>
          </div>
        </header>

        <Routes >
          <Route path='/' element={<Dashboard customers={customers} />} />
          <Route path='/customers' element={<Customers customers={customers} setCustomers={setCustomers} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
