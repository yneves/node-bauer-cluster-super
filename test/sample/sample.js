// - -------------------------------------------------------------------- - //

"use strict";

var mod = require("bauer-cluster");

var cluster = new mod.Cluster();

cluster.require("../../../");

cluster.master(function() {

  var workers = this.superFork({
    one: 1,
    two: 2,
    three: 3,
  });

  process.stdout.write("ws." + workers.length);

  var waiting = workers.length;
  workers.forEach(function(worker,index) {
    worker.on("message",function(message) {
      if (message == this.args[0]) {
        process.stdout.write("ok." + index);
        if (--waiting == 0) {
          cluster.superKill();
        }
      }
    });
    worker.send(String(index));
  });

});

cluster.worker(function(worker) {

  worker.on("exit",function() {
    process.stdout.write("w.exit");
  });

  worker.on("message",function(message) {
    process.stdout.write(message);
    this.send(this.args[0]);
  });

});

cluster.start();

// - -------------------------------------------------------------------- - //
