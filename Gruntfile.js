module.exports = function(grunt) {
	var defaultTasks = ['concat'/*, 'uglify'*/]; // used for watch as well

	var files = [ 'src/UserScriptHeader.js', 'src/Header.js',
				'src/ToggleAnimations.js', 'src/Footer.js' ];

	var opkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		pkg: opkg,
		
		concat: {
			options: {
				process: function(src, filepath) {
					return (filepath != "src/UserScriptHeader.js"?'\n// Source: ' + filepath + '\n\n' : "") + src.replace(/@VERSION@/g, opkg.version);
				}
			},
			all: {
				src: files,
				dest: 'dist/<%= pkg.name %>.user.js',
			}
		},

		/*uglify: {
			all: {
				files: {
					'pmd-roleplay-extended-chat.min.user.js': ['pmd-roleplay-extended-chat.user.js']
				}
			}
		},*/

		watch: {
			all: {
				files: files,
				tasks: defaultTasks,
				options: {
					debounceDelay: 250
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', defaultTasks);
};