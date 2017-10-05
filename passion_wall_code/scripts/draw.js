/**
 * Created by Administrator on 11/9/2015.
 */
var text = "I am passionate about   Tell secret passion of yours! Lorem ipsum dani far.Find your passion.";
var text1 = "I want to try Chines Calligraphy and watercolor art for Spanish-speaking People!";
var font = "16px Aileron";
var textHeight = 15;
var lineHeight = textHeight + 5;
var lines = [];
var r = 124;
var color = [   "#E9FF63", "#7DFF63", "#63F8FF", "#99FF63", "#CFFE63",
    "#FFC263", "#FFC763", "#FF8E63", "#FF6464", "#FF7563",
    "#FF6364", "#FF7F63", "#FFE963", "#E3FF63", "#FFD963",
    "#FFE263", "#BAFF63", "#6BFF63", "#64FF69", "#71FF63",
    "#63FF6C", "#63FFD8", "#64FF69", "#63FF9A", "#FDFC63",
    "#88FF63", "#66FF64", "#A6FF63", "#63FFDB", "#63D9FE",
    "#90FF63", "#FF9B63", "#FF7263", "#9DFF63", "#E5FF63",
    "#FF7F63", "#FF7463", "#FFAE63", "#F4FF63", "#FFEC63",
    "#FBFF63", "#FFE663", "#FFC263", "#9DFF63", "#AEFF63",
    "#6AFF63", "#65FF65", "#63FFC7", "#C5FF63", "#63FFBE",
    "#63FF93", "#63FFAC", "#62FF79", "#90FF63", "#6AFF63",
    "#63FFEF", "#63F7FF", "#63FFD1", "#6370FF", "#638DFF",
    "#63FFDF", "#C5FF63", "#63FF6A", "#64FF69", "#C7FE63",
    "#FDFC63", "#D0FE63", "#FFDC63", "#E3FF63", "#DCFF63",
    "#C9FE63", "#FBFF63", "#FFB663", "#D9FF63", "#9DFF63",
    "#69FF63", "#DCFF63", "#63FFD4", "#63FFB8", "#64FF67",
    "#74FF63", "#63FCFF", "#63FFF9", "#63FFE9", "#A6FF63"
];
var gradColor = [];
for(var i=0;i<70;i++){
    //gradColor.push({start: "#f6014d", end: "#ff5c8f"});
    gradColor.push({start: "#00e6a9", end: "#00523c"});
}

gradColor[22] = {start: "#f6014d", end: "#ff5c8f"};
gradColor[23] = {start: "#ffcb04", end: "#f32058"};
gradColor[31] = {start: "#FFD504", end: "#FF4100"};
gradColor[32] = {start: "#5f01bb", end: "#e352ff"};
gradColor[33] = {start: "#00e6a9", end: "#00523c"};
gradColor[42] = {start: "#00dfa5", end: "#0089f1"};
gradColor[43] = {start: "#7881fd", end: "#f756bf"};

var eInfo = null;

//svg sizes and margins
var margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

var width = 1170;
var height = 2302;

//The number of columns and rows of the heatmap
var MapColumns = 10,
    MapRows = 7;

//The maximum radius the hexagons can have to still fit the screen
var hexRadius = 143;
//Set the new height and width of the SVG based on the max possible


//Set the hexagon radius
var hexbin = d3.hexbin()
    .radius(hexRadius);

//Calculate the center positions of each hexagon
var points = [];

var svg = null;
var ctx = null;
var defs = null;
var gradientForegroundPurple = null;

