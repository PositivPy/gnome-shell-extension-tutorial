# Events 
Each UI containers have a clutter actor and by default, each clutter actors have these events:
- button-press-event: Emitted when the user presses the mouse over the actor.
- button-release-event: Emitted when the user releases the mouse over the actor.
- motion-event: Emitted when the user moves the mouse over the actor.
- enter-event: Emitted when the user moves the mouse in to the actor's area.
- leave-event: Emitted when the user moves the mouse out of the actor's area.

We can "connect" each actors to event(s) and than to callback function(s). The callback funciton will be called when the event occurs.
So, to connect an actor to an event : 

    actor.connect('eventName', function(){DoSomethingWhenEventOccurs});
