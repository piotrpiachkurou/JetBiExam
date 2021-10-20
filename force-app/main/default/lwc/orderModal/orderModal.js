import { LightningElement, api, wire, track } from 'lwc';

export default class OrderModal extends LightningElement {
	@api order;

	closeOrderModal() {
		this.dispatchEvent(new CustomEvent('closeclick'));
	}
}