var HexagonDraw = {
    createPoints:function(){
        for (var i = 0; i < MapRows; i++) {
            for (var j = 0; j < MapColumns; j++) {
                points.push([hexRadius * j * Math.cos(30*Math.PI/180)*2, hexRadius * i * 1.5]);

            }
        }
    },
    createSvg:function(){
        svg = d3.select("#chart").append("svg")
            .attr("width", width  )
            .attr("height", height )
            .attr("textAlign", "center")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    },
    createCanvas:function(){
        ctx = d3.select("#chart").append("canvas")
            .attr("width",500)
            .attr("height", 500)
            .node().getContext('2d');
    },
    createHexagon:function(){
        var hexagon = svg.append("g")
            .attr("class", "hexagons")
            .selectAll("a")
            .data(hexbin(points))
            .enter().append("a")
            //.attr("xlink:href", "")
            .append("path")
            .attr("id", function(d,i){ return "path" + i; })
            .attr("d", hexbin.hexagon())
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")rotate(90)"; })
            .style("fill", function (d,i) {
                var fillcolor = "";
                fillcolor = ((i % 20 == 0) || (i < 10) || (i > 60))?"#39b54a":"#e1e1e1";
                return fillcolor;
            })
            .attr("stroke", function (d,i) {
                return "#fff";
            })
            .attr("stroke-width", "10px")
            .on("mouseover", this.mover)
            .on("mouseout", this.mout);
        var aTag = svg.selectAll("a")
            .data(hexbin(points))
            .attr("id", function(d, i){return "aTag" + i});

