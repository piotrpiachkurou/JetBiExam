import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class AppComponent extends NavigationMixin(LightningElement) {
	@track ordersList;
	
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
}