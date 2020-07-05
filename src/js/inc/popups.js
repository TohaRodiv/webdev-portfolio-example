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