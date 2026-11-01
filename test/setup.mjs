import { JSDOM } from "jsdom";

const { window } = new JSDOM(
  '<!doctype html><html><body><div id="fixture"></div></body></html>'
);

global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
