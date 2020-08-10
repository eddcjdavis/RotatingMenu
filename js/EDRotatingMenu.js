

var LineWidth, CornerRadius, radius, OuterMenu, OuterMenuLinks, MiddleMenu, MiddleMenuLinks, InnerMenu, InnerMenuLinks, ImageSRC, textRadiusOffset, TextAngleRotationOffset, TextAngleRotationOffsetEnd, LetterRotation, ShadowColor, ShadowBlur, ShadowOffsetX, ShadowOffsetY, Rounding, OuterColours,
    MiddleColours,
    InnerColours,
    Hovercolours, Speed,
    angleChange,
    TimeToRotate,
    MenuX,
    MenuY,
    Gap;


 var stepIn1 = 1.3;
 var stepIn2 = 1.4;

var elements = [];

var BreakingSpeed = 0.075;


function EDRotatingMenu(options, canvas) {


    

    $(canvas).mousemove(function (e) {        
        handleMouseMove(e, canvas);
        //ctx.drawImage(Img, MenuX - radius / 1.7, MenuY - radius / 1.7, 175, 175);
    });
   
    LineWidth = options.LineWidth;
    
    CornerRadius = options.CornerRadius;  //Should be no more than half of Line Width.
     radius= options.Radus;
       
     OuterMenu = options.Menus.OuterMenu;
     OuterMenuLinks = options.Menus.OuterMenuLinks;
     MiddleMenu = options.Menus.MiddleMenu;
     MiddleMenuLinks = options.Menus.MiddleMenuLinks;
     InnerMenu = options.Menus.InnerMenu;
     InnerMenuLinks = options.Menus.InnerMenuLinks;
     ImageSRC = options.Img;   

    //TEXT IABLES
     textRadiusOffset = (LineWidth / 2) * 1.25;
    
     TextAngleRotationOffset = 0.15;
    
     TextAngleRotationOffsetEnd = 0.01
     LetterRotation = 1.5;
    
     ShadowColor = options.ShadowColor;
     ShadowBlur = options.ShadowBlur;
     ShadowOffsetX = options.ShadowOffsetX;
     ShadowOffsetY = options.ShadowOffsetY;

     ctx = setupCanvas(canvas);

     canvasOffset = $(canvas).offset();
     offsetX = canvasOffset.left;
     offsetY = canvasOffset.top;

    Rounding = options.rounding;

    if (Rounding) {
        Gap = cornerRadius / (1 + 1 / 3);
    }
    else {
        Gap = 2.5;
    }

     stepIn1 = 1.3;
     stepIn2 = 1.4;

    MenuX = $(canvas).width() / 2;
    MenuY = $(canvas).height() / 2;

     


     OuterColours = options.OuterColours;
     MiddleColours = options.MiddleColours;
     InnerColours = options.InnerColours;
     Hovercolours = options.Hovercolours;


     Speed = options.Speed;
     angleChange = options.angleChange;
     TimeToRotate = options.TimeToRotate;



  
    for (var i = 0; i < OuterMenu.length; i++) {
        elements.push({
            LetterRotation: LetterRotation,
            TextAngleRotationOffset: TextAngleRotationOffset,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            font: "bold 15pt calibri",
            clockwise: false,
            radius: radius,
            IndLineWidth: 1,
            colours: OuterColours,
            index: i + 1,
            name: OuterMenu[i],
            link: OuterMenuLinks[i],
            startAngle: ((((i * 360 / OuterMenu.length)) / 180) * Math.PI),
            EndAngle: (((((i + 1) * 360 / OuterMenu.length) - Gap) / 180) * Math.PI),
        });
    }

    LetterRotation = LetterRotation - 0.05;
    radius = radius / stepIn1
    if (Rounding) {
        Gap = Gap + 2;

        TextAngleRotationOffset = TextAngleRotationOffset + 0.01;
        TextAngleRotationOffsetEnd = TextAngleRotationOffsetEnd + 0.02;
    }
    else {
        TextAngleRotationOffset = TextAngleRotationOffset + 0.08;
    }

    for (var i = 0; i < MiddleMenu.length; i++) {
        elements.push({
            LetterRotation: LetterRotation,
            TextAngleRotationOffset: TextAngleRotationOffset,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            font: "15pt calibri",
            clockwise: true,
            radius: radius,
            IndLineWidth: 1,
            colours: MiddleColours,
            index: i + 1,
            name: MiddleMenu[i],
            link: MiddleMenuLinks[i],
            startAngle: ((((i * 360 / MiddleMenu.length)) / 180) * Math.PI),
            EndAngle: (((((i + 1) * 360 / MiddleMenu.length) - Gap) / 180) * Math.PI),
        });
    }

    radius = radius / stepIn2
    if (Rounding) {
        Gap = Gap + 5;
        TextAngleRotationOffsetEnd = TextAngleRotationOffsetEnd + 0.1;
    }
    else {
        TextAngleRotationOffset = TextAngleRotationOffset + 0.12;
    }
    LetterRotation = LetterRotation - 0.05;

    for (var i = 0; i < InnerMenu.length; i++) {
        elements.push({
            LetterRotation: LetterRotation,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            TextAngleRotationOffset: TextAngleRotationOffset,
            font: "13pt calibri",
            clockwise: false,
            radius: radius,
            IndLineWidth: 1,
            colours: InnerColours,
            index: i + 1,
            name: InnerMenu[i],
            link: InnerMenuLinks[i],
            startAngle: ((((i * 360 / InnerMenu.length)) / 180) * Math.PI),
            EndAngle: (((((i + 1) * 360 / InnerMenu.length) - Gap) / 180) * Math.PI),
        });
    }



   


    for (var i = 0; i < elements.length; i++) {

        Draw(elements[i]);

    }


}

