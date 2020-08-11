var LineWidth, CornerRadius, radius, OuterMenu, OuterMenuLinks, MiddleMenu, MiddleMenuLinks, InnerMenu, InnerMenuLinks, ImageSRC, textRadiusOffset, TextAngleRotationOffset, TextAngleRotationOffsetEnd, LetterRotation, ShadowColor, ShadowBlur, ShadowOffsetX, ShadowOffsetY, Rounding, OuterColours,
    MiddleColours,
    InnerColours,
    Hovercolours,
    Speed,
    angleChange,
    TimeToRotate,
    MenuX,
    MenuY,
    Gap,
    Redraw,
    imageSRC,
    imageWidth,
    imageHeight,
    OuterFont,
    MiddleFont,
    InnerFont,
    GapBetweenSegments,
    StartTextOffset,
    EndTextOffset;


 
 
var elements = [];

var BreakingSpeed = 0.075;






function EDRotatingMenu(options, canvas) {



    LineWidth = options.LineWidth;

    CornerRadius = options.CornerRadius;
    var DevideLineWidth = LineWidth / CornerRadius;
    radius = options.Radus;

    OuterMenu = options.Menus.OuterMenu;
    OuterMenuLinks = options.Menus.OuterMenuLinks;
    MiddleMenu = options.Menus.MiddleMenu;
    MiddleMenuLinks = options.Menus.MiddleMenuLinks;
    InnerMenu = options.Menus.InnerMenu;
    InnerMenuLinks = options.Menus.InnerMenuLinks;


    imageSRC = options.Img;

    imageHeight = options.ImgHeight;
    imageWidth = options.ImgWidth;

    OuterFont = options.OuterFont;
    MiddleFont = options.MiddleFont;
    InnerFont = options.InnerFont;
    StartTextOffset = options.StartTextOffset;
    EndTextOffset = options.EndTextOffset;

    GapBetweenSegments = options.GapBetweenSegments;

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

    Rounding = options.Rounding;

    MenuX = $(canvas).width() / 2;
    MenuY = $(canvas).height() / 2; 
    
    OuterColours = options.OuterColours;
    MiddleColours = options.MiddleColours;
    InnerColours = options.InnerColours;
    Hovercolours = options.Hovercolours;

    Speed = options.Speed;

    var TimeToRotate = options.RotateTime;

   

    angleChange = (options.angleChange) /180*Math.PI ;
    TimeToRotate = options.RotateTime;

    console.log(TimeToRotate);

    var Animation = window.setInterval(RotateAnimation, Speed);

    setTimeout(function () {
        clearInterval(Animation);
    }, TimeToRotate)

    function RotateAnimation() {        
        ClearCanvas();
        for (var i = 0; i < elements.length; i++) {

            if (elements[i].clockwise) {
                elements[i].startAngle = elements[i].startAngle + angleChange;
                elements[i].EndAngle = elements[i].EndAngle + angleChange;
            }
            else {
                elements[i].startAngle = elements[i].startAngle - angleChange;
                elements[i].EndAngle = elements[i].EndAngle - angleChange;
            }

            Draw(elements[i]);

        }
        DrawLogo(Img);
    };

 



    


    $(canvas).mousemove(function (e) {      
        ClearCanvas();
        handleMouseMove(e);        
    });


    $(canvas)
        .mousedown(function (e) {
            $(this).on("mousemove", function (e) {
                
                ctx = setupCanvas(canvas);
                var mouseCoords = { x: parseInt(e.pageX - offsetX), y: parseInt(e.pageY - offsetY) };

                var p1 = { x: e.pageX, y: e.pageY };
                var p0 = $(this).data("p0") || p1;
                var center = { x: $(canvas).width() / 2, y: $(canvas).height() / 2 };

                switch (FindQuadrent(mouseCoords, center)) {

                    case "TR":
                        if (p1.x - p0.x > 0 || p1.y - p0.y > 0) {
                            clockwise = true;
                        }
                        else {
                            clockwise = false;
                        }
                        break;
                    case "TL":
                        if (p1.x - p0.x > 0 || p1.y - p0.y < 0) {
                            clockwise = true;
                        }
                        else {
                            clockwise = false;
                        }
                        break;
                    case "LL":
                        if (p1.x - p0.x < 0 || p1.y - p0.y < 0) {
                            clockwise = true;
                        }
                        else {
                            clockwise = false;
                        }
                        break;
                    case "LR":
                        if (p1.x - p0.x > 0 || p1.y - p0.y < 0) {
                            clockwise = false;
                        }
                        else {
                            clockwise = true;
                        }
                        break;

                        
                }

                
                var speed = 4;
                
                handleMouseDrag(clockwise, speed);

                $(this).data("p0", p1);
                
            });
        })
        .mouseup(function () {
            $(this).off("mousemove");
            var StopAnimation = window.setInterval(SlowToStop, Speed);

            var TimeToRotate = 3000;
            setTimeout(function () {
                clearInterval(StopAnimation);
            }, TimeToRotate)
            Speed = 4;
            $(canvas).mousemove(function (e) {
                handleMouseMove(e);                
            });

        });

    function SlowToStop() {
        
        ClearCanvas();
        if (Speed > 0) {
            Speed = Speed -BreakingSpeed;
          
        }
        
        if (Speed < 0.01 || Speed < -0.01) {
            Speed = 0;
        }
        


        
        for (var i = 0; i < elements.length; i++) {
            
            if (clockwise) {
                elements[i].startAngle = elements[i].startAngle + angleChange * Speed;
                elements[i].EndAngle = elements[i].EndAngle + angleChange * Speed;
            }
            else {
                elements[i].startAngle = elements[i].startAngle - angleChange * Speed;
                elements[i].EndAngle = elements[i].EndAngle - angleChange * Speed;
            }
            Draw(elements[i]);
        }
        DrawLogo(Img);
        
    }

    function handleMouseDrag(clockwise, Speed) {

        ClearCanvas();
     
        for (var i = 0; i < elements.length; i++) {

            if (clockwise) {
                elements[i].startAngle = elements[i].startAngle + angleChange * Speed;
                elements[i].EndAngle = elements[i].EndAngle + angleChange * Speed;
            }
            else {
                elements[i].startAngle = elements[i].startAngle - angleChange * Speed;
                elements[i].EndAngle = elements[i].EndAngle - angleChange * Speed;
            }
            Draw(elements[i]);
            DrawLogo(Img);
            

        }
    }

   
  
    
    if (Rounding) {
        Gap = CornerRadius / (1 + 1 / 3);
    }
    else {
        Gap = 2.5;
    }

   


  
    for (var i = 0; i < OuterMenu.length; i++) {
        elements.push({
            
            LetterRotation: LetterRotation,
            TextAngleRotationOffset: TextAngleRotationOffset,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            font: OuterFont,
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
    radius = radius - LineWidth - GapBetweenSegments;
    if (Rounding) {
        Gap = Gap + 2;

        TextAngleRotationOffset = TextAngleRotationOffset + ((StartTextOffset) / 180 * Math.PI);
        TextAngleRotationOffsetEnd = TextAngleRotationOffsetEnd + ((EndTextOffset) / 180 * Math.PI);
    }
    else {
        TextAngleRotationOffset = TextAngleRotationOffset + 0.08;
    }

    for (var i = 0; i < MiddleMenu.length; i++) {
        elements.push({
            LetterRotation: LetterRotation,
            TextAngleRotationOffset: TextAngleRotationOffset,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            font: MiddleFont,
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

    radius = radius - LineWidth - GapBetweenSegments;
    
    if (Rounding) {
        Gap = Gap + 5;
        TextAngleRotationOffsetEnd = TextAngleRotationOffsetEnd + ((EndTextOffset)/180*Math.PI);
        TextAngleRotationOffset = TextAngleRotationOffset + ((StartTextOffset) / 180 * Math.PI) ;
    }
    else {
        TextAngleRotationOffset = TextAngleRotationOffset + 0.2;
    }
    LetterRotation = LetterRotation - 0.01;

    for (var i = 0; i < InnerMenu.length; i++) {
        elements.push({
            LetterRotation: LetterRotation,
            TextAngleRotationOffsetEnd: TextAngleRotationOffsetEnd,
            TextAngleRotationOffset: TextAngleRotationOffset,
            font: InnerFont,
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

  
    
    var Img = new Image();
    Img.onload = function () {
        DrawLogo(Img);
    }
    Img.src = imageSRC;
   
    
    for (var i = 0; i < elements.length; i++) {
      
        Draw(elements[i]);

    }


    function Draw(arc) {
        ctx.shadowBlur = ShadowBlur;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowOffsetX = ShadowOffsetX;
        ctx.shadowOffsetY = ShadowOffsetY;
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
            ctx.arc(MenuX + ((outerRadius - LineWidth / DevideLineWidth) * Math.cos(endAngle)), MenuY + ((outerRadius - LineWidth / DevideLineWidth) * Math.sin(endAngle)), CornerRadius, endAngle, endAngle + (90 / 180 * Math.PI), false)
            ctx.arc(MenuX + ((innerRadius + LineWidth / DevideLineWidth) * Math.cos(endAngle)), MenuY + ((innerRadius + LineWidth / DevideLineWidth) * Math.sin(endAngle)), CornerRadius, endAngle + (90 / 180 * Math.PI), endAngle - (180 / 180 * Math.PI), false)
        }


        //draw inneredge
        ctx.arc(MenuX, MenuY, innerRadius, endAngle, startAngle, true);
        if (Rounding) {
            ctx.arc(MenuX + ((innerRadius + LineWidth / DevideLineWidth) * Math.cos(startAngle)), MenuY + ((innerRadius + LineWidth / DevideLineWidth) * Math.sin(startAngle)), CornerRadius, startAngle - (180 / 180 * Math.PI), startAngle - (90 / 180 * Math.PI), false)

            ctx.arc(MenuX + ((outerRadius - LineWidth / DevideLineWidth) * Math.cos(startAngle)), MenuY + ((outerRadius - LineWidth / DevideLineWidth) * Math.sin(startAngle)), CornerRadius, startAngle - (90 / 180 * Math.PI), startAngle, false)
        }



       

        var grd = ctx.createRadialGradient(MenuX, MenuY, arc.radius * 0.5, MenuX, MenuY, arc.radius);
        AddColour(grd, arc.colours)



        //finalFill
        ctx.fill();


    }

  

    function ClearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function handleMouseMove(e) {
       
        Redraw = true;
        mouseX = parseInt(e.pageX - offsetX);
        mouseY = parseInt(e.pageY - offsetY);
        ClearCanvas();
        for (var i = 0; i < elements.length; i++) {

            Draw(elements[i]);
            if (ctx.isPointInPath(mouseX, mouseY)) {

                elements[i].colours = Hovercolours;

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
            }
            
           // Draw(elements[i]);
            DrawLogo(Img);

        }
    }


}

function DrawLogo(Img) {
    ctx.drawImage(Img, MenuX - imageWidth / 2, MenuY - imageHeight / 2, imageWidth, imageHeight);
}

function AddColour(grd, coloursArray) {
    
    grd.addColorStop(0.3, coloursArray[0]);
    grd.addColorStop(0.8, coloursArray[1]);
    grd.addColorStop(1.0, coloursArray[2]);
    ctx.fillStyle = grd;
}

function DrawLetters(arc) {
    ctx.font = arc.font,
        ctx.shadowColor = 'transparent';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillTextCircle(arc.name, MenuX, MenuY, arc.radius - textRadiusOffset, arc.startAngle + arc.TextAngleRotationOffset, arc.EndAngle + arc.TextAngleRotationOffsetEnd, arc.LetterRotation);
}








var MasterWidth;
var MasterHeight;

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    if (!Redraw) {
        MasterWidth = rect.width;
        MasterHeight = rect.height;
    }
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = MasterWidth * dpr;
    canvas.height = MasterHeight * dpr;
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
        //if (i == 0) {
        //    this.fillStyle = 'red';
        //}
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











function FindQuadrent(coords, middle) {

    if (coords.x > middle.x && coords.y > middle.y) {
        return "LR";
    }
    if (coords.x < middle.x && coords.y < middle.y) {
        return "TL";
    }
    if (coords.x > middle.x && coords.y < middle.y) {
        return "TR";
    }
    if (coords.x < middle.x && coords.y > middle.y) {
        return "LL";
    }
}

