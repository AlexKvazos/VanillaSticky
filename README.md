VanillaSticky
---

Fix elements to the viewport when they scroll past a position. No jQuery, fully agnostic!



##Installing

Bower
```
$ bower install vanillasticky
```

NPM
```
$ npm install vanillasticky

var VanillaSticky = require('vanillasticky');
```


##Usage

Adds a dom node to the list of nodes that will get fixed when they reach that vertical offset with the top of the screen.
```
VanillaSticky.attach(DOMNode, offset);
```
