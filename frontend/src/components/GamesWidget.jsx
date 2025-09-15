'use client';
import React, { useEffect, useRef } from 'react';
import WidgetLoader from './WidgetLoader.jsx';

export default function GamesWidget({ apiHost='v3.football.api-sports.io', apiKey, leagueId, season, date='', refresh=60, toolbar=true, modalGame=true, modalStandings=true, showLogos=true, theme='' }){
  const ref = useRef(null);
  useEffect(()=>{
    if(!ref.current) return;
    ref.current.innerHTML='';
    const set=(k,v)=> ref.current.setAttribute(k,String(v));
    set('data-host', apiHost);
    set('data-key', apiKey || '');
    set('data-league', String(leagueId || ''));
    set('data-season', String(season || ''));
    set('data-date', date || '');
    set('data-refresh', Math.max(15, Number(refresh)||60));
    set('data-show-toolbar', String(!!toolbar));
    set('data-modal-game', String(!!modalGame));
    set('data-modal-standings', String(!!modalStandings));
    set('data-show-logos', String(!!showLogos));
    set('data-theme', String(theme||''));
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles:true, cancelable:true }));
  },[apiHost, apiKey, leagueId, season, date, refresh, toolbar, modalGame, modalStandings, showLogos, theme]);
  return (<>
    <WidgetLoader />
    <div id="wg-api-football-games" ref={ref} className="wg_loader" />
  </>);
}
