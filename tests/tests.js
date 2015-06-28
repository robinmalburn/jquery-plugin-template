;(function($, window, undefined){
    var $fixture = $("#qunit-fixture");

    QUnit.testStart(function(test){
        $.fn.defaultPluginName.defaults({});
        $fixture.removeData();
    });

    QUnit.test("Initialization", function(assert) {
        $fixture.defaultPluginName();

        assert.ok(
            $fixture.data("defaultPluginName"),
            "Assert that our plugin is stored in data against the plugin name."
          );

        assert.deepEqual(
            $fixture.data("defaultPluginName").options,
            $.fn.defaultPluginName.defaults(),
            "Assert that our plugin's options match the defaults"
            );
    });


    QUnit.test("Configuration", function(assert) {
        $.fn.defaultPluginName.defaults.foo = "bar";

        $fixture.defaultPluginName();
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                $.fn.defaultPluginName.defaults().foo,
                "Assert that the globally updated default is set on the reinstantiated instance."
            );
        $fixture.removeData();

        $fixture.defaultPluginName({foo: "baz"});
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "baz",
                "Assert that the configuration object supplied overrides defaults."
            );
        $fixture.removeData();

        $fixture.data("foo", "baz");
        $fixture.defaultPluginName();
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "baz",
                "Assert that data attributes on the element override defaults."
            );
        $fixture.removeData();

        $fixture.data("foo", "baz");
        $fixture.defaultPluginName({"foo" : "boom"});
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "boom",
                "Assert that the configuration object overrides both default and any data attributes on the element."
            );
        $fixture.removeData();

        $fixture.defaultPluginName({"foo" : "baz"});
        $fixture.defaultPluginName();
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "baz",
                "Assert that existing configuration options are preserved when re-initialising."
            );
        $fixture.removeData();

        $fixture.defaultPluginName({"foo" : "baz"});
        $fixture.defaultPluginName({"foo" : "boom"});
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "boom",
                "Assert that existing configuration options are overridden when re-initialising with a configuration object."
            );
        $fixture.removeData();

        $fixture.defaultPluginName({"foo" : "baz"});
        $fixture.data("foo", "boom");
        $fixture.defaultPluginName({});
        assert.equal(
                $fixture.data("defaultPluginName").options.foo,
                "boom",
                "Assert that existing configuration options are overridden when re-initialising with new data attributes and an empty configuration object."
            );
        $fixture.removeData();
    });

    QUnit.test("Method Calling", function(assert){
        $fixture.defaultPluginName(
            {
                foo : "bar"
            }
            );

        assert.equal(
            $fixture,
            $fixture.defaultPluginName("registerBindings"),
            "Assert that calling methods that return undfined return the jQuery object collection they were called on to maintain chainability"
            );
    });

    QUnit.test("NoConflict Support", function(assert){
        var plugin = $.fn.defaultPluginName.noConflict();

        $.fn.reboundPlugin = plugin;

        assert.notOk(
            $.fn.defaultPluginName,
            "Assert that after running noConflict, the defaultPluingName on jQuery is unbound"
            );

        assert.ok(
            plugin,
            "Assert that we were returned a copy of the plugin wrapper"
            );

        $fixture.reboundPlugin();
        assert.ok(
            $fixture.data("defaultPluginName"),
            "Assert that we can reaassign the now non-conflicting plugin and still use it."
            );
    });

})(jQuery, window);
