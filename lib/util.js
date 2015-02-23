(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function(){

  }

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  }

  Util.randomVec = function (length) {
    var x = Math.random * length;
    var y = Math.sqrt((length * length) - (x * x));
    return [x, y];
  }

}());