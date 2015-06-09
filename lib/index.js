/*!
**  bauer-cluster-super -- Plugin for bauer-cluster to enhance worker management.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-cluster-super>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var factory = require("bauer-factory");
var clusterModule = require("bauer-cluster");
var clusterExtension = require("./cluster.js");

Object.keys(clusterExtension).forEach(function(name) {
  clusterModule.Cluster.prototype[name] = factory.createMethod(clusterExtension[name]);
});

module.exports = function(clusterInstance) {
  clusterInstance.setupSuper();
};

// - -------------------------------------------------------------------- - //
