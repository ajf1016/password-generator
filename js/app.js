const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");

const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById('passwordDisplay');
const qualityDisplay = document.getElementById('quality')
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSybolsElement = document.getElementById("includeSymbols");

const UPPERCASE_CHAR_CODES = arrayLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayLowToHigh(33, 47)
	.concat(arrayLowToHigh(58, 64))
	.concat(arrayLowToHigh(91, 96))
	.concat(arrayLowToHigh(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const characterAmount = characterAmountNumber.value;
	const includeUppercase = includeUppercaseElement.checked;
	const includeNumbers = includeNumbersElement.checked;
	const includeSybols = includeSybolsElement.checked;
	console.log(characterAmount);
	const password = generatePassword(
		characterAmount,
		includeUppercase,
		includeNumbers,
		includeSybols
	);
	if (includeUppercase && includeNumbers && includeSybols){
		qualityDisplay.innerText = "...STRONGEST..."
		qualityDisplay.style.color = "green"
	}else if(includeUppercase || includeNumbers || includeSybols){
		qualityDisplay.style.color = "fbad02"
		qualityDisplay.innerText = "...STRONG..."
	}else{
		qualityDisplay.innerText = "...LOW..."
		qualityDisplay.style.color = "red"
	}
	if(e.target !==null && characterAmountNumber == null){
		alert("pls Submit")
	}
	passwordDisplay.innerText = password;
});

function generatePassword(
	characterAmount,
	includeUppercase,
	includeNumbers,
	includeSybols
) {
	let charCodes = LOWERCASE_CHAR_CODES;
	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
	if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
	if (includeSybols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

	const passwordCharcters = []
	for(let i = 0;i<characterAmount;i++){
		const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
		passwordCharcters.push(String.fromCharCode(characterCode));
	}
	return passwordCharcters.join('')
}

function arrayLowToHigh(low, high) {
	const array = [];
	for (let i = low; i <= high; i++) {
		array.push(i);
	}
	return array;
}
//1,3,2,5,5
function syncCharacterAmount(e) {
	const value = e.target.value;

	characterAmountNumber.value = value;
	characterAmountRange.value = value;
}
