window.Application = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {}
};

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  baseUrl: "js",
  paths: {
    jquery: '/vendor/js/jquery',
    underscore: '/vendor/js/underscore',
    backbone: '/vendor/js/backbone',
    handlebars: '/vendor/js/handlebars',
    bootstrap: '/vendor/js/bootstrap',
    templates: 'templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'templates': {
      deps: ['handlebars']
    },
    'underscore': {
        exports: '_'
    },
    'handlebars': {
        exports: 'Handlebars'
    },
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require([
  // Load our app module and pass it to our definition function
  'application',
], function(App){
  App.initialize();
});