//        this.createFilter();
    },

    addGradient: function( i, obj, startColor, endColor ){

        var gID = "g_" + i;
        var def = svg.append( 'svg:defs' );
        if(startColor === undefined){
            startColor ="#00e6a9";
            console.log("undefined");
        }

        if(endColor === undefined)
            endColor = "#00523c";
        gradientForegroundPurple = def.append( 'svg:linearGradient' )
            .data(color)
            .attr( 'id', gID )
            .attr( 'x1', '0' )
            .attr( 'x2', '1' )
            .attr( 'y1', '0' )
            .attr( 'y2', '0' );

        gradientForegroundPurple.append( 'svg:stop' )
            .data(color)
            .attr( 'class', 'purpleForegroundStop1' )
            .attr( 'offset', '0%' )
            .attr("stop-opacity",1)
            .attr("stop-color", startColor );

        gradientForegroundPurple.append( 'svg:stop' )
            .data(color)
            .attr( 'class', 'purpleForegroundStop2' )
            .attr( 'offset', '100%' )
            .attr("stop-opacity",1)
            .attr("stop-color", endColor );

        def.append("pattern")
            .attr({ id:"hash4_4", width:"62", height:"62", "x":0, "y":0, patternTransform:"translate(0,0)"})
            .append("svg:image")
            .attr({ width:"160", height:"108", "x":0, "y":0})
            .attr("xlink:href", "img/gitar_man1.png");

        obj.style("fill", "url(#g_" +i+ ")");
    },
    clippedAreaEnable:function(ctxSingle){
        $('#hexagon-clip-canvas').imgAreaSelect({
            onSelectEnd: function (img, selection) {
                if(!imageLoaded) {
                    return;
                }
                $(".imgareaselect-border1").parent().css( {"display":"block", "zIndex":1002});
            }
        });
    },
    createFilter:function(){
        var filter = defs.append("filter")
            .attr("id", "drop-shadow")

        filter.append("feColorMatrix")
            .attr("in", "offOut")
            .attr("result", "MatrixOut")
            .attr("type", "matrix")
            .attr("values",
            "1 1 1 1 0     1 1 1 1 0     1 1 1 1 0       1 1 1 1 0");
        filter.append("feGaussianBlur")
            .attr("in", "MatrixOut")
            .attr("stdDeviation", "5" )
            .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");
    },
    mover:function(){
        d3.select(this)
            .data(color)
            .transition()
            .duration(10)
            .style("fill-opacity", 0.2);
    },
    mout:function(){
         d3.select(this)
            .transition()
            .duration(1000)
            .style("fill-opacity", 1);
    },
    coordinateFit:function(){
        svg.selectAll("g")
            .attr("transform", "translate(-60,-5)");
    },
    initLines:function(){
        for (var y = r * .10; y > -r * .45; y -= lineHeight) {

            var h = Math.abs(r - y);

            if (y - lineHeight < 0) {
                h += 20;
            }

            var length = 2 * Math.sqrt(h * (2 * r - h));

            if (length && length > 10) {
                lines.push({y: y, maxLength: length });

            }
        }
    },
    calcAllowableWords:function(maxWidth, words){
        var wordCount = 0;
        var testLine = "";
        var spacer = "";
        var fittedWidth = 0;
        var fittedText = "";
        ctx.font = font;
        for (var i = 0; i < words.length; i++) {
            testLine += spacer + words[i];
            spacer = " ";
            var width = ctx.measureText(testLine).width;
            if (width > maxWidth) {
                return ({
                    count: i,
                    width: fittedWidth,
                    text: fittedText
                });
            } else {
                if (i == words.length - 1) {
                    fittedWidth = width;
                    fittedText = testLine;
                    //alert(testLine);
                    return ({
                        count: i,
                        width: fittedWidth,
                        text: fittedText
                    });
                }
            }
            fittedWidth = width;
            fittedText = testLine;
        }
    },
    getObjectForText:function(id){
        var retObj = d3.select( id );
        return retObj;
    },
    wrapText:function(xx, yy, index, text){
        this.initLines();
        var i = 0;
        var line = "";
        var words = text.split(" ");
        while (i < lines.length && words.length > 1) {
            line = lines[i++];
            var lineData = this.calcAllowableWords(line.maxLength, words);
            var detailText = this.getObjectForText("#aTag" + index )
                .append("text")
                .attr("dx", xx - lineData.width / 2 )
                .attr("dy", yy - line.y + textHeight)
                .text(lineData.text)
                .style("font-family", "Aileron")
                .style("font-size", "16px")
                .attr("fill", "white");
            words.splice(0, lineData.count);
        }
    },
    drawRoundRect:function(x, y, w, h, r, index){
        var obj = this.getObjectForText("#aTag" + index)
            .append("svg:rect")
            .attr("x", x-61)
            .attr("y", y+59)
            .attr("width", w)
            .attr("height", h)
            .attr("rx", r)
            .attr("ry", r)
            .style("fill", "red")
            .attr("stroke-width", 2);
//            .style("filter", "url(#f1)");
    },
    getTextInfo:function(obj){
        var width = 0;
        var height = 0;
        var x =0;
        var y = 0;
        var result = [];
        if (obj != undefined && $.isFunction(obj.style)) {
            var twidth = obj.node().getBoundingClientRect().width;
            var theight = obj.node().getBoundingClientRect().height;
            if( twidth != null )
                width = twidth;
            if( theight != null )
                height = theight;
        }
        if (obj != undefined && $.isFunction(obj.attr)) {
            pos = d3.transform( obj.attr("transform")).translate;
            if( pos != null )
            {
                x = parseInt(pos[0]);
                y = parseInt(pos[1]);
            }
        }
        result.push({pos:{_x:x,_y:y}, size:{w:width, h:height}});
        return result[0];
    },
    drawTextonImage:function(x, y, index){
        var obj = this.getObjectForText("#aTag" + index);
        obj.append("text")
            .attr("class", "name")
            .attr("x", x-95)
            .attr("y", y-25)
            .text("Lucia S.")
            .style("font-family", "Aileron")
            .style("font-size", "15px")
            .style("font-style", "italic")
            .attr("fill", "white");
        obj.append("text")
            .attr("class", "country")
            .attr('x', x+10)
            .attr('y', y-25)
            .text("San Francisco")
            .style("font-family", "Aileron")
            .style("font-size", "15px")
            .attr("fill", "white");
        var textOnRoundRect1 = obj.append("text")
            .text("72")
            .style("font-weight", "bold")
            .style("font-family", "Merienda")
            .style("font-size", "14px")
            .attr("fill", "white");
            textOnRoundRect1.attr("transform", "translate(" + (x-52) + "," + (y+75) + ")");

        eInfo = this.getTextInfo(textOnRoundRect1);

        var t2 = obj.append("text")
            .text("Likes")
            .style("font-family", "Merienda")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("font-style", "italic")
            .attr("fill", "white");
            t2.attr("transform", "translate(" + (eInfo.pos._x + eInfo.size.w + 7) + "," + (y+75) + ")");
        var t3 = obj.append("text")
            .text("16")
            .style("font-family", "Aileron Light")
            .style("font-size", "10px")
            .attr("fill", "white");
            t3.attr("transform", "translate(" + (x + 27) + "," + (y + 73) + ")");

        var txt = "#Pets #Manicure #Essie";
        var footerText = obj.append("text")
            .attr("y", y + 101)
            .text( txt )
            .attr("font-size","14px")
            .style("font-family", "Aileron Light")
            .attr("fill", "white");
        eInfo = this.getTextInfo(footerText);
        footerText.attr( "x", x- eInfo.size.w/2 );
    },
    drawSmallImages:function(x, y, index){
        var obj = this.getObjectForText("#aTag" + index);
        obj.append("circle")
            .attr("cx", x)
            .attr("cy", y-79)
            .attr("r", 31)
            .style("fill", "url(#hash4_4)")
            .on("mouseover", function(){
                /*d3.select(this)
                .style("fill", "skyblue");*/
            });
        obj.append("svg:image")
            .attr("class", "Flag")
            .attr("xlink:href", "img/greenBus.png")
            .attr("x", x-25)
            .attr("y", y-36)
            .attr("width", 20)
            .attr("height", 13);
        obj.append("svg:image")
            .attr("class", "Comment")
            .attr("xlink:href", "img/whiteComment.png")
            .attr("x", x + 23)
            .attr("y", y + 59)
            .attr("width", 21)
            .attr("height", 21);
        obj.append("svg:image")
            .attr("class", "Threadle")
            .attr("xlink:href", "img/threadle.png")
            .attr("x", x + 54)
            .attr("y", y + 59)
            .attr("width", 21)
            .attr("height", 20);
    },
    contentDraw:function(){

        svg.selectAll("a")
            .each(
                function(d, i){
                    //if((i>MapColumns-1) && (i<MapColumns * (MapRows-1)) && (i % (MapColumns*2)) && ((i+1) % (MapColumns*2))){
                        //if((i == 32) || i == 22 || i == 23|| i == 31|| i == 33|| i == 42|| i == 43){
                            //var obj = HexagonDraw.getObjectForText("#path" + i)
                            //    .style("fill", "url(#gradientForegroundPurple" + i + "");
                            HexagonDraw.wrapText(d.y, d.x, i, text);
                            HexagonDraw.drawRoundRect(d.y, d.x, 67, 21, 5, i);
                            HexagonDraw.drawTextonImage(d.y, d.x, i);
                            HexagonDraw.drawSmallImages(d.y, d.x, i);
                            var obj = HexagonDraw.getObjectForText("#path" + i);
                            HexagonDraw.addGradient( i, obj, gradColor[i].start, gradColor[i].end );
                        //}
                    //}
                }
            );
    },
    showHexagon:function(){
        this.createSvg();
        this.createCanvas();
        this.createPoints();
        this.createHexagon();
        this.coordinateFit();
        this.contentDraw();
    }
};

