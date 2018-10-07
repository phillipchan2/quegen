import { observable, action, computed } from 'mobx';

class AppMessagingStore {
	@observable
	message = 'heres a message';

	@action.bound
	showAppMessage(message) {
		this.message = message;

		setTimeout(() => {
			this.message = '';
		}, 3000);
	}
}

export default AppMessagingStore;
