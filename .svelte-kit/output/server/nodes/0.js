import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DnjP4fag.js","_app/immutable/chunks/CE_swLSu.js","_app/immutable/chunks/BYLTsbat.js","_app/immutable/chunks/B-j-nzhe.js","_app/immutable/chunks/CTIfdKuQ.js","_app/immutable/chunks/DUjiu_U4.js","_app/immutable/chunks/J6ZmAdDH.js","_app/immutable/chunks/Drs2_v4N.js","_app/immutable/chunks/BUQRgvq-.js","_app/immutable/chunks/ETQbwrEZ.js"];
export const stylesheets = ["_app/immutable/assets/0.CiA9g6rf.css","_app/immutable/assets/app.ZtUZiSHB.css"];
export const fonts = [];
