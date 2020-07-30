/**
 * Takes an an array of elements of the form
 * `[ type, properties, children, onMount ]` for an element or a `String` for text content
 *  In the first case, each array element is broken out as follows:
 *    * `type` refers to a node name such as `div` or `p`.
 *       It will be passed to `document.createElement`
 *    * `properties` is an object containing keys which should be set on the element
 *    * `children` is an optional array of children of the same form
 */
function h(_){
  var name     = _[0];
  var props    = _[1] || {}; 
  var children = _[2] || []
  var onMount  = _[3];
  var node = document.createElement(name);
  
  for (var prop in props){
    if (typeof props[prop] === 'string'){
      node.setAttribute(prop, props[prop]);
    } else {
      node[prop] = props[prop];
    }
  }

  mount(node, children);
  if (typeof onMount !== 'undefined') onMount(node);

  return node;
}

/**
 * Takes an an array of elements of the form
 * `[ type, properties, children ]` for an element or a `String` for text content
 *  In the first case, each array element is broken out as follows:
 *    * `type` refers to a node name such as `div` or `p`.
 *       It will be passed to `document.createElement`
 *    * `properties` is an object containing keys which should be set on the element
 *    * `children` is an optional array of children of the same form
 */
function mount(parent, elements) {
  elements = elements || [];
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i]) { // skip false or null or undefined entries
      continue;
    }
    if (typeof elements[i] === 'string') {
      parent.appendChild(document.createTextNode(elements[i]));
    } else {
      parent.appendChild(h(elements[i]));
    }
  }
}

module.exports = {
  h: h,
  mount : mount,
};
