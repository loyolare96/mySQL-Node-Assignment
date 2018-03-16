var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pari4puri4",
    database: "bamazonDB"
});

var connection2 = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pari4puri4",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listManagerOptions();
});

function listManagerOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'managerListInput',
            message: 'Welcome, manager. What would you like to do?',
            choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product']
        }
    ])
        .then(managerAnswers => {
            if (managerAnswers.managerListInput === 'View products for sale') {
                return managerViewAll();
            }
            else if (managerAnswers.managerListInput == 'View low inventory') {
                return managerViewLow();
            }
            else if (managerAnswers.managerListInput == 'Add to inventory') {
                return managerAddInventory();
            }
            else {
                return managerAddNew();
            }
        });
}

function managerViewAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Current stock: " + res[i].stock_quantity);
            console.log("------------------------");
        }
    })

    connection.end();
}

function managerViewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < '5'", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Current stock: " + res[i].stock_quantity);
            console.log("------------------------");
        }
    })

    connection.end();
}

function managerAddInventory() {
    connection.query("SELECT * FROM products", function (err, res1) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'addSelection',
                message: 'Please select an item to whose quantity you would like to add.',
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res1.length; i++) {
                        choiceArray.push(res1[i].product_name);
                    }
                    return choiceArray;
                },
            },
            {
                type: 'input',
                name: 'addInteger',
                message: "By how much would you like to increase this item's quantity?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(addAnswers => {
                var chosenQuantity;
                for (var x = 0; x < res1.length; x++) {
                    if (res1[x].product_name === addAnswers.addSelection) {
                        chosenQuantity = res1[x].stock_quantity;
                    }
                }
                var chosenName;
                for (var y = 0; y < res1.length; y++) {
                    if (res1[y].product_name === addAnswers.addSelection) {
                        chosenName = res1[y].product_name;
                    }
                }

                var adding = parseInt(chosenQuantity) + parseInt(addAnswers.addInteger);
                console.log("Setting " + chosenName + "'s stock to: " + adding);
                connection2.query("UPDATE products SET stock_quantity =" + adding + " WHERE product_name = '" + chosenName + "'", function (err, res2) {
                    if (err) throw err;
                    console.log(res2.affectedRows + " record(s) updated");
                    console.log("Operation completed successfully.");
                })
                connection2.end();
            });
        connection.end();
    });
}

function managerAddNew() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'newAdditionName',
                message: 'What type of item would you like to add?'
            },
            {
                type: 'input',
                name: 'newAdditionDepartment',
                message: 'In what department would you like to add this item?'
            },
            {
                type: 'input',
                name: 'newAdditionPrice',
                message: 'How much will this item cost?',
                validate: function (price) {
                    if (isNaN(price) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: 'input',
                name: 'newAdditionStock',
                message: 'How many of this item will we have in stock?',
                validate: function (stock) {
                    if (isNaN(stock) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])


            .then(additionAnswers => {
                connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + additionAnswers.newAdditionName + "', '" + additionAnswers.newAdditionDepartment + "', '" + additionAnswers.newAdditionPrice + "', '" + additionAnswers.newAdditionStock + "')", function (err, result) {
                    if (err) throw err;
                    console.log("Operation completed successfully.");
                });
                connection.end();
            });

}