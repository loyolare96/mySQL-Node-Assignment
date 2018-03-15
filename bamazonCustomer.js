var mysql = require('mysql');
var inquirer = require('inquirer');

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
    browseProducts();
});

function browseProducts() {
    var validVariable = true;
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product name: " + res[i].product_name);
            console.log("Price: " + res[i].price);
            console.log("------------------------");
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'itemIDAnswer',
                message: 'Please enter the ID of the item you would like to order.',
            }
        ])
            .then(answers => {
                for (j = 0; j < res.length; j++) {
                    if (answers.itemIDAnswer == res[j].item_id) {
                        console.log("Purchasing: " + res[j].product_name);
                        return quantityInterrogate(res[j]);
                    }
                    else {
                        validVariable = false;
                    }
                }
                if (validVariable == false) {
                    persona5();
                }

            });

    });
};

function persona5() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'akechiDidNothingWrong',
            message: 'That was an invalid item ID. Would you like to try again?',
        }
    ])
        .then(answers3 => {
            if (answers3.akechiDidNothingWrong) {
                browseProducts();
            }
            else {
                connection.end();
            }
        });
}


function quantityInterrogate(input) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'quantityInput',
            message: 'How many of ' + input.product_name + ' would you like to purchase?',
        }
    ])
        .then(quantityAnswers => {
            switch (true) {
                case (quantityAnswers.quantityInput > input.stock_quantity):
                    console.log("Unfortunately, we do not have enough in stock.");
                    return console.log("Your total comes to $0, because you didn't get to buy anything. :^)")
                case (quantityAnswers.quantityInput <= input.stock_quantity):
                    console.log("You're in luck! We have enough in stock.");
                    var quantityResult = input.stock_quantity - quantityAnswers.quantityInput;
                    subtractQuantity(quantityResult, input.product_name);
                    return console.log("Your total comes to : $" + input.price);
                default:
                    return console.log("Please enter a valid response.");
            }
        });
    connection.end();
}

function subtractQuantity(minus, targetName) {
    var thisIsThing = "UPDATE products SET stock_quantity =" + minus + " WHERE product_name = '" + targetName + "'";
    connection2.query(thisIsThing, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
    connection2.end();
}