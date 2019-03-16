export function validateQuestionnaire(questions, cb) {
	var result = true;
	var errorMessages = [];

	questions.forEach((question, index) => {
		var results = testQuestion(question);

		if (results.length > 0) {
			errorMessages[index] = results;
			result = false;
		} else {
			errorMessages[index] = [];
		}
	});

	cb(result, errorMessages);
}

function testQuestion(question) {
	var errors = [];

	// run test applicable for all questions
	questionTests.all.forEach(test => {
		let result = test(question);

		if (result === true) {
		} else {
			errors.push(result);
		}
	});

	// run test application to this specific question type
	var questionType = question.type;

	questionTests[questionType].forEach(test => {
		let result = test(question);

		if (result === true) {
		} else {
			errors.push(result);
		}
	});

	return errors;
}

var questionTests = {
	all: [
		// has a title
		function hasATitle(question) {
			if (question.title.length > 0) {
				return true;
			} else {
				return 'Missing a title';
			}
		},
	],
	text: [],
	multipleChoice: [
		function hasAtLeastOneChoiceDefined(question) {
			if (question.choices) {
				return true;
			} else {
				return 'Missing choices';
			}
		},
	],
	weighted: [],
};
