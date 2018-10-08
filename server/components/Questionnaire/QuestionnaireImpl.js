var getCategoryIdWithMostResponses = (questionnaire, responses) => {
	var tally = [];

	responses.forEach((response, responseIndex) => {
		var question = questionnaire.questions.find(question => {
			return question._id == response._id;
		});

		question.appliesToCategories.forEach((category, index) => {
			if (response.value === true) {
				let indexOfCategoryInTally = tally.findIndex(itemInTally => {
					return itemInTally._id === category;
				});

				if (indexOfCategoryInTally === -1) {
					tally.push({
						_id: category,
						tally: 1
					});
				} else {
					tally[indexOfCategoryInTally].tally++;
				}
			}
		});
	});

	var categoryIdWithMostTallies = tally.reduce((total, currentValue) => {
		return currentValue > total ? currentValue : total;
	});

	return categoryIdWithMostTallies._id;
};

var getWeightedResponses = response => {
	return response.responses.filter(response => {
		return response.type === 'weighted';
	});
};

module.exports = { getCategoryIdWithMostResponses, getWeightedResponses };
