import * as chai from "chai";
import jquery from "jquery";
import factory from "../src/jquery.plugin.template.js";

describe("Plugin", function () {
  let $fixture;
  const $ = jquery;
  const pluginName = "defaultPluginName";

  before(function () {
    $fixture = $(global.window, "#fixture");
    factory($);
  });

  beforeEach(function () {
    $.fn[pluginName].defaults({});
    $fixture.removeData();
  });

  it("should initialise", function () {
    $fixture[pluginName]();

    chai.assert.ok(
      $fixture.data(pluginName),
      "Assert that our plugin is stored in data against the plugin name."
    );

    chai.assert.deepEqual(
      $fixture.data(pluginName).options,
      $.fn[pluginName].defaults(),
      "Assert that our plugin's options match the defaults"
    );
  });

  it("should be configurable", function () {
    $.fn[pluginName].defaults({ foo: "bar" });

    $fixture[pluginName]();

    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      $.fn[pluginName].defaults().foo,
      "Assert that the globally updated default is set on the reinstantiated instance."
    );

    $fixture.removeData();

    $.fn[pluginName].defaults({ bar: "qux" });
    $fixture[pluginName]();
    chai.assert.deepEqual(
      $fixture.data(pluginName).options,
      { foo: "bar", bar: "qux" },
      "Assert that the globally updated default are merged together for the reinstantiated instance"
    );
    $fixture.removeData();

    $fixture[pluginName]({ foo: "baz" });
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "baz",
      "Assert that the configuration object supplied overrides defaults."
    );
    $fixture.removeData();

    $fixture.data("foo", "baz");
    $fixture[pluginName]();
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "baz",
      "Assert that data attributes on the element override defaults."
    );
    $fixture.removeData();

    $fixture.data("foo", "baz");
    $fixture[pluginName]({ foo: "boom" });
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "boom",
      "Assert that the configuration object overrides both default and any data attributes on the element."
    );
    $fixture.removeData();
  });

  it("should support persistent, but overridable configuration", function () {
    $fixture[pluginName]({ foo: "baz" });
    $fixture[pluginName]();
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "baz",
      "Assert that existing configuration options are preserved when re-initialising."
    );
    $fixture.removeData();

    $fixture[pluginName]({ foo: "baz" });
    $fixture[pluginName]({ foo: "boom" });
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "boom",
      "Assert that existing configuration options are overridden when re-initialising with a configuration object."
    );
    $fixture.removeData();

    $fixture[pluginName]({ foo: "baz" });
    $fixture.data("foo", "boom");
    $fixture[pluginName]({});
    chai.assert.equal(
      $fixture.data(pluginName).options.foo,
      "boom",
      "Assert that existing configuration options are overridden when re-initialising with new data attributes and an empty configuration object."
    );
    $fixture.removeData();
  });

  it("should have accessible methods", function () {
    $fixture[pluginName]({
      foo: "bar",
    });

    chai.assert.equal(
      $fixture,
      $fixture[pluginName]("registerBindings"),
      "Assert that calling methods that return undfined return the jQuery object collection they were called on to maintain chainability"
    );
  });

  it("should support no conflict mode", function () {
    var plugin = $.fn[pluginName].noConflict();

    $.fn.reboundPlugin = plugin;

    chai.assert.equal(
      undefined,
      $.fn[pluginName],
      "Assert that after running noConflict, the defaultPluingName on jQuery is unbound"
    );

    chai.assert.ok(
      plugin,
      "Assert that we were returned a copy of the plugin wrapper"
    );

    $fixture.reboundPlugin();

    chai.assert.ok(
      $fixture.data(pluginName),
      "Assert that we can reaassign the now non-conflicting plugin and still use it."
    );
  });
});
