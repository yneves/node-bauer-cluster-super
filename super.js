/*!
**  bauer-cluster-super -- Plugin for bauer-cluster to enhance worker management.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-cluster-super>
*/
// - -------------------------------------------------------------------- - //

var lib = {
  factory: require("bauer-factory"),
};

// - -------------------------------------------------------------------- - //

var Cluster = {

  // .setupSuper()
  setupSuper: function() {
    this._roles = {};
    this._rotate = {};
    this.master(function() {
      this.on("fork",function(worker) {
        var role = worker.args[0];
        if (role) {
          worker.configure({ role: role });
          if (!this._roles[role]) {
            this._roles[role] = [];
            this._rotate[role] = 0;
          }
          this._roles[role].push(worker);
          var list = this._roles[role];
          worker.on("exit",function() {
            var index = -1;
            for (var i = 0; i < list.length; i++) {
              if (list[i] === this) {
                index = i;
                break;
              }
            }
            if (index > -1) {
              list.splice(index,1);
            }
          });
        }
      });
    });
    this.worker(function(worker) {
      worker.configure({
        role: worker.args[0],
      });
    });
  },

  superFork: {

    // .superFork(roles)
    o: function(roles) {
      var keys = Object.keys(roles);
      var len = keys.length;
      for (var i = 0; i < len; i++) {
        var role = keys[i];
        this.superFork(roles[role],role);
      }
    },

    // .superFork(count)
    n: function(count) {
      for (var i = 0; i < count; i++) {
        this.fork();
      }
    },

    // .superFork(count,role)
    ns: function(count,role) {
      for (var i = 0; i < count; i++) {
        this.fork(role);
      }
    },

    // .superFork(count,args)
    na: function(count,args) {
      for (var i = 0; i < count; i++) {
        this.fork.apply(this,args);
      }
    },

  },

  superKill: {

    // .superKill()
    0: function() {
      for (var i = 0; i < this.workers.length; i++) {
        this.workers[i].kill();
      }
    },

    // .superKill(role)
    s: function(role) {
      if (this._roles[role]) {
        for (var i = 0; i < this._roles[role].length; i++) {
          this._roles[role][i].kill();
        }
      }
    },

  },

  rotateWorker: {

    // .rotateWorker()
    0: function() {
      if (this._roles._ && this._roles._.length > 0) {
        if (this._rotate._ >= this._roles._.length) {
          this._rotate._ = 0;
        }
        return this._roles._[ this._rotate._++ ];
      }
    },

    // .rotateWorker(role)
    s: function(role) {
      if (this._roles[role] && this._roles[role].length > 0) {
        if (this._rotate[role] >= this._roles[role].length) {
          this._rotate[role] = 0;
        }
        return this._roles[role][ this._rotate[role]++ ];
      }
    },

  },

  randomWorker: {

    // .randomWorker()
    0: function() {
      if (this.workers.length > 0) {
        return this.workers[Math.floor(Math.random() * this.workers.length)];
      }
    },

    // .randomWorker(role)
    s: function(role) {
      if (this._roles[role] && this._roles[role].length > 0) {
        return this._roles[role][Math.floor(Math.random() * this._roles[role].length)];
      }
    },

  },

};

// - -------------------------------------------------------------------- - //

module.exports = exports = function(cluster) {
  lib.factory.extend(cluster.cls.Cluster,Cluster);
  cluster.setupSuper();
}

// - -------------------------------------------------------------------- - //
