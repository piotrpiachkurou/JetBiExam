import { LightningElement, api, track } from 'lwc';

export default class OrdersList extends LightningElement {

	@api sortedOrders;

	@api get showTable() {
		return Array.isArray(this.sortedOrders) && this.sortedOrders.length;
	}

	handleView(event) {
		const dataRow = event.detail.row;
		this.dispatchEvent(new CustomEvent('viewclicked', {detail: dataRow}))
	}

	columns = [
		{
			label: 'View',
			type: 'button-icon',
			initialWidth: 75,
			typeAttributes: {
				iconName: 'action:preview',
				title: 'Preview',
				variant: 'border-filled',
				alternativeText: 'View'
			}
		},
		{ label: 'Order Name', fieldName: 'Name' },
		{ label: 'Payment Due date', fieldName: 'Payment_Due_date__c', type: 'date' },
	];
}