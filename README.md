[![npm version](http://img.shields.io/npm/v/idl-property-observer.svg?label=version)](https://npmjs.org/package/idl-property-observer "View this project on npm")
[![GitHub stars](https://img.shields.io/github/stars/anonyco/IDL-Property-Observer.svg?style=social)](https://github.com/anonyco/IDL-Property-Observer/stargazers "View others who have stared this repository")
[![GitHub file size in bytes](https://img.shields.io/github/size/anonyco/IDL-Property-Observer/dist/IDLPropertyObserver.min.js.svg?label=without%20gzip)](https://github.com/anonyco/IDL-Property-Observer/blob/master/dist/IDLPropertyObserver.min.js "File without gzip")
[![GitHub file size in bytes](https://img.shields.io/github/size/anonyco/IDL-Property-Observer/blob/master/IDLPropertyObserver.min.js.gz.svg?label=gzip%20applied)](https://github.com/anonyco/IDL-Property-Observer/blob/master/IDLPropertyObserver.min.js.gz "Gzipped file")
[![npm bundle size (version)](https://img.shields.io/bundlephobia/min/idl-property-observer/latest.svg?color=maroon&label=NPM%20bundle%20size)](https://npmjs.org/package/idl-property-observer "View this project on npm")
[![Issues](http://img.shields.io/github/issues/anonyco/IDL-Property-Observer.svg)]( https://github.com/anonyco/IDL-Property-Observer/issues )
[![Unlicense license](http://img.shields.io/badge/license-Unlicense-brightgreen.svg)](https://unlicense.org/ "This project's liscence")
[![npm downloads](https://img.shields.io/npm/dt/idl-property-observer.svg)](https://npmjs.org/package/idl-property-observer "View this project on npm")


# IDL-Property-Observer
Plug changes like HTMLInputElement.value into MutationObservers. Framework agnostic! **This library is not responsible for your decision to utilize the poor programming practices that this library shamelessly represents!** This library overwrites native prototypes. Please only use this library as a last-resort if you have a finished project and do not have the time to go back and change the code to fire a common handler on IDL property changes.

### Quick Start

Drop the following above your code in the HTML of the page. I call this library "framework agnostic" because whatever framework, build system, or language abstraction (such as CoffeeScript) you are using (if any), there is likely a way to include this above your code the page.


````HTML
<script src="https://dl.dropboxusercontent.com/s/evpekrsxsy5zgka/IDLPropertyObserver.min.js?dl=0" type="text/javascript"></script>
````

Preferably, it would be best to copy and paste the code into your main or bundled Javascript code file inorder to lower network requests and make the page load faster. If this is not possible due to the framework, build system, or language abstraction that you are using, then at least try to add defer="" to all of the scripts so that the browser can download this script from dropbox in synchrony with the one from your website.


````HTML
<script defer="" src="https://dl.dropboxusercontent.com/s/evpekrsxsy5zgka/IDLPropertyObserver.min.js?dl=0" type="text/javascript"></script>
````

### API

There is no API. This library is merely a monkey-patch for the spotty behavior of Mutation Observers. Observe as the mutation observer fails horribly.

```Javascript
var input = document.createElement("input");
var observer = new MutationObserver(function(records){
	for (var i=0; i<records.length; i=i+1|0) console.log(records[i].attributeName, ' changed!');
});
observer.observe(input, {attributes:1,characterData:1,childList:1,subtree:1,attributeOldValue:1});

input.setAttribute("value", "testing value");
input.value = "new value";
```

One would hope that the mutation observer would be fired twice: once for `"testing value"` and once for `"new value"`. However, that is not the case at all: only the first setting of the `value` attribute to `"testing value"` triggers the Mutation Observer. This library fixes all of that. After running this library, the mutation observer will fire twice: once for `"testing value"` and once for `"new value"` just like you dream would happen.

Further, this library has been designed to be flexible and reasonable. It will work on all current and future properties on all DOM elements. It will not fire when you set an event listener property.


```Javascript
var input = document.createElement("input");
var observer = new MutationObserver(function(records){
	for (var i=0; i<records.length; i=i+1|0) console.log(records[i].attributeName, ' changed!');
});
observer.observe(input, {attributes:1,characterData:1,childList:1,subtree:1,attributeOldValue:1});

input.oninput = function() { console.log('foobar'); };
```

The above code will never annoyingly fire mutation observers. However, the below code will fire mutation observers and this library does nothing to change this default behavior.


```Javascript
var input = document.createElement("input");
var observer = new MutationObserver(function(records){
	for (var i=0; i<records.length; i=i+1|0) console.log(records[i].attributeName, ' changed!');
});
observer.observe(input, {attributes:1,characterData:1,childList:1,subtree:1,attributeOldValue:1});

input.setAttribute("oninput", "console.log('foobar');");
```


# Myself

Honestly, I am amazed at how simple the solution is. This is the smallest shortest library that I have ever written: just ~1.5 hour of work to solve, document, and throw witty sarcasm at a long standing problem. I do not know why, but there is just something satisfying about posting a new project on Github to help other developers and instigate firey lectures about how terrible it is to modify the native prototype. It's like a uniquie thirst that can only be quenched with the water from a single well in all the world.
