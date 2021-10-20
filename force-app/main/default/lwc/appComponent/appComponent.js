import { LightningElement, api, track } from 'lwc';

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

	closeOrderModal(){
		this.showModal = false;
	}
}