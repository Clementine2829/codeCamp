const canvas = document.getElementById('myCanvas');
canvas.width = 200;


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * .9); //the .9 is to leave a small space outside the white lines on the edges
const car = new Car(road.getTheLaneCenter(1), 100, 30, 50);

animate();

function animate() {
    car.update(road.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * .7); // put the car in the bottom half screen by .7

    road.draw(ctx)
    car.draw(ctx)

    ctx.restore();
    requestAnimationFrame(animate); // calls animate many times to give the illusion of movement
}
