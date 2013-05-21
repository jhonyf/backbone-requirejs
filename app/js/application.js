define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Router = require('routers/main'),
        Handlebars = require('handlebars'),
        templates = require('templates');

    //Return the module value
    exports.initialize = function () {
      new Router();
      Backbone.history.start();
    };
  }
);

