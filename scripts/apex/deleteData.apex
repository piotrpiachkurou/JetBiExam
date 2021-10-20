//delete data

List<Account> accs = [SELECT Id, Name from Account WHERE Name LIKE 'Account%'];
delete accs;
List<Order__c> ords = [SELECT Id from Order__c];
delete ords;