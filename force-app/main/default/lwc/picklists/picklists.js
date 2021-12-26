import { api, LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/MainController.getAccounts';
import getOrdersByAccId from '@salesforce/apex/MainController.getOrdersByAccId';

export default class Picklists extends LightningElement {
    @track selectedAccountId;
    @track selectedMonth;
    @track accountOrders;
    error;

    @wire(getAccounts) accounts;

    changeAccount(event) {
        this.selectedAccountId = event.detail.value;
        getOrdersByAccId({ accId: this.selectedAccountId })
        .then(result => {
            this.accountOrders = result;
			this.dispatchEvent(new CustomEvent('ordersloaded', { detail: this.accountOrders}));
        })
        .catch(error => this.error = error);
        this.resetSelectedMonth();
    }

    changeMonth(event) {
        let pickedEvent;
		this.selectedMonth = event.detail.value;
		if (this.selectedMonth > 0) {
			pickedEvent = new CustomEvent('picked', {
				detail: this.accountOrders.filter(order =>
					new Date(order.Payment_Due_date__c).getMonth() + 1 == this.selectedMonth)
			});
		} else {
			pickedEvent = new CustomEvent('picked', { detail: this.accountOrders })
		}
		this.dispatchEvent(pickedEvent);
    }
    
    get monthOptions() {
        let monthsList = [];
        monthsList.push({ value: '', label: 'Show All' })
        for (let i in this.accountOrders) {
            const date = new Date(this.accountOrders[i].Payment_Due_date__c);
            monthsList.push({
                value: (date.getMonth() + 1).toString(),
                label: date.toLocaleString('default', { month: 'long' })
            });
        }
        return monthsList.sort((a, b) => a.value - b.value);
    }
    
	resetSelectedMonth() {
		this.selectedMonth = '';
	}
}
