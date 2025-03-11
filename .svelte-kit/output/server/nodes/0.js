import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bk1rIh63.js","_app/immutable/chunks/PouGpQZY.js","_app/immutable/chunks/DwZUwGx8.js","_app/immutable/chunks/Byvutpzn.js","_app/immutable/chunks/ChnTbVQw.js","_app/immutable/chunks/xc24-7yG.js"];
export const stylesheets = ["_app/immutable/assets/0.CiA9g6rf.css","_app/immutable/assets/app.DIkXoqN8.css"];
export const fonts = [];
