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
		client: {start:"_app/immutable/entry/start.CUx5PYLH.js",app:"_app/immutable/entry/app.BU_VmsSa.js",imports:["_app/immutable/entry/start.CUx5PYLH.js","_app/immutable/chunks/CITdYyKU.js","_app/immutable/chunks/DBueJji7.js","_app/immutable/chunks/Dy5kwvZB.js","_app/immutable/entry/app.BU_VmsSa.js","_app/immutable/chunks/DBueJji7.js","_app/immutable/chunks/D0RhbEBz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
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
				id: "/snapshots/[slug]",
				pattern: /^\/snapshots\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/timeline",
				pattern: /^\/timeline\/?$/,
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

export const prerendered = new Set([]);

export const base_path = "";
