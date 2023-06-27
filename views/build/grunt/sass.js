module.exports = function(grunt) {
    'use strict';

    var sass = grunt.config('sass') || {};
    var watch = grunt.config('watch') || {};
    var notify = grunt.config('notify') || {};
    var root = grunt.option('root') + '/wiquid/views/';

    sass.wiquid = {
        options: {},
        files: {}
    };
    sass.wiquid.files[root + 'js/pciCreator/ims/blobInteraction/creator/css/blobInteraction.css'] = root + 'js/pciCreator/ims/blobInteraction/creator/scss/blobInteraction.scss';
    sass.wiquid.files[root + 'js/pciCreator/ims/blobInteraction/runtime/css/blobInteraction.css'] = root + 'js/pciCreator/ims/blobInteraction/runtime/scss/blobInteraction.scss';

    watch.wiquidsass = {
        files: [
            root + 'scss/**/*.scss',
            root + 'js/pciCreator/ims/**/*.scss'
        ],
        tasks: ['sass:wiquid', 'notify:wiquidsass'],
        options: {
            debounceDelay: 1000
        }
    };

    notify.wiquidsass = {
        options: {
            title: 'Grunt SASS',
            message: 'SASS files compiled to CSS'
        }
    };

    grunt.config('sass', sass);
    grunt.config('watch', watch);
    grunt.config('notify', notify);

    grunt.registerTask('wiquidsass', ['sass:wiquid']);
};