(function VanillaStickyInit(root, factory) {
  // commonjs
  if (typeof exports === 'object') {
    module.exports = factory();
  // global
  } else {
    root.VanillaSticky = factory();
  }
})(this, function VanillaStickyFactory() {

  var nodes = [];
  var updatingNode, x;

  // update each node's bounding client rect every 300ms
  setInterval(function updateBoundingClientRects() {
    for (x = 0; x < nodes.length; x++) {
      updatingNode = nodes[x];
      updatingNode.boundingClientRect = updatingNode.getBoundingClientRect();
    }
  }, 300);

  window.addEventListener('scroll', function onScroll() {
    var node, i;
    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];

      // get top bounding rect and node style
      var top = node.boundingClientRect.top;
      var st = node.style;

      // if the node is above the line offset and is not stickied
      if (top <= node.VanillaStickyOffset && !node.isSticked) {
        node.oldStickyStyle = {
          position: st.position,
          marginTop: st.marginTop,
          top: st.top
        };
        node.unstickAt = window.scrollY;
        st.position = 'fixed';
        st.marginTop = '0px';
        st.top = node.VanillaStickyOffset + 'px';
        node.isSticked = true;
      }
    }

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      if (!node.isSticked) return;

      if (window.scrollY < node.unstickAt) {
        node.style.position = node.oldStickyStyle.position;
        node.style.marginTop = node.oldStickyStyle.marginTop;
        node.style.top = node.oldStickyStyle.top;
        node.clone = null;
        node.isSticked = false;
      }
    }
  });

  return {
    attach: function(DOMNode, offset) {
      DOMNode.VanillaStickyOffset = offset || 0;
      nodes.push(DOMNode);
    },
    detach: function(DOMNode) {
      nodes.splice(nodes.indexOf(DOMNode), 1);
    }
  };

});
