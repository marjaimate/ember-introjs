/* globals require, mocha */
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

$(document).ready(function(){
  // Rename elements from qunit -> mocha
  $('#qunit').attr('id', 'mocha');
  $('#qunit-fixture').attr('id', 'mocha-fixture');

  // Declare `expect` as a global here instead of as a var in individual tests.
  // This avoids jshint warnings re: `Redefinition of 'expect'`.
  window.expect = chai.expect;

  require('ember-cli/test-loader')['default'].load();

  mocha.run();
});

beforeEach(function(){
  this.sandbox = sinon.sandbox.create();
});

afterEach(function(){
  this.sandbox.restore();
});

before(function(){
  var css = `
  .introjs-overlay, .introjs-helperLayder, .introjs-tooltipReferenceLayer, .introjs-tooltip {
    -webkit-transition: none !important;
       -moz-transition: none !important;
        -ms-transition: none !important;
         -o-transition: none !important;
            transition: none !important;
  }

  `;
  $('body').append(`<style>${css}</style>`);
});
