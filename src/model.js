const model = function () {

const pts = lemma().ctrlPtXYs;

function f(x) {
	var sum = 0;
	for (var i=0; i<pts.length; i++) {
		var num = pts[i].y;
		var den = 1;
		for (var j=0; j<pts.length; j++) {
			if (j == i) {
				continue;
			}
			num *= (x - pts[j].x);
		}
		for (var j=0; j<pts.length; j++) {
			if (j == i) {
				continue;
			}
			var diff = pts[i].x - pts[j].x;
			if (diff != 0) {
				den *= diff;
			} else {
				den = .4;
			}
		}
		sum += (num/den);
	}
	return sum;
}

function ctrlPtMaxXIndex() {
	var n = Number.MIN_VALUE;
	var xi;
	for (var i=0; i<pts.length; i++) {
		if (pts[i].x > n) {
			n = pts[i].x;
			xi = i;
		}
	}
	return xi;
}
function ctrlPtMinXIndex() {
	var n = Number.MAX_VALUE;
	var xi;
	for (var i=0; i<pts.length; i++) {
		if (pts[i].x < n) {
			n = pts[i].x;
			xi = i;
		}
	}
	return xi;
}

return {
	f: f,
	ctrlPtMaxXIndex: ctrlPtMaxXIndex,
	ctrlPtMinXIndex: ctrlPtMinXIndex
};

}();