(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var MovingObject = Asteroids.MovingObject = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
    this.game = args.game;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutofBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = Asteroids.Game.wrap(this.pos, this.radius);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x = this.pos[0] - otherObject.pos[0];
    var y = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(x * x + y * y)
    if (this.game.ship.shieldOn && otherObject instanceof Asteroids.Ship) {
      if (distance < this.radius + Asteroids.Ship.SHIELDRADIUS) {
        return true;
      }
      else {
        return false;
      }
    } else {
      if (distance < this.radius + otherObject.radius) {
        return true;
      }
      else {
        return false;
      }
    }
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    //overwritten in subclasses
  };

  MovingObject.prototype.isWrappable = true;

})();
