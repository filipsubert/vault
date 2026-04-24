# Casino — Štruktúra projektu

```
src/
├── App.jsx                    ← Root komponent, router medzi hrami
├── Lobby.jsx                  ← Hlavné lobby + art thumbnaily hier
├── SubPages.jsx               ← Vedľajšie stránky (Casino, Sports, Promo, VIP, Support)
│
├── shared/
│   ├── sfx.js                 ← Trieda SFX — všetky herné zvuky (Web Audio API)
│   ├── math.js                ← Herná matematika: RTP, Hi-Lo pravdepodobnosti, Mines RNG
│   ├── data.js                ← Statické dáta: LIVE_FEED, AMB_PTS, AMB_CSS
│   ├── icons.jsx              ← SVG ikony (objekt ICO)
│   └── css.js                 ← Globálne štýly + CSS pre každú hru (jeden template literal)
│
├── components/
│   ├── StatsModal.jsx         ← Modálne okno štatistík s profit grafom
│   ├── Shell.jsx              ← Layout: Ambient pozadie, Sidebar, TopBar, Ticker
│   └── Cards.jsx              ← Renderovanie kariet (CardFace, CardBack, RankLadder)
│
├── games/
│   ├── HiLo.jsx               ← Hra Vyššie / Nižšie (278 riadkov)
│   ├── Mines.jsx              ← Hra Míny (236 riadkov)
│   ├── Dice.jsx               ← Hra Kocky (332 riadkov)
│   ├── Blackjack.jsx          ← Hra Blackjack (505 riadkov)
│   ├── Crash.jsx              ← Hra Crash — art + game (712 riadkov)
│   ├── Wheel.jsx              ← Hra Kolo — art + game (555 riadkov)
│   ├── VideoPoker.jsx         ← Video Poker (524 riadkov)
│   ├── Keno.jsx               ← Hra Keno — art + math + game (498 riadkov)
│   ├── Coinflip.jsx           ← Hra Coinflip — art + game (506 riadkov)
│   ├── Plinko.jsx             ← Hra Plinko (1 130 riadkov)
│   ├── SweetBonanza.jsx       ← Slot Sweet Bonanza (1 674 riadkov)
│   ├── DogHouse.jsx           ← Slot Dog House (610 riadkov)
│   ├── LeBandit.jsx           ← Slot Le Bandit + LBMusic (2 703 riadkov)
│   ├── GatesOfOlympus.jsx     ← Slot Gates of Olympus (2 749 riadkov)
│   └── CloudPrincess.jsx      ← Slot Cloud Princess (2 370 riadkov)
│
└── textures.js                ← !! TVoj súbor s base64 obrázkami (pridaj sem)
                                   Exportuje: IMG_SCATTER, IMG_WILD, IMG_BLUE_G,
                                   IMG_GREEN_G, IMG_PURPLE_G, IMG_RED_G, IMG_YELLOW_G,
                                   IMG_CROWN, IMG_GRID, IMG_HOURGLASS, IMG_KALICH, IMG_RING
```

## Textúry

Súbor `textures.js` pridaj do `src/` a daj mu tento formát:

```js
export const IMG_SCATTER = "data:image/png;base64,...";
export const IMG_WILD    = "data:image/png;base64,...";
export const IMG_BLUE_G  = "data:image/png;base64,...";
// ... atď.
```

Potom v `games/GatesOfOlympus.jsx` odkomentuj import na vrchu súboru.

## Dôležité poznámky

- `shared/css.js` obsahuje CSS pre **všetky hry** v jednom template literáli — takto to bolo
  pôvodne navrhnuté a celý shell aplikácie vkladá `<style>{CSS}</style>` cez `App.jsx`.
- Každý herný súbor má na konci `export { NazovGame }` a v `App.jsx` zodpovedajúci `import`.
- `sfx` je singleton inštancia — importuje sa z `shared/sfx.js` do každej hry.
