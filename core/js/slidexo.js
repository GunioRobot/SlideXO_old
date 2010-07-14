/*!
 * SlideXO - Presentation Framework
 *
 * Copyright (c) 2010 Jason Daihl (http://slidexo.com)
 * Licensed under the TBD license.
 */

 var SlideXO = (function() {
	
	var CURRENT_SLIDE;
	var SLIDE_COUNT;
	var SLIDE_INDEX = 1;
	var VIEW;
	
	var doc = document.documentElement;
	var meta_tags = document.getElementsByTagName("meta");
	var slides = document.getElementsByClassName("xo-slide");
	var next_btn = document.querySelector(".xo-nav-next a");
	var prev_btn = document.querySelector(".xo-nav-prev a");
	
	// Assign slide IDs
	SLIDE_COUNT = slides.length;
	for (var i=0; i < SLIDE_COUNT; i++) {
		slides[i].setAttribute("id","slide-" + (i+1));
	}
	
	// Determine default view
	for (var i=0; i < meta_tags.length; i++) {
		if (meta_tags[i].name === "view_mode") {
			VIEW = meta_tags[i].content;
			start_slidexo();
		}
	}
	
	// Starts / Re-starts SlideXO
	function start_slidexo() {
		if (location.hash === "") {
			location.hash = "slide-" + SLIDE_INDEX;
			location.search = "view=" + VIEW;
		} else {
			SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
			VIEW = location.search.split("=")[1];
		}
		set_view(VIEW);
		update_nav();
	}
	
	// Hash change event
	window.onhashchange = function() {
		update_nav();
	}
	
	// Hash change event
	document.onkeydown = function(e) {
		keyboard(e);
	}
	
	// Delegates keyboard inputs
	function keyboard(key) {	
		//alert(key.keyCode);
		switch(key.keyCode) {
			case 10: 	// return
			case 13: 	// enter
			case 32: 	// spacebar
			case 34: 	// page down
			case 39: 	// rightkey
			case 40: 	// downkey			
				if (SLIDE_INDEX < SLIDE_COUNT) {
					location.hash = "#slide-" + (SLIDE_INDEX + 1);
				}
				update_nav;
				break;
			case 8:		// backspace/delete
			case 33: 	// page up
			case 37: 	// leftkey
			case 38: 	// upkey
				if (SLIDE_INDEX > 1) {
					location.hash = "#slide-" + (SLIDE_INDEX - 1);
				}
				update_nav;
				break;
			case 90:	// z
				toggle_view();
				break;
		}	
	}
	
	// Update navigation links
	function update_nav() {
		SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
		if (SLIDE_INDEX < SLIDE_COUNT) {
			next_btn.setAttribute("href","#slide-" + (SLIDE_INDEX + 1));
		} else {
			next_btn.removeAttribute("href");
		}
		
		if (SLIDE_INDEX > 1) {
			prev_btn.setAttribute("href","#slide-" + (SLIDE_INDEX - 1));
		} else {
			prev_btn.removeAttribute("href");
		}
		current_slide();
	}
	
	// Assign current slide and make visible
	function current_slide() {
		var current = document.getElementById("slide-" + SLIDE_INDEX);
		for (var i=0; i < slides.length; i++) {
			removeClass(slides[i],"current");
		}
		current.className += " current";
	}
	
	// Set view
	function set_view(v) {
		doc.className = v;
		location.search = "?view=" + v;
	}
	
	// Toggle view
	function toggle_view() {
		var q = location.search.split("=")[1];
		if (q === "outline") {
			VIEW = "slideshow";
		} else {
			VIEW = "outline";
		}
		set_view();
	}
 })();
 
//+ Utility
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
 
/*
var ROOT = document.documentElement;
var VIEW = "OUTLINE";
var SLIDE_COUNT;
var SLIDE_INDEX;

window.onload = function() {
	init();
};

document.onkeydown = function(e) {
	//alert(e.keyCode);
	keyboard(e.keyCode);
}

window.onhashchange = function(e) {
	SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
	//alert(SLIDE_INDEX);
}

function init() {
	// Assign slide IDs
	var slides = document.getElementsByClassName("xo-slide");
	SLIDE_COUNT = slides.length;
	for (var i=0; i < SLIDE_COUNT; i++) {
		slides[i].setAttribute("id","slide-" + (i+1));
	}
	
	// Cue up first slide
	//location.hash = "slide-1";
	//SLIDE_INDEX = 1;
	//alert(window.history.length);
}

//+ Delegates keyboard inputs
function keyboard(key) {
	var current;
	var next;
	var previous;
	var slide;
	
	switch(key) {
		case 83:	// s
			start_slidexo();
			break;
		case 86:	// v
			toggle_VIEW();
			break;
		case 10: 	// return
		case 13: 	// enter
		case 32: 	// spacebar
		case 34: 	// page down
		case 39: 	// rightkey
		case 40: 	// downkey			
			if (SLIDE_INDEX < SLIDE_COUNT) {
				slide = "slide-" + (SLIDE_INDEX + 1);
				location.hash = slide;
				current = document.getElementById(slide);
				next = document.getElementsByClassName("current");
				for (var i=0; i < next.length; i++) {
					removeClass(next[i], "current");
				}
				addClass(current,"current");
			}
			//alert("Next Slide: slide-" + (SLIDE_INDEX + 1));
			break;
		case 8:		// backspace/delete
		case 33: 	// page up
		case 37: 	// leftkey
		case 38: 	// upkey
			if (SLIDE_INDEX != 1) {
				location.hash = "slide-" + (SLIDE_INDEX - 1);
			}
			//alert("Previous Slide: " + location.hash);
			break;
	}
}

//+ Starts the slideshow
function start_slidexo() {
	slideshow_VIEW();
	location.hash = "slide-1";
}

//+ Outline VIEW
function outline_VIEW() {
	if (VIEW === "SLIDESHOW") {
		removeClass(ROOT,"slideshow");
		addClass(ROOT,"outline");
	}
	VIEW = "OUTLINE";
	//location.search = "";
}

//+ Slideshow VIEW
function slideshow_VIEW() {
	if (VIEW === "OUTLINE") {
		removeClass(ROOT,"outline");
		addClass(ROOT,"slideshow");
	}
	VIEW = "SLIDESHOW";
	//location.search = "slidexo";
}

//+ Switches between Outline and Slideshow VIEWs
function toggle_VIEW() {
	if (location.search = "slidexo") {
		outline_VIEW();
	} else {
		slideshow_VIEW();
	}
}

//*+ Utility
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
*/