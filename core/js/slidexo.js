window.onload = function() {
	//init();
};

document.onkeydown = function(e) {
	//alert(e.keyCode);
	keyboard(e.keyCode);
}

function init() {
	var root = document.documentElement;
	
	root.className = "slideshow";
	/*if(hasClass(root,"outline")) {
		removeClass(root,"outline");
		addClass(root,"slideshow");
	}*/
}

function keyboard(key) {
	switch(key) {
		case 83:
			mode_switch();
			break;
	}
}

function mode_switch() {
	var root = document.documentElement;
	if(root.className === "outline") {
		root.className = "slideshow";
	} else {
		root.className = "outline";
	}
}

/* Utility functions */
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