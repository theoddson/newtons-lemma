
const FINEPTS_RADIUS=2;


const l23 = function () {
var bases = 4;
const baseMax = 500;
const ctrlPts = [];
const baseMin = 1;
const basePts = {offset:1, visOffset:0, list:[]};
const curvPts = {offset:1, visOffset:0, list:[]};
const leftPts = {offset:0, visOffset:0, list:[]};
const righPts = {offset:0, visOffset:0, list:[]};
const righRects = {offset:0, visOffset:0, list:[]};
const leftRects = {offset:0, visOffset:0, list:[]};
const baseLabels = {offset:1, visOffset:0, list:[]};
const curvLabels = {offset:0, visOffset:0, list:[]};
const leftLabels = {offset:0, visOffset:0, list:[]};
const righLabels = {offset:0, visOffset:0, list:[]};
const ctrlPtXYs = [{x:106, y:23}, {x:207, y:70}, {x:274, y:119}, {x:344, y:206}, {x:376, y:271}];
var curveMicroPts;
var figureBasics = {minX:0, maxX:0, baseY:0, deltaOnLeft:true};
var shapeHandlesVisible = 1;
var figureArea;
var view={isNewton:1, isClaim:1, isInscribed:1, isCircumscribed:1};
const baseWidths = [];
// position will be between 1 and 50
const minp = 1;
const maxp = 50;
var movingBasePt = false;
const showRectPts = false;



window.onload = function() {
	var slider = document.getElementById("mySlider");
	slider.setAttributeNS(null, "min", minp);
	slider.setAttributeNS(null, "max", maxp);
	slider.setAttributeNS(null, "value", bases);
	const sliderOutput = document.getElementById("baseSpan");
	const baseLabel = document.getElementById("baseLabelSpan");
	updateBaseReport(sliderOutput,baseLabel);
	slider.oninput = function() {
		movingBasePt = false; // better way?
		var newB = interpretSlider(this.value);
		sliderEvent(newB-bases, newB, basePts);
		bases = newB;
		updateBaseReport(sliderOutput,baseLabel);
		refreshSVG();
  	}
}
function updateBaseReport(sliderOutput,baseLabel) {
	sliderOutput.innerHTML = bases;
	baseLabel.innerHTML = bases==1?" base":" bases";
}

function interpretSlider(val){
	const maxLinV = 20; //linear through 20
	if (val <= maxLinV) {
		return parseInt(val);
	}
	const minV = Math.log(maxLinV);
	const maxV = Math.log(baseMax);
	var scale = (maxV-minV) / (maxp-maxLinV);
	return Math.round(Math.exp(minV + scale*(val-maxLinV)));
}



/*** Construction ***/

function construct() {

	// labels
	gfx.constructLabels(curvLabels, "figure", 'abcde');
	gfx.constructLabels(baseLabels, "figure", 'ABCDE');
	gfx.constructLabels(leftLabels, "inscribed", 'KLMNO');
	gfx.constructLabels(righLabels, "circumscribed", 'lmnop');

	// rects
	gfx.constructShapes("rect", righRects, baseMax, "circumscribed rect");
	gfx.constructShapes("rect", leftRects, baseMax, "inscribed rect");

	// rectangle points
	if (showRectPts) {
		gfx.constructPts(leftPts, baseMax, "inscribed", FINEPTS_RADIUS);
		gfx.constructPts(righPts, baseMax, "circumscribed", FINEPTS_RADIUS);
		gfx.constructPts(curvPts, baseMax, "figure", FINEPTS_RADIUS);
	}
	constructBasePts(showRectPts, basePts);

	// control points
	for (var i=0; i<ctrlPtXYs.length; i++){
		ctrlPts.push(gfx.constructCtrlPt(ctrlPtXYs, i));
	}
}



/*** model ***/

function refreshSVG() {
	updateFigureBasics();
	updateVisibility();
	updateCurveCurveArea();
	updatePtsRectsLabelsAreas(); // depends on curveArea
	updateDisplayMode();
}

function updateFigureBasics(){
	var max = model.ctrlPtMaxXIndex();
	var min = model.ctrlPtMinXIndex();
	figureBasics.minX = ctrlPtXYs[min].x;
	figureBasics.maxX = ctrlPtXYs[max].x;

	if (ctrlPtXYs[max].y > ctrlPtXYs[min].y) {
		figureBasics.baseY = ctrlPtXYs[max].y;
		figureBasics.deltaOnLeft = true;
		leftLabels.offset = -1;
		righLabels.visOffset = 0;
		curvLabels.visOffset = 0;
		curvLabels.offset = 0;
	} else {
		figureBasics.baseY = ctrlPtXYs[min].y;
		figureBasics.deltaOnLeft = false;
		leftLabels.offset = 0;
		righLabels.visOffset = 1;
		curvLabels.visOffset = 1;
		curvLabels.offset = 1;
	}
}

function updateCurveCurveArea() {
	const delta = 3;
	curveMicroPts = [];
	figureArea = 0;
	var x;
	var oldY = 2*figureBasics.baseY-model.f(figureBasics.minX);
	for (x=figureBasics.minX; x<figureBasics.maxX; x+=delta) {
		var y = model.f(x);
		curveMicroPts.push([x,y]);
		figureArea += (delta*(figureBasics.baseY-(y+oldY)/2));
		oldY = y;
	}

	var y = model.f(figureBasics.maxX);
	curveMicroPts.push([figureBasics.maxX,y]);
	figureArea += ((figureBasics.maxX-x+delta)*(figureBasics.baseY-(y+oldY)/2));
	polylineCurve.setAttribute("points",curveMicroPts.join(" "));

	var y = figureBasics.baseY;
	var x1 = figureBasics.minX;
	var x2 = figureBasics.maxX;
	gfx.setLine(base,x1,y,x2,y);
	gfx.setLine(wallL,x1,y,x1,model.f(x1));
	gfx.setLine(wallR,x2,y,x2,model.f(x2));

	adjustVisibilityForBaseDelta();
}



/*** View ***/

function handleHelp() {
	var popup = document.getElementById("handlePopup");
	popup.classList.toggle("show");
}

//controlling the visibility toggle of elements
function updateVisibility() {
	setVisibility(curvLabels, view.isNewton);
	setVisibility(baseLabels, view.isNewton);

	if (showRectPts) {
		setVisibility(leftPts, view.isInscribed);
		setVisibility(righPts, view.isCircumscribed);
	}

	setVisibility(leftRects, view.isInscribed);
	setVisibility(leftLabels, view.isNewton&&view.isInscribed);

	setVisibility(righRects, view.isCircumscribed);
	setVisibility(righLabels, view.isNewton&&view.isCircumscribed);

	updateLemmaVisibility(view);
}

function setVisibility(items, vis) {
	var end = Math.min(items.list.length, bases+items.offset);
	for (var i=0; i<items.visOffset; i++) {
		items.list[i].setAttributeNS(null, "visibility", "hidden");
	}
	for (var i=items.visOffset; i<end; i++) {
		items.list[i].setAttributeNS(null, "visibility", vis?"visible":"hidden");
	}
	for (var i=end; i<items.list.length; i++) {
		items.list[i].setAttributeNS(null, "visibility", "hidden");
	}
}



//dd--Making the show Newton/Informal a checkbox event
var checkboxs = document.querySelector("input[name=newton]");

//ques
function showClaim(){
	view.isClaim = 1;
	updateDisplayMode();
}


function showProof(){
	view.isClaim = 0;
	updateDisplayMode();
}
function showNewton() {
	view.isNewton = 1;
	updateVisibility();
	updateDisplayMode();
}

function showInformal() {
	view.isNewton = 0;
	updateVisibility();
	updateDisplayMode();
}		

//tionable
function toggleInscribed() {
	view.isInscribed^=1;
	updateVisibility();
}

function toggleCircumscribed() {
	view.isCircumscribed^=1;
	updateVisibility();
}



function toggleChangeFigure(){
	shapeHandlesVisible^=1;
	for (var i=0; i<ctrlPts.length; i++) {
		ctrlPts[i].setAttributeNS(null, "visibility", shapeHandlesVisible?"visible":"hidden");
	}
}

function adjustVisibilityForBaseDelta() {
	if (showRectPts)
		setVisibility(curvPts,1);
	setVisibility(basePts,1);
	updateVisibility();
}

function updateLeft(i,width,x,y,nextX,nextY){
	if (showRectPts)
		gfx.updatePt(leftPts.list[i], x, nextY);
	gfx.updateRect(leftRects.list[i], x, Math.min(nextY,figureBasics.baseY), width, Math.abs(figureBasics.baseY-nextY));
	if (i<bases-1 && i<leftLabels.list.length) {
		gfx.updateLabel(leftLabels.list[i], x-20, nextY+3);
	}
	leftRects.list[i].setAttributeNS(null, "class", "inscribed rect");
}
function updateRigh(i,width,x,y,nextX,nextY){
	if (showRectPts)
		gfx.updatePt(righPts.list[i], nextX, y);
	gfx.updateRect(righRects.list[i], x, Math.min(y,figureBasics.baseY), width, Math.abs(figureBasics.baseY-y));
	if (i<righLabels.list.length) {
		gfx.updateLabel(righLabels.list[i], nextX-5, y-10);
	}
}
function updatePts(i, x) {
	if (!movingBasePt) {
		updateBasePts(showRectPts, basePts.list[i], x);
	}
	if (showRectPts) {
		gfx.updatePt(curvPts.list[i], x, model.f(x));
	}
	if (i<baseLabels.list.length) {
		gfx.updateLabel(baseLabels.list[i], x-5, figureBasics.baseY+20);
	}
}
function updatePtsRectsLabelsAreas() {
	var x = figureBasics.minX;
	widthStart(figureBasics, bases);
	var inscribedArea = circumscribedArea = 0;
	for (var i=0; i<bases; i++) {
		var width = nextWidth(i);
		var y = model.f(x);
		var nextX = x + width;
		var nextY = model.f(nextX);
		if (i<curvLabels.list.length) {
			gfx.updateLabel(curvLabels.list[i], x-15, y+(i==0?-5:15));
		}
		updateRigh(i,width,x,y,nextX,nextY);
		circumscribedArea += (width*(figureBasics.baseY-y));
		updateLeft(i,width,x,y,nextX,nextY);
		inscribedArea += width*(figureBasics.baseY-nextY);
		if (i<righLabels.list.length) {
			gfx.updateLabel(righLabels.list[i], nextX-5, y-10);
			gfx.updateLabel(leftLabels.list[i], x-20, nextY+3);
		}
		updatePts(i, x);
		x += width;
	}
	updatePts(bases, x);
	widthEnd(basePts.list[bases], showRectPts, view);
	document.getElementById("figAmt").innerHTML = ((Math.sign(figureArea)==-1)?"-":"" )+ "100.0";
	document.getElementById("inAmtm").innerHTML = normalized(inscribedArea,figureArea);
	document.getElementById("inAmtd").innerHTML = normalized(inscribedArea,figureArea);
	document.getElementById("circAmtm").innerHTML = normalized(circumscribedArea,figureArea);
	document.getElementById("circAmtd").innerHTML = normalized(circumscribedArea,figureArea);
}

function normalized(amt) {
	return (100*amt/Math.abs(figureArea)).toFixed(1);
}

function highlightEndRects(yes) {
	righRects.list[0].setAttributeNS(null, "class", yes ? "diff rect" : "circumscribed rect");
	leftRects.list[bases-1].setAttributeNS(null, "class", yes ? "diff rect" : "inscribed rect");
}
//golden egg
function updateDisplayMode(){
	
	/*if (view.isClaim) {
		highlightDiffRect(true);
		
	} else {
		highlightDiffRect(false);
		
	}
	
	updateLemmaVisibility(view);*/
}

function domCenter(thing){
	const rect = thing.getBoundingClientRect();
	return rect.left + rect.width/2 + 0.25;
}
function moveBasePtHelper(index, evt) {
	var possX = evt.clientX;
	const PAD = 5;
	possX = Math.max(possX, domCenter(basePts.list[index-1])+PAD);
	possX = Math.min(possX, domCenter(basePts.list[index+1])-PAD);
	var dx = gfx.trackX(possX);
	basePts.list[index].x += dx;

	baseWidths[index-1] = gfx.ptListX(basePts,index,dx) - gfx.ptListX(basePts,index-1,dx);
	baseWidths[index] = gfx.ptListX(basePts,index+1,dx) - gfx.ptListX(basePts,index,dx);
}
function moveCtrlPtHelper(index, evt) {
	ctrlPtXYs[index].x += gfx.trackX(evt.clientX);
	ctrlPtXYs[index].y += gfx.trackY(evt.clientY);
}
function moveHelper(type, index, evt){
	if ("ctrl" == type) {
		moveCtrlPtHelper(index, evt);
		movingBasePt = false;
	} else if (index > 0 && index < bases) {
		moveBasePtHelper(index, evt);
		movingBasePt = true;
	}
}

return { // exports
	construct: construct,
	refreshSVG: refreshSVG,
	showClaim: showClaim,
	showProof: showProof,
	showNewton: showNewton,
	showInformal: showInformal,
	toggleChangeFigure: toggleChangeFigure,
	toggleInscribed: toggleInscribed,
	toggleCircumscribed: toggleCircumscribed,
	handleHelp: handleHelp,
	moveHelper: moveHelper,
	baseMax: baseMax,
	ctrlPtXYs: ctrlPtXYs,
	baseWidths: baseWidths,
	figureBasics: figureBasics,
	normalized: normalized,
	highlightEndRects: highlightEndRects
};
}();

function lemma() {
	return l23;
}

