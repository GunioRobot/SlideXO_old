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

	var doc = document.body;
	var meta_tags = document.getElementsByTagName("meta");
	var slides = document.getElementsByClassName("xo-slide");
	var next_btn = document.querySelector(".xo-nav-next a");
	var prev_btn = document.querySelector(".xo-nav-prev a");
	var shortcuts = document.getElementById("shortcuts");
	var slide_list = document.getElementById("slide-list");

	// Test for browser capabilities and launch accordingly
	if (!document.getElementsByClassName && !document.querySelector && Modernizr.hashchange) {
		return false;
	} else {
		init();
	}

	function init() {
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
	}

	// Starts / Re-starts SlideXO
	function start_slidexo() {
		if (location.hash === "") {
			location.hash = "slide-" + SLIDE_INDEX;
			//location.search = "view=" + VIEW + "&amp;";
		} else {
			SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
			//VIEW = location.search.split("=")[1];
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

	// View toggle button
	var outline_btn = document.getElementById("outline");
	outline_btn.onclick = function() {
		toggle_view();
	}

	// View toggle button
	var help_btn = document.getElementById("help");
	help_btn.onclick = function() {
		toggle_help();
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
			case 88:	// x
				toggle_viz(shortcuts);
				break;
			case 67:	// x
				toggle_viz(slide_list);
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
		location.hash = location.hash;
	}

	// Toggle view
	function toggle_view() {
		if (hasClass(doc,"outline")) {
			VIEW = "slideshow";
		} else {
			VIEW = "outline";
		}
		set_view(VIEW);
	}

	// Toggle visibility
	function toggle_viz(s) {
		if(hasClass(s,"hide")) {
			removeClass(s,"hide");
			addClass(s,"show");
		} else {
			removeClass(s,"show");
			addClass(s,"hide");
		}
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