# Gnome-Extension_Tutorial

## I. The basics :
### 1. Creating a gnome extension : Easy Peasy.
gnome-shell-extension-tool -c 
Follow the prompt and a “Hello World” example should appear. Official documentation here.

All your extensions are in the following folder :
~/.local/share/gnome-shell/extensions/

There are 3 files in your extension's folder (named after it's UUI) :
	extension.js : the javascript code for your extension, focus of this tutorial.
	metadata.js : {name, description, uuid, gnome-version } and store the data you need 				      across sessions in JSON format.
stylesheet.css : CSS to style your UI components.

Open the gnome-tweak-tool and enable your extension in the extensions tab.


### 2. Debugging : The nightmare.
Forget about Looking Glass, in my experience, gnome-shell --replace (in a terminal, !! no sudo !!) and putting your code into a try/catch is what you need. 
!! Be careful to not close this terminal or you will crash your desktop !!


### 3. Restarting your shell : Applying changes.
To apply changes made to your extension, save your file, press Alt-F2 and type r (or restart).

!! If you crash your shell !!
	Chill. Press Ctrl+Alt+F2. Get a command line.
 	Go to your extension's directory,
	cd  ~/.local/share/gnome-shell/extensions/<yourExtension> 
	and modify your code accordingly.
	sudo nano extension.js
	Than restart your shell :
 	DISPLAY=:0 gnome-shell
	and CTRL+ALT+F7 or CTRL+ALT+F8.
  

## II. Coding : UI basics
### 1. The structure : “Same same but different”
Highly recommended Gnome JavaScript Guide here and Style Guide here. Seriously, read them.

- Imports :
	const St = imports.gi.St;
	Think of it as a  from gi import St as St but in a math way. 

- Declare global variables :
	const x = 0; is a variable that cannot be reassign
	Use var and let if you need to reassign, like in a for loop for example. 

- Your actual extension / Class Inheritance :
	I like the simplicity and readability of the Lang.Class function :
	const Lang = imports.lang

	const New_Class = new Lang.Class({
    		Name: 'new class',
    		Extends: Old_class,
 
        		_init: function() {do something};
	});

- Your extension HAS to have the following three function to work : this is kind of a  if __name__ = “__main__”:
	function init(){};   // Not very useful, this is where you initialize settings for example. 
	function enable(){}; // Activate your extension.
	function disable(){}; // You have to disable everything you have done. 


That's it for the introductions, you are code ready.


### 2. Creating a Button: Extending PanelMenu.Button
const St = imports.gi.St;  // The library that allows you to create UI elements. Similar to GTK+. 					                  // Reference manual here. 
const Main = imports.ui.main; // Import the main UI
const PanelMenu = imports.ui.panelMenu; // Importing the top bar's UI elements.

const Lang = imports.lang  // Helper library to create Python like classes


const HelloWorld_Indicator = new Lang.Class({
    Name: 'HelloWorld.indicator',
    Extends: PanelMenu.Button   ,
      _init: function() {
         		this.parent(0.0); // I don't know, but if it ain't broke … 

     	   // Here, this.actor is a St.Bin, accepting only one St item at a time like a St.Label, St.Icon or even an St.Entry.
      	   // So, to compose a button with an Icon AND a Label, we have to create a container first:
          let box = new St.BoxLayout();

          this.Label = new St.Label({text: "Hello World"});
          let Icon = new St.Icon({ icon_name: 'system-run-symbolic',
                                  style_class: 'system-status-icon' });

       // Add the Icon and Label to the container
          box.add_actor(this.Label)
          box.add_actor(Icon)

       // Than add the container to the actor.
          this.actor.add_child(box);

       // this._buildMenu()
      }
});

function init() {};  // Not needed for the moment

function enable() {
  // Creating the indicator 
    let _indicator =  new HelloWorld_Indicator(); 

  // Binding the indicator to the panel's left box at position 1, other options are ._rightBox and ._centerBox : 
    Main.panel._addToPanelBox('HelloWorld', _indicator, 1, Main.panel._leftBox);
};

function disable(){
   // Destroying the indicator will suffice for now.
    _indicator.destroy(); 
};



Save the script, restart your shell and you should see a new label in your top bar.
Waw.  Let's build a menu to go with it.


