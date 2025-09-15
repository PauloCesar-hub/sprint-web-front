import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const APIFOOT_KEY = process.env.APIFOOT_KEY || '';
const NEWSAPI_KEY = process.env.NEWSAPI_KEY || '';
const DEFAULT_LEAGUE = process.env.DEFAULT_LEAGUE || '71'; // Brasileirão Feminino A1
const DEFAULT_SEASON = process.env.DEFAULT_SEASON || '2025';

function handleError(res, e, where){
  console.error(`[${where}]`, e?.response?.status, e?.response?.data || e.message);
  const status = e?.response?.status || 500;
  return res.status(status).json({ error: true, where, message: e?.response?.data || e.message });
}

// Simple JSON file db for favorites
const DB_PATH = path.join(__dirname, 'db.json');
function readDB(){
  try{ return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }catch{ return { favorites: [] }; }
}
function writeDB(db){ fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); }

// ---- API ROUTES ----

// /api/news?page=1&pageSize=12&q=keyword
app.get('/api/news', async (req,res)=>{
  try{
    if(!NEWSAPI_KEY){
      // Mock fallback
      return res.json({ articles: [
        { title: 'Sem chave NEWSAPI_KEY — exibindo notícias de exemplo', url: '#', source:{ name:'dev' }, description:'Configure NEWSAPI_KEY para notícias reais.', urlToImage:'' }
      ]});
    }
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 12);
    const q = req.query.q || 'futebol feminino OR women football';
    const r = await axios.get('https://newsapi.org/v2/everything', {
      params: { q, page, pageSize, language: 'pt' },
      headers: { 'X-Api-Key': NEWSAPI_KEY }
    });
    return res.json(r.data);
  }catch(e){ return handleError(res,e,'news'); }
});

// /api/standings?league=ID&season=YYYY
app.get('/api/standings', async (req,res)=>{
  try{
    if(!APIFOOT_KEY){
      return res.json({ response:[ { league:{ name:'Mock League', standings:[ [ { rank:1, team:{ name:'Time A' }, points:30, all:{ played:12, win:10, draw:0, lose:2, goals:{ for:30, against:10 } } } ] ] } } ] });
    }
    const league = req.query.league || DEFAULT_LEAGUE;
    const season = req.query.season || DEFAULT_SEASON;
    const r = await axios.get('https://v3.football.api-sports.io/standings', {
      params: { league, season },
      headers: { 'x-apisports-key': APIFOOT_KEY }
    });
    return res.json(r.data);
  }catch(e){ return handleError(res,e,'standings'); }
});

// /api/fixtures?league=ID&season=YYYY&next=10&date=YYYY-MM-DD
app.get('/api/fixtures', async (req,res)=>{
  try{
    if(!APIFOOT_KEY){
      return res.json({ response:[ { fixture:{ id:1, date: new Date().toISOString() }, teams:{ home:{ name:'Time A' }, away:{ name:'Time B' } }, league:{ name:'Mock League' } } ] });
    }
    const league = req.query.league || DEFAULT_LEAGUE;
    const season = req.query.season || DEFAULT_SEASON;
    const next = req.query.next;
    const date = req.query.date;
    const params = { league, season };
    if(next) params.next = next;
    if(date) params.date = date;
    const r = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params,
      headers: { 'x-apisports-key': APIFOOT_KEY }
    });
    return res.json(r.data);
  }catch(e){ return handleError(res,e,'fixtures'); }
});

// /api/topscorers?league=ID&season=YYYY
app.get('/api/topscorers', async (req,res)=>{
  try{
    if(!APIFOOT_KEY){
      return res.json({ response:[ { player:{ name:'Jogadora X', id:1, photo:'' }, statistics:[ { team:{ name:'Time A' }, goals:{ total:12 } } ] } ] });
    }
    const league = req.query.league || DEFAULT_LEAGUE;
    const season = req.query.season || DEFAULT_SEASON;
    const r = await axios.get('https://v3.football.api-sports.io/players/topscorers', {
      params: { league, season },
      headers: { 'x-apisports-key': APIFOOT_KEY }
    });
    return res.json(r.data);
  }catch(e){ return handleError(res,e,'topscorers'); }
});

// Favorites CRUD
app.get('/api/favorites', (req,res)=>{
  try{
    const db=readDB();
    return res.json(db.favorites||[]);
  }catch(e){ return handleError(res,e,'favorites:read'); }
});

app.post('/api/favorites', (req,res)=>{
  try{
    const item=req.body;
    const db=readDB();
    db.favorites = db.favorites || [];
    db.favorites.push({ id: Date.now(), ...item });
    writeDB(db);
    return res.json(db.favorites);
  }catch(e){ return handleError(res,e,'favorites:add'); }
});

app.delete('/api/favorites/:id', (req,res)=>{
  try{
    const id=Number(req.params.id);
    const db=readDB();
    db.favorites = (db.favorites||[]).filter(f=> f.id !== id);
    writeDB(db);
    return res.json(db.favorites);
  }catch(e){ return handleError(res,e,'favorites:del'); }
});

// Serve static built frontend if present
app.use('/', express.static(path.join(__dirname, '../frontend_dist')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on port', PORT));
