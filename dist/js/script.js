(function () {
/**
 *  Wrapper querySelector
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
	* Pop-up
	*/
	class popup {
		constructor() {
			this.popup_box = $(".popup")
			this.content = $(".popup__content")
			
			//$(".popup__close-btn", "click", ev => this.hide())
		}
		
		show(msg) {
			//msg && this.content.innerHTML = msg
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

	let name = backfeedForm["name"].value.trim(),
	email = backfeedForm["email"].value.trim(),
	message = backfeedForm["message"].value.trim(),
	test = false

	test = name.length > 2 && name.length < 60

	test = test && email.length > 3 && email.length < 60

	test = test && message.length > 16 && message.length < 1000

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
new Swiper (".swiper-container", {
	effect: "slide",
	grabCursor: true,
	resistanceRatio: 0.7,
	freeMode: true,
	loop: true
})

})()