document.addEventListener("DOMContentLoaded", function () {
    const canvas1 = document.getElementById("flowerCanvas");
    const canvas2 = document.getElementById("flowerCanvas2");

    const context1 = canvas1.getContext("2d");
    const context2 = canvas2.getContext("2d");

    let bgColors = ["gray", "pink", "blue"]; // // negro, blanco, gris, rosa bajito y azul
    var flowerColorFlag=false;

    let index=0;

    function createPetal(length, width) {
        const path = new Path2D();
        // draw outer line
        path.moveTo(0, 0);
        path.lineTo(length * 0.2, -width);
        path.lineTo(length * 0.6, -width);
        path.lineTo(length, 0);
        path.lineTo(length * 0.6, width);
        path.lineTo(length * 0.2, width);
        // close the path so that it goes back to start
        path.closePath();
    
        // create the line down the middle.
        path.moveTo(0, 0);
        path.lineTo(length * 0.5, 0);
    
        return path;
    }
    

    function drawPetals(context, x, y, count, startAt, petal){
        const step = (Math.PI * 2) / count;
        context.setTransform(1, 0, 0, 1, x, y); // set center
        context.rotate(startAt);  // set start angle
        for(var i = 0; i < count; i++){
            //context.stroke(petal);  // draw a petal
            context.fill(petal);  // draw a petal filling
            context.rotate(step);   // rotate to the next
        }
        context.setTransform(1, 0, 0, 1, 0, 0);  // restore default
    }

    function drawFlower(context, petalColor, stemColor, lineWidth, fitScale, petalCount, stemHeight) {
        context.strokeStyle = petalColor;
        context.fillStyle = petalColor;

        context.lineWidth = lineWidth;
        const size = Math.min(context.canvas.width, context.canvas.height) * fitScale * 0.5;
        drawPetals(context, context.canvas.width / 2, context.canvas.height / 2, petalCount, -0.3, createPetal(size, size * 0.3));
        
        //circulo
        context.fillStyle=stemColor
        context.beginPath();
        context.arc(context.canvas.width / 2, context.canvas.height / 2, size * 0.15, 0, Math.PI * 2);
        context.fill();

        //tallo
        context.strokeStyle=stemColor
        context.beginPath();
        context.moveTo(context.canvas.width / 2, context.canvas.height / 2);
        context.lineTo(context.canvas.width / 2, context.canvas.height / 2 + stemHeight);
        context.stroke();

    }

    function changeFlowerColor() {
/*         const randomColor = colors[Math.floor(Math.random() * colors.length)];
        drawFlower(randomColor, 2, 0.5, 5);  */
        
        if(flowerColorFlag)
        {
            drawFlower(context1, "yellow", "green", 2, 0.5, 5, 500);
            drawFlower(context2, "yellow", "green", 2, 0.5, 5, 500);
            flowerColorFlag=false;
        }
        else
        {
            drawFlower(context1, "green", "yellow", 2, 0.5, 5, 500);
            drawFlower(context2, "green", "yellow", 2, 0.5, 5, 500);
            flowerColorFlag=true;
        }
    }

    function changeBackgroundColor() {
        const body = document.body;
        var currentColor = extractColor(body.style.background);

        if(currentColor=='')
        {
            currentColor = body.style.background.split(" ")[3]; 
        }

/*         window.alert("Color: "+body.style.background);
        window.alert("Color actual: "+currentColor);
 */
        index=index+1 == bgColors.length ? 0 : index+1;
        const newColor = bgColors[index];

        //to  modify the second color of the radial gradient
        body.style.background = body.style.background.replace(currentColor, newColor);

    }

    function extractColor(style) {
        const regex = /rgb\(.+?\)/;
        const match = style.match(regex);
        return match ? match[0] : '';
    }

    drawFlower(context1, "yellow", "green", 2, 0.5, 5, 500);
    drawFlower(context2, "yellow", "green", 2, 0.5, 5, 500);


    setInterval(changeFlowerColor, 1000);
    setInterval(changeBackgroundColor, 1000);

});