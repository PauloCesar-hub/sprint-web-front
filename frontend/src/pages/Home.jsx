import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner.jsx'

export default function Home(){
  return (
    <div className='py-6 space-y-8'>
      <section className="rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-indigo-600 text-white p-8 shadow animate-fadeIn">
        <h1 className="text-4xl font-extrabold tracking-tight">Passa a Bola • Futebol Feminino</h1>
        <p className="mt-2 max-w-2xl text-white/90">Notícias, jogos, tabelas e artilharia — tudo em um só lugar.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/noticias" className="bg-white/10 hover:bg-white/20 rounded px-4 py-2">Últimas notícias</Link>
          <Link to="/jogos" className="bg-white text-slate-900 rounded px-4 py-2 font-semibold">Ver jogos</Link>
        </div>
      </section>

      {/* Banners principais */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/tabelas" className="group block">
          <Banner type="tabelas" className="group-hover:opacity-95 transition" />
        </Link>
        <Link to="/jogos" className="group block">
          <Banner type="jogos" className="group-hover:opacity-95 transition" />
        </Link>
        <Link to="/artilharia" className="group block">
          <Banner type="artilharia" className="group-hover:opacity-95 transition" />
        </Link>
      </section>


    </div>
  )
}