# Database Node Assignment

In both of these node applications, the user is able to tap into the database in [bamazonDB](bamazonDB.sql) and react with it in various ways.

##bamazonCustomer.js

In [bamazonCustomer](bamazonCustomer.js), the user takes the role of a customer in a store. He or she is given a list of all the products in the database, and is then prompted to input an item ID for the item they would like to purchase [(customer-1)](images/customer-1.PNG). If an invalid ID is given, the user is asked if they would like to try again or quit [(customer-2)](images/customer-2.PNG).

If a valid ID is given, then the user is asked how many of that product he or she would like to purchase. If there is enough of that product in stock, then the user is given the total price of their purchase, the product's stock in the bamazon database gets updated, and the application ends [(customer-3)](images/customer-3.PNG). However, if there is not enough in stock, then the user is told so, no price is given, and the database doesn't get affected at all [(customer-4)](images/customer-4.PNG).


##bamazonManager.js

In [bamazonManager](bamazonManager.js), the user takes the role of the manager. When the application starts, he or she is given a list of actions [(manager-1)](images/manager-1.PNG). 

1. View products for sale

This command lists all of the items in the bamazon database, showing the ID, name, department, price, and quantity [(manager-2)](images/manager-2.PNG).

2. View low inventory

This command lists all items in the database that have a stock of less than 5 [(manager-3)](images/manager-3.PNG).

3. Add to inventory

'Add to inventory' allows the user to add to the stock of any item in the database. All the user needs to do is select one of the products and enter by how much he or she would like to increase its stock. It will then update the product's entry in the database and show the updated stock quantity [(manager-4)](images/manager-4.PNG).

4. Add new product

The final command lets the user add a completely new product to the database. It asks for the name, department, price, and starting stock quantity. The program will tell the user when it finishes adding the new product, and the database will then be updated [(manager-5)](images/manager-5.PNG).
