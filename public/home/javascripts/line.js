	   var canvas = document.getElementById("awd-site-canvas");
       var ctx = canvas.getContext("2d");
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    var curves_array = [];
    var curve = function (cp1x, cp1y, cp2x, cp2y, x, y, cp1xvx, cp1xvy, cp1yvx, cp1yvy, cp2xvx, cp2xvy, cp2yvx, cp2yvy) {
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.x = x;
        this.y = y;
        this.cp1xvx = cp1xvx;
        this.cp1xvy = cp1xvy;
        this.cp1yvx = cp1yvx;
        this.cp1yvy = cp1yvy;
        this.cp2xvx = cp2xvx;
        this.cp2xvy = cp2xvy;
        this.cp2yvx = cp2yvx;
        this.cp2yvy = cp2yvy;
    };
    function awdCanvasResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function awdCanvasInit() {
    	var awd_bg_number_of_curves = 20;
        for (var i = 0; i < awd_bg_number_of_curves; i++) {
            var cp1x = Math.random() * canvas.width;//200
            var cp1y = Math.random() * canvas.height;//300
            var cp2x = Math.random() * canvas.width;//300
            var cp2y = Math.random() * canvas.height;//200
            var x = 0;
            var y = 0;
            var cp1xvx = Math.random() * 2- 1;//0.8
            var cp1xvy = Math.random() * 2 - 1;//0.2
            var cp1yvx = Math.random() * 2 - 1;
            var cp1yvy = Math.random() * 2 - 1;
            var cp2xvx= Math.random() * 2 - 1;
            var cp2xvy= Math.random() * 2 - 1;
            var cp2yvx = Math.random() * 2 - 1;
            var cp2yvy = Math.random() * 2 - 1;
            curves_array.push(
                new curve(
                    cp1x, cp1y, cp2x, cp2y,
                    x, y,
                    cp1xvx,cp1xvy,cp1yvx,cp1yvy,
                    cp2xvx,cp2xvy,cp2yvx,cp2yvy
                )
            );
        }
    }
    function awdCanvasDraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = $("#awd-site-wrap").css('color');
        for (var i = 0; i < curves_array.length; i++) {
            ctx.beginPath();
            ctx.moveTo(-100, canvas.height + 100);
            ctx.bezierCurveTo(
                curves_array[i].cp1x, curves_array[i].cp1y,
                curves_array[i].cp2x, curves_array[i].cp2y,
                canvas.width + 100, curves_array[i].y - 100
            );
            ctx.stroke();
            if (curves_array[i].cp1x < 0 || curves_array[i].cp1x > canvas.width) {
                curves_array[i].cp1x -= curves_array[i].cp1xvx;
                curves_array[i].cp1xvx *= -1;
            }
            if (curves_array[i].cp1y < 0 || curves_array[i].cp1y > canvas.height) {
                curves_array[i].cp1y -= curves_array[i].cp1yvy;
                curves_array[i].cp1yvy *= -1;
            }
            if (curves_array[i].cp2x < 0 || curves_array[i].cp2x > canvas.width) {
                curves_array[i].cp2x -= curves_array[i].cp2xvx;
                curves_array[i].cp2xvx *= -1;
            }
            if (curves_array[i].cp2y < 0 || curves_array[i].cp2y > canvas.height) {
                curves_array[i].cp2y -= curves_array[i].cp2yvy;
                curves_array[i].cp2yvy *= -1;
            }
            curves_array[i].cp1y += curves_array[i].cp1yvy;
            curves_array[i].cp1x += curves_array[i].cp1xvx;
            curves_array[i].cp2x += curves_array[i].cp2xvx;
        }
        requestAnimFrame(awdCanvasDraw);
    }
    function awdCanvas(){
        awdCanvasResize();
        awdCanvasInit();
        awdCanvasDraw();
    }
awdCanvas();