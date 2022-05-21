class Road {
    constructor(x, w, laneCount = 3) {
        this.x = x;
        this.w = w;
        this.laneCount = laneCount;

        this.left = x-w/2;
        this.right = x+w/2;

        this.infinity = 1000000; // the road should be enndless
        this.top = -this.infinity;
        this.bottom = this.infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]

    }

    //get the lane center
    getTheLaneCenter(laneIndex) {
        const laneWidth = this.w / this.laneCount; // 
        return this.left + laneWidth / 2 +
            Math.min(laneIndex, this.laneCount-1) * laneWidth; // start at the middle of the first line  and move by the index and lineW
    }

    //draw the road function 
    draw(ctx) {

        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 1; i <= this.laneCount - 1; i++) {
            //what is the x coordinates of the vertical lines we will write 
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );

            // add dashed lanes inbetween
            ctx.setLineDash([20, 20]) //give it a 20px dashes lines

            //draw a lines on the side of the screen
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });

    }

}
