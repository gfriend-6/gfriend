

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.ZsLIw3YS.js","_app/immutable/chunks/u_j2Ri5b.js","_app/immutable/chunks/CjLm0swp.js"];
export const stylesheets = [];
export const fonts = [];
