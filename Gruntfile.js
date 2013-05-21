var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    meta: {
      version: '0.1.0',
      banner: '/*! BackboneRequireJS - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %>'
    },

    regarde: {
      js: {
        files: 'app/js/**/*.js',
        tasks: ['jshint', 'livereload']
      },

      css: {
        files: 'app/css/**/*.styl',
        tasks: ['stylus', 'livereload']
      },

      templates: {
        files: 'app/templates/**/*.handlebars',
        tasks: ['handlebars']
      },

      html: {
        files: '*.html',
        tasks: ['livereload']
      },

      app: {
        files: 'application.js',
        tasks: ['livereload']
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['vendor/**'],
            dest: 'public/'
          },
          {
            expand: true,
            cwd: 'app',
            src: ['img/**'],
            dest: 'public/'
          },
          {
            expand: true,
            cwd: 'app',
            src: ['css/wm_style.css'],
            dest: 'public/'
          },
          {
            expand: true,
            cwd: 'app',
            src: ['js/templates.js'],
            dest: 'public/'
          },
          {
            expand: true,
            cwd: 'app',
            src: ['index.html'],
            dest: 'public/'
          }
        ]
      }
    },

    connect: {
      livereload: {
        options: {
          port: 8000,
          base: 'app',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      },
      staging: {
        options: {
          port: 8005,
          keepalive: true,
          base: 'public',
          middleware: function (connect, options) {
            return [ folderMount(connect, options.base) ];
          }
        }
      }
    },

    requirejs: {
      compile: {
        options: {
            // `name` and `out` is set by grunt-usemin
            appDir: 'app',
            mainConfigFile: 'app/js/main.js',
            modules: [ {
              name: "main"
              }
            ],
            dir: 'public/js',
            optimize: 'none',
            wrap: true
        }
      }
    },


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true
      },

      globals: {
        jQuery: true,
        $: true,
        _: true
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'Handlebars.templates',

          processName: function(filename) {
            var filenameArray = filename.split(/[\/\.]+/);
            return filenameArray[filenameArray.length - 2]; // Strip path and extension
          }
        },

        files: {
          'app/js/templates.js': 'app/templates/**/*.handlebars'
        }
      }
    },

    stylus: {
      compile: {
        paths: ['styles'],
        urlfunc: 'embed',

        files: {
          'app/css/wm_style.css': 'app/css/wm_style.styl'
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', [
      'stylus',
      'handlebars',
      'livereload-start',
      'connect:livereload',
      'regarde'
  ]);

  grunt.registerTask('start', [
      'stylus',
      'handlebars',
      'livereload-start',
      'connect:livereload',
      'open-browser',
      'regarde'
  ]);

  grunt.registerTask('build', [
     'stylus',
     'handlebars',
  ]);

  //build for distribution, but doesn't work yet...
  grunt.registerTask('build-dis', [
     'stylus',
     'handlebars',
     'copy',
     'requirejs',
     'connect:staging'
  ]);

  grunt.registerTask('open-browser', function() {
    var open = require('open');
    open( 'http://localhost:8000' );
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-regarde');
};
