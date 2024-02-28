(function(){
	/* -----------------------------
	   General objets and variables
	----------------------------- */


	// Variable to keep the app form.
	var app = document.getElementById('app');

	// Variable to keep the input of amount of characters.
	var inputCharacters = document.getElementById('amount-characters');

	// Object that contains the configuration to generate the passwords.
	// We can modifie this object to decide if we want or not symbols, numbers or uppercase.
	var configuration = {
		characters: parseInt(inputCharacters.value),
		symbols: true,
		numbers: true,
		uppercase: true,
		lowercase: true
	}

	// Objects that contains chains of text with every character we will use to generate the passwords.
	// (Object property) Characters separated by categories.
	var characters = {
		numbers: '0 1 2 3 4 5 6 7 8 9',
		symbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
		uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
	}

	/* -----------------------------
	   Events
	 ----------------------------- */

	// Events to avoid app data submition and refresh the page.
	app.addEventListener('submit', function(e){
		e.preventDefault();
	});

	// Event for the btn to increase by one the amount of characters.
	app.elements.namedItem('btn-plus-one').addEventListener('click', function(){
		configuration.characters++;
		inputCharacters.value = configuration.characters;

		// console.log to check the increase of amount of characters
		// console.log('Amount of characters: ' + configuration.characters);
	});

	// Event for btn to decrease by one the amount of characters.
	app.elements.namedItem('btn-minus-one').addEventListener('click', function(){
		// Validation: is not posible to select a number less than 1
		if (configuration.characters > 1) {
			configuration.characters--;
			inputCharacters.value = configuration.characters;

			// console.log to check the increase of amount of characters
			// console.log('Amount of characters: ' + configuration.characters);
		}
	});

	// Event for the symbol btn to activate or desactivate if we want symbols in the password.
	app.elements.namedItem('btn-symbols').addEventListener('click', function(){
		// Ejecute the function that alternate the icon and the background of the btn.
		btnToggle(this);

		// Alternate between true and false in the property of the object configuration.
		configuration.symbols = !configuration.symbols;

		// console.log to check if the symbol y activated or desactivated.
		// console.log('Symbols activated: ' + configuration.symbols);
	});

	// Event for the btn of numbers if we want numbers in the password: activate or desactivate.
	app.elements.namedItem('btn-numbers').addEventListener('click', function(){
		// Ejecute the function that alternate the icon and the background of the btn.
		btnToggle(this);

		// Alternate between true and false in the property of the object configuration.
		configuration.numbers = !configuration.numbers;

		// console.log to check if numbers are activated or desactivated.
		// console.log('Numbers activated: ' + configuration.numbers);
	});

	// Event for the btn of uppercase: If we want uppercase in the password, activate or desativate.
	app.elements.namedItem('btn-uppercase').addEventListener('click', function(){
		// Ejecute the function that alternate the icon and the background of the btn.
		btnToggle(this);

		// Alternate between true and false in the property of the object configuration.
		configuration.uppercase = !configuration.uppercase;

		// console.log to check if uppercase is activated or desactivated.
		// console.log('Uppercase activated: ' + configuration.uppercase);
	});

	// Event for the btn to generate password.
	app.elements.namedItem('btn-generate').addEventListener('click', function(){
		// Ejecute the function generate password.
		generatePassword();
	});

	// Event for the password input when getting a click.
	app.elements.namedItem('input-password').addEventListener('click', function(){
		// Ejecute the function copy text.
		copyPassword();
	});

	/* -----------------------------
	   Function
    ----------------------------- */

	// Function that allows to alternate between styles and icons of the btn.
	function btnToggle(elemento){
		elemento.classList.toggle('false');
		elemento.childNodes[0].classList.toggle('fa-check');
		elemento.childNodes[0].classList.toggle('fa-times');
	}

	// Funtion that generate the password.
	function generatePassword(){
		// Variable where to save the chain of text with all the characters we can use to generate the password.
		var finalCharacters = '';

		// Variable where we save character per character of the password.
		var password = '';

		// Iterate over the object configuration to access to each property.
		for(property in configuration){
			// Ask if the property is equal to true.
			// So it means it accept symbols / numbers / uppercase.
			if (configuration[property] == true){
				// conso.log to identigy what is configuration[property].
				// console.log(configuration[property]);

				// To the variable finalCharacters we sum the text chain corresponding to the actual iteration.
				// In few words: we are creating a chain of text that contains every character that we can use.
				finalCharacters += characters[property] + ' ';
			}
		}

		// Eliminates the last space in the text chain.
		finalCharacters = finalCharacters.trim();

		// console.log to check the variable of final characters that contains every character the user wants.
		// console.log(finalCharacters);

		// Make the final characters chain into an array.
		finalCharacters = finalCharacters.split(' ');

		// Cicle that generates character per character randomly.
		for(var i = 0; i < configuration.characters; i++){
			// To the variable password we sum a character randomly for each iteration.
			// First we pick a number ramdomly from 0 to the number of final characters.
			//Then we use that number to access a position of the array randomly of the finalCharacters.
			password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
		}

		// Show the password in the password input.
		app.elements.namedItem('input-password').value = password;
	}

	// Function that let us copy the text.
	function copyPassword(){
		// Select the text of the input
		app.elements.namedItem('input-password').select();
		// Copy the text
		document.execCommand("copy");
		document.getElementById('alert-copy').classList.add('active');

		setTimeout(function(){
			document.getElementById('alert-copy').classList.remove('active');
		}, 2000)
	}

	// Generate a password with the configuration for default while openning the page.
	generatePassword();
}())