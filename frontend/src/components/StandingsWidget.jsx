'use client';
import React, { useEffect, useRef } from 'react';
import WidgetLoader from './WidgetLoader.jsx';

export default function StandingsWidget({ apiHost='v3.football.api-sports.io', apiKey, leagueId, season, showLogos=true, theme='' }){
  const ref = useRef(null);
  useEffect(()=>{
    if(!ref.current) return;
    ref.current.innerHTML='';
    ref.current.setAttribute('data-host', apiHost);
    ref.current.setAttribute('data-key', apiKey || '');
    ref.current.setAttribute('data-league', String(leagueId || ''));
    ref.current.setAttribute('data-season', String(season || ''));
    ref.current.setAttribute('data-show-logos', String(!!showLogos));
    ref.current.setAttribute('data-theme', String(theme||''));
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles:true, cancelable:true }));
  },[apiHost, apiKey, leagueId, season, showLogos, theme]);
  return (<>
    <WidgetLoader />
    <div id="wg-api-football-standings" ref={ref} className="wg_loader" />
  </>);
}
