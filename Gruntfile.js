module.exports = function(grunt) {
  // Project configuration.
  'use strict';

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


  //load all tasks
  require('load-grunt-tasks')(grunt, {
    config: './package.json',
     scope: grunt.option('env') ? ['dependencies'] : ['devDependencies', 'dependencies']
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      tmp: {
        src: ['<%= gruntConfig.app.tmp %>']
      },
      dist: {
        src: '<%= gruntConfig.app.dist %>'
      },
      bower: {
        src: './bower_components/angular-bootstrap'
      },
      compiled: {
        src: 'assets/scss/compiled'
      },
      css: {
        scr: '<%= gruntConfig.app.tmp %>/css'
      }

    },

    ext: '{html,htm,tmpl,tpl}',

    project: 'tpe',//dynamic
    gruntConfig: grunt.file.readJSON('gruntConfig.json'),

    sass: {
      options: {
        style: 'compact'
      },
      dist: {
        files: [{
          expand: true,
          cwd:  'assets/scss/',
          src: ['*.scss', '!_bootstrap.scss', '!core.scss'],
          dest: '.tmp/css/',
          ext: '.css'
        }]
      },
      surge: {
        files:[]
      }

    },

    pageres: {
      multipleUrls: {
          options: {
              urls: ['http://localhost:<%= connect.pageres.options.port %>/views/core/#/main'],
              sizes: '<%= gruntConfig.viewport %>',//viewportSettings
              dest: '<%= gruntConfig.app.tmp %>/screenshots',
              crop: false,
              delay: 2000,
              //format: 'jpg'
              filename: '<%= time %>-<%= size %><%= crop %>'
          }
      }
    },

    autoshot: {
      dist: {
        options: {
          path: '<%= gruntConfig.app.tmp %>/screenshots',
          local: false,
          remote: {
            files: [
              { src: 'http://localhost:<%= connect.pageres.options.port %>/views/core/#/main',
              dest: 'app.jpg', delay: '5000'}
            ]
          },
          viewport: '<%= gruntConfig.viewport %>'
        }
      }
    },

    jsbeautifier: {
      options: {
          mode: 'VERIFY_AND_WRITE', //VERIFY_ONLY
          //config: 'path/to/config/file',
          css: {
            indentChar: ' ',
            indentSize: 4
          },
          html: {
            braceStyle: 'collapse',
            indentChar: ' ',
            indentScripts: 'keep',
            indentSize: 2,
            maxPreserveNewlines: 10,
            preserveNewlines: true,
            unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
            wrapLineLength: 0,
            fileTypes: ['.html', '.tmpl', 'tmpl']
          }
      },
      views: {
        src: ['views/{,*/}*.<%= ext %>']
      },
      tmpls: {
        src: ['<%= gruntConfig.app.tmpls %>/**/*.<%= ext %>']
      }

    },

    surge: {
      deploy: {
        options: {
          // The path or directory to your compiled project
          project: '<%= gruntConfig.app.dist %>/',
          // The domain or subdomain to deploy to
          domain: 'uiassetes.surge.sh'
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      js: {
        src: ['views/{,*/}*.<%= ext %>'],
        ignorePath:  /\.\.\/\.\.\//,
        exclude: [ 
          /respond|jquery|jasny-bootstrap|bootstrap-sass|dropzone|js\/bootstrap|html5shiv|angular\-modal\-service/ ],
        devDependencies: true,
        dependencies: true

      },
      scss: {
        devDependencies: false,
        src: ['<%= gruntConfig.app.assets %>/scss/*.scss'],
        //ignorePath: /(\.\.\/){1,2}bower_components\//,
        exclude: [/_bootstrap|lang/]
      },
      onError: function(err){
        grunt.log.error(err);
      }

    },

    watch: {

      scss: {
        //dynamic
      },


      js: {
        //dynamic
      },


      views: {
        //dynamic
      },

      tmpls: {
        //dynamic
      },

      bower: {
        files: ['bower.json'],
        tasks: ['newer:wiredep']
      },

/*

      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jshint:gruntfile', 'newer:jscs:gruntfile']
      },

*/
      media: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= gruntConfig.app.assets %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= gruntConfig.app.assets %>/fonts/**/*.{eot,svg,ttf,woff,woff2}'
        ]
      }
    },


    connect: {
      options: {
          hostname: 'localhost',
          base: ['.'],
          livereload: 35729

      },
      pageres: {
        options: {
          port: 8000,
          middleware: function(){}
        }
      },
      livereload: {
        options: {
          port: 9000,
          middleware: function(){},
          debug: true,
          useAvailablePort: true,
          livereload: 35729,
          keepalive: true
        }
      },
      test: {
        options: {
          port: 9000,
          middleware: function(connect, options, middlewares) {
            var views = [].concat(
              connect().use('/',connect.static('./test/screenshots'))
            );
            return [].concat(views, middlewares);
          }
        }
      }
    },

    processhtml: {
      options: {
        project: '',
        strip: true,//remove comments
        recursive: true,
        target: ''//main,desktop,resp,mobile - we have main flow for all [desktop,rep,mobile] assets 
      },
      main: {
        options: {
          data: {
            sourceSass: '../../../bower_components/bootstrap-sass/assets/stylesheets/bootstrap',
            proj: '<%= processhtml.options.project %>',
            projects: '<%= gruntConfig.css.paths.projects %>',
            globals: '<%= gruntConfig.css.paths.globals %>',
            mixins: '<%= gruntConfig.css.paths.mixins %>'
          }
        },
        files: {
          'assets/scss/compiled/_bootstrap_<%= processhtml.options.target %>.scss': 'assets/scss/_config.scss'
        }
      },
      final: {
        options: {
          data: {
            proj: '<%= processhtml.options.project %>'
          }
        },
        files: {
          'assets/scss/compiled/<%= processhtml.options.project %>.scss': 'assets/scss/_project.scss'
        }
        

      },
      desktop: '<%= processhtml.main %>',
      resp: '<%= processhtml.main %>',
      mobile: '<%= processhtml.main %>'


      
      

    },


    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      app: {
        src: [
          '<%= gruntConfig.app.assets %>/js/**/*.js'
        ]
      },
      gruntfile: {
        src: [
          'Gruntfile.js'
        ]
      }
    },

    scsslint: {
      options: {
        maxBuffer: 1000 * 1024,
        //bundleExec: true,
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true,
        compact: true,
        failOnWarning: false
      },
      scss: [
        '<%= gruntConfig.app.scss %>/**/*.scss'
      ]

    },

    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      tmpls: {
        options: {
          'doctype-first': false,
          'count-of-signle-quotes-equals-no-accept-odd-number': true
        },
        src: ['<%= gruntConfig.app.tmpls %>/**/*.<%= ext %>']
      },
      views: {
        src: ['<%= gruntConfig.app.views %>/**/*.<%= ext %>']
      }

    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        //reporterOutput: './.jshintErrors',
        filter: 'isFile'
      },
      app: {
        options: {
          'W074': true
        },
        src: [
          '<%= gruntConfig.app.assets %>/js/**/*.js'
        ]
      },
      gruntfile: {
        src: [
          'Gruntfile.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    ngtemplates: {
      options: {
        htmlmin:  {
          collapseWhitespace: true,
          collapseBooleanAttributes: true
        },
        module: 'Tmpls',
        standalone: true
      },

      tmpls: {
        options: {
          url: function(){}//dynamic
        },
        cwd: 'assets/tmpls',
        src:  [],//dynamic
        dest:  ''//dynamic
      },

      bootstrap: {
        options: {
          url: function(url) {
            return url.replace(new RegExp('\w*'), 
            grunt.config.get('ngtemplates.bootstrap.options.pref')+'template/')
            .replace('.tmpl', '.html');
          },
          module: 'TmplsBootstrap',
          pref: ''//dynamic

        },
        cwd: '',//dynamic
        src:  '**/*.<%= ext %>',
        dest:  ''//dynamic
      },

      uiselect: {
        options: {
          url: function(url) {
            return url.replace(new RegExp('\w*'), 'uiselect/').replace('.tmpl', '.html');
          },
          module: 'TmplsUISelect',
          pref: ''//dynamic

        },
        cwd: '',//dynamic
        src:  '**/*.<%= ext %>',
        dest:  ''//dynamic

      }


  },

    concurrent: {
      minify: [
      'imagemin',
      'svgmin'
      ]
    },

    imagemin: {
     dist: {
       files: [{
         expand: true,
         cwd: '<%= gruntConfig.app.assets %>/images',
         src: [
           'favicon.ico', 'bg-desk2-half.jpg', 'bg-desk2.jpg', 'error-icon.png'
         ],
         flatten: true,
         dest: '<%= gruntConfig.app.dist %>/images'
       }]
     }
    },

    svgmin: {
     dist: {
       files: [{
         expand: true,
         cwd: '<%= gruntConfig.app.assets %>/images',
         src: '{,*/}*.svg',
         dest: '<%= gruntConfig.app.dist %>/images'
       }]
     }
    },



    copy: {
      index: {
        files: []
      },
      fonts: {
        files: [
          {
            cwd: '.',
            src: '<%= gruntConfig.bower %>/font-awesome/fonts/*',
            dest: '<%= gruntConfig.app.dist %>/fonts/fa',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }, {

            cwd: '.',
            src: '<%= gruntConfig.bower %>/bootstrap-sass/assets/fonts/bootstrap/*',
            dest: '<%= gruntConfig.app.dist %>/fonts/bootstrap',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }, {
            cwd: '.',
            src: '<%= gruntConfig.app.assets %>/fonts/*',
            dest: '<%= gruntConfig.app.dist %>/fonts',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }, {
            cwd: '.',
            src: '<%= gruntConfig.app.assets %>/fonts/apps/*',
            dest: '<%= gruntConfig.app.dist %>/fonts/apps',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },



    //addede to usemin process
    ngAnnotate: {
      options: {
        singleQuotes: true,
        separator: ';'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= gruntConfig.app.tmp %>/concat/scripts',
          src: 'scripts.min.js',
          dest: '<%= gruntConfig.app.tmp %>/concat/scripts'
          //rename: function (dest, src) { return src + '-annotated'; }
        }]
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= gruntConfig.app.dist %>/scripts/{,*/}*.js',
          '<%= gruntConfig.app.dist %>/css/{,*/}*.css',
          '<%= gruntConfig.app.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= gruntConfig.app.dist %>/fonts/*'
        ]
      }
    },


    usemin: {
      html: '<%= gruntConfig.app.dist %>/index.html',
      css: ['<%= gruntConfig.app.dist %>/css/{,*/}*.css'],
      js: ['<%= gruntConfig.app.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= gruntConfig.app.dist %>',
          '<%= gruntConfig.app.dist %>/images',
          '<%= gruntConfig.app.dist %>/css'

        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },


    useminPrepare: {
      html: '<%= gruntConfig.app.dist %>/index.html',
      options: {
        dest: '<%= gruntConfig.app.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat','uglify'],
              css: ['cssmin']
            },
            post: {
              css: [{
                name: 'cssmin',
                createConfig: function (context, block) {
                  var generated = context.options.generated;
                  generated.options = {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                    keepSpecialComments: 0,
                    //compatibility: 'ie8',
                    sourceMap: true,
                    restructuring: false
                  };
                }
              }]

            }
          }
        }
      }
    }


  });



  grunt.task.registerTask('connectServer', 'grunt connect custom', function() {

    //server
    var middleware = function(connect, options, middlewares) {
      var args = this,//args
      project = args[0],
      modRewrite = require('connect-modrewrite');


      return [].concat([
        modRewrite([
          '^/views/\\w+/images ./assets/images [L]',
          '^/views/\\w+/fonts/bootstrap ./bower_components/bootstrap-sass/assets/fonts/bootstrap [L]',//bootstrap-sass
          '^/views/\\w+/fonts/apps ./assets/fonts/apps [L]',//icomoon
          '^/views/\\w+/fonts/fa ./bower_components/font-awesome/fonts [L]',//font-awesome
          '^/views/\\w+/fonts ./assets/fonts [L]',
          '^/views/\\w+/tmpls .tmp/tmpls [L]',
          '^/views/\\w+/assets ./assets [L]',
          '^/views/\\w+/css .tmp/css [L]',
          '^/views/\\w+/bower_components ./bower_components [L]',
          '^/views/\\w+/node_modules ./node_modules [L]',
          '^/user.json$ ./static/user.json [L]',
          '^/permissions.json$ ./static/permissions.json [L]',

          '^/$ http://' + options.hostname + ':' + options.port + '/views/'+project+' [P]'
        ])
      ], middlewares, [

      ]);

    }.bind(arguments);


    grunt.config.set('connect.livereload.options.middleware', middleware);
    grunt.task.run('connect:livereload');


  });



  grunt.registerTask('server', 'Local server run', function(project) {

    if (!project) {
      return;
    }

    grunt.task.run([
      'wiredep:scss',
      'wiredep:js',
      'tmpls:'+project+'',
      'tmpls_bootstrap:'+project+'',
      'tmpls_uiselect:'+project+'',
      'connectServer:'+project+''
      //'watcher:'+project+''
    ]);

  });

  //we use 'relese' for surge right now only
  grunt.registerTask('release', 'Build release project for surge', function(target, project) {
    if (target === 'surge') {

      grunt.config.set('surge.deploy.options.domain', 'uiassetes.'+project+'.surge.sh');

      grunt.task.run([
        //'clean:tmp',
        'clean:dist',
        'wiredep:scss',
        'copy:fonts',
        'concurrent:minify',
        'wiredep:js',
        'tmpls:'+project+'',
        'tmpls_bootstrap:'+project+'',
        'tmpls_uiselect:'+project+'',
        'copyIndex:'+project+''
      ]);


      grunt.task.run([
        'usemin:processing',
        'surge'
      ]);


    }

  });

  grunt.registerTask('tmpls_uiselect', 'ngtemplates:uiselect with dynamic arguments ', function(project) {

    var uiselect = grunt.config.get('gruntConfig.bootstrap.uiselect.'+project);
    grunt.config.set('ngtemplates.uiselect.cwd', ''+ uiselect?'./assets/tmpls/bootstrap/uiselect':'');

    if (uiselect){
      grunt.config.set('ngtemplates.uiselect.dest', '.tmp/tmpls/tmpls.bootstrap.uiselect.js');

      grunt.task.run([
        'ngtemplates:uiselect'
      ]);

    }

  });

  grunt.registerTask('tmpls_bootstrap', 'ngtemplates:bootstrap with dynamic arguments ', function(project) {

    var v = grunt.config.get('gruntConfig.bootstrap.v.'+project);
    var version = v && v[0] || '0.13.4';
    var pref = v && v[1] || '';

    grunt.config.set('ngtemplates.bootstrap.cwd', 'assets/tmpls/bootstrap/'+version);
    grunt.config.set('ngtemplates.bootstrap.dest', '.tmp/tmpls/tmpls.bootstrap.'+version+'.js');
    grunt.config.set('ngtemplates.bootstrap.options.pref', pref);

    grunt.task.run([
      'ngtemplates:bootstrap'
    ]);

  });

  grunt.registerTask('tmpls', 'ngtemplates: with dynamic arguments ', function(project) {

    if (!project) {
      return;
    }

    grunt.config.set('ngtemplates.tmpls.options', {
      url: function(url){

        if (project === 'fist' &&  new RegExp('^'+project+'\/common').test(url)) {
          return url.replace(/^\w*\//,'views/');
        }

        if (new RegExp('^'+project).test(url)) {
          return url.replace(/^\w*\//,''); //delete project prefix
        }

        return url;
      }


   });

    grunt.config.set('ngtemplates.tmpls.src', [
      project+'/**/*.<%= ext %>', 'shared/**/*.<%= ext %>']
    );
    grunt.config.set('ngtemplates.tmpls.dest', '.tmp/tmpls/tmpls.'+project+'.js');


    grunt.task.run([
      'ngtemplates:tmpls'
    ]);

  });

/* jshint ignore:start */
  grunt.registerTask('watcher', 'watcher:[project]:[type]', function(project, type) {
    if (!project) {
      return;
    }
    //set version of Bootstrap
    var versionBootstrap = '<%= gruntConfig.bootstrap.v.'+project+' %>';
    //set project
    grunt.config.set('project', project);
    var livereload = {
          livereload: '<%= connect.options.livereload %>'
        };
    var types = !type ? {'scss': true, 'js': true, 'views': true, 'tmpls' : true} : {};


      if (type === 'scss' || types.scss){
        grunt.config.set('watch.scss', {
          files: ['<%= gruntConfig.app.scss %>/'+project+'.scss'],//dynamic
          tasks: [
            'newer:scsslint:scss',
            'sassDist:'+project+''
          ],//dynamic
          options: livereload
        });
      }

      if(type === 'js' || types.js) {
        grunt.config.set('watch.js', {
          files: ['<%= gruntConfig.app.assets %>/js/'+project+'/**/*.js'],//dynamic
          tasks: [
          'newer:jshint:app',
          'newer:jscs:app'
          ],
          options: livereload
        });
      }

      if(type === 'views' || types.views){
        grunt.config.set('watch.views', {
        files: ['<%= gruntConfig.app.views %>/'+project+'/index.html'],//dynamic
          tasks: [
            'loadRules:htmlhint',
            'newer:htmlhint:views',
            'newer:jsbeautifier:views'
            ],
          options: livereload
        });
      }
      if (type === 'tmpls' || types.tmpls) {
        grunt.config.set('watch.tmpls', {

          files: [
            '<%= gruntConfig.app.tmpls %>/'+project+'/**/*.<%= ext %>',
            '<%= gruntConfig.app.tmpls %>/shared/**/*.<%= ext %>',
            '<%= gruntConfig.app.tmpls %>/bootstrap/'+versionBootstrap[0]+'/**/*.<%= ext %>'
          ],//dynamic
          tasks: [
          'loadRules:htmlhint',
          'newer:htmlhint:tmpls',
          //'newer:jsbeautifier:tmpls',

          'tmpls:'+project+'',
          'tmpls_bootstrap:'+project+'',
          'tmpls_uiselect:'+project+''
          ],//dynamic
          options: livereload

        });
      }


    if (type) {
      grunt.task.run([
        'watch:'+type+''
      ]);

    } else {

      grunt.task.run([
        'watch'
      ]);

    }


  });
/* jshint ignore:end */

  grunt.registerTask('sassDist', 'sassDist:[project]', function(project) {
      grunt.config.set('sass.surge.files',
         [{
          expand: true,
          cwd:  'assets/scss/',
          src: ['*'+project+'.scss'],
          dest: '.tmp/css/',
          ext: '.css'
        }]);

      grunt.task.run([
        'sass:surge'
      ]);
  });
 
 grunt.registerTask('compile', 'compile:[target]:[project]', function(target, project){ 
  
  grunt.config.set('processhtml.options.target', target === 'main' ? target : 'custom');
  
  if (target === 'main') {
    return grunt.task.run(['processhtml:'+project]);
  } 
  if (grunt.config.get('gruntConfig.css.resp.'+project) && target !== 'mobile' ) {
    return grunt.task.run(['processhtml:resp']);
  } 

  grunt.task.run(['processhtml:'+target]);
  
 });

 grunt.registerTask('bootstrap:config', 'bootstrap:config:project, generate bootstrap_resp, bootstrap_desktop, bootstrap_mobile', function(project, target) {

  target = target || 'desktop';

  grunt.config.set('processhtml.options.project', project);
  grunt.config.set('processhtml.'+project, '<%= processhtml.main %>');
  


  //clean all generated css
  grunt.task.run([
    'clean:compiled','clean:css'
  ]);


  //if config exist
  if (grunt.file.exists('assets/scss/main/'+project+'.scss') && grunt.file.exists('./assets/scss/_config.scss')) {
       
    grunt.task.run([
      'compile:main:'+project
    ]);
    
    grunt.task.run([
      'compile:'+target+':'+project
    ]);

  } else {
    grunt.fail.warn('Porject not exist');
  }

  //compile final
  grunt.task.run(['processhtml:final']);

 });


  grunt.registerTask('copyIndex', 'copyIndex:[project]', function(project) {
      grunt.config.set('copy.index.files',
        [{
          cwd: '<%= gruntConfig.app.views %>/'+project,
          src: 'index.html',
          dest: '<%= gruntConfig.app.dist %>',
          expand: true,
          flatten: true,
          filter: 'isFile'
        }]);

      grunt.task.run([
        'copy:index'
      ]);
  });



  grunt.registerTask('usemin:processing', [
    'useminPrepare',
    'cssmin',
    'concat',
    'ngAnnotate',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('loadRules:htmlhint', '', function() {
    require('./htmlhint-rules/count-of-signle-quotes-equals-no-accept-odd-number').init();
  });

  grunt.registerTask('htmlhintCustom', ['loadRules:htmlhint', 'htmlhint']);


  grunt.registerTask('default', ['server']);

  grunt.registerTask('test', []);

  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('beautifier', ['jsbeautifier']);

  //Integrate NodeUnit for Automated Screenshots "grunt-contrib-nodeunit": "^0.4.1", for test plugin ScreenShots CBT


};
