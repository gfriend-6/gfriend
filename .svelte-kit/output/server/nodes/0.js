import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BYvBkoOl.js","_app/immutable/chunks/u_j2Ri5b.js","_app/immutable/chunks/CjLm0swp.js","_app/immutable/chunks/0OdlKLie.js","_app/immutable/chunks/yT9f1LAk.js","_app/immutable/chunks/DQVJU_fD.js","_app/immutable/chunks/DaK09nTn.js","_app/immutable/chunks/BGYhOGT_.js","_app/immutable/chunks/BG2obwIx.js"];
export const stylesheets = ["_app/immutable/assets/0.CiA9g6rf.css","_app/immutable/assets/app.ZtUZiSHB.css"];
export const fonts = [];
