let readlineSync = require('readline-sync');

let Table = require('cli-table');



// let fs = require('fs');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/db1.json');
const db = low(adapter);

db.defaults({students: []})
.write();

// let students = fs.readFileSync('./db/db.json', {encoding: 'utf8'}) || [];
// let students = fs.readFileSync('./db/db1.json', {encoding: 'utf8'}) || [];

let students = db.get('students').value();

let options = [
	{
		option: 'show',
		description: 'Show the list of students'
	},
	{
		option: 'add',
		description: 'Add a student'
	},
	{
		option: 'update',
		description: 'Update a student'
	},
	{
		option: 'delete',
		description: 'Delete a student'
	},
	{
		option: 'sort',
		description: 'Sort the list of students'
	},
	{
		option: 'filter',
		description: 'Filter students'
	},
	{
		option: 'paginate',
		description: 'Pagination'
	},
	{
		option: 'exit',
		description: 'Close the app'
	}

];



const under18 = 1;
const above18 = 2;

const filterOptions = [
	{
		key: under18,
		description: "Get student under 18"
	},
	{
		key: above18,
		description: "Get student equal and above 18"
	}

]

// Function for use

function Helper(searchItem, value) {
	searchItem = searchItem.toLowerCase();
	return students.filter((item, index) => {
		if (searchItem === 'phone number') {
			return item.phoneNumber == value;
		}
		if (searchItem === 'group name') {
			return item.groupName == value;
		}
		return item[searchItem] === value;
	});
}

function FilterStudent(option) {

	let student = [];
	if (option === 1) {
		student = students.filter((item) => {
			return item.age < 18;
		});
		ShowTable(student);
	} else if (option === 2) {
		student = students.filter((item) => {
			return item.age >= 18;
		});
		ShowTable(student); 
	} else if (option === 0) {
		console.log('Done');
		return;
	}
}

function Sort(typeOfSort, sortBy, students) {

	switch (typeOfSort) {
					case 'ascending':
					if (sortBy === 'name') {
						students.sort((a, b) => {
							if (a.name.toLowerCase() < b.name.toLowerCase()) {
								return -1;
							} else {
								return 1;
							}
							return 0;
						});
					}

					if (sortBy === 'appearance') {
						students.sort((a, b) => {
							if (a.appearance < b.appearance) {
								return -1;
							} else {
								return 1;
							}
							return 0;
						});
					}
					break;

					case 'descending':
					if (sortBy === 'name') {
						students.sort((a, b) => {
							if (a.name.toLowerCase() > b.name.toLowerCase()) {
								return -1;
							} else {
								return 1;
							}
							return 0;
						});
					}

					if (sortBy === 'appearance') {
						students.sort((a, b) => {
							if (a.appearance > b.appearance) {
								return -1;
							} else {
								return 1;
							}
							return 0;
						});
					}
					break;
				}

}

function DefaultInput(text, defaultValue) {
	return readlineSync.question(text, {
		defaultInput: defaultValue
	});
}

function ShowTable(arr) {
	let table = new Table({
				head: ['Name', 'Age', 'Sex', 'Group Name', 'Phone Number', 'Skills', 'Email', 'Appearance']
			});
	arr.forEach((item) => {
		let student = [];
		for (let value in item) {
			student.push(item[value]);
		}
		table.push(student);
	});

	console.log(table.toString());
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

function Add() {
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

		if (phoneNumber.toString().length < 5 || phoneNumber.toString().length > 12) {
			console.log('Invalid phone number');
		}
		if (studentPhoneNumber.includes(phoneNumber)) {
			console.log('Phone number existed');
		}

	} while (studentPhoneNumber.includes(phoneNumber) || phoneNumber.toString().length < 5 || phoneNumber.toString().length > 12);

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
	console.log('Added successfully\n');
}


//////////////////////////////////////////////////////////////

function App() {

	// db.get('students').write().forEach((item) => {
	// 	console.log(item);
	// });

	// db.get('students').write().sort((a, b) => {
	// 	if (a.age < b.age) {
	// 		return -1;
	// 	} else {
	// 		return 1;
	// 	}
	// 	return 0;
	// });

	// console.log(db.get('students').write());
	console.log('Instructions!!!');

	options.forEach((item) => {
		console.log(`Enter [${item.option}] : ${item.description}`);
	});

	
	let choice = readlineSync.question('\nWhat do you want to do: ');

	switch (choice) {

		case 'show':
			ShowTable(students);
			break;
			
		case 'add':

			Add();
			break;


		case 'update':
			let update = readlineSync.questionInt('Search item to update by phone number: ');

			let index = 0;

			let updateElement = students.find((item, ind) => {
				index = ind;
				return item.phoneNumber === update;
			});

			let name = DefaultInput('New name: ', updateElement.name);
			let age = DefaultInput('New age: ', updateElement.age);
			let sex = DefaultInput('New sex: ', updateElement.sex);
			let groupName = DefaultInput('New group name: ', updateElement.groupName);
			let phoneNumber = DefaultInput('New phone number: ', updateElement.phoneNumber);
			let skills = DefaultInput('New skills: ', updateElement.skills);
			let email = DefaultInput('New email: ', updateElement.email);
			let appearance = DefaultInput('New appearance: ', updateElement.appearance);

			updateElement = {
				name,
				age,
				sex,
				groupName,
				phoneNumber,
				skills,
				email,
				appearance
			};

			console.log(updateElement);
			students[index] = updateElement;
			break;


		case 'delete':

			let phoneNum = readlineSync.questionInt('Search an item to delete by phone number: ');
			for (let student in students) {

				if (students[student].phoneNumber === phoneNum) {
					students.splice(student, 1);
				}
				console.log('Deleted successfully');
			}
			break;
			
		case 'sort': // Type of sort: Ascending and Descending, support for name and appearance
			let typeOfSort = readlineSync.question('Sort (ascending/descending): ');
			let sortBy = readlineSync.question('Sort by (name/appearance): ');

			let studentArray = [];
			students.forEach((item) => {
				studentArray.push(item);
			})
			Sort(typeOfSort, sortBy, studentArray);

			// console.log('RESULT');

			ShowTable(studentArray);

			break;

		case 'search': // search by all properties

			let searchItem = readlineSync.question('Search for an item by: ');

			let value = readlineSync.question('Enter ' + searchItem.toLowerCase()  + ': ');



			let searchStudents = Helper(searchItem, value);

			ShowTable(searchStudents);


			break;
		case 'filter': // Only support for filtering by age (under 18 or equal and above 18)
			
			filterOptions.forEach((item) => {
				console.log('['+ item.key + '] ' + item.description);
			});

			function Filter() {
				let option = readlineSync.questionInt('Your choice: ');

				FilterStudent(option);
				if (option === 0) {
					return;
				}
				Filter();
			}

			Filter()

			break;

		case 'paginate': // 3 Students per page

			let perPage = 3;
			let totalPage = Math.ceil(students.length / perPage);
			console.log('Total page: ' + totalPage);
			function paginate() {
				let page = DefaultInput('Enter page: ', 1);

				if (page == 0) {
					return;
				}
				let start = (page - 1) * perPage;
				let end = page * perPage;

				let newArr = students.slice(start, end);
				ShowTable(newArr);
				paginate();
			}

			paginate();
			

			break;
		case 'exit':
			return;
	}
	App();
}

	App();


