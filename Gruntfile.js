// ## Grunt configuration

configureGrunt = function (grunt) {

	// load all grunt tasks
	require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	var cfg = {
		// ### Config for grunt-contrib-watch
        // Watch files and livereload in the browser during development
        watch: {
        	'handlebars-ember': {
                files: ['core/client/**/*.hbs'],
                tasks: ['emberTemplates:dev']
            },
            ember: {
                files: ['core/client/**/*.js'],
                tasks: ['transpile', 'concat_sourcemap']
            },
            express: {
                // Restart any time clientold or server js files change
                files:  ['core/server.js', 'core/server/**/*.js'],
                tasks:  ['express:dev'],
                options: {
                    //Without this option specified express won't be reloaded
                    nospawn: true
                }
            }
        },

        // ### Config for grunt-express-server
        // Start our server in development
        express: {
            options: {
                script: 'app.js',
                output: 'Ghost is running'
            },

            dev: {
                options: {
                    //output: 'Express server listening on address:.*$'
                }
            },
            test: {
                options: {
                    node_env: 'testing'
                }
            }
        },

    	// ### Config for grunt-ember-templates
	    // Compiles handlebar templates for ember
	    emberTemplates: {
	        dev: {
	            options: {
	                templateBasePath: /core\/client\//,
	                templateFileExtensions: /\.hbs/,
	                templateRegistration: function (name, template) {
	                    return grunt.config.process("define('expressBoiler/") + name + "', ['exports'], function(__exports__){ __exports__['default'] = " + template + "; });";
	                }
	            },
	            files: {
	                "core/built/scripts/templates-ember.js": "core/client/templates/**/*.hbs"
	            }
	        }
	    },

	    // ### Config for grunt-es6-module-transpiler
	    // Compiles Ember es6 modules
	    transpile: {
	        client: {
	            type: 'amd',
	            moduleName: function (path) {
	                return 'expressBoiler/' + path;
	            },
	            files: [{
	                expand: true,
	                cwd: 'core/client/',
	                src: ['**/*.js'],
	                dest: '.tmp/ember-transpiled/'
	            }]
	        }
	    },

	    // ### Config for grunt-es6-module-transpiler
	    // Compiles Ember es6 modules
	    concat_sourcemap: {
	        client: {
	            src: ['.tmp/ember-transpiled/**/*.js'],
	            dest: 'core/built/scripts/ghost-dev-ember.js',
	            options: {
	                sourcesContent: true
	            }
	        }
	    }
	};


    grunt.initConfig(cfg);

    // All tasks related to building the Ember client code
    grunt.registerTask('emberBuild', 'Build Ember JS & templates for development', ['emberTemplates:dev', 'transpile', 'concat_sourcemap']);

    grunt.registerTask('dev',
    	'Build JS & templates for development',
    	[
    		'emberBuild',
    		'express:dev',
    		'watch'
    	]);

    grunt.registerTask('default',
    	'Build JS & templates for development',
    	[
    		'emberBuild'
    	]);
}

module.exports = configureGrunt;