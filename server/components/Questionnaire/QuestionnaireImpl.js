var giveCategoryWithMostResponses = (questionnaire, response) => {
	var tally = [];

	response.responses.forEach(response => {
		var question = questionnaire.questions.find(question => {
			return question._id == response._id;
		});

		question.appliesToCategories.forEach(category => {
			if (!tally[category]) {
				tally[category] = {
					tally: 1
				};
			} else {
				tally[category].tally++;
			}
		});
	});

	return tally;
};

module.exports = { giveCategoryWithMostResponses };
