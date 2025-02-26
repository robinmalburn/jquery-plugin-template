import jsdom from "jsdom";

global.document = new jsdom.JSDOM(
  '<!doctype html><html><body><div id="fixture"></div></body></html>'
);
global.window = document.window;
global.HTMLElement = global.window.HTMLElement;
