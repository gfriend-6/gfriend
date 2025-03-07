

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CX3bDu5r.js","_app/immutable/chunks/CE_swLSu.js","_app/immutable/chunks/BYLTsbat.js"];
export const stylesheets = [];
export const fonts = [];
