/*!
 * SlideXO - Presentation Framework
 *
 * Copyright (c) 2010 Jason Daihl (http://slidexo.com)
 * Licensed under the TBD license.
 */

 var SlideXO = (function() {
	
	var CURRENT_SLIDE;
	var SLIDE_COUNT;
	var SLIDE_INDEX = 0;
	var VIEW;
	
	var doc = document.body;
	var increments = document.getElementsByClassName("incremental");
	var meta_tags = document.getElementsByTagName("meta");
	var slides = document.getElementsByClassName("xo-slide");
	var steps;

	// Test for browser capabilities and launch accordingly
	if (!document.getElementsByClassName && !document.querySelectorAll && Modernizr.hashchange) {
		return false;
	} else {
		// Add slide and bullet IDs
		SLIDE_COUNT = slides.length;
		var k;
		for (var i=0; i < SLIDE_COUNT; i++) {
			slides[i].setAttribute("id","slide-" + (i+1));
			increment = slides[i].getElementsByClassName("incremental");
			for(j=0; j < increment.length; j++) {
				if (increment[j].nodeName === "DL" || increment[j].nodeName === "OL" || increment[j].nodeName === "UL") {
					var bullets = increment[j].children;
					addClass(increment[j],"bullet-list");
					for (k=0; k < bullets.length; k++) {
						bullets[k].setAttribute("id","slide-" + (i+1) + "-" + ((k+1)+j));
					}
				} else {
					if (k > j) {
						increment[j].setAttribute("id","slide-" + (i+1) + "-" + (k+1));
					} else {
						increment[j].setAttribute("id","slide-" + (i+1) + "-" + (j+1));
					}
				}
			}
		}
		
		// Collection of slides and bullets
		steps = document.querySelectorAll("*[id^='slide-']");
		
		// Determine default view
		for (var i=0; i < meta_tags.length; i++) {
			if (meta_tags[i].name === "view_mode") {
				VIEW = meta_tags[i].content;
			}
		}
	}
	
	// Starts / Re-starts SlideXO
	/*function start_slidexo() {
		if (location.hash === "") {
			location.hash = "slide-" + SLIDE_INDEX;
		} else {
			SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
		}
		set_view(VIEW);
		update_nav();
	}*/
	
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
			case 32: 	// spacebar
			case 39: 	// rightkey		
				if (SLIDE_INDEX < steps.length) {
					console.log(steps[SLIDE_INDEX++].getAttribute("id") + " (" + SLIDE_INDEX + ")");
				}
				update_nav;
				break;
			case 37: 	// leftkey
				if (SLIDE_INDEX > 1) {
					console.log(steps[(SLIDE_INDEX--)-2].getAttribute("id") + " (" + SLIDE_INDEX + ")");
				}
				break;
			case 90:	// z
				//toggle_view();
				break;
			case 88:	// x
				//toggle_viz(shortcuts);
				break;
			case 67:	// x
				//toggle_viz(slide_list);
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
		//location.search = "?view=" + v;
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