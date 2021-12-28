# jQuery Plugin Template

![Tests](https://github.com/robinmalburn/jquery-plugin-template/actions/workflows/tests.yml/badge.svg?branch=master&event=push)

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
$("#foo").defaultPluginName({
    someOption:  'someValue'
});
```

## Versions

This template is provided in two flavours - vanilla and ES6.  Both are identical as regards feature set and configuration, but the ES6 version is written to a more modern standard, leveraging ES6 and beyond features to make the process of writing javascript a more pleasant experience.  Read on for a more detailed explanation of the differences, but the short of it is:  If you want to write modern javascript, use the ES6 version, but remember you'll need to run your code through a transpiler like babel to use the resulting plugin in most browsers and be confidence of cross browser compatibility.

### Vanilla Version

The vanilla, original version of the plugin can be found in `src/jquery.plugin.template.js`.  This version is written in plain javascript that should be supported by any modern browser released in the last few years without the need for a transpiler.

The code follows jQuery's style guide for plugins.

### ES6 Version

The ES6 version of the plugin can be found in `src/jquery.plugin.template.es6.js`.  This version, as stated above, is written to take advantage of features in ES6 and beyond.  This is a big quality of life improvement for writing javascript, but please make sure you run your plugin through a transpiler such as babel before attempting to use the code in the browser.

This code follows the eslint:recommended style guide, which is more up to date with the ES6 langauge constructs and patterns.  The package includes a configured `.eslintrc.json` used to lint the template itself, but also useful as a base to lint your own plugins using eslint.

The packge also contains a bare bone .babelrc with preset-env - it assumes you'll be targeting the default envs, but you can update the configuration in the .babelrc to match your actual requirments.

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

```javascript
$("#foo").defaultPluginName(); //Will be instantiated with the option "someValue" set to the above text.
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
$("#foo").defaultPluginName("foo"); //Call plugin.foo() through the jQuery wrapper.
```

## License

Released under [MIT license](https://github.com/robinmalburn/jquery-plugin-template/blob/master/LICENSE).
