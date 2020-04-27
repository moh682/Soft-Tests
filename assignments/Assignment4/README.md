## Assignment 2-4
**Database is needed to run all the unit tests**

##### Requirements to run the application
-   Mysql server open
-   Run the sql file in the server
-   Adjust login credentials for mysql server in .env file
-   npm install
-   npm run test

**IMPORTANT:** remember to give the appropriate permission to the user

#### Contract for REST API - Banking system
**Team**: #TypeScriptCarry
**member**: Andreas Guldborg Heick
**member**: Rasmus Jarnborg Friis
**member**: Mohammad Omar Hariri

##### Description 
A customer should be able to transfer money from one account to another. It is not required that we check if the customer has a valid amount, but should always subtract the amount. Every transaction must be logged. The log should be accessible to its customer when ever requested. The log should contain both the transaction that add and subtract from the account.

##### REST Endpoints:
**General logic operations**
```ts
router.post("/transferamountto", (ownacc, amount, targetacc))
router.get("/getallmovements", (accountnumber))
```

**Bank CRUD**
```ts
route.get("/bank/all")
route.post("/bank/create", (cvr, name))
route.delete("/bank/delete", (cvr))
```

**Account CRUD**
```ts
route.post("/account/create" , (customer_cpr, bank_cvr))
route.delete("/account/delete", (customer_cpr))
route.get("/account/find", (number))
```

**Movement CRUD**
```ts
route.get("/movement/find", (cvr))
route.post("/movement/create", (cvr, name))
route.delete("/movement/delete", (cvr))
```

**Customer CRUD**
```ts
route.post("/customer/create", (cpr, name, bank_cvr))
route.delete("/customer/delete", (cpr));
route.get("/customer/find", (cpr))
```


<img src="./images/useCase1.png" />
<img src="./images/useCase2.png" />
