let readlineSync = require('readline-sync');

let fs = require('fs');

let db = fs.readFileSync('./db/db.json', {encoding: 'utf8'});

let choice = readlineSync.question('What do you want to do: ');

let students = [];

function CreateStudent(name, age, sex, groupName, phoneNumber, skills, email, appearance) {
	this.name = name;
	this.age = age;
	this.sex = sex;
	this.groupName = groupName;
	this.phoneNumber = phoneNumber;
	this.skills = skills;
	this.email = email;
	this.appearance = appearance;
}


function app() {
	switch (choice) {

	case 'add':
		let name = readlineSync.question('Enter name: ');
		let age = readlineSync.question('Enter age: ');
		let sex = readlineSync.question('Enter sex: ');
		let groupName = readlineSync.question('Enter group: ');
		let	phoneNumber = readlineSync.question('Enter phone number: ');
		let	skills = readlineSync.question('Enter skill(s): ');
		let email = readlineSync.question('Enter email: ');
		let appearance = readlineSync.question('Enter appearance: ');
		let student = new CreateStudent(name, age, sex, groupName, phoneNumber, skills, email, appearance);
		fs.writeFileSync('./db/db.json', JSON.stringify(student));
		console.log('Added successfully');
		break;
	case 'update':
		break;
	case 'delete':
		break;
	case 'sort':
		break;
	case 'search':
		break;
	case 'filter':
		break;
	case 'page':
		break;

	case 'exit':
		return;
}
app();
}

app();


