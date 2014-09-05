// - -------------------------------------------------------------------- - //

var cluster = require("bauer-cluster");

cluster.require("../../");

cluster.master(function() {

  this.superFork({
    one: 1,
    two: 2,
    three: 3,
  });

  process.stdout.write("ws." + cluster.workers.length);

  var waiting = cluster.workers.length;
  cluster.workers.forEach(function(worker,index) {
    worker.on("message",function(message) {
      if (message == this.config.role) {
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
    this.send(this.config.role);
  });

});

cluster.start();

// - -------------------------------------------------------------------- - //
