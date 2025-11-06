import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Noticias(){
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    axios.get('/api/news?page=1&pageSize=12')
      .then(r=> setArticles(r.data.articles || r.data.response || []))
      .catch(()=> setArticles([]))
      .finally(()=> setLoading(false))
  },[])

  if(loading) return <div className='py-8'>Carregando...</div>

  return (
    <div className='py-8'>
      <h1 className='text-3xl font-bold'>Notícias</h1>
      <p className='text-slate-600 text-sm'>Cobertura do futebol feminino.</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        {articles.map((a,i)=>(
          <a key={a.url || i} className='group rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition block' href={a.url} target="_blank" rel="noreferrer">
            {a.urlToImage ? <img src={a.urlToImage} alt='' className='w-full h-40 object-cover'/> : null}
            <div className='p-4'>
              <div className='text-xs text-slate-500'>{a.source?.name}</div>
              <h3 className='font-semibold group-hover:underline'>{a.title}</h3>
              <p className='text-sm text-slate-600 mt-1 line-clamp-3'>{a.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