$(document).ready(function(){

    HexagonDraw.showHexagon();

    $(".arrow_btn , .add_passion_wall").click(function(e){
        e.preventDefault();
        $('.arrow_btn.arrow_down').toggle();
        $('.arrow_btn.arrow_up').toggle();
        $('#center-nav-default').toggle();
        $('#center-nav-compound').toggle();
    });

    var showStatus = false;
    $("#tag").keyup(function( event ){
        if(event.keyCode == 13){
            $("#tagCollection").append("<button type='submit' class='button'>" + $("#tag").val() +"</button>");
            $(".button").each(function () {
                $(this).click( function(){
                    $(this).remove();
                });
            });
            $("#tag").val( "" );
        }
    });

    $("#needAccount").click(function(){
        showStatus = !showStatus;
        if(showStatus){
            $("#accountRegister").css("display", "inline");
        }else{
            $("#accountRegister").css("display", "none");
        }
    });

    $("#signMeButton").click(function(){
        showStatus = !showStatus;
        if(showStatus){
            $("#accountRegister").css("display", "inline");
        }else{
            $("#accountRegister").css("display", "none");
        }
    });

    function drawAddHexagon(){
        var img = new Image(),
            img1 = new Image();
        var ctxHexagon = document.getElementById('hexagon-canvas').getContext('2d'),
            ctxHexagonClip = document.getElementById('hexagon-clip-canvas').getContext('2d');
        //drawing of the test image - img1
        img.onload = function () {
            //draw background image
            ctxHexagon.drawImage(img, 0, 0);
        };

        img1.onload = function () {
            //draw background image
            ctxHexagonClip.drawImage(img1, 0, 0);
        };
        img.src = 'img/hexagon-canvas.png';
        img1.src = 'img/hexagon-canvas-clip.png';
    }

    drawAddHexagon();

});
