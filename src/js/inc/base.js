/**
 *  Wrapper querySelector
 *
 * @param {String} cls - css selector
 * @param {String} event - event name
 * @param {Function} func - callback function event handler
 *
 * @return {Object|Array} HTMLElement
*/
function $ (cls, event = false, func = false){
	if (event && func){
		$.objs = document.querySelectorAll(cls)
		for (let i = 0; i < $.objs.length; i++)
			$.objs[i].addEventListener (event, func)
		return $.objs
	}

	return document.querySelector(cls)
}


	/**
	* Pop-up class
	*/
	class popup {
		constructor() {
			this.popup_box = $(".popup")
			this.content = $(".popup__content")
		}
		
		show() {
			this.popup_box.classList.remove("popup_hide")
			document.body.classList.add("blur")
		}
		
		hide() {
			document.body.classList.remove("blur")
			this.popup_box.classList.add("popup_hide")
		}
	}
