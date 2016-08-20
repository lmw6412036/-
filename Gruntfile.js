module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		html_template:{
			options: {
				beautify: {
					indent_size: 2
				}
			},
			build:{
				expand: true,
				cwd: "src/",
				src: ['html/*.html','html/**/*.html','index.html'],
				dest: "build/"
			}
		},

		//js 合并
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['src/html/**/*.js','src/html/*.js','!src/html/app.js','src/html/app.js'],
				dest: 'build/app/app.js'
			},
		},

		// sass转css
		sass: {
			build: {
				options: {
					sourcemap: "none"
				},
				files: {
					'build/css/style.css': "src/html/style.scss"
				}
			}
		},

		// 复制
		copy: {
			build: {
				files: [
					{expand: true, cwd: 'src', src: ['{lib,img}/*','{lib,img}/**/*'], dest: 'build'}
				]
			}
		},


		watch:{
			sass:{
				files: ['src/html/*.scss','src/html/**/*.scss'],
				tasks: ['sass']
			},
			copy:{
				files: ['src/{img,lib}/*','src/{img,lib}/**/*'],
				tasks: ['copy']
			},
			html:{
				files: ['src/**/*.html','src/*.html'],
				tasks: ['html_template']
			},
			concat:{
				files: ['src/html/*.js','src/html/**/*.js'],
				tasks: ['concat']
			}
		},

		// 代理服务器
		browserSync: {
			dev: {
				bsFiles: {
					src: ['build/*','build/**/*']
				},
				options: {
					//proxy: 'localhost/ddys2/',//安装本地apache等服务器采用此配置,路径按照本地环境而定
					server:'./build/',//未安装本地服务器采用此配置
					watchTask: true,
					browser: "google chrome"
				}
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-html-template');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-html-sitemap');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['concat','sass','copy','html_template','browserSync','watch']);

};