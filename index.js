let readlineSync = require('readline-sync');

let Table = require('cli-table');

let fs = require('fs');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/db1.json');
const db = low(adapter);

db.defaults({students: []})
	.write();

// let students = fs.readFileSync('./db/db.json', {encoding: 'utf8'}) || [];
// let students = fs.readFileSync('./db/db1.json', {encoding: 'utf8'}) || [];

let students = db.get('students').value();

function Helper(searchBy) {

}


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
	let table = new Table({
		head: ['Name', 'Age', 'Sex', 'Group Name', 'Phone Number', 'Skills', 'Email', 'Appearance']
	});
	
	students.forEach((item) => {
		let student = [];
		for (let value in item) {
			student.push(item[value]);
		}

		table.push(student);


	});
	if (students.length !== 0) {
		console.log(table.toString());
	}
	

	let choice = readlineSync.question('What do you want to do: ');
	switch (choice) {

		case 'add':

			let studentPhoneNumber = [];
			let studentEmail = [];
			students.forEach((item) => {
				studentPhoneNumber.push(item.phoneNumber);
				studentEmail.push(item.email);
			});
			let phoneNumber;
			let email;
			let sex;

			let name = readlineSync.question('Enter name: ');
			let age = readlineSync.questionInt('Enter age: ');
			do {
				sex = readlineSync.question('Enter sex(M/F): ');
				if (sex !== "M" && sex !== "F") {
					console.log("Please try again");
				}
			} while (sex !== "M" && sex !== "F");
			
			let groupName = readlineSync.question('Enter group: ');
			
			do {
				phoneNumber = readlineSync.questionInt('Enter phone number: ');
				if (phoneNumber < 10 || phoneNumber > 12) {
					console.log('Invalid phone number');
				}
				if (studentPhoneNumber.includes(phoneNumber)) {
					console.log('Phone number existed');
				}
			} while (studentPhoneNumber.includes(phoneNumber) && phoneNumber < 10 && phoneNumber > 12);

			let	skills = readlineSync.question('Enter skill(s): ');
			
			do {
				email = readlineSync.questionEMail('Enter email: ');
			} while (studentEmail.includes(email));
			
			let appearance = readlineSync.questionInt('Enter appearance: ');
			let student = new CreateStudent(name, age, sex, groupName, phoneNumber, skills, email, appearance);
			
			// fs.writeFileSync('./db/db.json', JSON.stringify(students));
			db.get('students')
				.push(student)
				.write();
			console.log('Added successfully');
			break;


		case 'update':
			let update = readlineSync.question('Search item to update by: ');

			if (update === "phone number") {
				let number = readlineSync.question('Enter phone number');


			} else {
				let email = readlineSync.question('Enter email: ');
			}
			break;


		case 'delete':

			let phoneNum = parseInt(readlineSync.question('Search an item to delete by phone number: '));
			for (let student in students) {
									

				if (students[student].phoneNumber === phoneNum) {
						students.splice(student, 1);
				}
				console.log('Deleted successfully');
			}
			break;
			
		case 'sort':
			let typeOfSort = readlineSync.question('Sort: ');
			let sortBy = readlineSync.question('Sort by: ');

			switch (typeOfSort) {
				case 'ascending':
					if (sortBy === 'name') {
						students.sort((a, b) => {
							if (a.name < b.name) {
								return -1;
							} else {
								return 1;
							}
						});
					}

					if (sortBy === 'appearance') {
						students.sort((a, b) => {
							if (a.appearance < b.appearance) {
								return -1;
							} else {
								return 1;
							}
						});
					}
					break;

				case 'descending':
					if (sortBy === 'name') {
						students.sort((a, b) => {
							if (a.name > b.name) {
								return -1;
							} else {
								return 1;
							}
						});
					}

					if (sortBy === 'appearance') {
						students.sort((a, b) => {
							if (a.appearance > b.appearance) {
								return -1;
							} else {
								return 1;
							}
						});
					}
					break;
		}
		break;
	case 'search':
		let searchItem = readlineSync.question('Search for an item by: ');
		Helper(searchItem);

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


