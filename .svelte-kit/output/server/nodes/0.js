import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bpc8aWER.js","_app/immutable/chunks/8AsGc6G2.js","_app/immutable/chunks/d6l7Xdkk.js","_app/immutable/chunks/d5pu_znH.js","_app/immutable/chunks/Cphl3bv_.js","_app/immutable/chunks/BPvXYaVj.js","_app/immutable/chunks/CTCHEIqW.js","_app/immutable/chunks/CUlzXemM.js","_app/immutable/chunks/De4OBVEq.js"];
export const stylesheets = ["_app/immutable/assets/0.CiA9g6rf.css","_app/immutable/assets/app.CzFB9xeo.css"];
export const fonts = [];
