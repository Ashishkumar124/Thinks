## 2026-09-23 12:21:15.621Z load
- url: http://localhost:3000/

## 2026-09-23 12:21:16.174Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-23 12:23:16.212Z load
- url: http://localhost:3000/

## 2026-09-23 12:24:16.072Z load
- url: http://localhost:3000/

## 2026-09-23 12:24:23.066Z load
- url: http://localhost:3000/

## 2026-09-23 12:24:23.230Z window.error
- message: Uncaught SyntaxError: The requested module '/src/pages/Dashboard.jsx' does not provide an export named 'default'
- source: http://localhost:3000/src/App.jsx?t=1790166262883
- line: 14
- col: 8
- stack: SyntaxError: The requested module '/src/pages/Dashboard.jsx' does not provide an export named 'default'

## 2026-09-23 12:25:04.050Z load
- url: http://localhost:3000/

## 2026-09-23 12:25:04.142Z window.error
- message: Uncaught SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'
- source: http://localhost:3000/src/App.jsx?t=1790166295189
- line: 14
- col: 8
- stack: SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'

## 2026-09-23 12:25:06.186Z load
- url: http://localhost:3000/

## 2026-09-23 12:25:06.285Z window.error
- message: Uncaught SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'
- source: http://localhost:3000/src/App.jsx?t=1790166295189
- line: 14
- col: 8
- stack: SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'

## 2026-09-23 12:25:12.412Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id],\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-assisted-id] {\n\t\tcursor: default !important;\n\t\toverflow-wrap: anywhere;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id][contenteditable=\"true\"],\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-assisted-id][contented..."}

## 2026-09-23 12:26:20.429Z load
- url: http://localhost:3000/

## 2026-09-23 12:26:20.521Z window.error
- message: Uncaught SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'
- source: http://localhost:3000/src/App.jsx?t=1790166341868
- line: 14
- col: 8
- stack: SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'

## 2026-09-23 12:26:24.667Z load
- url: http://localhost:3000/

## 2026-09-23 12:26:24.768Z window.error
- message: Uncaught SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'
- source: http://localhost:3000/src/App.jsx?t=1790166341868
- line: 14
- col: 8
- stack: SyntaxError: The requested module '/src/pages/DashboardPage.jsx' does not provide an export named 'default'

## 2026-09-23 12:31:11.807Z load
- url: http://localhost:3000/

## 2026-09-23 12:31:18.804Z load
- url: http://localhost:3000/

## 2026-09-23 12:32:57.045Z load
- url: http://localhost:3000/

## 2026-09-23 12:33:56.988Z load
- url: http://localhost:3000/

## 2026-09-23 12:34:07.609Z load
- url: http://localhost:3000/

## 2026-09-23 12:34:57.479Z load
- url: http://localhost:3000/

## 2026-09-23 12:35:19.459Z load
- url: http://localhost:3000/

## 2026-09-23 12:35:53.664Z load
- url: http://localhost:3000/

## 2026-09-23 12:36:56.929Z load
- url: http://localhost:3000/

## 2026-09-23 12:37:56.948Z load
- url: http://localhost:3000/

## 2026-09-23 12:38:56.995Z load
- url: http://localhost:3000/

## 2026-09-23 12:39:03.884Z load
- url: http://localhost:3000/

## 2026-09-23 12:40:01.942Z load
- url: http://localhost:3000/

## 2026-09-23 12:40:10.324Z load
- url: http://localhost:3000/

## 2026-09-23 12:44:49.701Z load
- url: http://localhost:3000/

## 2026-09-23 12:45:04.045Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"360° Advertising & Marketing AgencyWe make brandsimpossible to ignore.From outdoor advertising and digital campaigns to events, print and visual production — we create communication that gets noticed.Explore Our ServicesView Our WorkScroll to explore"}

## 2026-09-23 12:45:04.307Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"360° Advertising & Marketing AgencyWe make brandsimpossible to ignore.From outdoor advertising and digital campaigns to events, print and visual production — we create communication that gets noticed.Explore Our ServicesView Our WorkScroll to explore"}

## 2026-09-23 12:45:13.522Z load
- url: http://localhost:3000/dashboard

## 2026-09-23 12:45:13.647Z navigate
- url: http://localhost:3000/dashboard
- via: replaceState

## 2026-09-23 12:45:16.020Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-23 12:45:16.811Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-23 12:45:16.815Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:45:24.219Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add Campaign"}

## 2026-09-23 12:45:25.214Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:25.308Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:30.173Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"Ashish","valueLength":6,"text":""}

## 2026-09-23 12:45:30.174Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"Ashish","valueLength":6,"text":""}

## 2026-09-23 12:45:30.175Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:30.275Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:35.699Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"MG","valueLength":2,"text":""}

## 2026-09-23 12:45:35.700Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"MG","valueLength":2,"text":""}

## 2026-09-23 12:45:35.803Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✓ Save Campaign"}

## 2026-09-23 12:45:35.804Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"Ashish","length":6,"redacted":false},{"label":"[input]","type":"text","value":"MG","length":2,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-23","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:45:48.635Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"← All CampaignsAshishActiveBrand AwarenessClient: MG✏️ Edit CampaignOverview (0)Posts (0)Influencers (0)Media (0)Campaign InformationClientMGCategoryBrand AwarenessStatusActiveStart Date2026-09-23End Date—Created2026-09-23 12:45:35DescriptionNo description.🌐 Social Media Handles+ Edit HandlesNo social handles added.🚀 Platforms Campaign Ran OnManually add sites where this campaign was published+ Add PlatformNo platforms added.Posts0Influencers0Media Files0"}

## 2026-09-23 12:45:48.923Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Posts (0)"}

## 2026-09-23 12:45:50.539Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📝"}

## 2026-09-23 12:45:51.139Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add Post"}

## 2026-09-23 12:45:52.196Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:52.267Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:52.718Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:52.820Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:55.227Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:57.301Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"C:\\fakepath\\WhatsApp Image 2026-09-23 at 1.04.16 PM.jpeg","valueLength":56,"text":""}

## 2026-09-23 12:45:57.302Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:45:57.412Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:01.685Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"Think","valueLength":5,"text":""}

## 2026-09-23 12:46:01.685Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"Think","valueLength":5,"text":""}

## 2026-09-23 12:46:01.795Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save"}

