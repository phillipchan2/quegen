import { observable, action } from 'mobx';
import axios from 'axios';

class QuestionnaireStore {
	@observable
	questionnaires = [];

	@action
	getQuestionnaires() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (jwtoken) {
			axios
				.get(`/api/questionnaire/`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					console.log(res);

					if (res.data.success) {
						this.questionnaires = res.data.data;
					}
				});
		}
	}
}

export default QuestionnaireStore;
