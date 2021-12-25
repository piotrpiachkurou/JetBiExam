import { api, LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmailToCurrentUser from '@salesforce/apex/MainController.sendEmailToCurrentUser';

export default class SendOrder extends LightningElement {
    @api recordId;
    
    @api invoke() {
        sendEmailToCurrentUser({ orderId: this.recordId })
        .then(() => {
            const showMsg = new ShowToastEvent({
                title: 'Order has been sent successfully!',
                message: `Order Id: ${this.recordId}.`,
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(showMsg);
        })
        .catch(() => {
            const showMsg = new ShowToastEvent({
                title: 'Order sending failed!',
                message: `Order Id: ${this.recordId}.`,
                variant: 'error',
                mode: 'dismissable'
            })
            this.dispatchEvent(showMsg);
        })
    }
}