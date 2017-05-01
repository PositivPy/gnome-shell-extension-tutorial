# A quick introduction to JavaScript
JavaScript (sometimes abbreviated JS), is a prototype-based scripting language. It is dynamic, weakly typed and has first-class functions. It is a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles. Think strongly typed Python.
Gnome-shell is written in JavaScript because it allows for quick prototyping and development cycles. The difference between javascript and other dynamic languages (python, ruby, php, etc...) is that javascript doesn't depend on a specific platform. Gnome-shell can than run it with its own platform (Gjs).

### Variable declaration 
	const x = 0; // is a variable that cannot be reassign
	
If you need to reassign, like in a for loop for example.

	var y =1 ; // Is without a scope, available in all your code
 	let z= 2; // Scope restricted, good for loops.  

Variables can also be declared by using matching arrays or objects, what we call in python unpacking :

	let [ a, b, c ] = [ 1, 2, 3 ];
	let { a, b } = { a: "apple", b: "banana" };

### Functions
	function Foo(arg1, arg2) {do something}
Function parameters can accept default values; 

	function add(x, y = 0) {
    		return x + y;
	}
	
### If/else/elseif
if (x>0) { 
	print(x) ; 
} else { 
	print(“Not a positive number”) };

### For loops:
	for (let i = 0; i < 10; i++) {
		print(i)
	};.
	// 0, 1, 2, 3 ... 9

Looping over arrays using for...of is much more convenient.

	let fruits = [ "apple", "orange", "banana" ];

	for (let fruit of fruits) {
    		print(fruit);
	} 
	// apple, orange, banana

### Imports :
You import objects from the imports object.

	const Gio = imports.gi.Gio;
	const GLib = imports.gi.GLib;
	const Gtk = imports.gi.Gtk;

If you want to include your own files, you have to add the current directory to the search path.

	imports.searchPath.unshift(".");
	const Awesome = imports.awesome; // import awesome.js from current directory

If your file is under a sub-directory, you can use . instead of / for the separator.

	const Awesome = imports.lib.awesome; // import lib/awesome.js

### Class Inheritance
I like the simplicity and readability of the Lang.Class function :

	const Lang = imports.lang

	const New_Class = new Lang.Class({
    		Name: 'new class',
    		Extends: Old_class,
 
        		_init: function() {do something};
	});
	
### Using "this" in closures
"this" will not be captured in a closure; "this" is relative to how the closure is invoked, not to the value of this where the closure is created, because "this" is a keyword with a value passed in at function invocation time, it is not a variable that can be captured in closures.

---> too complicated, need layman's language. 

To solve this, use Lang.bind() :

	const Lang = imports.lang;

	let closure = Lang.bind( this, this._Foo );
