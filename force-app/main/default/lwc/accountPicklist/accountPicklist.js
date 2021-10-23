import { LightningElement, wire, track, api } from 'lwc';
import getAccounts from '@salesforce/apex/MainController.getAccounts';
export default class PickLists extends LightningElement {
	@track acccounts;
	@track pickedAcc;

	@wire(getAccounts)
	wiredAccounts({data}) {
		if (data) {
			this.acccounts = data;
		}
	};

	get accountOptions() {
		return this.acccounts;
	}

	handleChangeAcc(event) {
		this.pickedAcc = event.detail.value;
		this.dispatchEvent(new CustomEvent('picked', {detail: this.pickedAcc}))
	}

	get selectedAcc() {
		return this.pickedAcc;
	}
}