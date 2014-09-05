node-bauer-cluster-super
================

This is a plugin for `bauer-cluster` to enhance worker management. It introduces the concept of `role` to the `Worker` object. The `role` of a `Worker` is in fact just the first argument passed to `.fork`.

## Installation

```
npm install bauer-cluster-super
```

## Usage

This plugin should be loaded by the `Cluster` object before calling `.start` method.

```js
var cluster = require("bauer-cluster");

cluster.require("bauer-cluster-super");

cluster.master(function() {});
cluster.worker(function(worker) {});

cluster.start();
```

## Cluster

### .superFork

This is a enhanced version of the `.fork` method. It can create several workers at a time and they can be of specific or generic roles.

```js
cluster.superFork(20); // creates 20 generic workers
cluster.superFork(20,"download"); // creates 20 workers to download stuff
cluster.superFork({
  download: 10, // 10 workers to download stuff
  parse: 10, // 10 workers to parse stuff
  store: 10, // 10 workers to store stuff
});

```

### .superKill

Kills all workers with optional filter by role.

```js
cluster.superKill(); // kills all workers
cluster.superKill("role"); // kills all workers of given role
```

### .rotateWorker

Rotates among workers of specific role or among all workers. Each time this method is called, rotation moves to the next worker on the list. Returns the selected `Worker` object.

```js
var worker = cluster.rotateWorker("role"); // returns a worker of the given role
var worker = cluster.rotateWorker(); // rotate among all workers
```

### .randomWorker

Randomize among workers of specific role or among all workers. Returns the selected `Worker` object.

```js
var worker = cluster.randomWorker("role"); // randomize among works of given role
var worker = cluster.randomWorker(); // randomize among all workers
```

## License

MIT
