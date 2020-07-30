/**
 * Takes an an array of elements and outputs a node with the appropriate children attached
 * @name h
 * @param $0 {Array} the {Domlette} to turn into a {Node}
 * @param $0[0] name {String} this is the node name such as `'div'`, `'a'` or `'p'`
 * @param $0[1] attrs {Object} these are the attributes of the object you want to set. 
 * @param $0[2] children {Array} an array of {Domlette} or {String} to append as children
 * @param $0[3] onMount {function} a callback to be called with the node reference once the node has been added to its
 * parent
 *
 * @returns {Node} a DOM Node created from the {Domlette} passed in
 */
export function h([name, attrs = {}, children = [], onMount]){ 
  const node = document.createElement(name);
  
  for (let attr in attrs){
    if (typeof attrs[attr] === 'string'){
      node.setAttribute(attr, attrs[attr]);
    } else {
      node[attr] = attrs[attr];
    }
  }

  mount(node, children);
  if (typeof onMount !== 'undefined') onMount(node);

  return node;
}

/**
 * Mount an {Array} of {Domlette}s to the parent node
 * @name mount
 * @param parent {Node} the parent node to append to
 * @param elements {Array<Domlette>} the Domlettes to append to the parent
 */
export function mount(parent, elements = []) {
  for (let i = 0; i < elements.length; i++) {
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
