@isTest
public class MainControllerTests {
	@testSetup
	static void createAccWithOrder(){
		Account acc = new Account();
		acc.Name = 'Test Account';
		insert acc;

		Order__c ord = new Order__c();
		ord.Name = 'Test Order';
		ord.Total_Amount__c = 1000;
		ord.Payment_Due_date__c = Date.newInstance(2000, 2, 22);
		ord.Account__c = acc.Id;
		insert ord;
	}

	@isTest static void getAccountsReturnsMap(){
		Account acc = [SELECT Id, Name FROM Account WHERE Name = 'Test Account'];
		List<Map<String,String>> result = MainController.getAccounts();
		System.assertEquals('Test Account', result[0].get('label'),'Invalid Account');
		System.assertEquals(acc.Id, result[0].get('value'), 'Some error');
	}

	@isTest static void getOrdersByIdReturnsCorrectList(){
		Account acc = [SELECT Id, Name FROM Account WHERE Name = 'Test Account'];
		List<Order__c> orders = MainController.getOrdersByAccId(acc.Id);
		System.assertEquals('Test Order', orders[0].Name, 'Invalid order');
		System.assertEquals(1, orders.size(), 'Should be the only one!');
	}

	@isTest static void sendEmailToCurrentUserSendsEmail(){
		Order__c order = [SELECT Id, Name FROM Order__c WHERE Name = 'Test Order'];
		System.runAs([select Id from User where Id = :Userinfo.getUserId() limit 1][0]) {
			Boolean result = MainController.sendEmailToCurrentUser(order);
			System.assert(result, 'email was not sent');
		}
	}
}