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
 * Utility function to create svg elements:
 */
function svg_ce(e) {return document.createElementNS("http://www.w3.org/2000/svg", e);}

/**
 * SVG element prototype.
 * @param type the type of the tag. type='foobar' will render as <foobar>
 * @param ID the id of the tag. If not specified or null is passed, an ID will be generated.
 * @param classes a list of the classes that are specified.
 */
function e_prototype(type, id, classes) {
	/** This is the actual dom element that gets rendered. */
	this.self = svg_ce(type);
	this.children = new Array();
	
	this.id = id;
	
	/**
	 * Event function prototypes. Overload these for event handling
	 * @todo implement more events. see http://www.w3.org/TR/SVG/interact.html for details.
	 */
	this.onclick = null;
	this.ondblclick = null;
	this.onmouseover = null;
	this.onmouseout = null;
	this.onmousedown = null;
	this.onmouseup = null;
	
	/**
	 * Event connection helper function. Can be overloaded to supply plugin-
	 * based event handling. Dunno why that would be useful though.
	 */
	this.connect = function(event, listener) {
		if (listener != null) {
			this.self.addEventListener(event, listener);
		}
	}
	
	/**
	 * Connect all events.
	 * @todo implement more events. see http://www.w3.org/TR/SVG/interact.html for details.
	 */
	this.connectAll = function() {
		this.connect("click", this.onclick);
		this.connect("dblclick", this.ondblclick);
		this.connect("mouseover", this.onmouseover);
		this.connect("mouseout", this.onmouseout);
		this.connect("mousedown", this.onmousedown);
	}
	
	/**
	 * Attribute setter
	 */
	this.setAttribute = function (name, value) {
		this.self.setAttribute(name, value);
	}
	
	/**
	 * Set ID. If the ID is not passed or is null, create an ID based on the type 
	 * of the tag and a global counter of the number of tags.
	 */
	if(typeof window.idCount === 'undefined') {
		window.idCount = {};
	}
	if (id) {
		this.setAttribute("id", id);
	} else {
		if(isNaN(window.idCount[type])){
			window.idCount[type] = 0
		};
		window.idCount[type] += 1;
		this.setAttribute("id", type+window.idCount[type]);
	}
	
	/**
	 * Set classes
	 */
	if(typeof classes !== 'undefined') { this.setAttribute("class", classes.join(" ")) };
	
	this.append = function(e) {
		this.children.push(e);
		e.parent = this;
		e.render();
	}
	
	this.render = function() {
		this.parent.self.appendChild(this.self);
		this.connectAll();
	}
}

/** Utility Function to extend a tag type */
function svg_extend(obj, tag, id, classes) {e_prototype.apply(obj, [tag, id, classes]);}

function group(id, x, y, rot, classes)  {
	svg_extend(this, 'g', id, classes);
	this.x = x;
	this.y = y;
	this.rot = rot;
}

function rect(id, x, y, width, height, classes) {
	svg_extend(this, 'rect', id, classes);
	
	this.setAttribute("x", x);
	this.setAttribute("y", y);
	this.setAttribute("width", width);
	this.setAttribute("height", height);
	this.setAttribute("fill", "#369");

}

function text(id, x, y, label, classes) {
	svg_extend(this, 'text', id, classes);
	
	self.x = x;
	self.y = y;
	
	this.setAttribute("x", x);
    this.setAttribute("y", y);
    this.setAttribute("fill", "#FFF");
    this.self.appendChild(document.createTextNode(label));
}

function circle(id, x, y, r, classes) {
	svg_extend(this, 'circle', id, classes);
	
	self.cx = x;
	self.cy = y;
	self.r = r;
	
	this.setAttribute("cx", x);
    this.setAttribute("cy", y);
    this.setAttribute("r", r);
    this.self.setAttribute("fill", "#336699");
}

function SVG(parentId, id, classes) {
	svg_extend(this, "svg", id, classes);
	this.parent = document.getElementById(parentId);
	this.render = function() {
		/*
		 *  Do not use this.parent.self here since this.parent is not a e_prototype subclass
		 */
		this.parent.appendChild(this.self);
	}
	this.render();
}

