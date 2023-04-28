const get = (params) => document.querySelector(`[${params}]`);

const billCost = get("data-bill");
const tips = document.querySelectorAll("[data-tip]");
const customTip = get("data-tip-custom");
const people = get("data-people");
const peopleField = document.querySelector(".people");
const peopleErr = document.querySelector(".people-error");
const totalTip = get("data-total-tip");
const personTip = get("data-total-people");
const resetBtn = document.querySelector(".reset-btn input");

var bill = 0;
var userTip = 0;
var numberOfPeople = 0;

billCost.addEventListener("input", () => {
	bill = Number(billCost.value);
	calcTip();
});

tips.forEach((tip) => {
	tip.addEventListener("click", () => {
		tips.forEach((tip) => tip.classList.remove("active-tip"));
		tip.classList.add("active-tip");
		userTip = Number(tip.dataset.tip);
		console.log(userTip);
	});
});

customTip.addEventListener("input", () => {
	tips.forEach((tip) => tip.classList.remove("active-tip"));
	userTip = Number(customTip.value);
	calcTip();
});

people.addEventListener("input", () => {
	if (people.value != "0") {
		numberOfPeople = Number(people.value);
		peopleErr.classList.remove("active");
		peopleField.classList.remove("error");
		calcTip();
	} else {
		peopleField.classList.add("error");
		peopleErr.classList.add("active");
	}
	console.log(people.value);
});

function calcTip() {
	if (bill > 0 && userTip > 0 && numberOfPeople > 0) {
		let tipAmount = (bill * (userTip / 100)) / numberOfPeople;
		let totalPerson = bill / numberOfPeople + tipAmount;
		totalTip.textContent = `$${tipAmount.toFixed(2)}`;
		personTip.textContent = `$${totalPerson.toFixed(2)}`;
		resetBtn.classList.add("active-reset");
	} else {
		resetBtn.classList.remove("active-reset");
		return;
	}

	if (bill > 0 || userTip > 0 || numberOfPeople > 0) {
		console.log("reset active");
	} else {
		console.log("reset removed");
	}
}

resetBtn.addEventListener("click", () => {
	bill = 0;
	userTip = 0;
	numberOfPeople = 0;
	billCost.value = "";
	customTip.value = "";
	people.value = "";
	tips.forEach((tip) => tip.classList.remove("active-tip"));
	resetBtn.classList.remove("active-reset");
	totalTip.textContent = `$0.00`;
	personTip.textContent = `$0.00`;
});
