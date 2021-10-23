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
		String userId = UserInfo.getUserId();
		EmailTemplate et = [SELECT Id FROM EmailTemplate WHERE Name = 'Jet BI Exam Email Template' LIMIT 1];

		Messaging.SingleEmailMessage email = Messaging.renderStoredEmailTemplate(et.Id, userId, order.Id);
		String emailSubject = email.getSubject();
		String emailTextBody = email.getPlainTextBody();

		email.setSenderDisplayName('Jet BI Exam App');
		email.setSaveAsActivity(false);
		email.setPlainTextBody(emailTextBody);
		email.setSubject(emailSubject);
		email.setTargetObjectId(userId);

		Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}