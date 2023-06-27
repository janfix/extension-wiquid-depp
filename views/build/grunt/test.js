module.exports = function(grunt) {

    var watch       = grunt.config('watch') || {};
    var qunit       = grunt.config('qunit') || {};
    var testUrl     = 'http://127.0.0.1:' + grunt.option('testPort');
    var root        = grunt.option('root');

    var testRunners = root + '/wiquid/views/js/test/**/test.html';
    var testFiles = root + '/wiquid/views/js/test/**/test.js';

    //extract unit tests
    var extractTests = function extractTests(){
        return grunt.file.expand([testRunners]).map(function(path){
            return path.replace(root, testUrl);
        });
    };

    /**
     * tests to run
     */
    qunit.wiquidtest = {
        options : {
            console : true,
            urls : extractTests()
        }
    };


    watch.wiquidtest = {
        files : [testRunners, testFiles],
        tasks : ['qunit:wiquidtest'],
        options : {
            debounceDelay : 10000
        }
    };

    grunt.config('qunit', qunit);
    grunt.config('watch', watch);

    // bundle task
    grunt.registerTask('wiquidtest', ['qunit:wiquidtest']);
};
