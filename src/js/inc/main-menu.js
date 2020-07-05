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