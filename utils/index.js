const getRelativePosition = (pageCoords, element) => {
    return {
        x: pageCoords.x - element.offsetLeft,
        y: pageCoords.y - element.offsetTop
    }
}

// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

module.exports = {
    getRelativePosition,
    debounce
}