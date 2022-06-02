# vouchDigital-assignment-NodeJSMongoDB

AddressBook API
---------------

How to use? 
Step 1: fetch the directory and install all dependencies.
Step 2: create a .env file, create JWT_SECRET (jwt secret key) and MONGO_URI (url of the database).
Step 3: run the server by command  npm start


API REFERENCE
--------------

User API
---
1. POST /api/users                   To create a new user            {name, email, password} is required        return the user with JWT token
2. POST /api/users/login             login if user is present        {email, password} is required              return the user with JWT token

Contact API
---
1. POST /api/contact                    to create a new contact           { name, email, phone, address } ia required               returns the created contact
                                                                            user needs to be logged in and have the       
                                                                            Bearer Token
2. POST /api/contact/many               to create bulk contact             array of {name, email , phone, address} required         returns the created contact
3. GET /api/contact/all?page=__         to get contact with                 page number and limit of contact on a page              returns the array of contacts
    ,limit=__                                                               is required through params
4. GET /api/contact/:id                 to get  single contact             id of the contact is required through params             returns the contact
5. PUT /api/contact/:id                 to update single contact           id of the contact is required through params             returns the updated contact 
6. DELETE /api/contact/:id              to delete a contact                id of the contact is required through params             returns the id of the deleted contact
7. GET  /api/contact?name=__            to search the user by name         full name of the contact is required                     returns the array of found contacts
