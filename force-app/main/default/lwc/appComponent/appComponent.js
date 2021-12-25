import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AppComponent extends NavigationMixin(LightningElement) {
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
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				"recordId": event.detail.Id,
				"objectApiName": "Order__c",
				"actionName": "view"
			},
		});
	}
	
	closeOrderModal() {
		this.showModal = false;
	}
	
	showOrderToasty(event) {
		const showMsg = new ShowToastEvent({
			title: event.detail.title,
			message: event.detail.message,
			variant: event.detail.variant,
			mode: 'dismissable'
		});
		this.dispatchEvent(showMsg);
		this.closeOrderModal();
	}
}