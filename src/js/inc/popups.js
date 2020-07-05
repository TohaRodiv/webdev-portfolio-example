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