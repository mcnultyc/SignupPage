/* ---------------------- Username/Password Check ---------------------- */

// Icons
var $letter  = $('#letter');
var $capital = $('#capital');
var $length  = $('#length');
var $number  = $('#number')
var $special = $('#special');

// Username input
var $username = $('#username');

// Username feedback
var $usernameFeedback = $('#username-feedback');

// Password input
var $password = $('#password');

// Button objects
var $submitButton = $('#submit-button');
var $showButton   = $('#checkbox');

// Filters
var lowerCaseLetters  	= /[a-z]/g;
var upperCaseLetters 	= /[A-Z]/g;
var specialCharacters	= /[~`!#$%\^&.*()+=\-\[\]\\';,/{}|\\":<>\?]/g
var numbers 			= /[0-9]/g;

/* Updates password icons if valid
 * input is found. If any of the 
 * necessary characters are missing
 * then the function returns false
 * indicating that the password isn't
 * ready.
 */
function updatePasswordIcons(password){
	var valid = true;
	// Validate lower case letters
	if(password.match(lowerCaseLetters)){
		$letter.removeClass('unchecked');
		$letter.addClass('checked');
	}
	else{
		valid = false; // Invalid password
		$letter.removeClass('checked');	
		$letter.addClass('unchecked');
	}
	// Validate upper case letters
	if(password.match(upperCaseLetters)){
		$capital.removeClass('unchecked');
		$capital.addClass('checked');
	}
	else{
		valid = false;
		$capital.removeClass('checked');
		$capital.addClass('unchecked');
	}
	// Validate numbers
	if(password.match(numbers)){
		$number.removeClass('unchecked');
		$number.addClass('checked');
	}
	else{
		valid = false;
		$number.removeClass('checked');
		$number.addClass('unchecked');
	}
	// Validate length
	if(password.length >= 8){
		$length.removeClass('unchecked');
		$length.addClass('checked');
	}
	else{
		valid = false;
		$length.removeClass('checked');
		$length.addClass('unchecked');
	}
	// Validate special characters
	if(password.match(specialCharacters)){
		$special.removeClass('unchecked');
		$special.addClass('checked');
	}
	else{
		valid = false;
		$special.removeClass('checked');
		$special.addClass('unchecked');
	}
	return valid;
}

/* Toggle the visibility of the password
 * using the show button.
 */
function togglePasswordViz() {
	var passwordElem = document.getElementById('password');
	if(passwordElem.type === 'password'){
		passwordElem.type = 'text';
	}
	else{
		passwordElem.type = 'password';
	}
}

/* Handle change of focus for username field.
 * Provides username feedback if username isn't
 * at least 8 characters long.
 */
$username.on('change', function(){
	var username = $(this).val();
	// Check username length and set
	// appropriate feedback message
	if(username.length < 8){
		$usernameFeedback.text('Username must be 8 characters or more');
	}
	else{
		$usernameFeedback.text('');
	}
});

/* Handle keyup event for password input.
 */ 
$password.on('keyup', function() {
	var password = $(this).val();
	// Change color to indicate completion
	if(updatePasswordIcons(password)){
		$submitButton.css('background-color', '#33ff33');
	}
	else{
		$submitButton.css('background-color', '#ccffcc');
	}

});

/* Handle click event for password
 * to toggle password visibility.
 */
$showButton.on('click', function() {
	var type = $password.attr('type');
	// Toggle password type from plain-text to asterisks
	if(type == 'password'){
		$password.attr('type', 'text');
	}
	else{
		$password.attr('type', 'password');
	}
});




/* ---------------------- End Username/Password Check ---------------------- */
