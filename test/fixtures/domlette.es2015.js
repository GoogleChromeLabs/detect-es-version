export function h([a,c={},d=[],b]){const e=document.createElement(a);for(let f in c)'string'==typeof c[f]?e.setAttribute(f,c[f]):e[f]=c[f];return mount(e,d),'undefined'!=typeof b&&b(e),e}export function mount(a,b=[]){for(let c=0;c<b.length;c++)b[c]&&('string'==typeof b[c]?a.appendChild(document.createTextNode(b[c])):a.appendChild(h(b[c])))}

//# sourceMappingURL=domlette.es6.js.map