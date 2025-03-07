export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll"]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CJdwi1Rg.js",app:"_app/immutable/entry/app.Bg931Myx.js",imports:["_app/immutable/entry/start.CJdwi1Rg.js","_app/immutable/chunks/BZn2moeI.js","_app/immutable/chunks/CE_swLSu.js","_app/immutable/chunks/J6ZmAdDH.js","_app/immutable/entry/app.Bg931Myx.js","_app/immutable/chunks/CE_swLSu.js","_app/immutable/chunks/BYLTsbat.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/timeline",
				pattern: /^\/timeline\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/timeline/gfriend_termination",
				pattern: /^\/timeline\/gfriend_termination\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/wins",
				pattern: /^\/wins\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
