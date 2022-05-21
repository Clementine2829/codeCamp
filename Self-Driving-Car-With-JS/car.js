class Car {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;


        this.controls = new Controls();
    }

    update() {
        this.#move();



    }
        
    #move() {
        if (this.controls.forward) this.speed += this.acceleration;
        if (this.controls.reverse) this.speed -= this.acceleration;

        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed <- this.maxSpeed/2) this.speed = -this.maxSpeed/2; //this is when it reverses, it should not be that fast

        if (this.speed > 0) this.speed -= this.friction;
        if (this.speed < 0) this.speed += this.friction;

        //to prevent the car from moving after stop 
        if (Math.abs(this.speed) < this.friction) this.speed = 0;

        //prevent the car from turning other direction on reverse, it flips on reverse
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;

            //the left and right buttons
            if (this.controls.left) this.angle += 0.03 * flip;
            if (this.controls.right) this.angle -= 0.03 * flip;
        }

        this.x -= Math.sin(this.angle) * this.speed //make sure the car moves in the right direction
        this.y -= Math.cos(this.angle) * this.speed //make sure the car moves in the right direction

    }

    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);


        ctx.beginPath();
        ctx.rect( //start at x and y location
            -this.w/2,
            -this.h/2,
            this.w,
            this.h
        );
        ctx.fill();

        ctx.restore(); // to prevent infinit rotations
    }

}