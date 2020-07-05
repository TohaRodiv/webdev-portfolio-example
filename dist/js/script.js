(function () {
/**
 *  Wrapper querySelector
 *
 * @param {String} cls - css selector
 * @param {String} event - event name
 * @param {Function} func - callback function event handler
 *
 * @return {Object} HTMLElement(s)
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

let ppp = new popup;

let backfeedForm = $("#backfeed_form")


backfeedForm.addEventListener ("submit", event => {
	event.preventDefault()


	// Gets value onput and trim

	let name = backfeedForm["name"].value.trim(),
	email = backfeedForm["email"].value.trim(),
	message = backfeedForm["message"].value.trim(),
	test = false


	// Check lenght
	
	test = name.length > 2 && name.length < 60

	test = test && email.length > 3 && email.length < 60

	test = test && message.length > 16 && message.length < 1000

	// If test is true, show popup and block overfow body

	if (test) {
		ppp.show()
		$("body.blur", "click", ev => ppp.hide())
	}
	else
		return false
})
let mainMenu 	= 	$(".main-menu").classList,
burger 			= 	$(".burger").classList,
body 			= 	document.body


/**
 * Toggle menu for burger
 * @param  {Boolean} lock block overflow-y body
 */
function toggleMenu (lock = true) {
	lock && body.classList.toggle ("lock")

	burger.toggle ("burger_active")
	mainMenu.toggle ("main-menu_active")
}


$(".burger", "click", toggleMenu)

$(".main-menu .menu__link", "click", ev => {
	if ( mainMenu.contains ("main-menu_active") )
		toggleMenu ()
})
// Init swiper.js
new Swiper (".swiper-container", {
	effect: "slide",
	grabCursor: true,
	resistanceRatio: 0.7,
	freeMode: true,
	loop: true
})

})()