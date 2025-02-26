/*!
 * Copyright (c) 2015 - 2025 Robin Malburn
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */
((root, factory) => {
  if (typeof define === "function" && define.amd) {
    // Register our plugin as an anonymous module, defining jQuery as a
    // dependency.
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    // If we're exporting as a node module, just return the factory and let
    // the consumer execute as required.
    module.exports = factory;
  } else {
    // AMD is not available, so use the copy of jQuery attached to our
    // current root (Window by default).
    factory(root.jQuery);
  }
})(window, (jQuery) => {
  const $ = jQuery;

  /**
   * Define the name of your plugin;  this name will be used to access the
   * plugin through jQuery, e.g. $('body').defaultPluginName().
   */
  const pluginName = "defaultPluginName";

  class Plugin {
    /**
     * The Plugin object construtor.  Initialisation logic should be placed here
     * following the assignment statements.
     * @return void
     */
    constructor(el, options) {
      this.options = options;
      this.element = el;
      this.$element = $(el);

      this.unregisterBindings();
      this.registerBindings();
    }

    /**
     * Register any relevant event bindings for this Plugin.
     * @return void
     */
    registerBindings() {}

    /**
     * Unregister any event bindings bound by the Plugin.
     * @return void
     */
    unregisterBindings() {}
  }

  /**
   * Cache a copy of any existing jQuery plugins with this name to provide
   * noConflict support.
   */
  const noConflict = $.fn[pluginName];

  /**
   * Dictionary of default values to be assigned to the plugin.  This allows globally
   * changing default values without needing to override defaults on a per
   * plugin basis.
   * @see $.fn.[pluginName].defaults();
   */
  let defaults = {};

  /**
   * Wrapper around plugin initialisation logic, allowing optional
   * re-initialisation and method calling with return values.
   * @return mixed Defaults to the collection the method was called on, else
   * when calling a method on the plugin, returns the first returned value
   * from the collection.
   */
  $.fn[pluginName] = function init(...args) {
    /**
     * Grab any additional arguments that may have been passed through.
     * This allows passing arguments to methods called on our plugin.
     */
    const action = args[0];
    const actionArgs = args.slice(1);
    const collection = this;
    let result = this;

    Array.prototype.forEach.call(collection, (el) => {
      const $el = $(el);
      const data = $.extend({}, $el.data());
      let instance = $el.data(pluginName);

      /**
       * If our plugin is already instantiated, remove it from the data
       * object to avoid merging an old instance of the plugin into our
       * options.
       */
      if (instance instanceof Plugin) {
        delete data[pluginName];
      }

      const options = $.extend(
        true,
        {},
        defaults,
        instance instanceof Plugin && instance.options,
        data,
        typeof action === "object" && action
      );

      /**
       * If an instance of our plugin has not yet been initialised, or if
       * the action is an object and thus should be treated as a new
       * configuration, (re)initialise the plugin and store it on the
       * element.
       */
      if (instance instanceof Plugin === false || typeof action === "object") {
        instance = new Plugin(el, options);
        $el.data(pluginName, instance);
      }

      if (
        typeof action === "string" &&
        typeof instance[action] === "function"
      ) {
        const tmp = instance[action](...actionArgs);

        if (result === collection && tmp !== undefined) {
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
  $.fn[pluginName].noConflict = () => {
    const current = $.fn[pluginName];

    $.fn[pluginName] = noConflict;

    return current;
  };

  /**
   * Return or update our default options object to allow global default
   * modification.
   * @param object newDefaults new default dictionary to merge.
   * @return object
   */
  $.fn[pluginName].defaults = (newDefaults) => {
    if (typeof newDefaults === "object") {
      defaults = $.extend(true, {}, defaults, newDefaults);
    }

    return defaults;
  };
});
