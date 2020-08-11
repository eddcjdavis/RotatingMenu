# RotatingMenu
HTML5 Canvas Rotating Menu made in Javascirpt
This menu was created by Edward Davis. 
It uses HTML5 Canvas along with Javascript to draw the segments of the menu. 
You can pass in the following options into the contructor: -

Rounding (bool) - Toggle Rounding of Corners of Segments.
Corner Radius (int) - If Rounding is turned on set corner radius - Should be no more than half of Line Width. 
LineWidth (float): 50.

Radius (float):  - Outer Radius of the Outer Cirlce
GapBetweenSegments  (float) Gap Between Outer, Middle and Inner circles.

Menus Titles and Links (string);
            
Image Logo Location SRC (string)
Image Logo Width and Height (int)
            
ShadowColor (string rgba)
ShadowBlur (int) 
ShadowOffsetX (int)
ShadowOffsetY (int)
   
Colours (string arrays).

Fonts (string)


StartTextOffset (int) Offset start of text in segments by degrees (use negative numbers to move backwards)
EndTextOffset (int)  - Offset end of text in segments by degrees (use negative numbers to move backwards)

       
Speed: 10 (int) - Rotate every n milliseconds - higher numbers mean "jumpier" animation however may work better on slower systems
Change in Angle - In Degrees - how far it rotates every refresh - higher numbers means quicker rotation
RotateTime - In miliseconds - set to 0 for no rotation