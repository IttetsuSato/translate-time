/**
 * @see https://jmureika.lmu.build/track/wind/index.html
 */
function windAdjust(form) {
	var wStr = form.windSpeed.value;
	var tStr = form.windTime.value;
	var w = parseFloat(form.windSpeed.value);
	var t_w = parseFloat(form.windTime.value);
	var cityid = form.City.selectedIndex;
	var city = form.City.options[cityid].text;
	var spid = form.Split.selectedIndex;
	var split = form.Split.options[spid].text;

	if (city == "----") {
		Alt = parseFloat(form.Altitude.value);
	} else {
		if (city == "Abbotsford, BC (CAN)") {
			Alt = 40.0;
		}
		if (city == "Athina, GRE") {
			Alt = 110.0;
		}
		if (city == "Atlanta, GA (USA)") {
			Alt = 315.0;
		}
		if (city == "Austin, TX (USA)") {
			Alt = 154.0;
		}
		if (city == "Barcelona, ESP") {
			Alt = 95.0;
		}
		if (city == "Berlin, GER") {
			Alt = 34.0;
		}
		if (city == "Bruxelles, BEL") {
			Alt = 35.0;
		}
		if (city == "Budapest, HUN") {
			Alt = 150.0;
		}
		if (city == "Cali, COL") {
			Alt = 1015.0;
		}
		if (city == "Chengdu, CHN") {
			Alt = 500.0;
		}
		if (city == "Colorado Springs, CO (USA)") {
			Alt = 1853.0;
		}
		if (city == "Cologne, GER") {
			Alt = 53.0;
		}
		if (city == "Dallas, TX (USA)") {
			Alt = 130.0;
		}
		if (city == "Doha, QTR") {
			Alt = 0.0;
		}
		if (city == "Edinburgh, UK") {
			Alt = 40.0;
		}
		if (city == "Edmonton, AB (CAN)") {
			Alt = 680.0;
		}
		if (city == "El Paso, TX (USA)") {
			Alt = 1300.0;
		}
		if (city == "Eugene, OR (USA)") {
			Alt = 126.0;
		}
		if (city == "Flagstaff, AZ (USA)") {
			Alt = 2072.0;
		}
		if (city == "Fukuoka, JPN") {
			Alt = 0.0;
		}
		if (city == "Goteburg, SWE") {
			Alt = 0.0;
		}
		if (city == "Helsinki, FIN") {
			Alt = 30.0;
		}
		if (city == "Houston, TX (USA)") {
			Alt = 20.0;
		}
		if (city == "Indianapolis, IN (USA)") {
			Alt = 220.0;
		}
		if (city == "Johannesburg, RSA") {
			Alt = 1750.0;
		}
		if (city == "Kuala Lumpur, MAL") {
			Alt = 100.0;
		}
		if (city == "Lausanne, SWI") {
			Alt = 600.0;
		}
		if (city == "Los Angeles, CA (USA)") {
			Alt = 110.0;
		}
		if (city == "Madrid, ESP") {
			Alt = 680.0;
		}
		if (city == "Mexico City, MEX") {
			Alt = 2250.0;
		}
		if (city == "Modesto, CA (USA)") {
			Alt = 30.0;
		}
		if (city == "Monaco") {
			Alt = 10.0;
		}
		if (city == "Montreal, PQ (CAN)") {
			Alt = 25.0;
		}
		if (city == "Munich, GER") {
			Alt = 520.0;
		}
		if (city == "New Orleans, LA (USA)") {
			Alt = 10.0;
		}
		if (city == "Osaka, JPN") {
			Alt = 15.0;
		}
		if (city == "Oslo, NOR") {
			Alt = 100.0;
		}
		if (city == "Ottawa, ON (CAN)") {
			Alt = 87.0;
		}
		if (city == "Paris, FRA") {
			Alt = 60.0;
		}
		if (city == "Reno, NV (USA)") {
			Alt = 1350.0;
		}
		if (city == "Rieti, ITA") {
			Alt = 400.0;
		}
		if (city == "Roma, ITA") {
			Alt = 30.0;
		}
		if (city == "Sacramento, CA (USA)") {
			Alt = 10.0;
		}
		if (city == "San Diego, CA (USA)") {
			Alt = 10.0;
		}
		if (city == "Santiago, CHI") {
			Alt = 510.0;
		}
		if (city == "Seoul, SKR") {
			Alt = 84.0;
		}
		if (city == "Sestriere, ITA") {
			Alt = 2065.0;
		}
		if (city == "Sevilla, ESP") {
			Alt = 12.0;
		}
		if (city == "Stockholm, SWE") {
			Alt = 20.0;
		}
		if (city == "Stuttgart, GER") {
			Alt = 250.0;
		}
		if (city == "Sydney, AUS") {
			Alt = 45.0;
		}
		if (city == "Tokyo, JPN") {
			Alt = 10.0;
		}
		if (city == "Toronto, ON (CAN)") {
			Alt = 172.0;
		}
		if (city == "Villeneuve d'Ascq, FRA") {
			Alt = 21.0;
		}
		if (city == "Waco, TX (USA)") {
			Alt = 130.0;
		}
		if (city == "Walnut, CA (USA)") {
			Alt = 170.0;
		}
		if (city == "Westwood, CA (USA)") {
			Alt = 110.0;
		}
		if (city == "Windhoek, NAM") {
			Alt = 1710.0;
		}
		if (city == "Zurich, SWI") {
			Alt = 410.0;
		}
		form.Altitude.value = Alt;
	}

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
	if (Alt < 0) {
		alert("Altitude must be >= 0.");
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
	if (split == "100m") {
		if (gender == "men" && tround < 9.63) {
			alert("New Men's World Record: " + tround + " s !!");
		}
		if (gender == "women" && tround < 10.66) {
			alert("New Women's World Record: " + tround);
		}
	}
	Alt = "";
}
