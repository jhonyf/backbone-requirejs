define(function(require, exports, module) {
    var Backbone = require('backbone'),
        HomeView = require('views/home/index');
        SearchView = require('views/search/index');

    Application.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'search': 'search'
        },

        index: function() {
            var view = new HomeView();
            $("#main-content").html(view.render().el);
        },

        search: function() {
            var view = new SearchView();
            $("#main-content").html(view.render().el);
        }
    });

    return Application.Router;

  }
);
