'use strict';

const jsdom = require('jsdom');

global.document = new jsdom.JSDOM('<!doctype html><html><body><div id="fixture"></div></body></html>');
global.window = document.window;
global.navigator = global.window.navigator;
global.HTMLElement = global.window.HTMLElement;
global.$ = require('jquery');
global.chai = require('chai');