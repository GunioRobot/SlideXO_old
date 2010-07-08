var SLIDE_COUNT;
var SLIDE_INDEX;

window.onload = function() {
	init();
};

document.onkeydown = function(e) {
	keyboard(e.keyCode);
}

window.onhashchange = function(e) {
	SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
	//alert(SLIDE_INDEX);
}

function init() {
	/* Assign slide IDs */
	var slides = document.getElementsByClassName("xo-slide");
	SLIDE_COUNT = slides.length;
	for (var i=0; i < SLIDE_COUNT; i++) {
		slides[i].setAttribute("id","slide-" + (i+1));
	}
	
	/* Cue up first slide */
	location.hash = "slide-1";
	SLIDE_INDEX = 1;
	//alert(window.history.length);
}

/*+ Delegates keyboard inputs */
function keyboard(key) {
	switch(key) {
		case 83:	/* s */
			mode_switch();
			break;
		case 10: 	// return
		case 13: 	// enter
		case 32: 	// spacebar
		case 34: 	// page down
		case 39: 	// rightkey
		case 40: 	// downkey			
			if (SLIDE_INDEX < SLIDE_COUNT) {
				location.hash = "slide-" + (SLIDE_INDEX + 1);
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

/*+ Switches between Outline and Slideshow modes */
function mode_switch() {
	var root = document.documentElement;
	if (hasClass(root,"outline")) {
		removeClass(root,"outline");
		addClass(root,"slideshow");
	} else {
		removeClass(root,"slideshow");
		addClass(root,"outline");
	}
}

/*+ Utility */
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