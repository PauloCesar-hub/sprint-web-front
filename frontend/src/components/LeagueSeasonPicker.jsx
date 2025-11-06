import React from 'react';
export default function LeagueSeasonPicker({ leagueId, season, setLeagueId, setSeason, leagues=[{id:71,name:'Brasileirão Feminino A1'}] }){
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs font-semibold text-slate-600">Liga (ID)</label>
        <input value={leagueId} onChange={e=> setLeagueId(e.target.value)} className="border rounded px-3 py-2 w-44" placeholder="71" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600">Temporada</label>
        <input value={season} onChange={e=> setSeason(e.target.value)} className="border rounded px-3 py-2 w-32" placeholder="2025" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600">Rápido</label>
        <select onChange={e=> {
            const [id, yr] = e.target.value.split('|');
            if(id){ setLeagueId(id); if(yr) setSeason(yr); }
          }} className="border rounded px-3 py-2 w-72">
          <option value="">Escolha uma liga feminina...</option>
          <option value="71|2025">Brasileirão Feminino A1 (71)</option>
          <option value="205|2025">NWSL (205)</option>
          <option value="44|2025">FA WSL (44)</option>
          <option value="103|2025">UEFA Women’s Champions League (103)</option>
          <option value="88|2025">Liga F (Espanha) (88)</option>
        </select>
      </div>
    </div>
  )
}
