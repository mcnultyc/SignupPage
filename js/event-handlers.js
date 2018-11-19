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

// Key input
var $key = $('#key');

// Button objects
var $submitButton = $('#submit-button');
var $showButton   = $('#checkbox');

// Filters
var lowerCaseLetters  	= /[a-z]/g;
var upperCaseLetters 	= /[A-Z]/g;
var specialCharacters	= /[~`!#$%\^&.*()+=\-\[\]\\';,/{}|\\":<>\?_]/g
var numbers 			= /[0-9]/g;

/* Updates password icons if valid
 * input is found. If any of the 
 * necessary characters are missing
 * then the function returns false
 * indicating that the password isn't
 * ready.
 */
function validatePassword(password){
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
	// Get the type attribute from password
	var type = $password.attr('type');
	// Toggle password type from plain-text to asterisks
	if(type == 'password'){
		$password.attr('type', 'text');
	}
	else{
		$password.attr('type', 'password');
	}
}

/* Set error message in element.
 */
function setErrorMessage(el, message){
	$(el).data('message', message);
}

/* Adds an error message belonging to the
 * named element after the element. 
 */
function addErrorMessage(el){
	var $el = $(el);
	// Collect existing errors
	var $errors = $el.siblings('.error');
	// Test for no existing errors
	if(!$errors.length){
		// Create span to hold error message and add after el
		$errors = $el.after('<div class="error"></div>');
	}
	// Add error message
	$errors.text($el.data('message'));
}

/* Clears an existing error message.
 */
function clearErrorMessage(el){
	var $el = $(el);
	// Collect existing errors
	var $errors = $el.siblings('.error');
	// Test for existing error
	if($errors.length > 0){
		// Clear error message
		$errors.text('');
	}
}

/* Object with functions to validate
 * fields.
 */
var validateFields = {
	password: function(el){
		// Validate that password meets requirements
		// and update requirement icons
		var valid = validatePassword(el.value);
		if(!valid){
			setErrorMessage(el, 'Password missing requirements');
		}
		return valid;
		
	},
	username: function(el){
		// Check that username has at least 8 characters
		var valid = (el.value.length >= 8);
		if(!valid){
			setErrorMessage(el, "Username must be at least 8 characters long");
		}
		return valid;
	},
	key: function(el){
		// Check that invitation key has correct format
		var valid = /[\w]{4}-[\w]{4}-[\w]{4}/.test(el.value);
		if(!valid){
			setErrorMessage(el, "Key has invalid form");
		}
		return valid;
	}
}

/* Checks that the given element is a valid
 * field.
 */
function validateField(el){
	// Find the name attribute to determine the kind of field
	// which as of now can be either username, password, or key
	var fieldType = $(el).data('name') || el.getAttribute('name');
	// Check if type is a function of the validateFields object
	if(typeof validateFields[fieldType] == 'function'){
		// Check if the element is valid
		return (el.value) && validateFields[fieldType](el);
	}
	else{
		// Return true if not a 
		// function of validateFields
		return true;
	}
}

/* Validate each field in the form. Returns
 * true if every field is completed and 
 * meets the requirements.
 */
function validateForm(el){
	var form = document.getElementById(el);
	// Get form elements
	var elems = form.elements;
	var validForm = true;
	// Validate each element in form
	for (i = 0; i < elems.length; i++) {
		// Validate element
		var isValid = validateField(elems[i]);
		// And values to record at least one error
		validForm = validForm && isValid;
		if(!isValid){
			// Add error message to page
			addErrorMessage(elems[i]);
		}
		else{
			// Remove error message from page
			clearErrorMessage(elems[i]);
		}
	}
	return validForm;
}

/* Handle change of for username field.
 * Provides username feedback if username isn't
 * at least 8 characters long.
 */
$username.on('input', function(){
	if(validateForm('login')){
		$submitButton.css('background-color', '#33ff33');
	}
	else{
		$submitButton.css('background-color', '#ccffcc');
	}
});

/* Handle change of password field.
 */ 
$password.on('input', function() {
	if(validateForm('login')){
		$submitButton.css('background-color', '#33ff33');
	}
	else{
		$submitButton.css('background-color', '#ccffcc');
	}
});

/* Handle change of key field.
 */
$key.on('input', function(){
	if(validateForm('login')){
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
	// Toggle the password visibility
	togglePasswordViz();
});

/* Handle submit event for sign-up form
 * by validating input before submitting.
 */
$('#login').on('submit', function(e){
	// Check that the form is valid
	if(validateForm('login')){
		$submitButton.css('background-color', '#33ff33');
	}
	else{
		// Prevent submission
		e.preventDefault();
		e.stopPropagation();
		$submitButton.css('background-color', '#ccffcc');
	}
});

/* ---------------------- End Username/Password Check ---------------------- */
