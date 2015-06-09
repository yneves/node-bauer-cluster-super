// - -------------------------------------------------------------------- - //
// - libs

var cp = require("child_process");
var assert = require("assert");
var clusterModule = require("bauer-cluster");
var clusterSuper = require("../");

// - -------------------------------------------------------------------- - //

describe("Super",function() {

  it("proto",function() {
    assert.strictEqual(typeof clusterModule.Cluster.prototype.setupSuper,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.superFork,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.superKill,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.registerWorker,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.unregisterWorker,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.rotateWorker,"function");
    assert.strictEqual(typeof clusterModule.Cluster.prototype.randomWorker,"function");
  });
  
  it("super",function(done) {
    var proc = cp.spawn("node",[__dirname + "/sample/sample.js"],{ stdio: "pipe" });
    var output = "";
    proc.stdout.on("data",function(data) {
      output += data.toString("utf8");
    });
    var error = "";
    proc.stderr.on("data",function(data) {
      error += data.toString("utf8");
    });
    proc.on("exit",function() {
      assert.equal(error,"");
      done();
    });
  });

});

// - -------------------------------------------------------------------- - //
