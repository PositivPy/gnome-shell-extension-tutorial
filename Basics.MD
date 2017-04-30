# Your First Extension
## Creating an extension :
To create an extension type in a terminal 

      gnome-shell-extension-tool --create-extension
      
You will be asked to name your application. For this extension, "Hello world" and press enter.

Then you will be asked about a description. Something like "Show a hello world label pressing an icon in the system tray" should do.

Then you will be asked about an uuid. This is a globally-unique identifier for your extension as well as the name of your extension's folder.
A good uuid contains something related to your email. For example, if your email is first.second1925@server.com, I recommend something like theNameOfYourExtension@first.second1925-server.com

In this case "helloWorld@email.com" and press enter.

A "Hello World" example should appear in your IDE, gedit or your Browser if all else fails.

## Enabeling your extension :
Open the gnome-tweak-tool and enable your extension in the extensions tab.
You should now have a new icon in your top bar, click on it and a massive "Hello World" should appear.

## Your extension's folder :
First let's have a look at your extensions's folder :
    ~/.local/share/gnome-shell/extensions/helloWorld@email.com
    
There are 3 files in this folder :
- extension.js : the javascript code for your extension, the focus of this tutorial.
- metadata.js : {name, description, uuid, gnome-version } and store the data you need across sessions in JSON format.
- stylesheet.css : CSS to style your UI components.

## Anatomy of extension.js :

- Imports :
	const St = imports.gi.St;  

- Your actual extension / Class Inheritance :
	const Lang = imports.lang

	const New_Class = new Lang.Class({
    		Name: 'new class',
    		Extends: Old_class,
 
        		_init: function() {do something};
	});

- Your extension HAS to have the following three function to work : 
	function init(){};   // Not very useful, this is where you initialize settings for example. 
	function enable(){}; // Activate your extension.
	function disable(){}; // You have to disable everything you have done. 
