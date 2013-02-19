/**
	Copyright (c) 2013 Fabian Freyer
 
	This file is part of jsvg.

    jsvg is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    jsvg is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jsvg.  If not, see <http://www.gnu.org/licenses/>.*/

function loadjs(filename, callback) {
	var script=document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", filename);
	script.onreadystatechange = callback;
	script.onload = callback;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function load() {
	var svg = new SVG('test', null, ['svg']);
	
	/**
	 * Demo: dynamisches nachladen von plugins
	 */
	loadjs('HelloWorldButton.js', function() {
		var btn = new HelloWorldButton("Hello", 50, 30);
		svg.append(btn);
	});
}

