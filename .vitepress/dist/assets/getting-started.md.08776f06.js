import{o as e,c as a,b as t}from"./app.4705c47d.js";const i='{"title":"@nativescript/capacitor is now ready","description":"","frontmatter":{},"headers":[{"level":2,"title":"src/nativescript","slug":"src-nativescript"},{"level":2,"title":"Explaining the examples","slug":"explaining-the-examples"}],"relativePath":"getting-started.md","lastUpdated":1613341300683}',o={},n=t('<h1 id="nativescript-capacitor-is-now-ready"><a class="header-anchor" href="#nativescript-capacitor-is-now-ready" aria-hidden="true">#</a> @nativescript/capacitor is now ready</h1><p>Let&#39;s take a look at what you have at your fingertips now.</p><h2 id="src-nativescript"><a class="header-anchor" href="#src-nativescript" aria-hidden="true">#</a> src/nativescript</h2><p>Your project now contains a <code>src/nativescript</code> folder. This is where you can write as much NativeScript as your project needs for various platform features and capabilities.</p><p>It is structured as follows:</p><div class="language-"><pre><code>.\n├─ src/nativescript\n   └─ examples\n      ├─ modal.ts\n      └─ simple.ts\n   ├─ index.ts\n   ├─ package.json\n   ├─ references.d.ts\n   └─ tsconfig.json\n</code></pre></div><p>The <code>index.ts</code> alongside the <code>examples</code> folder is a great example of how you can scale out native platform features by creating your own organization of additional native helper methods to import and bundle together for you app&#39;s usage.</p><p>You can make direct native platform API calls here as well as attach additional methods to the <code>native</code> object which your Ionic application can use.</p><p>This isolated segment of your codebase has 0 effect on your web application when running outside the native platform. This means you are free to go wild with all sorts of native platform behavior and even make calls with the <code>native</code> object throughout your Ionic application with confidence knowing that the <code>native</code> object is <em>only</em> alive when running on the actual mobile platform. It is simply ignored and deactivated when running your app solely in a web browser outside of Capacitor.</p><h2 id="explaining-the-examples"><a class="header-anchor" href="#explaining-the-examples" aria-hidden="true">#</a> Explaining the examples</h2><p>The installation includes 2 simple examples to give you ideas of possibilities.</p>',11);o.render=function(t,i,o,s,r,c){return e(),a("div",null,[n])};export default o;export{i as __pageData};