public with sharing class MainController {
	@AuraEnabled(cacheable=true)
	public static List<Map<String,String>> getAccounts(){
		List<Map<String,String>> listForCmp = new List<Map<String,String>>();
		List<Account> accsWithOrders = [
			SELECT Id, Name
			FROM Account
			WHERE Id in (SELECT Account__c FROM Order__c)
			WITH SECURITY_ENFORCED
		];
		for (Account acc : accsWithOrders) {
			Map<String,String> idNameMap = new Map<String,String>();
			idNameMap.put('value', acc.Id);
			idNameMap.put('label', acc.Name);
			listForCmp.add(idNameMap);
		}
		return listForCmp;
	}

	@AuraEnabled(cacheable=true)
	public static List<Order__c> getOrdersByAccId(Id accId){
		return [
            SELECT Id, Name, Total_Amount__c, Payment_Due_date__c, Account__c
			FROM Order__c
			WHERE Account__c = :accId
			WITH SECURITY_ENFORCED
			ORDER BY Payment_Due_date__c
        ];
	}
	@AuraEnabled(cacheable=true)
    public static void sendEmailToCurrentUser(Order__c order){
        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
			String[] toAdresses = new String[] {'privatbrun@yandex.by'};
			mail.setToAddresses(toAdresses);
			mail.setSenderDisplayName('Jet Bi Exam App');
			mail.setSubject('Order sent: ' + order.Id);
			mail.setPlainTextBody('Hello from app');
			//Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}