import {grunt} from '../Gruntfile';

const babel = {
  options: {
    sourceMap: 'inline',
    plugins: ['transform-runtime'],
  },
  build: {
    src: '**/*.js',
    expand: true,
    cwd: 'src',
    dest: 'build',
  },
};

const clean = {
  build: 'build',
};

const eslint = {
  src: {
    options: {configFile: 'src/.eslintrc.yaml'},
    src: ['src/**/*.js', '!<%= eslint.test.src %>'],
  },
  test: {
    options: {configFile: 'src/.eslintrc-test.yaml'},
    src: 'src/**/*.test.js',
  },
  examples: {
    options: {configFile: 'examples/.eslintrc.yaml'},
    src: 'examples/**/*.{js,jsx}',
  },
  tools: {
    options: {configFile: 'tools/.eslintrc.yaml'},
    src: 'tools/**/*.js',
  },
  gruntfile: {
    options: {configFile: '.eslintrc.yaml'},
    src: 'Gruntfile.js',
  },
};

const mochaTest = {
  test: {
    options: {
      reporter: 'spec',
      quiet: false,
      clearRequireCache: true,
      require: [
        'babel-register',
        'tools/test-globals',
      ],
    },
    src: '<%= eslint.test.src %>',
  },
};

const watch = {
  src: {
    files: ['<%= eslint.src.src %>'],
    tasks: ['eslint:src', 'mochaTest', 'build'],
  },
  test: {
    files: ['<%= eslint.test.src %>'],
    tasks: ['eslint:test', 'mochaTest'],
  },
  tools: {
    options: {reload: true},
    files: ['<%= eslint.tools.src %>'],
    tasks: ['eslint:tools'],
  },
  gruntfile: {
    options: {reload: true},
    files: ['<%= eslint.gruntfile.src %>'],
    tasks: ['eslint:gruntfile'],
  },
  lint: {
    options: {reload: true},
    files: ['.eslintrc*', 'eslint/*'],
    tasks: ['eslint'],
  },
};

grunt.initConfig({
  babel,
  clean,
  eslint,
  mochaTest,
  watch,
});

grunt.registerTask('build', ['clean', 'babel']);
grunt.registerTask('test', ['eslint', 'mochaTest']);
grunt.registerTask('default', ['watch']);

grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-eslint');
grunt.loadNpmTasks('grunt-mocha-test');
