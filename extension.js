const Main = imports.ui.main; 

const PanelMenu = imports.ui.panelMenu; 
const PopupMenu = imports.ui.popupMenu;

const St = imports.gi.St;

const Lang = imports.lang;


const HelloWorld_Indicator = new Lang.Class({
    Name: 'HelloWorld.indicator',
    Extends: PanelMenu.Button   ,
 
      _init: function(){
          this.parent(0.0);

          let label = new St.Label({text: 'Button'});
          this.actor.add_child(label);

          let menuItem = new PopupMenu.PopupMenuItem('Menu Item');
          menuItem.actor.connect('button-press-event', function(){ Main.notify('Example Notification', 'Hello World !') });

          this.menu.addMenuItem(menuItem);
      }
});


function init() {
    log ('Example extension initalized');
};  

function enable() {
    log ('Example extension enabled');

    let _indicator =  new HelloWorld_Indicator(); 
    Main.panel._addToPanelBox('HelloWorld', _indicator, 1, Main.panel._rightBox);
};

function disable(){
    log ('Example extension disabled');

    _indicator.destroy();
};
