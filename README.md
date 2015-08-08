# bauer-cluster

Plugin for `bauer-cluster` to improve multiple workers management.

## Installation

```
npm install bauer-cluster-super
```

## Usage

```js
var Cluster = require("bauer-cluster").Cluster;

var myCluster = new Cluster();

myCluster.require("bauer-cluster-super");

myCluster.master(function() {
  
  // creates a dev team
  this.superFork({
    developer: 5,
    tester: 2,
    manager: 1
  });
  
  // gets a random developer
  var developer = this.randomWorker("developer");
  
  // rotates among testers
  var tester = this.rotateWorker("tester");

});

myCluster.worker(function(worker) {

  switch (worker.args[0]) {
    
    case "developer":
      break;
      
    case "tester":
      break;
      
    case "manager":
      break
    
  }

});

myCluster.start();
```

## API Summary

  * `Cluster`
    * `.setupSuper() :void`
    * `.superFork(roles Object) :Array`
    * `.superFork(count Number) :Array`
    * `.superFork(count Number, role String) :Array`
    * `.superFork(count Number, args Array) :Array`
    * `.superKill() :void`
    * `.superKill(role String) :void`
    * `.registerWorker(worker Worker) :void`
    * `.unregisterWorker(worker Worker) :void`
    * `.rotateWorker() :Worker`
    * `.rotateWorker(role String) :Worker`
    * `.randomWorker() :Worker`
    * `.randomWorker(role String) :Worker`


## License

[MIT](./LICENSE)
