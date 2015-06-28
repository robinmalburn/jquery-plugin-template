# jQuery Plugin Template

This template provides a solid base to begin building your own jQuery plugins
whilst offering many useful features with little to no additional configuration
required.

There are countless ways to create a jQuery plugin, and this template is the
evolution of various styles I've played around with over the years to get me to
a plugin pattern that feels like the best middleground of simplicity and
flexibility.  

## Usage

- Include your chosen version of jQuery.
- Include your plugin script on the page, e.g.
    ```html
    <script  src="src/jquery.plugin.template.js"></script>
    ```
- Instantiate your plugin on your desired element(s):
    ```javascript
    $("#foo").defaultPluginName(
        someOption:  'someValue'
    );
    ```

## Features

### AMD

Out of the box this template will work with AMD-style module loaders such as
require.js.

### No Conflict

This template plays nice with others - if a consumer of your plugin should run
into a naming conflict with another plugin of theirs, this template allows
restoring a conflicted plugin and returning a copy of your plugin for the user
to keep working with.

### Configuration

There are three different options for configuring a plugin using this template:

#### Defaults

A defaults method is made available on the plugin constructor, allowing you to
grab a copy of the defalts, or completely override them.  Once overriden, any
newly constructed instances will inherit your new set of defaults.

Example usage:

```javascript
//Overriding the defaults
$.fn.defaultPluginName.defaults({
    someValue: "someNewDefault"
});

//Reading defaults
console.log($.fn.defaultPluginName.defaults().someValue); //logs 'someNewDefault'
```

#### Configuration Object

When instantiating or re-instantiating the plugin, a plain Javascript object can
be given to provide configuration options.

Example usage:

```javascript
//Overriding the defaults
$("#foo").defaultPluginName({
    someValue: "someNewDefault"
});
```

#### Data Attributes

You may also configure your plugin via data attributes directly on the target
dom node itself.

Example usage:

```html
<div id="foo" data-some-value="Some value from the DOM"></div>
```

``javascript
$("#foo").defaultPluginName(); //Will be instantiated with the option 
"someValue" set to the above text.
```

### Instances & Plugin methods

The instance of your given plugin can be accessed via a data attribute on each
element it is instantiated on.  The data attribute name will match the given
plugin name, so in our example plugin, you could use:

```javascript
var plugin = $("#foo").data("defaultPluginName");
plugin.foo(); //We can now call methods directly on the plugin.
```

This allows you to call methods on the plugin directly, without proxying through
the jQuery wrapper.

That said, the template also provides a convenient way of calling methods on
your plugin straight from the jQuery wrapper itself.  For example:

```javascript
$("#foo").defaultPluginName("foo"); //Call plugin.foo() through the jQuery
wrapper.
```

## License

Released under [MIT license](https://github.com/robinmalburn/jquery-plugin-template/blob/master/LICENSE).
