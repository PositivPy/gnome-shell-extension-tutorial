# The Basics
## Creating and Enabling your extension :
To create an extension type in a terminal 

      gnome-shell-extension-tool --create-extension
      
You will be asked to name your application. For this extension, "Hello world" and press enter.

Then you will be asked about a description. Something like "Show a hello world label pressing an icon in the system tray" should do.

Then you will be asked about an uuid. This is a globally-unique identifier for your extension as well as the name of your extension's folder.
A good uuid contains something related to your email. For example, if your email is first.second1925@server.com, I recommend something like theNameOfYourExtension@first.second1925-server.com

In this case "helloWorld@email.com" and press enter.

A "Hello World" example should appear in your IDE, gedit or your Browser if all else fails.
:
Open the gnome-tweak-tool and enable your extension in the extensions tab.

## Debugging your Extension :
The main debugging tool is, in a terminal (!!no sudo!!):

	gnome-shell --replace  
	
!! Be careful to not close this terminal or you will crash your desktop !!

Looking glass can give you some well needed informations too. To open it, Alt+F2 and type lg.
It is divided into the following tabs: 
- Evaluator : here you can evaluate random code of javascript, accesing gnome shell objects and libraries. For example, write this in the evaluator and press enter:
 	
	Main.notify("Hello world")
Also, in the Evaluator tab, you have a "picker". Do you see a "cuentagotas" at left corner of looking glass? Click into it. Then you can "pick" random object of the interface of gnome shell and know its name. This is useful if you are trying to know "where" is the object you are seeing in the class hierarchy of gnome shell and wich kind of object is.
- Windows : where you can see wich windows are currently active. Pay attention to wmclass. This name let you identify a application inside gnome.
- Memory 
- Extensions : will tell you wich extensions are installed and some other information about each extension

## Restarting your shell and Applying changes.
-To apply changes made to your extension, save your file, press Alt-F2 and type r (or restart).

-!! If you crash your shell !!
Chill. Press Ctrl+Alt+F2. Get a command line.
 Go to your extension's directory,
 	
		cd  ~/.local/share/gnome-shell/extensions/<yourExtension> 
and modify your code accordingly.

		sudo nano extension.js
Than restart your shell :

 	DISPLAY=:0 gnome-shell
and CTRL+ALT+F7 or CTRL+ALT+F8.


# Anatomy of an Extension
## Your extension's folder :
First let's have a look at your extensions's folder :
    ~/.local/share/gnome-shell/extensions/helloWorld@email.com
    
There are 3 files in this folder :
- extension.js : the javascript code for your extension, the focus of this tutorial.
- metadata.js : {name, description, uuid, gnome-version } and store the data you need across sessions in JSON format.
- stylesheet.css : CSS to style your UI components.

## extension.js :
-Imports :

	const St = imports.gi.St;  

-Your actual extension / Class Inheritance :

	const Lang = imports.lang

	const New_Class = new Lang.Class({
    		Name: 'new class',
    		Extends: Old_class,
 
        		_init: function() {do something};
	});

-Your extension HAS to have the following three function to work : 

	function init(){};   // Don't do anything major here, initialize settings for example. 
	function enable(){}; // Activate your extension.
	function disable(){}; // You have to disable everything you have done. 