## 2026-09-23 12:46:01.797Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"Think","length":5,"redacted":false},{"label":"[select]","type":"select-one","value":"Instagram","length":9,"redacted":false},{"label":"[select]","type":"select-one","value":"Image","length":5,"redacted":false},{"label":"[url]","type":"url","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"C:\\fakepath\\WhatsApp Image 2026-09-23 at 1.04.16 PM.jpeg","length":56,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-23","length":10,"redacted":false},{"label":"[select]","type":"select-one","value":"Draft","length":5,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:46:03.219Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers (0)"}

## 2026-09-23 12:46:04.611Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import"}

## 2026-09-23 12:46:05.164Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:05.299Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:09.674Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:11.725Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1547061976#gid=1547061976","valueLength":118,"text":""}

## 2026-09-23 12:46:11.726Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1547061976#gid=1547061976","valueLength":118,"text":""}

## 2026-09-23 12:46:11.816Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-23 12:46:11.817Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"https://docs.google.com/spreadsheets/d/...","type":"url","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1547061976#gid=1547061976","length":118,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:46:15.523Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-23 12:46:15.524Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"https://docs.google.com/spreadsheets/d/...","type":"url","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1547061976#gid=1547061976","length":118,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:46:27.931Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import Influencers✕🔗 Google Sheets URLNote: requires a backend proxy in production.📁 CSV File📋 Or Paste CSVCancelImport"}

## 2026-09-23 12:46:28.339Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-23 12:46:28.340Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"https://docs.google.com/spreadsheets/d/...","type":"url","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1547061976#gid=1547061976","length":118,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:46:30.299Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cancel"}

## 2026-09-23 12:46:33.879Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Media (1)"}

## 2026-09-23 12:46:33.882Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Media (1)"}

## 2026-09-23 12:46:34.507Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Media (1)"}

## 2026-09-23 12:46:36.700Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Media (1)"}

## 2026-09-23 12:46:37.852Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Overview (1)"}

## 2026-09-23 12:46:38.611Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Posts (1)"}

## 2026-09-23 12:46:42.019Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:46:47.827Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-23 12:46:52.803Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:46:54.323Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Open →"}

## 2026-09-23 12:46:55.931Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers (0)"}

## 2026-09-23 12:46:57.260Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"InfluencersAll Categories📊 Import+ Add"}

## 2026-09-23 12:46:57.571Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import"}

## 2026-09-23 12:46:58.261Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:58.363Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:59.765Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:46:59.766Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:46:59.767Z focus
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","value":"","valueLength":0,"text":""}

## 2026-09-23 12:46:59.926Z click
- element: {"tag":"textarea","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","value":"","valueLength":0,"text":""}

## 2026-09-23 12:47:01.099Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:47:01.219Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:47:01.388Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:47:01.563Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:47:04.934Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"Google Sheet import requires a backend proxy. Please use CSV file or paste CSV.","valueLength":79,"text":""}

## 2026-09-23 12:47:05.011Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import Influencers✕🔗 Google Sheets URLNote: requires a backend proxy in production.📁 CSV File📋 Or Paste CSVCancelImport"}

## 2026-09-23 12:47:05.499Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✕"}

## 2026-09-23 12:47:49.763Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Posts (1)"}

## 2026-09-23 12:47:50.675Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Media (1)"}

## 2026-09-23 12:47:51.436Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Overview (1)"}

