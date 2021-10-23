import { LightningElement, api, wire, track } from 'lwc';
import getOrdersByAccId from '@salesforce/apex/MainController.getOrdersByAccId';
export default class MonthPicklist extends LightningElement {
	@api pickedAccId;
	@track orders;
	@track pickedMonth;

	@wire(getOrdersByAccId, { accId: '$pickedAccId' })
	wiredOrders({ data }) {
		if (data) {
			this.orders = data;
			this.dispatchEvent(new CustomEvent('ordersloaded', { detail: this.orders }));
		}
	};

	get monthOptions() {
		let monthsList = [];
		monthsList.push({ value: '', label: 'Show All' })
		for (let i in this.orders) {
			const date = new Date(this.orders[i].Payment_Due_date__c);
			monthsList.push({
				value: (date.getMonth() + 1).toString(),
				label: date.toLocaleString('default', { month: 'long' })
			});
		}
		return monthsList.sort((a, b) => a.value - b.value);
	}

	handleChangeMonth(event) {
		let pickedEvent;
		this.pickedMonth = event.detail.value;

		if (this.pickedMonth > 0) {
			pickedEvent = new CustomEvent('picked', {
				detail: this.orders.filter(order =>
					new Date(order.Payment_Due_date__c).getMonth() + 1 == this.pickedMonth)
			});
		} else {
			pickedEvent = new CustomEvent('picked', { detail: this.orders })
		}
		this.dispatchEvent(pickedEvent);
	}

	get selectedMonth() {
		return this.pickedMonth;
	}

	@api 
	resetSelectedMonth() {
		this.pickedMonth = '';
	}
}
