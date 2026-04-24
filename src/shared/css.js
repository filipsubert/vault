// ── Global styles (base shell + shared game panel + lobby + overlays + stats) ─
import { CSS_BASE } from "./css_base.js";
import { CSS_SHARED } from "./css_shared.js";
import { CSS_LOBBY } from "./css_lobby.js";
import { CSS_OVERLAYS } from "./css_overlays.js";
import { CSS_STATS } from "./css_stats.js";

const CSS = CSS_BASE + CSS_SHARED + CSS_LOBBY + CSS_OVERLAYS + CSS_STATS;

export { CSS };
