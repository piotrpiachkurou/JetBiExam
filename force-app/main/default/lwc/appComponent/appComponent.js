import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AppComponent extends LightningElement {
	@api accountId;
	@track ordersList;
	@track orderToView;
	@track showModal = false;

	setAccount(event) {
		this.accountId = event.detail;
		this.template.querySelector('c-month-picklist').resetSelectedMonth();
	}

	setOrdersList(event) {
		this.ordersList = event.detail;
	}

	handleViewClicked(event) {
		this.orderToView = event.detail;
		this.showModal = true;
	}

	closeOrderModal() {
		this.showModal = false;
	}

	showOrderToasty(event) {
		console.log(`from toasty`);
		const showMsg = new ShowToastEvent({
			title: 'Order has been sent!',
			message: `Order Id: ${event.detail}`,
			variant: 'success',
			mode: 'dismissable'
		});
		this.dispatchEvent(showMsg);
		this.closeOrderModal();
	}
}