'use strict';

require('babel-register');

module.exports = function(grunt) {
  module.exports.grunt = grunt;
  require('./tools/gruntfile');
};
