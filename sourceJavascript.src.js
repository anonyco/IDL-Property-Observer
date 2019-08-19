(function(elementExample, Object, window){

function createIDLSetWrapper(key, nativeSet, nativeGet) {
	return function(newValue) {
		var oldValue = this.getAttribute(key);
		nativeSet.call(this, newValue); // natively update the value
		
		if (this.getAttribute(key) === oldValue) {
			// ensure that an attribute is updated so that mutation observers are fired
			this.setAttribute(key, nativeGet.call(this));
        }
	};
}

var ownProps = Object.getOwnPropertyNames(window);
for (var i=0, len=ownProps.length|0, key; i<len; i=i+1|0) {
	key = ownProps[i];
	if (/^HTML[A-Z]\w*Element$/.test(key) && window.hasOwnProperty(key) && !window.propertyIsEnumerable(key) && typeof window[key] === "function") (function(){
		var oldDescriptors = Object.getOwnPropertyDescriptors(window[key].prototype);
		var keys = Object.keys(oldDescriptors);
		var newDescriptors = {};
		
		for (var i=0, len=keys.length|0, prop, description; i<len; i=i+1|0) {
			prop = keys[i];
			description = oldDescriptors[prop];
			if (
				prop !== "nonce" && // supposed to be secret and hidden from CSS
				(!prop.startsWith("on") || elementExample[prop] !== null) && // screen out event listeners
				typeof description.set === "function" && // ensure that this property has a descriptor
				description.set.toString().indexOf("[native code]") !== -1 // ensure that we have not already processed to this element
			) newDescriptors[prop] = {
				configurable: true,
				enumerable: true,
				get: description.get, // do not modify the original getter
				set: createIDLSetWrapper(prop, description.set, description.get)
			};
		}
		
		// Finally apply the wrappers
		Object.defineProperties(window[key].prototype, newDescriptors);
	})();
}

})(document.firstElementChild, Object, window);