function AddColour(grd, coloursArray) {
    //colour gradient
    grd.addColorStop(0.5, coloursArray[0]);
    grd.addColorStop(0.8, coloursArray[1]);
    grd.addColorStop(1, coloursArray[2]);
    ctx.fillStyle = grd;
}

function DrawLetters(arc) {
    ctx.font = arc.font,
        ctx.shadowColor = 'transparent';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillTextCircle(arc.name, MenuX, MenuY, arc.radius - textRadiusOffset, arc.startAngle + arc.TextAngleRotationOffset, arc.EndAngle + arc.TextAngleRotationOffsetEnd, arc.LetterRotation);
}

function Draw(arc) {

    DrawArc(arc);
    DrawLetters(arc);

}

function DrawArc(arc) {

    var startAngle = arc.startAngle;
    var endAngle = arc.EndAngle;
    var outerRadius = arc.radius;
    var innerRadius = outerRadius - LineWidth;

    ctx.beginPath();

    ctx.arc(MenuX, MenuY, outerRadius, startAngle, endAngle, false);
    if (Rounding) {
        ctx.arc(MenuX + ((outerRadius - LineWidth / DevideLineWidth) * Math.cos(endAngle)), MenuY + ((outerRadius - LineWidth / DevideLineWidth) * Math.sin(endAngle)), cornerRadius, endAngle, endAngle + (90 / 180 * Math.PI), false)
        ctx.arc(MenuX + ((innerRadius + LineWidth / DevideLineWidth) * Math.cos(endAngle)), MenuY + ((innerRadius + LineWidth / DevideLineWidth) * Math.sin(endAngle)), cornerRadius, endAngle + (90 / 180 * Math.PI), endAngle - (180 / 180 * Math.PI), false)
    }


    //draw inneredge
    ctx.arc(MenuX, MenuY, innerRadius, endAngle, startAngle, true);
    if (Rounding) {
        ctx.arc(MenuX + ((innerRadius + LineWidth / DevideLineWidth) * Math.cos(startAngle)), MenuY + ((innerRadius + LineWidth / DevideLineWidth) * Math.sin(startAngle)), cornerRadius, startAngle - (180 / 180 * Math.PI), startAngle - (90 / 180 * Math.PI), false)

        ctx.arc(MenuX + ((outerRadius - LineWidth / DevideLineWidth) * Math.cos(startAngle)), MenuY + ((outerRadius - LineWidth / DevideLineWidth) * Math.sin(startAngle)), cornerRadius, startAngle - (90 / 180 * Math.PI), startAngle, false)
    }



    //ctx.arc(MenuX + ((innerRadius + LineWidth / 2) * Math.cos(startAngle)), MenuY + ((innerRadius + LineWidth / 2) * Math.sin(startAngle)), 25, startAngle + (180 / 180 * Math.PI), startAngle, false);

    ////Draw OUter Edge
    //ctx.arc(MenuX, MenuY, outerRadius, startAngle, endAngle, false);

    //if (Rounding) {
    //    //draw roundedEdge Far end
    //    ctx.arc(MenuX + ((outerRadius - LineWidth / 2) * Math.cos(endAngle)), MenuY + ((outerRadius - LineWidth / 2) * Math.sin(endAngle)), 25, endAngle, endAngle + (180 / 180 * Math.PI), false)
    //}

    ////draw inneredge
    //ctx.arc(MenuX, MenuY, innerRadius, endAngle, startAngle, true);
    //if (Rounding) {
    //    //draw roundedEdge back to start
    //    ctx.arc(MenuX + ((innerRadius + LineWidth / 2) * Math.cos(startAngle)), MenuY + ((innerRadius + LineWidth / 2) * Math.sin(startAngle)), 25, startAngle + (180 / 180 * Math.PI), startAngle, false);
    //}

    //If Needs Border around segments
    //ctx.strokeStyle = "white";
    //ctx.lineWidth = 2;
    //ctx.stroke();

    var grd = ctx.createRadialGradient(MenuX, MenuY, arc.radius * 0.5, MenuX, MenuY, arc.radius);
    AddColour(grd, arc.colours)

    //shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;

    //finalFill
    ctx.fill();


   
}



