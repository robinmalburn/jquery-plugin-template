/*!
 * Copyright (c) 2015 Robin Malburn
 * Released under the MIT license.
 * See the file LICENSCE for copying permission.
 */
;(function(root, factory){
    "use strict";

    if (typeof define === "function" && define.amd) {
        //Register our plugin as an anonymous module, definting jQuery as a
        //dependency.
        define(["jquery"], factory);
    } else {
        //AMD is not available, so use the copy of jQuery attached to our
        //current root (Window by default).
        factory(root.jQuery);
    }

}(this, function($) {
    "use strict";

    //Define the name of your plugin;  this name will be used to access the
    //plugin through jQuery, e.g. $("body").defaultPluginName().
    var pluginName = "defaultPluginName";

    //The Plugin object constrcutor.  Initialisation logic should be placed here
    //following the assignment statements.
    var Plugin = function(el, options){
        var self = this;
        self.options = options;
        self.element = el;
        self.$element = $(el);

        self.unregisterBindings();

        self.registerBindings();
    };

    /**
     * Register any relevant event bindings for this Plugin.
     * @return void
     */
    Plugin.prototype.registerBindings = function() {
    };

    /**
     * Unregister any event bindings bound by the Plugin.
     * @return void
     */
    Plugin.prototype.unregisterBindings = function() {
    };

    //Cache a copy of any existing jQuery plugins with this name to provide
    //noConflit support.
    var noConflict = $.fn[pluginName];

    //Dictionary of default values to be assigned to the plugin.  This allows globally
    //changing default values without needing to override defaults on a per
    //plugin basis.
    //@see $.fn.[pluginName].defaults();
    var defaults = {};

    /**
     * Wrapper around plugin initialisation logic, allowing optional
     * re-initialisation and method calling with return values.
     * @return mixed Defaults to the collection the method was called on, else
     * when calling a method on the plugin, returns the first returned value
     * from the collection.
     */
    $.fn[pluginName] = function(action){
        //Grab any additional arguments that may have been passed through.
        //This allows passing arguments to methods called on our plugin.
        var args = Array.prototype.slice.call(arguments, 1);
        var result = this;
        var collection = this;

        this.each(function(){

            var $this = $(this);
            var instance = $this.data(pluginName);
            var data = $.extend({}, $this.data());
            
            //If our plugin is already instantiated, remove it from the data
            //object to avoid merging an old instance of the plugin into our
            //options.
            if (instance instanceof Plugin) {
                delete data[pluginName];
            }

            var options = $.extend(
                true,
                {},
                defaults,
                instance instanceof Plugin && instance.options,
                data,
                typeof action === "object" && action
            );

            //If an instance of our plugin has not yet been initialised, or if
            //the action is an object and thus should be treated as a new
            //configuration, (re)initialise the plugin and store it on the
            //element.
            if((instance instanceof Plugin) === false || typeof action === "object"){
                instance = new Plugin(this, options);
                $this.data(pluginName, instance);
            }

            if(typeof action === "string" && typeof instance[action] === "function"){
                var tmp = instance[action].apply(instance, args);

                if(result === collection && tmp !== undefined){
                    result = tmp;
                }
            }
        });

        return result;
    };

    /**
     * Restores any previously bound plugins with the same name as ours and
     * returns an instance of our jQuery bindings to allow noConflict support.
     * @return function
     */
    $.fn[pluginName].noConflict = function(){
        var current = $.fn[pluginName];

        $.fn[pluginName] = noConflict;

        return current;
    };

    /**
     * Return or update our default options object to allow global default
     * modification.
     * @param object newDefaults new default dictionary to set
     * @return object
     */ 
    $.fn[pluginName].defaults = function(newDefaults){
        if (typeof newDefaults === "object") {
            defaults = newDefaults;
        }

        return defaults;
    };
}));
