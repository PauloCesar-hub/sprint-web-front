
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Artilharia(){
  const [leagueId,setLeagueId] = useState('71')
  const [season,setSeason] = useState('2023')
  const [scorers,setScorers]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true);
    axios.get(`/api/topscorers?league=${leagueId}&season=${season}`)
      .then(r=> setScorers(r.data.response || r.data || []))
      .catch(()=> setScorers([]))
      .finally(()=> setLoading(false))
  },[leagueId, season])

  return (
    <div className='py-8'>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className='text-3xl font-bold'>Artilharia</h1>
          <p className='text-slate-600 text-sm'>Top goleadoras por liga e temporada.</p>
        </div>
        <div className="flex gap-2">
          <input value={leagueId} onChange={e=> setLeagueId(e.target.value)} className="border rounded px-3 py-2 w-40" placeholder="Liga (ex. 71)" />
          <input value={season} onChange={e=> setSeason(e.target.value)} className="border rounded px-3 py-2 w-28" placeholder="2022" />
        </div>
      </div>

      {loading ? <div className='mt-6'>Carregando...</div> : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
          {scorers.map((p,i)=>{
            const player = p.player || p;
            const stats = (p.statistics && p.statistics[0]) || {};
            const team = stats.team || p.team || {};
            const goals = stats.goals?.total ?? player.goals ?? 0;
            return (
              <div key={player.id || i} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                {player.photo ? <img src={player.photo} className="w-16 h-16 rounded-full object-cover" /> : null}
                <div className="flex-1">
                  <div className="text-xs text-slate-500">{team.name || '—'}</div>
                  <div className="font-semibold">{player.name || '—'}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold">{goals}</div>
                  <div className="text-xs text-slate-500">gols</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
