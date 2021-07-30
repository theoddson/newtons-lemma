const gfx = function () {

/* construction */
const svgns = "http://www.w3.org/2000/svg";
const CTRL_RADIUS=5;
const svgSeg = document.getElementById('illus');

function constructShapes(shape, list, n, style) {
	for (var i=0; i<n+list.offset; i++){
		constructSingleInList(shape, list, style);
	}
}

function constructLabels(labs, style, content) {
	for (var i=0; i<content.length; i++){
		var l = constructSingleInList("text", labs, style+" label");
		l.textContent = content.slice(i, i+1);
	}
}

function constructPts(list, n, style, r) {
	for (var i=0; i<n+list.offset; i++){
		const p = constructSingleInList("circle", list, style);
		p.setAttributeNS(null, "r", r);
	}
}

function constructCtrlPt(ctrlPtXYs, i){
	var pt = constructDraggablePt("ctrl", i);
	pt.setAttributeNS(null, "class", "movable ctrlPt");
	pt.setAttributeNS(null, "cx", ctrlPtXYs[i].x);
	pt.setAttributeNS(null, "cy", ctrlPtXYs[i].y);
	pt.setAttributeNS(null, "r", CTRL_RADIUS);
	return pt;
}

function constructDraggablePt(type, i){
	var pt = document.createElementNS(svgns, "circle");
	pt.setAttributeNS(null, "onmousedown", "gfx.selectElement(evt)");
	pt.setAttributeNS(null, "transform", "matrix(1 0 0 1 0 0)");
	pt.setAttributeNS(null, "id", type + i)
	svgSeg.appendChild(pt);
	return pt;
}

function constructSingleInList(shape, list, style) {
	var x = constructSingle(shape, style);
	list.list.push(x);
	return x;
}

function constructSingle(shape, style)  {
	var x = document.createElementNS(svgns, shape);
	x.setAttributeNS(null, "class", style);
	x.setAttributeNS(null, "visibility", "hidden");
	svgSeg.appendChild(x);
	return x;
}

function constructRect(style){
	var x = document.createElementNS(svgns, "rect");
	x.setAttributeNS(null, "class", style);
	svgSeg.appendChild(x);
	return x;
}

/* gfx */
function setLine(line,x1,y1,x2,y2) {
	line.setAttribute("x1", x1);
	line.setAttribute("y1", y1);
	line.setAttribute("x2", x2);
	line.setAttribute("y2", y2);
}
function updateXY(item, xName, x, yName, y) {
	item.setAttributeNS(null, xName, x);
	item.setAttributeNS(null, yName, y);
}
function updatePt(item, x, y) {
	if (item.transform.animVal.length > 0) {
		x -= item.transform.animVal[0].matrix.e;
	}
	updateXY(item, "cx", x, "cy", y);
}
function updatePtY(item, y) {
	item.setAttributeNS(null, "cy", y);
}
function updateLabel(item, x, y) {
	updateXY(item, "x", x, "y", y);
}
function updateRect(item, x, y, width, height) {
	updateXY(item, "x", x, "y", y);
	item.setAttributeNS(null, "width", width);
	item.setAttributeNS(null, "height", height);
}


/* gfx pt interaction */
var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix;

function selectElement(evt) {
	selectedElement = evt.target;
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
	for (var i=0; i<currentMatrix.length; i++) {
		currentMatrix[i] = parseFloat(currentMatrix[i]);
	}
	selectedElement.parentElement.setAttributeNS(null, "onmousemove", "gfx.moveElement(evt)");
}

function upElement(){
	if(selectedElement != 0){
		selectedElement.parentElement.removeAttributeNS(null, "onmousemove");
		selectedElement.removeAttributeNS(null, "onmouseup");
		selectedElement = 0;
	}
}


function trackX(newX) {
	const dx = newX - currentX;
	currentMatrix[4] += dx;
	currentX = newX;
	return dx;
}
function trackY(newY) {
	const dy = newY - currentY;
	currentMatrix[5] += dy;
	currentY = newY;
	return dy;
}
var countx = 0;
function ptListXx(pts,i,dx){
	return pts.list[i].cx();
}
function ptListX(pts,i,dx) {
	const pt = pts.list[i];
	const tr = pt.transform;
	const av = tr.animVal;
	var dx = 0;
	if (true) {
		if (av.length != 0) {
			dx = av[0].matrix.e;
		}
	}
	else
		var dx=0;
	/*++countx;
	if ((countx %= 25) == 0)
		alert(av[0].matrix.e);*/
	return pts.list[i].cx.animVal.value + dx;
	//return pts.list[i].cx.animVal.value + av.length == 0 ? 0 : -.001;
	//return pts.list[i].cx.animVal.value + av.length == 0 ? 0 : av[0].matrix.e;
}
/*function ptListY(pts,i) {
	return pts.list[i].cy.animVal.value;
}*/

function moveElement(evt){
	if(selectedElement != 0){
		const elementId = selectedElement.id;
		const type = elementId.slice(0,4);
		const index = 1*elementId.slice(4);

		lemma().moveHelper(type, index, evt);
		
		newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
		selectedElement.setAttributeNS(null, "transform", newMatrix);
			
		lemma().refreshSVG();
	}
}


return { // exports
	constructShapes: constructShapes,
	constructLabels: constructLabels,
	constructPts: constructPts,
	constructCtrlPt: constructCtrlPt,
	constructDraggablePt: constructDraggablePt,
	constructSingleInList: constructSingleInList,
	constructSingle: constructSingle,
	setLine: setLine,
	updatePt: updatePt,
	updatePtY: updatePtY,
	updateLabel: updateLabel,
	updateRect: updateRect,
	selectElement: selectElement,
	upElement: upElement,
	trackX: trackX,
	trackY: trackY,
	moveElement: moveElement,
	ptListX: ptListX,
	constructRect: constructRect
};
}();