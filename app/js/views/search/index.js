define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Handlebars = require('handlebars');

    Application.Views.Search = Backbone.View.extend({

        template: Handlebars.templates['search'],

        initialize:function () {
            console.log('search view initialized');
        },

        render:function () {
          $(this.el).html(this.template);

          return this;
        }
    });

    return Application.Views.Search;

  }
);
