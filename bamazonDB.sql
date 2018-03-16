DROP DATABASE if EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity int,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pepsi', 'groceries', '20', '5'), ('Blazblue', 'games', '60', '1'), 
('Keurig', 'kitchen', '80', '3'), ('Monster Hunter', 'games', '60', '10'), 
('fridge', 'kitchen', '130', '5'), ('lawn chair', 'furniture', '52', '8'),
('fancy TV', 'electronics', '150', '0'), ('laptop', 'electronics', '250', '2'),
('lava lamp', 'furniture', '15', '20'), ('potato chips', 'groceries', '3', '10');