## 2026-09-23 12:47:53.027Z click
- element: {"tag":"p","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"No social handles added."}

## 2026-09-23 12:47:54.156Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Edit Handles"}

## 2026-09-23 12:47:55.267Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✕"}

## 2026-09-23 12:47:56.508Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🚀 Platforms Campaign Ran OnManually add sites where this campaign was published+ Add PlatformNo platforms added."}

## 2026-09-23 12:47:57.179Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🚀 Platforms Campaign Ran OnManually add sites where this campaign was published+ Add PlatformNo platforms added."}

## 2026-09-23 12:47:57.443Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add Platform"}

## 2026-09-23 12:47:58.507Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✕"}

## 2026-09-23 12:47:59.803Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Overview (1)Posts (1)Influencers (0)Media (1)"}

## 2026-09-23 12:48:09.443Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-23 12:48:18.388Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:48:19.347Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-09-23 12:48:21.251Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:48:25.235Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Open →"}

## 2026-09-23 12:48:27.124Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers (0)"}

## 2026-09-23 12:48:28.283Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import"}

## 2026-09-23 12:48:29.207Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:48:29.307Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:48:35.252Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:48:36.038Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:48:36.147Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:26.994Z load
- url: http://localhost:3000/dashboard

## 2026-09-23 12:54:32.518Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:54:43.524Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"MG"}

## 2026-09-23 12:54:43.700Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ActiveBrand AwarenessAshishClient: MG2026-09-231 postsOpen →🗑️"}

## 2026-09-23 12:54:45.500Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Open →"}

## 2026-09-23 12:54:47.388Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers (0)"}

## 2026-09-23 12:54:48.596Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import"}

## 2026-09-23 12:54:49.175Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:49.269Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:50.479Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:50.565Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:53.396Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:54:54.516Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"C:\\fakepath\\MG_Advertising_Content_Calendar_Optimized_1-15_Sep_2026.xlsx","valueLength":72,"text":""}

## 2026-09-23 12:54:54.612Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-23 12:54:54.615Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"https://docs.google.com/spreadsheets/d/...","type":"url","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"C:\\fakepath\\MG_Advertising_Content_Calendar_Optimized_1-15_Sep_2026.xlsx","length":72,"redacted":false},{"label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:55:03.364Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:05.356Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:07.004Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:08.548Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:10.324Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:11.820Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:13.324Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:14.932Z click
- element: {"tag":"td","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:15.252Z click
- element: {"tag":"td","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:15.572Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:17.220Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:18.756Z click
- element: {"tag":"td","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:19.252Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:22.124Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:24.164Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:25.796Z click
- element: {"tag":"td","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:26.276Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:27.972Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:29.604Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:31.076Z click
- element: {"tag":"td","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:31.589Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Remove"}

## 2026-09-23 12:55:33.542Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add"}

## 2026-09-23 12:55:34.308Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"@handle","label":"@handle","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:34.404Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":"@handle","label":"@handle","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:34.700Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:34.804Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:35.093Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":null,"label":"[url]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:35.226Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":null,"label":"[url]","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:36.210Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"0","valueLength":1,"text":""}

## 2026-09-23 12:55:36.358Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"0","valueLength":1,"text":""}

## 2026-09-23 12:55:36.540Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":null,"placeholder":null,"label":"[number]","value":"0","valueLength":1,"text":""}

## 2026-09-23 12:55:36.660Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cancel"}

## 2026-09-23 12:55:37.692Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add"}

## 2026-09-23 12:55:38.336Z focus
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"A","valueLength":1,"text":"Category ACategory BCategory CCategory DCategory ECategory F"}

## 2026-09-23 12:55:38.437Z click
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"A","valueLength":1,"text":"Category ACategory BCategory CCategory DCategory ECategory F"}

## 2026-09-23 12:55:39.144Z blur
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"A","valueLength":1,"text":"Category ACategory BCategory CCategory DCategory ECategory F"}

## 2026-09-23 12:55:39.244Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👤 Add Creator✕Full Name *Handle *Profile LinkFollowersCategory *Category ACategory BCategory CCategory DCategory ECategory FCancelAdd"}

## 2026-09-23 12:55:40.388Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"All Categories"}

## 2026-09-23 12:55:41.420Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"THINKDIGITAL MEDIADashboardCampaignsAnalytics+Add Campaign2Alexander VanceManaging Director (Admin)ADashboardCampaignsAnalytics← All CampaignsAshishActiveBrand AwarenessClient: MG✏️ Edit CampaignOverview (1)Posts (1)Influencers (0)Media (1)InfluencersAll CategoriesCategory ACategory BCategory CCategory DCategory ECategory FDoneClear📊 Import+ Add🌟No influencers assigned yet."}

## 2026-09-23 12:55:42.084Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Clear"}

## 2026-09-23 12:55:42.500Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"THINKDIGITAL MEDIADashboardCampaignsAnalytics+Add Campaign2Alexander VanceManaging Director (Admin)ADashboardCampaignsAnalytics← All CampaignsAshishActiveBrand AwarenessClient: MG✏️ Edit CampaignOverview (1)Posts (1)Influencers (0)Media (1)InfluencersAll Categories📊 Import+ Add🌟No influencers assigned yet."}

## 2026-09-23 12:55:45.292Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"📊 Import"}

## 2026-09-23 12:55:45.844Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:45.956Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:53.556Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:54.493Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:54.797Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-23 12:55:56.061Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1237201837#gid=1237201837","valueLength":118,"text":""}

## 2026-09-23 12:55:56.061Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1237201837#gid=1237201837","valueLength":118,"text":""}

## 2026-09-23 12:55:56.157Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-23 12:55:56.157Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"https://docs.google.com/spreadsheets/d/...","type":"url","value":"https://docs.google.com/spreadsheets/d/1TuRwSq0JhHXZq0093IWWJRaEJbArS6DySWSdsedqdJU/edit?gid=1237201837#gid=1237201837","length":118,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-23 12:56:08.604Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"All Categories"}

## 2026-09-23 12:56:09.261Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Category A"}

## 2026-09-23 12:56:09.261Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:09.264Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:09.289Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:11.404Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:11.516Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Category B"}

## 2026-09-23 12:56:11.516Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:11.517Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:11.541Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.246Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.341Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Category B"}

## 2026-09-23 12:56:12.341Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.342Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.362Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.717Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category B","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.804Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Category A"}

## 2026-09-23 12:56:12.805Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.806Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:12.835Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:13.447Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"checkbox","id":null,"placeholder":null,"label":"Category A","value":"on","valueLength":2,"text":""}

## 2026-09-23 12:56:13.532Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Clear"}

## 2026-09-23 12:56:13.981Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"← All CampaignsAshishActiveBrand AwarenessClient: MG✏️ Edit CampaignOverview (1)Posts (1)Influencers (194)Media (1)InfluencersAll Categories📊 Import+ Add#NameHandleProfileFollowersCategoryAction1Prajakta Koli@mostlysanehttps://www.instagram.com/mostlysane/?hl=en0ARemove2Niharika Nm@niharika_nmhttps://www.instagram.com/niharika_nm/3.4MBRemove3Kenny Sebastian@kennethsebhttps://www.instagram.com/kennethseb/1.1MBRemove4Sejal Kumar@sejalkumar1195https://www.instagram.com/sejalkumar1195/0ARemove5Kusha Kapila@kushakapilahttps://www.instagram.com/kushakapila/0ARemove6Ranveer Allahbadia@beerbicepshttps://www.instagram.com/beerbiceps/4.1MBRemove7Vir Das@virdashttps://www.instagram.com/virdas/2.2MBRemove8Akshay Kakkar@aksshaykakkarhttps://www.instagram.com/aksshaykakkar/0ARemove9Abhishek Dargarh@capturingrawhttps://www.instagram.com/capturingraw/57.8KERemove10Vibhuti Paliwal@bon_appetit_199https://www.instagram.com/bon_appetit_199/0ARemove11Vikas Silwal@flavourful_mindshttps://www.instagram.com/flavourful_minds/0ARemove12Anu Joseph@anususamajosephhttps://www.instagram.com/anususamajoseph/0ARemove13Akshat Mishra@the.inspiring.foodiehttps://www.instagram.com/the.inspiring.foodie/88.5KERemove14Ahteshaam Hublikar@iamahteshaamhttps://www.instagram.com/iamahteshaam/45KFRemove15Tiny Chef Juhi@thattinychefhttps://www.instagram.com/thattinychef/52.5KERemove16Swati Khosla@thegirlinphulkarihttps://www.instagram.com/thegirlinphulkari/59.9KERemove17Harshit@plate_se_zuban_takhttps://www.instagram.com/plate_se_zuban_tak/0ARemove18Shilpi Singh@shilpi_kitchenhttps://www.instagram.com/shilpi._kitchen/176KERemove19Oye It's Neha@oyeitsnehahttps://www.youtube.com/results?search_query=%40oyeitsneha0ARemove20Shweta@SugarSpiceNiceIndiahttps://www.instagram.com/sugarspiceniceindia/28.1KARemove21Tushar Dhanwani@tushardhanwanihttps://www.youtube.com/@TusharDhanwani329KDRemove22Sabuman@Sabumanhttps://www.instagram.com/sabuman/0ARemove23Nargis Mallick@journey20youtube.com/@oyeitsneha148KERemove24Aanam C@..."}

## 2026-09-23 12:56:16.276Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 12:56:17.124Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🗑️"}

## 2026-09-23 12:56:20.213Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"THINKDIGITAL MEDIA"}

## 2026-09-23 12:56:26.072Z load
- url: http://localhost:3000/

## 2026-09-23 12:59:34.733Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-23 12:59:34.736Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-23 12:59:36.180Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"THINKDIGITAL MEDIA"}

## 2026-09-23 12:59:39.139Z navigate
- url: http://localhost:3000/
- via: popstate

## 2026-09-23 13:02:01.108Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-23 13:02:01.111Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-23 13:02:04.796Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-23 13:02:06.388Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"+ Add Campaign"}

## 2026-09-23 13:02:07.900Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"← Back"}

## 2026-09-23 13:02:08.724Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-09-23 13:02:09.236Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 05:10:26.376Z load
- url: http://localhost:3000/

## 2026-09-24 05:10:26.528Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 05:10:26.543Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 05:10:34.264Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 05:10:34.265Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 05:10:39.739Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 05:10:40.419Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 05:10:40.422Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 05:10:49.589Z navigate
- url: http://localhost:3000/
- via: popstate

## 2026-09-24 05:10:53.263Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"360° Advertising & Marketing AgencyWe make brandsimpossible to ignore.From outdoor advertising and digital campaigns to events, print and visual production — we create communication that gets noticed.Explore Our ServicesView Our WorkScroll to explore"}

## 2026-09-24 09:36:17.011Z load
- url: http://localhost:3000/

## 2026-09-24 09:36:17.158Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 09:36:17.176Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:36:21.173Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 09:36:21.174Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 09:36:22.708Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 09:36:23.268Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 09:36:23.274Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 09:36:25.996Z click
- element: {"tag":"h1","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Welcome back, Admin"}

## 2026-09-24 09:36:26.284Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DB"}

## 2026-09-24 09:36:27.612Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:36:28.004Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric Platform"}

## 2026-09-24 09:36:28.812Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:36:29.188Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DB"}

## 2026-09-24 09:36:30.004Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:36:30.356Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DB"}

## 2026-09-24 09:36:31.164Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:36:31.524Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DB"}

## 2026-09-24 09:36:38.380Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:36:38.724Z click
- element: {"tag":"main","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DBActive Campaigns00 completed0 totalTotal Posts00 publishedAcross all campaignsInfluencers0Unique handlesIn the networkRecent Activity1Latest eventsLast 30 recordsCampaigns OverviewNo campaigns yet.Create First Campaign"}

## 2026-09-24 09:36:56.572Z click
- element: {"tag":"header","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:38:13.892Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 09:47:01.028Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"DashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:47:02.042Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"DashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 09:51:44.275Z load
- url: http://localhost:3000/

## 2026-09-24 09:51:44.372Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 09:51:44.387Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:54:10.534Z load
- url: http://localhost:3000/

## 2026-09-24 09:54:10.627Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:54:25.519Z load
- url: http://localhost:3000/

## 2026-09-24 09:54:25.605Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:55:12.030Z load
- url: http://localhost:3000/

## 2026-09-24 09:55:12.105Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:55:30.596Z load
- url: http://localhost:3000/

## 2026-09-24 09:55:30.643Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 09:59:51.037Z load
- url: http://localhost:3000/

## 2026-09-24 09:59:51.134Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:00:59.651Z load
- url: http://localhost:3000/

## 2026-09-24 10:00:59.994Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:01:01.047Z load
- url: http://localhost:3000/

## 2026-09-24 10:01:01.287Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:01:01.370Z load
- url: http://localhost:3000/

## 2026-09-24 10:01:01.775Z load
- url: http://localhost:3000/

## 2026-09-24 10:01:01.904Z load
- url: http://localhost:3000/

## 2026-09-24 10:01:02.074Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:01:02.246Z load
- url: http://localhost:3000/

## 2026-09-24 10:01:02.807Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:01:04.148Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 10:01:04.149Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 10:01:05.528Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:01:05.832Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:01:05.963Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:01:06.104Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:01:09.076Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:01:21.524Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"DashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 10:01:22.906Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:08:26.612Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:09:12.026Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:10:06.679Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:10:12.019Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:11:06.765Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:11:12.044Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:11:31.790Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:14:22.057Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:15:12.033Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:15:22.113Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:16:27.155Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:17:07.298Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:17:27.266Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:17:42.287Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:18:02.333Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:19:42.497Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:20:12.040Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:21:12.038Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:22:12.035Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:22:33.505Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:22:36.381Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 10:23:21.747Z load
- url: http://localhost:3000/

## 2026-09-24 10:23:22.564Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 10:23:22.607Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:23:25.740Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 10:23:26.148Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 10:23:26.150Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 10:23:32.772Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AdminDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 10:23:33.340Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Admin"}

## 2026-09-24 10:23:34.587Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AdminDashboardCampaignsAnalyticsAdd Campaign1AdminAdminA"}

## 2026-09-24 10:59:33.588Z load
- url: http://localhost:3000/

## 2026-09-24 10:59:33.801Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 10:59:33.829Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 10:59:36.484Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 10:59:36.972Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 10:59:36.974Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 10:59:40.141Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 10:59:41.099Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 10:59:43.443Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 10:59:46.907Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 10:59:47.427Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 10:59:47.811Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 10:59:48.523Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-09-24 10:59:49.787Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 11:00:29.414Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 11:00:29.891Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"DashboardCampaignsInfluencersAnalyticsAdd Campaign1AdminAdminA✨ Campaign-Centric PlatformWelcome back, AdminEach campaign is a parent container for its posts, media, platforms and assigned influencers.Add CampaignReset DBActive Campaigns00 completed0 totalTotal Posts00 publishedAcross all campaignsInfluencers00 in company listUnique handlesRecent Activity1Latest eventsLast 30 recordsCampaigns OverviewNo campaigns yet.Create First CampaignDashboardCampaignsInfluencersAnalyticsNew"}

## 2026-09-24 12:10:28.223Z load
- url: http://localhost:3000/

## 2026-09-24 12:10:28.371Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 12:10:28.386Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 12:10:29.500Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 12:10:30.027Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:10:30.028Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 12:10:31.162Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quick Demo Credentials👑 AdminFull Access👁️ ViewerRead Only"}

## 2026-09-24 12:10:31.450Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 12:10:31.874Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 12:10:31.879Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 12:10:32.143Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"notifications":[{"id":"notif_mufhpu88frng76rh","title":"Signed In","message":"Logged in as Admin","type":"success","is_read":"0","created_at":"2026-09-24 12:10:31"}]}
- durationMs: 7

## 2026-09-24 12:10:32.144Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 12:13:42.204Z load
- url: http://localhost:3000/

## 2026-09-24 12:13:42.396Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 12:13:43.618Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:13:43.621Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 12:13:55.714Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 12:13:56.346Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"LoginCampaign, Influencer & Data Management PlatformEmail AddressPasswordSign In to DashboardQuick Demo Credentials👑 AdminFull Access👁️ ViewerRead Only"}

## 2026-09-24 12:13:57.146Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 12:13:57.578Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👁️ ViewerRead Only"}

## 2026-09-24 12:13:57.962Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 12:13:58.842Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 12:13:58.849Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 12:13:59.112Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"notifications":[{"id":"notif_mufhu9xe3ulgff08","title":"Signed In","message":"Logged in as Admin","type":"success","is_read":"0","created_at":"2026-09-24 12:13:58"}]}
- durationMs: 7

## 2026-09-24 12:14:03.987Z navigate
- url: http://localhost:3000/
- via: popstate

## 2026-09-24 12:14:07.066Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"About Us"}

## 2026-09-24 12:14:07.067Z navigate
- url: http://localhost:3000/about-us/
- via: pushState

## 2026-09-24 12:15:11.194Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Outdoor Advertising"}

## 2026-09-24 12:15:11.195Z navigate
- url: http://localhost:3000/services/outdoor-advertising/
- via: pushState

## 2026-09-24 12:15:22.138Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Our Work"}

## 2026-09-24 12:15:22.139Z navigate
- url: http://localhost:3000/our-work/
- via: pushState

## 2026-09-24 12:15:33.266Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Industries"}

## 2026-09-24 12:15:33.267Z navigate
- url: http://localhost:3000/industries/
- via: pushState

## 2026-09-24 12:15:36.898Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contact Us"}

## 2026-09-24 12:15:36.899Z navigate
- url: http://localhost:3000/contact-us/
- via: pushState

## 2026-09-24 12:15:38.522Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:15:38.523Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 12:16:02.346Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:16:02.909Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 12:16:03.338Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:16:03.930Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:16:04.210Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 12:16:04.450Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-09-24 12:16:15.879Z console.error
- text: [vite] Failed to reload /src/pages/AboutPage.jsx. This could be due to syntax errors or importing non-existent modules. (see errors above)

## 2026-09-24 12:16:17.382Z console.error
- text: [vite] Failed to reload /src/pages/AboutPage.jsx. This could be due to syntax errors or importing non-existent modules. (see errors above)

## 2026-09-24 12:16:21.297Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:16:54.621Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:16:56.030Z navigate
- url: http://localhost:3000/
- via: popstate

## 2026-09-24 12:17:21.204Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:17:39.648Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:18:21.288Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:19:09.915Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:19:21.309Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:19:34.877Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:19:54.909Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:20:21.207Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:20:34.954Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:20:44.992Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:21:00.029Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:21:20.053Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:21:40.094Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:21:50.402Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:22:05.349Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:22:20.337Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:22:30.368Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:22:55.412Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:23:20.435Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:23:35.454Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:23:40.379Z navigate
- url: http://localhost:3000/contact-us/
- via: popstate

## 2026-09-24 12:23:41.490Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 12:23:41.794Z click
- element: {"tag":"nav","role":null,"ariaLabel":"Primary","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboard"}

## 2026-09-24 12:23:42.290Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home"}

## 2026-09-24 12:23:42.292Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-09-24 12:23:47.538Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"About Us"}

## 2026-09-24 12:23:47.539Z navigate
- url: http://localhost:3000/about-us/
- via: pushState

## 2026-09-24 12:23:52.866Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & Creative"}

## 2026-09-24 12:23:53.306Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Services"}

## 2026-09-24 12:23:53.307Z navigate
- url: http://localhost:3000/services/
- via: pushState

## 2026-09-24 12:23:55.330Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Outdoor Advertising"}

## 2026-09-24 12:23:55.331Z navigate
- url: http://localhost:3000/services/outdoor-advertising/
- via: pushState

## 2026-09-24 12:23:56.578Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Outdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & Creative"}

## 2026-09-24 12:23:57.082Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Digital Marketing"}

## 2026-09-24 12:23:57.083Z navigate
- url: http://localhost:3000/services/digital-marketing/
- via: pushState

## 2026-09-24 12:23:58.826Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Services"}

## 2026-09-24 12:23:58.827Z navigate
- url: http://localhost:3000/services/
- via: pushState

## 2026-09-24 12:23:59.746Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Print Media"}

## 2026-09-24 12:23:59.746Z navigate
- url: http://localhost:3000/services/print-media/
- via: pushState

## 2026-09-24 12:24:00.746Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Services"}

## 2026-09-24 12:24:00.747Z navigate
- url: http://localhost:3000/services/
- via: pushState

## 2026-09-24 12:24:01.330Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Events & Exhibitions"}

## 2026-09-24 12:24:01.331Z navigate
- url: http://localhost:3000/services/events-exhibitions/
- via: pushState

## 2026-09-24 12:24:02.626Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 12:24:03.170Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Services"}

## 2026-09-24 12:24:03.171Z navigate
- url: http://localhost:3000/services/
- via: pushState

## 2026-09-24 12:24:03.970Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Events & Exhibitions"}

## 2026-09-24 12:24:03.971Z navigate
- url: http://localhost:3000/services/events-exhibitions/
- via: pushState

## 2026-09-24 12:24:05.370Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Outdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & Creative"}

## 2026-09-24 12:24:06.082Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Video Production"}

## 2026-09-24 12:24:06.082Z navigate
- url: http://localhost:3000/services/video-production/
- via: pushState

## 2026-09-24 12:24:07.266Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Branding & Creative"}

## 2026-09-24 12:24:07.267Z navigate
- url: http://localhost:3000/services/branding-creative/
- via: pushState

## 2026-09-24 12:24:08.186Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Our Work"}

## 2026-09-24 12:24:08.186Z navigate
- url: http://localhost:3000/our-work/
- via: pushState

## 2026-09-24 12:24:09.018Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Industries"}

## 2026-09-24 12:24:09.019Z navigate
- url: http://localhost:3000/industries/
- via: pushState

## 2026-09-24 12:24:10.274Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contact Us"}

## 2026-09-24 12:24:10.275Z navigate
- url: http://localhost:3000/contact-us/
- via: pushState

## 2026-09-24 12:24:11.178Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:24:11.179Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 12:26:25.802Z load
- url: http://localhost:3000/

## 2026-09-24 12:26:25.928Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 12:26:28.299Z load
- url: http://localhost:3000/

## 2026-09-24 12:26:28.381Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 12:26:28.684Z load
- url: http://localhost:3000/

## 2026-09-24 12:26:28.743Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 12:26:31.115Z click
- element: {"tag":"h1","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"We make brandsimpossible to ignore."}

## 2026-09-24 12:26:37.386Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"About Us"}

## 2026-09-24 12:26:37.387Z navigate
- url: http://localhost:3000/about-us/
- via: pushState

## 2026-09-24 12:26:39.850Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Services"}

## 2026-09-24 12:26:39.851Z navigate
- url: http://localhost:3000/services/
- via: pushState

## 2026-09-24 12:26:40.898Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Our Work"}

## 2026-09-24 12:26:40.898Z navigate
- url: http://localhost:3000/our-work/
- via: pushState

## 2026-09-24 12:26:41.658Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Industries"}

## 2026-09-24 12:26:41.659Z navigate
- url: http://localhost:3000/industries/
- via: pushState

## 2026-09-24 12:26:42.234Z click
- element: {"tag":"nav","role":null,"ariaLabel":"Primary","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboard"}

## 2026-09-24 12:26:42.802Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 12:26:43.434Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-09-24 12:26:43.794Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contact Us"}

## 2026-09-24 12:26:43.795Z navigate
- url: http://localhost:3000/contact-us/
- via: pushState

## 2026-09-24 12:26:45.602Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Home/Contact UsContactLET'S TALK ABOUT YOUR NEXT CAMPAIGN.Share the brief. We will come back with a clear next step."}

## 2026-09-24 12:50:17.673Z load
- url: http://localhost:3000/

## 2026-09-24 12:50:17.822Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 12:50:17.836Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 12:50:19.339Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 12:50:19.341Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 12:50:23.186Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:50:24.657Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add CampaignAdd"}

## 2026-09-24 12:50:25.610Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign Name *Client Name *CategoryStart Date *End DateStatusDraftActivePausedCompletedDescription"}

## 2026-09-24 12:50:25.778Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:50:25.866Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:50:26.867Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"rthrt","valueLength":5,"text":""}

## 2026-09-24 12:50:26.867Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"rthrt","valueLength":5,"text":""}

## 2026-09-24 12:50:26.867Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:50:27.010Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"s","valueLength":1,"text":""}

## 2026-09-24 12:50:27.780Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sghse","valueLength":5,"text":""}

## 2026-09-24 12:50:27.780Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sghse","valueLength":5,"text":""}

## 2026-09-24 12:50:27.874Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 12:50:27.878Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"rthrt","length":5,"redacted":false},{"label":"[input]","type":"text","value":"sghse","length":5,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 12:50:28.140Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufj56zq0gwby4tp","name":"rthrt","client":"sghse","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 12:50:27"}],"notifications":[{"id":"notif_mufj56zqcxn0wrz1","title":"Campaign Created","message":"\"rthrt\" added.","type":"success","is_read":"0","created_at":"2026-09-24 12:50:27"}]}
- durationMs: 10

## 2026-09-24 12:50:28.140Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 12:50:29.411Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:54:37.082Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:54:38.090Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add CampaignAdd"}

## 2026-09-24 12:54:38.884Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:54:39.018Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:54:39.763Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"uyt","valueLength":3,"text":""}

## 2026-09-24 12:54:39.763Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"uyt","valueLength":3,"text":""}

## 2026-09-24 12:54:39.764Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:54:39.890Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:54:41.812Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"tyu","valueLength":3,"text":""}

## 2026-09-24 12:54:41.812Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"tyu","valueLength":3,"text":""}

## 2026-09-24 12:54:41.914Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 12:54:41.914Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"uyt","length":3,"redacted":false},{"label":"[input]","type":"text","value":"tyu","length":3,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 12:54:42.178Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufjan0bdr6ox04x","name":"uyt","client":"tyu","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 12:54:41"}],"notifications":[{"id":"notif_mufjan0bnblkthil","title":"Campaign Created","message":"\"uyt\" added.","type":"success","is_read":"0","created_at":"2026-09-24 12:54:41"}]}
- durationMs: 7

## 2026-09-24 12:54:42.178Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 12:54:43.353Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:54:45.706Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:56:09.069Z load
- url: http://localhost:3000/api/data

## 2026-09-24 12:56:09.172Z navigate
- url: http://localhost:3000/api/data
- via: replaceState

## 2026-09-24 12:56:09.175Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 12:56:27.792Z load
- url: http://localhost:3000/pages/api/data

## 2026-09-24 12:56:27.847Z navigate
- url: http://localhost:3000/pages/api/data
- via: replaceState

## 2026-09-24 12:56:27.848Z console.warn
- text: No routes matched location "/pages/api/data" 

## 2026-09-24 12:56:44.002Z load
- url: http://localhost:3000/pages/api/

## 2026-09-24 12:56:44.058Z navigate
- url: http://localhost:3000/pages/api/
- via: replaceState

## 2026-09-24 12:56:44.059Z console.warn
- text: No routes matched location "/pages/api/" 

## 2026-09-24 12:56:46.144Z load
- url: http://localhost:3000/pages/api/

## 2026-09-24 12:56:46.175Z console.warn
- text: No routes matched location "/pages/api/" 

## 2026-09-24 12:56:46.850Z load
- url: http://localhost:3000/pages/api/

## 2026-09-24 12:56:46.908Z console.warn
- text: No routes matched location "/pages/api/" 

## 2026-09-24 12:56:47.469Z load
- url: http://localhost:3000/pages/api/data

## 2026-09-24 12:56:47.489Z console.warn
- text: No routes matched location "/pages/api/data" 

## 2026-09-24 12:56:47.976Z load
- url: http://localhost:3000/api/data

## 2026-09-24 12:56:48.025Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 12:56:49.224Z load
- url: http://localhost:3000/api/data

## 2026-09-24 12:56:49.255Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 12:57:26.882Z load
- url: http://localhost:3000/api/data

## 2026-09-24 12:57:26.977Z navigate
- url: http://localhost:3000/api/data
- via: replaceState

## 2026-09-24 12:57:26.980Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 12:57:29.890Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add Campaign"}

## 2026-09-24 12:57:30.676Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:57:30.746Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:57:32.523Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"o0ij","valueLength":4,"text":""}

## 2026-09-24 12:57:32.523Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"o0ij","valueLength":4,"text":""}

## 2026-09-24 12:57:32.524Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:57:32.650Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 12:57:35.331Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"inijn","valueLength":5,"text":""}

## 2026-09-24 12:57:35.332Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"inijn","valueLength":5,"text":""}

## 2026-09-24 12:57:35.410Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 12:57:35.410Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"o0ij","length":4,"redacted":false},{"label":"[input]","type":"text","value":"inijn","length":5,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 12:57:35.674Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufjecvnukj942pd","name":"o0ij","client":"inijn","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 12:57:35"}],"notifications":[{"id":"notif_mufjecvnkr37895m","title":"Campaign Created","message":"\"o0ij\" added.","type":"success","is_read":"0","created_at":"2026-09-24 12:57:35"}]}
- durationMs: 10

## 2026-09-24 12:57:35.675Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 12:57:36.904Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 12:57:38.450Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 12:57:39.218Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:00:25.408Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:00:26.365Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:00:27.232Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:00:30.938Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add Campaign"}

## 2026-09-24 13:00:31.736Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:00:31.842Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:00:32.283Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"asdfd","valueLength":5,"text":""}

## 2026-09-24 13:00:32.284Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"asdfd","valueLength":5,"text":""}

## 2026-09-24 13:00:32.285Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:00:32.426Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sd","valueLength":2,"text":""}

## 2026-09-24 13:00:33.139Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sdfs","valueLength":4,"text":""}

## 2026-09-24 13:00:33.139Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sdfs","valueLength":4,"text":""}

## 2026-09-24 13:00:33.233Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 13:00:33.236Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"asdfd","length":5,"redacted":false},{"label":"[input]","type":"text","value":"sdfs","length":4,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:00:33.258Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufji639fgsyzxrs","name":"asdfd","client":"sdfs","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 13:00:33"}]}
- durationMs: 21

## 2026-09-24 13:00:33.259Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 13:00:33.259Z console.error
- text: 
    [store] save failed: Error: HTTP 404
        at http://localhost:3000/src/pages/DashboardPage.jsx?t=1790254826244:204:28

## 2026-09-24 13:00:35.050Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:00:36.804Z load
- url: http://localhost:3000/api/data

## 2026-09-24 13:00:38.216Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:00:38.073Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 13:00:39.659Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:01:25.944Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:01:26.115Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:01:28.107Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add Campaign"}

## 2026-09-24 13:01:28.820Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:28.946Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:29.620Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"dsg","valueLength":3,"text":""}

## 2026-09-24 13:01:29.620Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"dsg","valueLength":3,"text":""}

## 2026-09-24 13:01:29.621Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:29.722Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:30.571Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sg","valueLength":2,"text":""}

## 2026-09-24 13:01:30.571Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sg","valueLength":2,"text":""}

## 2026-09-24 13:01:30.650Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 13:01:30.651Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"dsg","length":3,"redacted":false},{"label":"[input]","type":"text","value":"sg","length":2,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:01:30.662Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufjjee3k2okdllo","name":"dsg","client":"sg","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 13:01:30"}]}
- durationMs: 11

## 2026-09-24 13:01:30.662Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 13:01:30.663Z console.error
- text: 
    [store] save failed: Error: HTTP 404
        at http://localhost:3000/src/pages/DashboardPage.jsx:204:28

## 2026-09-24 13:01:33.929Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Posts (0)"}

## 2026-09-24 13:01:34.618Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"← All CampaignsdsgActiveBrand AwarenessClient: sgEdit CampaignOverview (0)Posts (0)Influencers (0)Media (0)PostsAdd PostAdd📝No posts yet."}

## 2026-09-24 13:01:35.401Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Overview (0)"}

## 2026-09-24 13:01:35.882Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers (0)"}

## 2026-09-24 13:01:36.580Z load
- url: http://localhost:3000/api/data

## 2026-09-24 13:01:36.857Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Import"}

## 2026-09-24 13:01:36.692Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 13:01:38.204Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:38.290Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:38.938Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"url","id":null,"placeholder":"https://docs.google.com/spreadsheets/d/...","label":"https://docs.google.com/spreadsheets/d/...","value":"","valueLength":0,"text":""}

## 2026-09-24 13:01:41.129Z click
- element: {"tag":"button","role":null,"ariaLabel":"Close","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-24 13:01:42.506Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 13:01:43.129Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:01:44.446Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:01:44.564Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:01:48.013Z load
- url: http://localhost:3000/api/data

## 2026-09-24 13:01:48.118Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 13:02:08.857Z load
- url: http://localhost:3000/api/data

## 2026-09-24 13:02:08.900Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 13:02:13.973Z load
- url: http://localhost:3000/

## 2026-09-24 13:02:14.027Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-09-24 13:02:14.053Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-09-24 13:02:15.938Z click
- element: {"tag":"nav","role":null,"ariaLabel":"Primary","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboard"}

## 2026-09-24 13:02:16.986Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:02:16.988Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-09-24 13:02:17.039Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:02:19.153Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsInfluencersAnalyticsAdd CampaignAdminAdminA"}

## 2026-09-24 13:02:22.722Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AdminAdminA"}

## 2026-09-24 13:02:23.353Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Logout"}

## 2026-09-24 13:02:24.770Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quick Demo Credentials👑 AdminFull Access👁️ ViewerRead Only"}

## 2026-09-24 13:02:25.106Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 13:02:25.618Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 13:02:25.619Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:02:25.631Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"notifications":[{"id":"notif_mufjkkszhux4xd9j","title":"Signed In","message":"Logged in as Admin","type":"success","is_read":"0","created_at":"2026-09-24 13:02:25"}]}
- durationMs: 11

## 2026-09-24 13:02:25.631Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 13:02:25.632Z console.error
- text: 
    [store] save failed: Error: HTTP 404
        at http://localhost:3000/src/pages/DashboardPage.jsx:204:28

## 2026-09-24 13:02:29.482Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Create First Campaign"}

## 2026-09-24 13:02:30.931Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:02:31.058Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:02:31.580Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"eewf","valueLength":4,"text":""}

## 2026-09-24 13:02:31.580Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"eewf","valueLength":4,"text":""}

## 2026-09-24 13:02:31.666Z click
- element: {"tag":"label","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Start Date *"}

## 2026-09-24 13:02:31.836Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:02:31.922Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:02:32.731Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"wgf","valueLength":3,"text":""}

## 2026-09-24 13:02:32.732Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"wgf","valueLength":3,"text":""}

## 2026-09-24 13:02:32.818Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 13:02:32.818Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"eewf","length":4,"redacted":false},{"label":"[input]","type":"text","value":"wgf","length":3,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:02:32.839Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"notifications":[{"id":"notif_mufjkkszhux4xd9j","title":"Signed In","message":"Logged in as Admin","type":"success","is_read":"0","created_at":"2026-09-24 13:02:25"}],"campaigns":[{"id":"camp_mufjkqcyrerpoc97","name":"eewf","client":"wgf","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 13:02:32"}]}
- durationMs: 21

## 2026-09-24 13:02:32.840Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 13:02:32.840Z console.error
- text: 
    [store] save failed: Error: HTTP 404
        at http://localhost:3000/src/pages/DashboardPage.jsx:204:28

## 2026-09-24 13:02:34.793Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:02:34.860Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:16.294Z load
- url: http://localhost:3000/api/data

## 2026-09-24 13:11:16.421Z console.warn
- text: No routes matched location "/api/data" 

## 2026-09-24 13:11:19.295Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:19.432Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:20.319Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:20.426Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:20.831Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:20.969Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:21.034Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:21.181Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:21.252Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:21.399Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:21.544Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:21.697Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:22.715Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add Campaign"}

## 2026-09-24 13:11:23.386Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:11:23.498Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:11:24.705Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"hndf","valueLength":4,"text":""}

## 2026-09-24 13:11:24.705Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"hndf","valueLength":4,"text":""}

## 2026-09-24 13:11:24.809Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Client Name *"}

## 2026-09-24 13:11:25.050Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:11:25.154Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:11:25.995Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"fh","valueLength":2,"text":""}

## 2026-09-24 13:11:25.995Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"fh","valueLength":2,"text":""}

## 2026-09-24 13:11:26.121Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 13:11:26.122Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"hndf","length":4,"redacted":false},{"label":"[input]","type":"text","value":"fh","length":2,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:11:26.139Z network.error
- method: POST
- url: http://localhost:3000/api/data
- status: 404
- statusText: Not Found
- requestBody: {"campaigns":[{"id":"camp_mufjw5uz0sze4wld","name":"hndf","client":"fh","category":"Brand Awareness","start_date":"2026-09-24","end_date":"","status":"Active","description":"","social_links":"{}","campaign_platforms":"[]","created_at":"2026-09-24 13:11:26"}]}
- durationMs: 16

## 2026-09-24 13:11:26.139Z console.error
- text: Fetch error from http://localhost:3000/api/data: 

## 2026-09-24 13:11:26.140Z console.error
- text: 
    [store] save failed: Error: HTTP 404
        at http://localhost:3000/src/pages/DashboardPage.jsx:204:28

## 2026-09-24 13:11:26.385Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign InformationClientfhCategoryBrand AwarenessStatusActiveStart Date2026-09-24End Date—Created2026-09-24 13:11:26DescriptionNo description.🌐 Social Media Handles+ EditNo social handles added.🚀 Platforms Campaign Ran OnManually add sites where this campaign was published+ Add PlatformNo platforms added.Posts0Influencers0Media Files0"}

## 2026-09-24 13:11:28.342Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:28.516Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:11:30.111Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:11:30.251Z console.error
- text: [store] load failed: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

## 2026-09-24 13:23:01.836Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:05.239Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:05.571Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:06.406Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:06.944Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:07.954Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"👑 AdminFull Access"}

## 2026-09-24 13:23:08.362Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sign In to Dashboard"}

## 2026-09-24 13:23:08.363Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"admin@agency.com","type":"email","value":"admin@agency.com","length":16,"redacted":false},{"label":"••••••••","type":"password","value":"[redacted:length=8]","length":8,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:23:10.753Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Add Campaign"}

## 2026-09-24 13:23:11.771Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:23:11.859Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:23:13.354Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"asd","valueLength":3,"text":""}

## 2026-09-24 13:23:13.354Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"asd","valueLength":3,"text":""}

## 2026-09-24 13:23:13.355Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:23:13.465Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"","valueLength":0,"text":""}

## 2026-09-24 13:23:14.362Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sada","valueLength":4,"text":""}

## 2026-09-24 13:23:14.363Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[input]","value":"sada","valueLength":4,"text":""}

## 2026-09-24 13:23:14.450Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Save Campaign"}

## 2026-09-24 13:23:14.450Z submit
- action: http://localhost:3000/dashboard
- fields: [{"label":"[input]","type":"text","value":"asd","length":3,"redacted":false},{"label":"[input]","type":"text","value":"sada","length":4,"redacted":false},{"label":"[input]","type":"text","value":"Brand Awareness","length":15,"redacted":false},{"label":"[date]","type":"date","value":"2026-09-24","length":10,"redacted":false},{"label":"[date]","type":"date","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Active","length":6,"redacted":false},{"label":"[textarea]","type":"textarea","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-09-24 13:23:16.297Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:23:17.316Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsInfluencersAnalyticsAdd Campaign2AdminAdminA"}

## 2026-09-24 13:23:17.762Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 13:23:18.153Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 13:23:18.689Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Influencers"}

## 2026-09-24 13:23:19.033Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Analytics"}

## 2026-09-24 13:23:19.873Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 13:23:20.497Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsInfluencersAnalyticsAdd Campaign2AdminAdminA"}

## 2026-09-24 13:23:20.897Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsInfluencersAnalyticsAdd Campaign2AdminAdminA"}

## 2026-09-24 13:23:21.561Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-09-24 13:23:22.941Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:23.888Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:24.521Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:24.757Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:25.087Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:25.314Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:25.522Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:25.845Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:26.053Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:26.271Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:26.486Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:26.611Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:26.870Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:27.002Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:27.210Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:27.531Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:27.739Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:27.940Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:28.139Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:28.288Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:30.512Z load
- url: http://localhost:3000/dashboard

## 2026-09-24 13:23:31.882Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaigns"}

## 2026-09-24 13:23:35.330Z click
- element: {"tag":"button","role":null,"ariaLabel":"Delete campaign","name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-09-24 13:23:37.153Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Campaign HubDashboardCampaignsInfluencersAnalyticsAdd Campaign2AdminAdminACampaign deleted.CAMPAIGNSEach campaign is a parent containerAdd CampaignAdd🚀No Campaigns YetDashboardCampaignsInfluencersAnalyticsNew"}

## 2026-11-13 11:21:48.263Z load
- url: http://localhost:3000/

## 2026-11-13 11:21:48.421Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-11-13 11:21:48.437Z console.warn
- text: You have Reduced Motion enabled on your device. Animations may not appear as expected.

## 2026-11-13 11:21:50.404Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HomeAbout UsServicesOutdoor AdvertisingDigital MarketingPrint MediaEvents & ExhibitionsVideo ProductionBranding & CreativeOur WorkIndustriesContact UsDashboardLet's Talk"}

## 2026-11-13 11:21:50.720Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Dashboard"}

## 2026-11-13 11:21:50.722Z navigate
- url: http://localhost:3000/dashboard
- via: pushState

## 2026-11-13 11:21:51.729Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@agency.com","label":"admin@agency.com","value":"","valueLength":0,"text":""}

## 2026-11-13 11:21:51.825Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":null,"placeholder":"admin@agency.com","label":"admin@agency.com","value":"","valueLength":0,"text":""}

## 2026-11-13 11:21:52.760Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"LoginCampaign, Influencer & Data Management PlatformEmail AddressPasswordSign In to DashboardQuick Demo Credentials👑 AdminFull Access👁️ ViewerRead Only"}

## 2026-11-13 11:21:54.104Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"LoginCampaign, Influencer & Data Management PlatformEmail AddressPasswordSign In to DashboardQuick Demo Credentials👑 AdminFull Access👁️ ViewerRead Only"}

