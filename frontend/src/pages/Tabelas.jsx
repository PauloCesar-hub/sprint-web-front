import Banner from '../components/Banner.jsx'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StandingsWidget from '../components/StandingsWidget.jsx'
import LeagueSeasonPicker from '../components/LeagueSeasonPicker.jsx'

export default function Tabelas(){
  const [leagueId,setLeagueId] = useState('71')
  const [season,setSeason] = useState('2023')
  const [mode,setMode] = useState('widget') // 'widget' | 'rest'
  const [table,setTable]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(mode!=='rest') return;
    setLoading(true);
    axios.get(`/api/standings?league=${leagueId}&season=${season}`)
      .then(r=>{
        const resp = r.data.response || r.data
        let rows=[]
        try{ rows = resp[0].league.standings[0] }catch(e){ rows = resp }
        setTable(rows||[])
      })
      .catch(()=> setTable([]))
      .finally(()=> setLoading(false))
  },[leagueId, season, mode])

  return (
    <div className="py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tabela de Campeonatos</h1>
          <p className="text-slate-600 text-sm">Veja a classificação atual das principais ligas femininas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border rounded-full p-1 shadow-sm">
          <button onClick={()=> setMode('widget')} className={`px-4 py-1 rounded-full text-sm ${mode==='widget'?'bg-slate-900 text-white':'text-slate-700'}`}>Widget</button>
          <button onClick={()=> setMode('rest')} className={`px-4 py-1 rounded-full text-sm ${mode==='rest'?'bg-slate-900 text-white':'text-slate-700'}`}>API (REST)</button>
        </div>
      </header>

      <LeagueSeasonPicker leagueId={leagueId} season={season} setLeagueId={setLeagueId} setSeason={setSeason} />

      {mode==='widget' ? (
        <div className="mt-4 bg-white rounded-xl shadow p-4">
          <StandingsWidget apiKey={import.meta.env.VITE_APIFOOT_KEY || ''} leagueId={leagueId} season={season} showLogos />
          <p className="text-xs text-slate-500 mt-2">Dica: restrinja o domínio da sua chave no Dashboard do API-FOOTBALL para segurança.</p>
        </div>
      ) : (
        <div className="mt-4">
          {loading ? <div>Carregando tabela...</div> : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 sticky top-0">
                  <tr className="text-left">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Clube</th>
                    <th className="px-3 py-2">J</th>
                    <th className="px-3 py-2">V</th>
                    <th className="px-3 py-2">E</th>
                    <th className="px-3 py-2">D</th>
                    <th className="px-3 py-2">GP</th>
                    <th className="px-3 py-2">GC</th>
                    <th className="px-3 py-2">SG</th>
                    <th className="px-3 py-2">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((t,i)=>{
                    const teamName = t.team?.name || t.team || '—';
                    const all = t.all || t.overall || {};
                    return (
                      <tr key={t.team?.id || teamName + i} className="border-b last:border-none">
                        <td className="px-3 py-2">{t.rank || t.position || i+1}</td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          {t.team?.logo ? <img src={t.team.logo} alt="" className="w-5 h-5" /> : null}
                          <span className="font-medium">{teamName}</span>
                        </td>
                        <td className="px-3 py-2">{all.played ?? t.played ?? '—'}</td>
                        <td className="px-3 py-2">{all.win ?? t.win ?? '—'}</td>
                        <td className="px-3 py-2">{all.draw ?? t.draw ?? '—'}</td>
                        <td className="px-3 py-2">{all.lose ?? t.lose ?? '—'}</td>
                        <td className="px-3 py-2">{all.goals?.for ?? t.goalsFor ?? '—'}</td>
                        <td className="px-3 py-2">{all.goals?.against ?? t.goalsAgainst ?? '—'}</td>
                        <td className="px-3 py-2">{(all.goals?.for ?? 0) - (all.goals?.against ?? 0)}</td>
                        <td className="px-3 py-2 font-semibold">{t.points ?? t.pts ?? '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
