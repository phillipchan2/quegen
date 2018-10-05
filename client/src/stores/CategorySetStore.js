import { observable, action } from 'mobx';
import axios from 'axios';

class CategorySetStore {
	@observable
	categorySets = [];

	@action
	getCategorySets() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (jwtoken) {
			axios
				.get(`/api/categorySet/`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					if (res.data.success) {
						this.categorySets = res.data.data;
					}
				});
		}
	}
}

export default CategorySetStore;