### 3. Building a Menu : Popup Menu Items
Highly recommended source code. 

Import :
 const PopupMenu = imports.ui.popupMenu;

Add a comma after the end bracket of _init(){} and uncomment this._buildMenu(). Finally, add this to your indicator's class :

      _buildMenu: function(){

       // A simple menu item first :
          this.menuItem = new PopupMenu.PopupBaseMenuItem();
          let label = new St.Label();
          label.set_text("Menu Item");
          this.menuItem.actor.add_child(label);

      // Sub menu construction
          this.subMenu = new PopupMenu.PopupSubMenuMenuItem("Sub-Menu");

          // Add a simple menu item to the subMenu, you can add switches and sliders the same way :
          this.subMenu_Item = new PopupMenu.PopupMenuItem("Sub-menu Item")
          this.subMenu.menu.addMenuItem(this.subMenu_Item)

      // Constructing a Switch 
          this.switchItem = new PopupMenu.PopupSwitchMenuItem("Switch", "true");

	   // Making an entry widget.
         		 this.entryItem = new St.Entry({name: "Entry Item",
                                          hint_text: "Type something...",
                                          track_hover: true,
                                          can_focus: true
                                        });
	 	// All menu items have parameters, here reactive : false is to not close the menu when clicked. 
          this.entryContainer = new PopupMenu.PopupBaseMenuItem({reactive: false,                                   					      							activate: true,                                                                                    		      										hover: true,                       					      							style_class: null,                       					      							can_focus: true
		      		   							    });
         	this.entryContainer.actor.add_actor(this.entryItem)

		// this._connectMenu();

      // Add all these menu items to your Button's dummy menu
          this.menu.addMenuItem(this.menuItem);
          this.menu.addMenuItem(this.subMenu);
          // Want to do both at the same time ?
          this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
          this.menu.addMenuItem(this.switchItem);
		this.menu.addMenuItem(this.entryContainer);
      }

Restart your shell (press Alt+F2, type r or restart in the dialogue box) and test your new extension. As you can see, you have a beautiful menu but it isn't doing anything yet.  

### 4. Connecting Menu Items to functions : You want to do something with this menu, right ?
For the moment we will use the simple print() command. Upgrade with the next section.
Uncomment this._connectMenu(), add a comma after the end bracket of the _buildMenu function and :

       _connectMenu: function(){
	    // Sometimes the menu item has an actor and sometimes not, just try it out or refer to the source code. 
            this.menuItem.actor.connect("button-press-event", 								function(){print("You clicked on the Menu Item")});

            this.subMenu_Item.actor.connect("button-release-event", 
			function(){print("Your released a click on the subMenu")});

	   // Here we use Lang.bind() because we use this. is outside of it's scope. (JavaScript weirdness)	
            this.switchItem.connect('toggled', Lang.bind(this, function(){
				print("I have been toggled", this.switchItem.state)}));

	  // You can even bind functions directly to your button's actor (label and icon):
	    	  this.actor.connect("enter-event", Lang.bind(this, 
				function(){this.Label.set_text("hello")}));
            this.actor.connect("leave-event", Lang.bind(this, 
				function(){this.Label.set_text("")}));

	  // Conecting the entry widget label
		  this.entryItem.clutter_text.connect("key-press-event", Lang.bind(this, 					function(o, e){
                			let keyStroke = e.get_key_symbol();
						// You can print(keySroke) to get the number of a the key you need
                			if (keyStroke == 65293) {
                      			print(o.get_text());
                      			this.entryItem.set_text("");
                      			this.menu.close();
                			};
          			}));

      }

Test it out, your prints will appear in your debug terminal. (gnome-shell --replace)

## III. Coding : Adding Functionalities
I am going to stick with what I know here but there is plenty more to discover in the source code.

### 1. Notificaitons : The easy way. 
The excellent but outdated tutorial here goes well into the details, like adding a source and a custom icon to your notifications. But for the lazy :
Main.notify('notification title', 'notification summary');
That's it … Really …

### 2. File manipulation : Working with I/O Streams.
Best documentation I found is here, but it's in Vala.

- Imports
const Gio = imports.gi.Gio

