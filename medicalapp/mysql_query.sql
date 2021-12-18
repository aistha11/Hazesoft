use medicalapp;

-- To create product table

CREATE TABLE `products` (
	`id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `disease` varchar(255) NOT NULL,
    `manufacturer` varchar(255) NOT NULL,
    `SKU` varchar(20) NOT NULL,
    `price` int NOT NULL,
    `productImage` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `mfd` datetime NOT NULL,
    `exp` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
);

-- To insert into products table

INSERT INTO `products`(name,disease,manufacturer,SKU,price,productImage,description,mfd,exp,updatedAt) 
    VALUES ('Nims', 'Fever', 'YK prod', 'SK1200',3000, 'uploads\1608447673631-diwd.jpg', 'The medicine is used for fever for child', '2020-10-11', '2021-10-22', '2020-10-10');


-- To update a product

UPDATE products SET name='Citamol', price=2345 WHERE id=4;

-- To delete a product

DELETE FROM products WHERE id=11;


-- To create user table

CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name varchar(25) NOT NULL, email varchar(25) NOT NULL, password varchar(255) NOT NULL,PRIMARY KEY (`id`));

-- To create user -- password should be hashed

INSERT INTO users (name, email, password) VALUES ('Admin', 'admin@gmail.com', '@Adm!n123');

-- To get all users

SELECT * FROM users;

-- To ge single user

SELECT * FROM users WHERE id = 1;

-- To update a user

UPDATE users SET name='Bijay Shrestha' WHERE id=3;

-- To delete a user

DELETE FROM users WHERE id=6;

-- To create cart 

CREATE TABLE carts (
    id int NOT NULL AUTO_INCREMENT,
    productId int,
    quantity int NOT NULL,
    userId int,
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- To add to cart

INSERT INTO carts (quantity, productId, userId) VALUES (3,2,7);

-- Get carts

SELECT carts.id,carts.quantity, products.name as productName, products.price as price FROM carts JOIN products ON carts.id = products.id WHERE userId=7;

-- Update cart

UPDATE carts SET quantity=4 WHERE id=1;

-- Delete cart

DELETE FROM carts WHERE id=1;