
import React from 'react'

export default function Banner({ type='tabelas', className='' }){
  const src = {
    tabelas: '/assets/banner_tabelas.png',
    jogos: '/assets/banner_jogos.png',
    artilharia: '/assets/banner_artilharia.png'
  }[type] || '/assets/banner_tabelas.png';
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-fuchsia-600/30 bg-gradient-to-b from-fuchsia-500/10 to-transparent ${className}`}>
      <img src={src} alt={type} className="w-full h-40 md:h-56 object-cover opacity-95 animate-fadeIn" />
    </div>
  )
}
