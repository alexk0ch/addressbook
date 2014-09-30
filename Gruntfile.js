module.exports = function(grunt) {

    grunt.initConfig({

        concat: {
            main: {
                src: [
                    'dev/vendor/ng.min.js',
                    'dev/vendor/md5.min.js',
                    'dev/vendor/ng/*.js',
                    'dev/init.js',
                    'dev/directives/*.js',
                    'dev/services/*.js',
                    'dev/controllers/*.js',
                    'dev/app.js'
                ],
                dest: 'front/js/app.js'
            }
        },

        connect: {
            test: {
                options: {
                    port: 80,
                    base: '.'
                }
            }
        },

        watch: {
            concat: {
                files: 'dev/**/*.js',
                tasks: ['concat']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['connect', 'watch']);
};