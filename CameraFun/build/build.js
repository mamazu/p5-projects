"use strict";
var sketch = function (p) {
    var capture;
    p.setup = function () {
        p.createCanvas(400, 700);
        var cap = p.createCapture('VIDEO', function () { });
        if (cap instanceof p5.Element) {
            capture = cap;
        }
        capture.size(400, 700);
        capture.hide();
    };
    p.draw = function () {
        p.image(capture, 0, 0);
        p.loadPixels();
        analyse();
        p.updatePixels();
    };
    function analyse() {
        for (var i = 0; i < p.pixels.length; i += 3) {
            var red = p.pixels[i];
            var green = p.pixels[i + 1];
            var blue = p.pixels[i + 2];
            var gray = Math.floor((red + green + blue) / 3);
            p.pixels[i] = gray;
            p.pixels[i + 1] = gray;
            p.pixels[i + 2] = gray;
        }
        console.log(p.pixels);
    }
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map