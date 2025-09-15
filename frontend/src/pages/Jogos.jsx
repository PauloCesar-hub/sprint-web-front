import Banner from '../components/Banner.jsx'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GamesWidget from '../components/GamesWidget.jsx'
import LeagueSeasonPicker from '../components/LeagueSeasonPicker.jsx'

export default function Jogos(){
  const [leagueId,setLeagueId] = useState('71')
  const [season,setSeason] = useState('2023')
  const [mode,setMode] = useState('widget') // 'widget' | 'rest'
  const [games,setGames]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(mode!=='rest') return;
    setLoading(true);
    axios.get(`/api/fixtures?league=${leagueId}&season=${season}&next=12`)
      .then(r=> setGames(r.data.response || r.data || []))
      .catch(()=> setGames([]))
      .finally(()=> setLoading(false))
  },[leagueId, season, mode])

  return (
    <div className="py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jogos</h1>
          <p className="text-slate-600 text-sm">Próximas partidas e jogos do dia das ligas femininas.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border rounded-full p-1 shadow-sm">
          <button onClick={()=> setMode('widget')} className={`px-4 py-1 rounded-full text-sm ${mode==='widget'?'bg-slate-900 text-white':'text-slate-700'}`}>Widget</button>
          <button onClick={()=> setMode('rest')} className={`px-4 py-1 rounded-full text-sm ${mode==='rest'?'bg-slate-900 text-white':'text-slate-700'}`}>API (REST)</button>
        </div>
      </header>

      <LeagueSeasonPicker leagueId={leagueId} season={season} setLeagueId={setLeagueId} setSeason={setSeason} />

      {mode==='widget' ? (
        <div className="mt-4 bg-white rounded-xl shadow p-4">
          <GamesWidget apiKey={import.meta.env.VITE_APIFOOT_KEY || ''} leagueId={leagueId} season={season} toolbar modalGame modalStandings refresh={60} showLogos />
          <p className="text-xs text-slate-500 mt-2">Dica: use o seletor acima para trocar a liga; o widget atualiza automaticamente.</p>
        </div>
      ) : (
        <div className="mt-4">
          {loading ? <div>Carregando jogos...</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((g,i)=>{
                const home = g.teams?.home?.name || g.home?.name || '—';
                const away = g.teams?.away?.name || g.away?.name || '—';
                const hLogo = g.teams?.home?.logo;
                const aLogo = g.teams?.away?.logo;
                const dateStr = g.fixture?.date ? new Date(g.fixture.date).toLocaleString() : (g.date || '');
                return (
                  <div key={g.fixture?.id || i} className="bg-white rounded-xl shadow p-4">
                    <div className="text-xs text-slate-500 mb-2">{g.league?.name || '—'}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {hLogo ? <img src={hLogo} className="w-6 h-6" /> : null}
                        <span className="font-medium">{home}</span>
                      </div>
                      <span className="text-slate-500">vs</span>
                      <div className="flex items-center gap-2">
                        {aLogo ? <img src={aLogo} className="w-6 h-6" /> : null}
                        <span className="font-medium">{away}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mt-2">{dateStr}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
