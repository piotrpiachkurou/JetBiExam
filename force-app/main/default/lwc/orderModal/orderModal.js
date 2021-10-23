import { LightningElement, api, wire, track } from 'lwc';
import sendEmailToCurrentUser from '@salesforce/apex/MainController.sendEmailToCurrentUser';
export default class OrderModal extends LightningElement {
	@api order;

	closeOrderModal() {
		this.dispatchEvent(new CustomEvent('closeclick'));
	}

	sendOrder() {
		console.log('from send order: '+ JSON.stringify(this.order));
		sendEmailToCurrentUser({ order: this.order })
			.then(() => {
				this.dispatchEvent(new CustomEvent('ordersent', { detail: this.order.Id }));
			})
			.catch(error => {
				console.log('from catch: ' + this.order.id);
				console.log(`${error.message}`)
			})
	}
}