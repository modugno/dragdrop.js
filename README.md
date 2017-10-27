# dragdrop.js
> Dragdrop in Vanilla Javascript ES6

If you're anxious like me, and like to see the end result of the project, here's a [demo](https://modugno.github.io/dragdrop.js) =)

## Install

You can install it on npm.

```
npm install dragdrop-js --save
```

Or [download a ZIP](https://github.com/modugno/dragdrop.js/archive/master.zip) file.

## Setup

First, include script on page
```html
<script src="dist/dragdrop.js"></script>
```

Initialize the plugin
```js
new dragdrop.start();
```

By default, the class of the element to be dragged will be '.dragdrop' and that of the targets will be '.dragdrop-target'.
But you can change it by passing the options as parameter.
```js
new dragdrop.start({
	element: '.dragdrop',
	targets: '.dragdrop-target'
});
```

## Callback
You can also pass a callback as a parameter to know the exact position of each element.
```js
const options = {
	element: '.dragdrop',
	targets: '.dragdrop-target'
}

new dragdrop.start(options, (dom, api) => {
	dom.addEventListener('drop', (event) => {
	    console.log( api.orders )
    })
});
```
Or, just
```js
new dragdrop.start((dom, api) => {
	dom.addEventListener('drop', (event) => {
	    console.log( api.orders )
    })
});
```

# Usage
You can declare your html as follows.

```html
<!-- Target / Elements -->
<div class="dragdrop-target">
    <img class="dragdrop" data-id="1" src="https://placehold.it/200x200">
</div>
<div class="dragdrop-target">
    <img class="dragdrop" data-id="1" src="https://placehold.it/200x200">
</div>
<div class="dragdrop-target">
    <img class="dragdrop" data-id="1" src="https://placehold.it/200x200">
</div>
```
Note that we are passing a 'data-id' attribute.
It serves to reference the element being moved. Returning no callback. But it is not mandatory.


## License
[MIT License](https://github.com/modugno/dragdrop.js/blob/master/LICENSE.md)
