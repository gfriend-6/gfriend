

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CMc0aELC.js","_app/immutable/chunks/8AsGc6G2.js","_app/immutable/chunks/d6l7Xdkk.js"];
export const stylesheets = [];
export const fonts = [];
