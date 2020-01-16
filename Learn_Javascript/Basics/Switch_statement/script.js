/* Switch statement:
var varName = value;
switch (varName) {
	case value1:
		ToDo if value = value1;
		break;
	case value2:
		ToDo if value = value2;
	....
	....
	case valuen:
		ToDo if value = valuen;
		break;
	default:
		ToDo if none of the above cases is not fulfilled
*/

var job = 'web_developer';
switch (job) {
	case 'baby_sitter':
		console.log('You take good care of kids');
		break;
	case 'driver':
		console.log('You drive safe and make customers happy');
		break;
	case 'web_developer':
		console.log('You design beautiful websites and perfect web-applications');
		break;
	case 'cooker':
		console.log('you makes delicious foods');
		break;
	default:
		console.log('You are good at everything');
}