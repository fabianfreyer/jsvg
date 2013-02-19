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

/**
 * Hello World Button Plugin
 */

function HelloWorldButton(x, y, id) {
	svg_extend(this, 'g', id, ['button', 'example']);
	
	this.append(new rect(x, y, 80, 30, id+'_rect', ['rectangle']));
	this.append(new text(x+6, y+20, 'Say Hello', id+'_text', ['caption']));
	
	this.onclick = function(e) {
		alert("Hello World!");
	}
}