/**
 * @see https://jmureika.lmu.build/track/wind/index.html
 */
function windAdjust(form) {
	var wStr = form.windSpeed.value; // 風速
	var tStr = form.windTime.value; // 実際のタイム
	var w = parseFloat(form.windSpeed.value);
	var t_w = parseFloat(form.windTime.value);
	var spid = form.Split.selectedIndex;
	var split = form.Split.options[spid].text;
	var Alt = 10; // Altitude of Tokyo
	var dens = Math.exp(-0.000125 * Alt);

	if (form.precision[0].checked) {
		prec1 = "2";
	}
	if (form.precision[1].checked) {
		prec1 = "3";
	}
	if (form.mf[0].checked) {
		gender = "men";
	}
	if (form.mf[1].checked) {
		gender = "women";
	}

	if (wStr == "" || tStr == "") {
		alert("Must complete entries!");
		return;
	}
	if (isNaN(t_w)) {
		alert("Invalid time!");
		return;
	}
	if (isNaN(w)) {
		alert("Bad wind reading!");
		return;
	}
	if (t_w < 0) {
		alert("Can't have negative time!!");
		return;
	} else {
		if (split == "100m") {
			sp = 100;
		}
		if (split == "50m") {
			sp = 50;
		}
		if (split == "60m") {
			sp = 60;
		}
		t0 = (1.028 - 0.028 * dens * (1.0 - (w * t_w) / sp) ** 2) * t_w;
		if (prec1 == "2") {
			form.WindAltAdj.value = Math.floor(t0 * 100) / 100;
			form.Advantage.value = Math.floor((t0 - t_w) * 100) / 100;
		}
		if (prec1 == "3") {
			form.WindAltAdj.value = Math.floor(t0 * 1000) / 1000;
			form.Advantage.value = Math.floor((t0 - t_w) * 1000) / 1000;
		}
	}
	tround = Math.floor(t0 * 100) / 100;
}
