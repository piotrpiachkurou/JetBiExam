import { LightningElement, api, wire, track } from 'lwc';
import sendEmailToCurrentUser from '@salesforce/apex/MainController.sendEmailToCurrentUser';
export default class OrderModal extends LightningElement {
	@api order;

	closeOrderModal() {
		this.dispatchEvent(new CustomEvent('closeclick'));
	}

	sendOrder() {
		sendEmailToCurrentUser({ order: this.order })
			.then(() => {
				this.dispatchEvent(new CustomEvent('ordersent', {
					detail: {
						title: 'Order has been sent successfully!',
						message: `Order Id: ${this.order.Id}.`,
						variant: 'success',
					}
				}));
			})
			.catch(() => {
				this.dispatchEvent(new CustomEvent('ordersent', {
					detail: {
						title: 'Order sending failed!',
						message: `Order Id: ${this.order.Id}.`,
						variant: 'error',
					}
				}));
			})
	}
}