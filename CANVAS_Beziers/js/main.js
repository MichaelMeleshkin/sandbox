document.addEventListener("DOMContentLoaded", function(event) {
    var c = document.getElementById("beziers");
    var ctx = c.getContext("2d");

    var step = 25;
    var scale = 0.5;
    var second1 = {};
    var second2 = {};
    var minute1 = {};
    var minute2 = {};
    var hour1 = {};
    var hour2 = {};
    second1.inc = 0;
    second2.inc = 0;
    minute1.inc = 0;
    minute2.inc = 0;
    hour1.inc = 0;
    hour2.inc = 0;

    second1.shiftX = 600;
    second2.shiftX = 500;
    second1.maxNum = 10;
    second2.maxNum = 6;
    second1.scale = scale;
    second2.scale = scale;

    minute1.shiftX = 350;
    minute2.shiftX = 250;
    minute1.maxNum = 10;
    minute2.maxNum = 6;
    minute1.scale = scale;
    minute2.scale = scale;

    hour1.shiftX = 100;
    hour2.shiftX = 0;
    hour1.maxNum = 10;
    hour2.maxNum = 6;
    hour1.scale = scale;
    hour2.scale = scale;

    function getPoints(shiftX, shiftY, scale) {
        var p = {}; // points
        p.x = []; // X
        p.y = []; // Y
        var sx = shiftX || 0;// shift X
        var sy = shiftY || 0;  // shift Y
        var s = scale || 1;  // shift Y
        p.x[0] = [(10+sx)*s,(-30+sx)*s,(150+sx)*s,(170+sx)*s,(-30+sx)*s,(20+sx)*s];
        p.y[0] = [(150+sy)*s,(-75+sy)*s,(-100+sy)*s,(300+sy)*s,(300+sy)*s,(10+sy)*s];
        p.x[1] = [(0+sx)*s,(200+sx)*s,(0+sx)*s,(80+sx)*s,(60+sx)*s,(70+sx)*s];
        p.y[1] = [(100+sy)*s,(-35+sy)*s,(-35+sy)*s,(50+sy)*s,(150+sy)*s,(200+sy)*s];
        p.x[2] = [(10+sx)*s,(100+sx)*s,(200+sx)*s,(-125+sx)*s,(0+sx)*s,(100+sx)*s];
        p.y[2] = [(50+sy)*s,(-100+sy)*s,(100+sy)*s,(400+sy)*s,(50+sy)*s,(200+sy)*s];
        p.x[3] = [(5+sx)*s,(250+sx)*s,(-125+sx)*s,(0+sx)*s,(235+sx)*s,(0+sx)*s];
        p.y[3] = [(5+sy)*s,(50+sy)*s,(250+sy)*s,(-75+sy)*s,(150+sy)*s,(200+sy)*s];
        p.x[4] = [(5+sx)*s,(-25+sx)*s,(200+sx)*s,(75+sx)*s,(50+sx)*s,(80+sx)*s];
        p.y[4] = [(5+sy)*s,(150+sy)*s,(150+sy)*s,(-275+sy)*s,(150+sy)*s,(200+sy)*s];
        p.x[5] = [(30+sx)*s,(-10+sx)*s,(-35+sx)*s,(150+sx)*s,(150+sx)*s,(0+sx)*s];
        p.y[5] = [(10+sy)*s,(-30+sy)*s,(425+sy)*s,(-300+sy)*s,(300+sy)*s,(175+sy)*s];
        p.x[6] = [(90+sx)*s,(-25+sx)*s,(-25+sx)*s,(100+sx)*s,(175+sx)*s,(0+sx)*s];
        p.y[6] = [(10+sy)*s,(-50+sy)*s,(300+sy)*s,(225+sy)*s,(150+sy)*s,(125+sy)*s];
        p.x[7] = [(5+sx)*s,(25+sx)*s,(50+sx)*s,(200+sx)*s,(35+sx)*s,(35+sx)*s];
        p.y[7] = [(35+sy)*s,(-75+sy)*s,(200+sy)*s,(-75+sy)*s,(-75+sy)*s,(200+sy)*s];
        p.x[8] = [(40+sx)*s,(-100+sx)*s,(600+sx)*s,(-500+sx)*s,(200+sx)*s,(50+sx)*s];
        p.y[8] = [(100+sy)*s,(-65+sy)*s,(-65+sy)*s,(265+sy)*s,(265+sy)*s,(100+sy)*s];
        p.x[9] = [(90+sx)*s,(-175+sx)*s,(350+sx)*s,(0+sx)*s,(0+sx)*s,(10+sx)*s];
        p.y[9] = [(100+sy)*s,(-65+sy)*s,(-65+sy)*s,(265+sy)*s,(225+sy)*s,(150+sy)*s];
        return p;
    }

    var checker = 0;
    function getStep(points, xNext,yNext,xPrev,yPrev, increment) {
        if (increment <= step) {
            points.x[0] += (xNext[0]-xPrev[0])/step;
            points.x[1] += (xNext[1]-xPrev[1])/step;
            points.x[2] += (xNext[2]-xPrev[2])/step;
            points.x[3] += (xNext[3]-xPrev[3])/step;
            points.x[4] += (xNext[4]-xPrev[4])/step;
            points.x[5] += (xNext[5]-xPrev[5])/step;
            points.y[0] += (yNext[0]-yPrev[0])/step;
            points.y[1] += (yNext[1]-yPrev[1])/step;
            points.y[2] += (yNext[2]-yPrev[2])/step;
            points.y[3] += (yNext[3]-yPrev[3])/step;
            points.y[4] += (yNext[4]-yPrev[4])/step;
            points.y[5] += (yNext[5]-yPrev[5])/step;
        }
    }

    function getSeconds(time, maxNum) {
        var now = new Date();
        var val = Math.floor(now.getSeconds()/time - 1) % maxNum;
        return val < 0 ? maxNum - 1 : val;
    }

    function getMinutes(time, maxNum) {
        var now = new Date();
        var val = Math.floor(now.getMinutes()/time - 1) % maxNum;
        return val < 0 ? maxNum - 1 : val;
    }

    function getHours(time, maxNum) {
        var now = new Date();
        var val = Math.floor(now.getHours()/time - 1) % maxNum;
        return val < 0 ? maxNum - 1 : val;
    }

    function draw(ctx, points, time) {
        ctx.beginPath();
        if (points.current != time) {
            points.current = time;
            points.x = getPoints(points.shiftX, points.shiftY, points.scale).x[points.current].slice();
            points.y = getPoints(points.shiftX, points.shiftY, points.scale).y[points.current].slice();
            points.inc = 0;
        }

        getStep(
            points,
            getPoints(points.shiftX, points.shiftY, points.scale).x[(points.current + 1) % points.maxNum],
            getPoints(points.shiftX, points.shiftY, points.scale).y[(points.current + 1) % points.maxNum],
            getPoints(points.shiftX, points.shiftY, points.scale).x[points.current],
            getPoints(points.shiftX, points.shiftY, points.scale).y[points.current],

            points.inc++
        );

        for (var t = 0; t <= 1; t += 0.03) {
            ctx.lineTo(
                getBezier(points.x[0],points.x[1],points.x[2],points.x[3],points.x[4],points.x[5], t),
                getBezier(points.y[0],points.y[1],points.y[2],points.y[3],points.y[4],points.y[5], t)
            );
            ctx.stroke();
        }
    }

    setInterval(function() {
        ctx.clearRect(0, 0, c.width, c.height);

        draw(ctx, second1, getSeconds(1, second1.maxNum));
        draw(ctx, second2, getSeconds(10, second2.maxNum));
        ctx.fillRect(220*scale,50*scale,4,4);
        ctx.fillRect(220*scale,150*scale,4,4);
        draw(ctx, minute1, getMinutes(1, minute1.maxNum));
        draw(ctx, minute2, getMinutes(10, minute2.maxNum));
        ctx.fillRect(470*scale,50*scale,4,4);
        ctx.fillRect(470*scale,150*scale,4,4);
        draw(ctx, hour1, getHours(1, hour1.maxNum));
        draw(ctx, hour2, getHours(10, hour2.maxNum));

    }, 10);
});

function f(n) {
    return (n > 1) ? f(n-1)*n : 1;
}

function k(i,n) {
    return f(n) / (f(i) * f(n-i));
}

function getBernsteinPolynomial(i,n,t) {
    return k(i,n)*Math.pow(t,i)*Math.pow((1-t),(n-i));
}

function getBezier() {
    var t = arguments[arguments.length - 1];
    var result = 0;
    for (var i = 0, n = arguments.length - 2 ; i <= n; i++) {
        result += getBernsteinPolynomial(i,n,t)*arguments[i];
    }
    return result;
}