// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

//sample data
List<Account> accs = new List<Account>();

for(Integer i = 1; i <= 5; i++){
	Account ac = new Account();
	ac.Name = 'Account ' + i;
	accs.add(ac);
}

upsert accs;

List<Order__c> ords = new List<Order__c>();

Integer dates = 1;

for (Account acc : accs){
	for (Integer i = 1; i<=8; i++){
		Order__c ord = new Order__c();
		ord.Name = acc.Name + ' - ' + 'Order ' + i;
		ord.Account__c = acc.Id;
		ord.Total_Amount__c = i * 1000;
		ord.Payment_Due_date__c = Date.today().addMonths(dates++);
		ords.add(ord);
	}
}

upsert ords;