function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}




CanvasRenderingContext2D.prototype.fillTextCircle = function (text, x, y, radius, startRotation, endRotation, indLetterRotation) {
    var numDegreesPerLetter = (endRotation - startRotation) / (text.length - 1);
    this.save();
    this.translate(x, y);
    this.rotate(startRotation);

    for (var i = 0; i < text.length; i++) {
        this.save();
        this.translate(radius, 0);
        //      if (i == 0) {
        //          this.fillStyle = 'red';
        this.translate(10, -10);
        //          this.fillRect(0,0,4,4);
        this.rotate(indLetterRotation)
        this.translate(-10, 10);
        //          this.fillStyle = 'black';
        //      }

        //      this.fillRect(0,0,4,4);
        this.fillText(text[i], 0, 0);
        this.restore();
        this.rotate(numDegreesPerLetter);
    }
    this.restore();
}





function handleMouseMove(e, canvas) {

    mouseX = parseInt(e.pageX - offsetX);
    mouseY = parseInt(e.pageY - offsetY);    
    //var ctx = setupCanvas(canvas);
    for (var i = 0; i < elements.length; i++) {

        Draw(elements[i]);
        if (ctx.isPointInPath(mouseX, mouseY)) {

            elements[i].colours = Hovercolours;

            elements[i].IndLineWidth = 1.05;

        }
        else {

            if (OuterMenu.indexOf(elements[i].name) > -1) {
                elements[i].colours = OuterColours;

            }
            else if (MiddleMenu.indexOf(elements[i].name) > -1) {
                elements[i].colours = MiddleColours;


            }
            else if (InnerMenu.indexOf(elements[i].name) > -1) {
                elements[i].colours = InnerColours;

            }

            elements[i].IndLineWidth = 1;
            //Draw(elements[i]);
            //elements[i].colours = colours1;
        }
        Draw(elements[i]);

    }
}