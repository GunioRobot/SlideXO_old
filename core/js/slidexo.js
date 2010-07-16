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
	var mq = testMediaQuery('screen and (min-width: 1920px)');
	var meta_tags = document.getElementsByTagName("meta");
	var slides = document.getElementsByClassName("xo-slide");
	var next_btn = document.querySelector(".xo-nav-next a");
	var prev_btn = document.querySelector(".xo-nav-prev a");
	var shortcuts = document.getElementById("shortcuts");
	var slide_list = document.getElementById("slide-list");

	// Test for browser capabilities and launch accordingly
	if (!document.getElementsByClassName && !document.querySelector && Modernizr.hashchange && mq) {
		return false;
	} else {
		//alert(mq);
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

/*
* Copyright (c) 2007, Opera Software ASA
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Opera Software ASA nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY OPERA SOFTWARE ASA ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL OPERA SOFTWARE ASA BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * Execute a media query to determine what the browser supports
 *
 * <p>This function will attempt to execute a 
 * <a href="http://www.w3.org/TR/css3-mediaqueries/">CSS3 Media Query</a>
 * to determine if the browser supports the given media types or media features.
 * This is essentially the same as specifying a style sheet
 * rule using media queries, only in JavaScript instead.</p>
 * 
 * <p>Example usage:</p>
 * <pre><code>if (testMediaQuery("handheld")) { ... }</code></pre>
 * <p>or</p>
 * <pre><code>if (testMediaQuery("tv and (max-height: 400px)") { ... }</code></pre>
 *
 * @author Benjamin Joffe, benjoffe@opera.com
 * @param str media query to execute
 * @returns true if the browser satisfies the given media query, 
 *      otherwise false
 */
function testMediaQuery(str)
{
    var style = document.createElement('style');
    var div = document.createElement('div');
    var id = '';
    do {
        id = ('x'+Math.random()).replace(/\./,'');
    }
    while ( document.getElementById(id) );
    div.id = id;
    style.innerText = '@media ' + str + ' { #'+id+' { display:none !important; } }';
    document.documentElement.appendChild(style);
    document.documentElement.appendChild(div);
    var ret = getComputedStyle(div,null).getPropertyValue('display') == 'none';
    style.parentNode.removeChild(style);
    div.parentNode.removeChild(div);
    return ret;
}