# Passa a Bola • Portal de Notícias de Futebol Feminino (v2)

Portal full‑stack com **React (Vite)** no frontend e **Express** no backend, integrando:
- **API‑FOOTBALL v3**: Tabela (Standings), Jogos (Fixtures), Artilharia (Top Scorers)
- **NewsAPI**: últimas notícias sobre futebol feminino

O frontend permite alternar entre **Widgets oficiais do API‑FOOTBALL** (embeds) e **consumo REST** via backend.

---

## Arquitetura
```text
Futebolfv2/
└─ Futebolfv2/
   ├─ backend/              # API Express
   │  ├─ server.js          # rotas /api/news, /api/standings, /api/fixtures, /api/topscorers, /api/favorites
   │  ├─ .env               # chaves e defaults (exemplo abaixo)
   │  └─ db.json            # “banco” local para favoritos
   └─ frontend/             # SPA React + Tailwind (via CDN)
      ├─ index.html         # carrega Tailwind via CDN e /src/main.jsx
      └─ src/
         ├─ App.jsx         # rotas e layout
         ├─ components/
         │  ├─ Navbar.jsx
         │  ├─ WidgetLoader.jsx
         │  ├─ StandingsWidget.jsx
         │  ├─ GamesWidget.jsx
         │  └─ LeagueSeasonPicker.jsx
         └─ pages/
            ├─ Home.jsx
            ├─ Noticias.jsx
            ├─ Tabelas.jsx
            ├─ Jogos.jsx
            ├─ Artilharia.jsx
            └─ Favorites.jsx
```

## Requisitos
- Node.js 18+
- Chaves de API:
  - **APIFOOT_KEY** (API‑FOOTBALL) → https://dashboard.api-football.com/
  - **NEWSAPI_KEY** (NewsAPI.org) → https://newsapi.org/

## Como rodar (DEV)
1. **Backend**
   ```bash
   cd Futebolfv2/backend
   npm i
   # edite o arquivo .env:
   # APIFOOT_KEY=SUACHAVE
   # NEWSAPI_KEY=SUACHAVE
   # DEFAULT_LEAGUE=71
   # DEFAULT_SEASON=2025
   # PORT=4000
   npm run dev
   ```
   Endpoints:
   - `GET /api/news?page=1&pageSize=12&q=` — notícias (fallback mock se NEWSAPI_KEY ausente)
   - `GET /api/standings?league={id}&season={yyyy}` — tabela (fallback mock se APIFOOT_KEY ausente)
   - `GET /api/fixtures?league={id}&season={yyyy}&next=12&date=YYYY-MM-DD` — jogos
   - `GET /api/topscorers?league={id}&season={yyyy}` — artilharia
   - `GET/POST/DELETE /api/favorites` — CRUD simples em arquivo `db.json`

2. **Frontend**
   ```bash
   cd Futebolfv2/frontend
   npm i
   # Para usar os WIDGETS (embeds) é necessário expor a chave no client:
   VITE_APIFOOT_KEY="SUACHAVE" npm run dev
   # (Se preferir evitar expor a chave, use apenas o modo REST das páginas Tabelas/Jogos)
   ```

## Produção (build)
- Frontend (Vite): `npm run build` gera `dist/`. Copie para `backend/../frontend_dist` se quiser servir via Express (rota estática já configurada).
- Backend: Suba em um serviço Node (PM2, Docker, etc.) e configure variáveis de ambiente.

## Páginas e Funcionalidades
- **Home**: hero + atalhos (Notícias, Jogos, Tabela, Artilharia).
- **Notícias**: grid 3 col.; fonte, título, imagem; abre no site da notícia.
- **Jogos**: toggle **Widget** (embed “Games”) ↔ **REST** (cartões dos próximos jogos). Seletor de liga/temporada.
- **Tabelas**: toggle **Widget** (embed Standings) ↔ **REST** (tabela HTML responsiva). Seletor de liga/temporada.
- **Artilharia**: cards com jogadoras (foto, clube, gols).
- **Favoritos**: lista itens salvos via `/api/favorites` (integração de salvamento fica a seu critério).

## Segurança e Boas Práticas
- **Widgets** do API‑FOOTBALL exigem **chave no cliente**. No Dashboard, **restrinja por domínio**.
- Para evitar expor a chave, prefira **modo REST** (o backend injeta a chave no header `x-apisports-key`).
- Respeite **rate‑limits** de ambas as APIs.
- `data-refresh` dos widgets ≥ 15s (recomendado).

## Customização de Ligas Femininas (IDs úteis)
- Brasileirão Feminino A1 → `71`
- NWSL (EUA) → `205`
- FA WSL (Inglaterra) → `44`
- UEFA Women’s Champions League → `103`
- Liga F (Espanha) → `88`
> Os IDs podem variar; confirme no Dashboard (Ids → Leagues) ou via endpoint `/leagues`.

## Troubleshooting
- “**CORS**”: certifique‑se de rodar o backend e consumir `/api/...` da mesma origem (ou ajustar `cors()`).
- “**401/403** na API‑FOOTBALL**”: confira `APIFOOT_KEY` e **restrição de domínios**.
- “**Sem dados**”: sem chaves, rotas retornam **mocks** para facilitar o dev.
- “**Widgets não carregam**”: verifique se `VITE_APIFOOT_KEY` foi passado ao `npm run dev` e se o script `widgets.js` não foi bloqueado pelo navegador.

## Licença
Uso educacional/demonstrativo. Ajuste conforme sua necessidade editorial.
