/*!
**  bauer-cluster-super -- Plugin for bauer-cluster to enhance worker management.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-cluster-super>
*/
// - -------------------------------------------------------------------- - //

"use strict";

// - -------------------------------------------------------------------- - //

var Cluster = {

  // .setupSuper() :void
  setupSuper: function() {
    this._roles = {};
    this._rotate = {};
    this.master(function() {
      this.on("fork",function(worker) {
        this.registerWorker(worker);
      });
    });
  },

  superFork: {

    // .superFork(roles Object) :Array
    o: function(roles) {
      var workers = [];
      var keys = Object.keys(roles);
      var len = keys.length;
      for (var i = 0; i < len; i++) {
        var role = keys[i];
        workers.push.apply(workers,this.superFork(roles[role],role));
      }
      return workers;
    },

    // .superFork(count Number) :Array
    n: function(count) {
      var workers = [];
      for (var i = 0; i < count; i++) {
        workers[i] = this.fork();
      }
      return workers;
    },

    // .superFork(count Number, role String) :Array
    ns: function(count,role) {
      var workers = [];
      for (var i = 0; i < count; i++) {
        workers[i] = this.fork(role);
      }
      return workers;
    },

    // .superFork(count Number, args Array) :Array
    na: function(count,args) {
      var workers = [];
      for (var i = 0; i < count; i++) {
        workers[i] = this.fork.apply(this,args);
      }
      return workers;
    }
  },

  superKill: {

    // .superKill() :void
    0: function() {
      for (var i = 0; i < this.workers.length; i++) {
        this.workers[i].kill();
      }
    },

    // .superKill(role String) :void
    s: function(role) {
      if (this._roles[role]) {
        for (var i = 0; i < this._roles[role].length; i++) {
          this._roles[role][i].kill();
        }
      }
    }
  },
  
  registerWorker: {
    
    // .registerWorker(worker Worker) :void
    o: function(worker) {
      var _this = this;
      var role = worker.args[0];
      if (role) {
        if (!this._roles[role]) {
          this._roles[role] = [];
          this._rotate[role] = 0;
        }
        this._roles[role].push(worker);
        worker.on("exit",function() {
          _this.unregisterWorker(this);
        });
      }
    }
  },
  
  unregisterWorker: {
    
    // .unregisterWorker(worker Worker) :void
    o: function(worker) {
      var role = worker.args[0];
      if (role && this._roles[role]) {
        var index = this._roles[role].indexOf(worker);
        if (index > -1) {
          this._roles[role].splice(index,1);
        }
      }
    }
  },

  rotateWorker: {

    // .rotateWorker() :Worker
    0: function() {
      if (this._roles._ && this._roles._.length > 0) {
        if (this._rotate._ >= this._roles._.length) {
          this._rotate._ = 0;
        }
        return this._roles._[ this._rotate._++ ];
      }
    },

    // .rotateWorker(role String) :Worker
    s: function(role) {
      if (this._roles[role] && this._roles[role].length > 0) {
        if (this._rotate[role] >= this._roles[role].length) {
          this._rotate[role] = 0;
        }
        return this._roles[role][ this._rotate[role]++ ];
      }
    }
  },

  randomWorker: {

    // .randomWorker() :Worker
    0: function() {
      if (this.workers.length > 0) {
        return this.workers[Math.floor(Math.random() * this.workers.length)];
      }
    },

    // .randomWorker(role String) :Worker
    s: function(role) {
      if (this._roles[role] && this._roles[role].length > 0) {
        return this._roles[role][Math.floor(Math.random() * this._roles[role].length)];
      }
    }
  }

};

// - -------------------------------------------------------------------- - //

module.exports = Cluster;

// - -------------------------------------------------------------------- - //
