import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Noticias from './pages/Noticias.jsx'
import Tabelas from './pages/Tabelas.jsx'
import Jogos from './pages/Jogos.jsx'
import Artilharia from './pages/Artilharia.jsx'
export default function App(){
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='max-w-5xl mx-auto p-4 pt-20'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/noticias' element={<Noticias/>} />
          <Route path='/tabelas' element={<Tabelas/>} />
          <Route path='/jogos' element={<Jogos/>} />
          <Route path='/artilharia' element={<Artilharia/>} />
        </Routes>
      </main>
    </div>
  )
}
