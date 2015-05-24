/*!
**  bauer-cluster-super -- Plugin for bauer-cluster to enhance worker management.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-cluster-super>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var clusterModule = require("bauer-cluster");
var factory = require("bauer-factory");

var Cluster = require("./cluster.js");

factory.extend(clusterModule.Cluster,Cluster);


module.exports = function(clusterInstance) {
  clusterInstance.setupSuper();
};

// - -------------------------------------------------------------------- - //