- Read a File
	_readFile: function() {
		// Create an object reference of your file
    		  let file = Gio.file_new_for_path(“path to your file”);
		// Loading the contents of the file 
    		  file.load_contents_async(null, function(file, res) {
        		  let contents;
        		  try {
            		contents = file.load_contents_finish(res)[1];
			  // Do something with the contents of the file
				print(contents);
        		  } catch (error) {print(error)};
		  });
	}

- Write to  File
     _writeFile: function(){
        try {
          // Create an object reference of your file
            var file = Gio.file_new_for_path (“path to your file”);
            
          // Create an append stream 
            let file_stream = file.append_to(Gio.FileCreateFlags.NONE, null, null);

          // Write text data to stream
            let text = "hello world"
            file_stream.write(text, null);            
        } catch(error) { print(error) };
      }

!! As this is not an async method, you will block the Shell if the data is too big. Async methods are available here!!

### 3. Updating a Label : or anything else for that matter.
// Import : 
const Mainloop = imports.mainloop;

            // Class method 
	_UpdateLabel : function(){
		 let refreshTime = 10 // in seconds
           if (this._timeout) {
                Mainloop.source_remove(this._timeout);
                this._timeout = null;
            }
            this._timeout = Mainloop.timeout_add_seconds(refreshTime, 										Lang.bind(this, this._UpdateLabel));

            this._doSomethingThatUpdatesTheLabelsText();
        },

// Destroying the timeout in the disable function : 
function disable(){
    Mainloop.source_remove(timeout);
    Mainloop.source_remove(timeout2);
};


### 4. API call : Get and Post
- Initialisation :
// Import libsoup, the library to work with HTTP requests.
const Soup = imports.gi.Soup;

// Initialise a session variable.
let _httpSession;

// And finally initialise the http session.
function init() {
     _httpSession = new Soup.SessionAsync({ssl_use_system_ca_file: true});
     Soup.Session.prototype.add_feature.call(_httpSession, new 	Soup.ProxyResolverDefault());
}; 

Ok, we are ready to make HTTP requests.

- You want to get something ?
  	_getRequest: function () {
	       // Set the URL and parameters. If you don't need parameters, delete the variable everywhere. 
		let URL = “url”
    		let params = “parameters”;
    		_httpSession = new Soup.Session();
    		let message = Soup.form_request_new_from_hash('GET', URL, params);

	   // Send the message and retrieve the data 
    		_httpSession.queue_message(message, Lang.bind(this, function 						(_httpSession, message) {
          			if (message.status_code !== 200)
            				return;
          		let json = JSON.parse(message.response_body.data);
			  	// Do something with your JSON data
				print(json)
        			}));
  	},

- You want to post something ? 
	_postRequest(){
	     let url = "your url";
		var params = “parameters” ;

          let msg = Soup.Message.new('POST', url);

          msg.set_request ('application/json', 2, params, params.length);
          _httpSession.queue_message(msg, function(_httpSession, message){});
	}


### 5. Executing Shell commands and Scipts:
Import :
const GLib = imports.gi.GLib;

Than :
let output = GLib.spawn_command_line_async('ls', “-l”);

Easy, right ? Well hold your horses; I haven't been able to spawn commands preceded with sudo directly. 
To work around this is stupidly hard :
- Edit your sudoer file to disable the password lock for this specific command :
sudo visudo
add at the end of the file :
username ALL=(ALL) NOPASSWD: arp-scan

- Create a bash script in your home directory (or where root permission is not needed) containing for example :
#!/bin/sh
sudo arp-scan --interface=wlan0 --localnet

- Enable execute permissions with chmod.
- Spawn the command via it's path :
let output = GLib.spawn_command_line_async('/home/fulleco/Documents/script.sh')
- Profit !

### 6. Custom Icons :
// extensionMeta is created when metadata.js is first read
function init(metadata) {
  // Loads the default icons 
    let theme = imports.gi.Gtk.IconTheme.get_default();
  // Append your extension's directory + /icons
    theme.append_search_path(extensionMeta.path + "/icons");
}

Then just add an "icons" folder inside your project root, save a 16x16 .svg icon inside it and referenced it by its file name :
this.Icon = new St.Icon({ icon_name : “name of your icon without .svg”
			     style_class : “system-status-icon” });
