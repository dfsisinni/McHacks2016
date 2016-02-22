function script() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "library.xml", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			myFunction(xmlhttp);
		}
	};
	
};

function myFunction(xml) {
	console.log("here");
	var i;
	var xmlDoc = xml.responseXML;
	var table="<tr><th>Name</th><th>Artist</th><th>Time</th></tr>";
	var x = xmlDoc.getElementsByTagName("song");
	for (i = 0; i <x.length; i++) { 
		table += "<tr class=\"clickable-row\"><td>" +
		x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
		"</td><td>" +
 		x[i].getElementsByTagName("artist")[0].childNodes[0].nodeValue +
		"</td><td>" +
		x[i].getElementsByTagName("time")[0].childNodes[0].nodeValue + "</td></tr>";
		console.log("here");

		//"<button type=\"button\" class=\"btn btn-success\">Play</button></td></tr>";


	}
	document.getElementById("demo").innerHTML = table;
}

window.$ = window.jQuery = require("/home/dan/app/McHacks2016/scripts/jquery.min.js");

$(document).ready(function() {
	$('.clickable-row').click(function() {
		console.log("clicked");
	});
});

