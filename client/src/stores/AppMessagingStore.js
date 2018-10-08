import { observable, action, computed } from 'mobx';

class AppMessagingStore {
	@observable
	message = '';

	@action.bound
	showAppMessage(message) {
		this.message = message;

		setTimeout(() => {
			this.message = '';
		}, 5000);
	}
}

export default AppMessagingStore;
