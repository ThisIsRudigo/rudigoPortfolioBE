BACK END API FOR RUDIGO PORTFOLIO USING NODE.JS, MONGODB  AND FIREBASE
======================================================================

>**KINDLY GO THROUGH THIS DOCUMENTATION**


 >** N/B: TOKEN CAN COME AS "req.body.token || req.query.token || req.headers['x-access-token']" **


END POINTS FOR THE USER REGISTRATION
Basic registration 

### BASE URL: 18.220.175.109

 *ENDPOINT for business*
## 1a) "/account/register/business" POST

```js
	method "POST"
	request parameters (json)
        {
         "password" : ******  // (6 and above string),
         "name": "east of the sunrise IT Resources" // (string),
          "email": "test@test.com" // (string),
          "businessType": "Infotech" // (string)
         }
```

 *ENDPOINT for owner, admin, student*
## 1b)  "/account/register/admin" POST
*ONLY ADMIN AND OWNER ARE ALLOWED TO USE THIS ROUTE*
*ONLY ADMIN AND OWNER CAN REGISTER STUDENT*

```js
	method "POST"
	request parameters (json)
        {
         "password" : ******  // (6 and above string),
         "name": "ebube kalu"  // (string),
          "email": "test@test.com" // (string),
          "accountType": "admin"
         }


 *  response on success (json)
        {
		        name : ebube kalu,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6 *** DlsdkaiwADWRWRfqwdnj"
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6 ~~~~ DlsdkaiwADWRWRfqwdnj"
                accountType: "admin"
				}

```
  ## For Student Registration
  ```js
	method "POST"
	request parameters (json)
        {
         "password" : ******  // (6 and above string),
         "name": "ebube kalu" //  (string),
          "email": "test@test.com"  //(string),
          "accountType": "student"
          "studentType":"local"
          "stack":"android"
         }

 * response on success (json)
        {
		name : ebube kalu,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6 *** DlsdkaiwADWRWRfqwdnj"
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6 ~~~~ DlsdkaiwADWRWRfqwdnj"
                
				}

```
## 2) "/account/login" // authenticates a user information and generates a token for each user each token expires in 1h.

```js

	method "POST"
	request parameters "(json)"
		{
		 "password":"******" (string),
		 "email":"test@test.com"
		 }

* response on success (json)
         {
		name : ebube kalu,
                accountType: "student",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6 *** DlsdkaiwADWRWRfqwdnj"
		        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6 *** DlsdkaiwADWRWRfqwdnj"
        }
        ```

    *  N/B: TOKEN CAN COME AS "req.body.token || req.query.token || req.headers['x-access-token']"
```

## end points ##

### 3) "/account/profile"  //gets the information of the logged in user.
 ```js
	method "GET"
	request parameters (token from login)
    * N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: business
                   
                };

```
## 4) "/account/profile/all"  //gets all the users information in the database .

>*** THIS IS RESTRICTED TO OWNER AND ADMIN ONLY**
```js
	method "GET"
	request parameters (token from login)
 *    N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: business
                   
                };
```

## 5) "/account/profile/:id"  //gets the information a user in the database .

>*** THIS IS RESTRICTED TO OWNER AND ADMIN ONLY**
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: business
                   
                };
```

## 6a) "/account/profile/students"  //gets the information of all the students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: student
                   
                };
 ```

## 6b) "/account/profile/students/remote"  //gets the information of all the remote students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: back end web,
                    accountType: student,
                    studentType: remote
                   
                };
 ```

 ## 6c) "/account/profile/students/local"  //gets the information of all the local students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: student,
                    studentType: local
                   
                };
 ```

 ## 6d) "/account/profile/students/BEW"  //gets the information of all the backend web students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: back end web,
                    accountType: student,
                    studentType: local
                   
                };
 ```

 ## 6e) "/account/profile/students/FEW"  //gets the information of all the front end web students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: front end web,
                    accountType: student,
                    studentType: remote
                   
                };
 ```

 ## 6f) "/account/profile/students/android"  //gets the information of all the android students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: android,
                    accountType: student,
                   
                };
 ```

## 6g) "/account/profile/students/UIUX"  //gets the information of all the students in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: UI/UX,
                    accountType: student,
                    studentType: local
                   
                };
 ```

## 7) "/account/profile/student/:id"  //gets the information a student in the database .
```js
	method "GET"
*	request parameters (token from login)
     N/B: TOKEN CAN COME AS ["req.body.token || req.query.token || req.headers['x-access-token']"]

*   response on success (json)

info = {
                    photo: ***path to the image***,
                    name: ebube kalu,
                    email: test@test.com,
                    address: no 34 ojike lane, Urualla,
                    role: COO,
                    phoneNumber: +23456969803,
                    stack: backend web,
                    accountType: student,
                    student: remote
                   
                };
```

## 8) "/account/profile/update"  //updates the information a logged in user .
>***THIS ENDPOINT IS RESTRICTED TO OWNER, ADMIN AND BUSINESS ONLY***
```js
	method "PUT"
*	request parameters "(json)"
		{
		 "password":"******"(string),
		 "email":"test@test.com"
		 }

*   response on success (json)
         {
	         photo: ***path to the image***,
                name: ebube kalu,
                email: test@test.com,
                address: no 34 ojike lane, Urualla,
                role: COO,
                phoneNumber: +23456969803,
                stack: backend web,
                rating:8.8,
                accountType: student,
                studentType: local,
        }
```
## 9) "/account/profile/update/:id"  //updates the information a user .
>***THIS ENDPOINT IS RESTRICTED TO OWNER AND ADMIN ONLY***
```js
	method "PUT"
*	request parameters "(json)"
		{
		 "password":"******"(string),
		 "email":"test@test.com"
		 }

*   response on success (json)
         {
		        photo: ***path to the image***,
                name: ebube kalu,
                email: test@test.com,
                address: no 34 ojike lane, Urualla,
                role: COO,
                phoneNumber: +23456969803,
                stack: backend web,
                accountType: business"
        }
```
## 10) "/account/profile/:id"  //deletes the information a user .
***THIS ENDPOINT IS RESTRICTED TO OWNER AND ADMIN ONLY***
```js
*	method "DELETE"
*	request parameters "(json)"
		{
		 "password":"******"(string),
		 "email":"test@test.com"
		 }

*   response on success (json)
 ```       

## 11) "/accounts/profile/edit_password" //TO CHANGE A USER PASSWORD FROM INSIDE THE USER PROFILE.
```js
   method "POST"
*	request parameters (token from login)
            {"password": "*******"(string)} N/B : the new password user will love to change to

*   RESPONSE ON SUCCESS
        {'password! SUCCESSFULLY CHANGED'}(json)

```

## 12) "/account/recovery/password"   //takes a users email and  verifies its existence in the database if it exist send a mail to the email             address containing oobcode.
```js
	 method "POST"
*    request parameters(json)

        {"email":"test@test.com"(string)}

*     response on success (json)

      {an email has been sent to "test@test.com" with further instructions.}
```

## 13)    "/account/recovery/password/change // redirects a user from his mail with the oobcode.
```js
	method "POST"
*   request parameters
       {

        "oobcode":"	eyJhbGciOiJIUzI1NiIsInR5cCI6 *** DlsdkaiwADWRWRfqwdnj"
        "newPassword": "*******"(string)

       } N/B : the new password the user will love to change to

*     response on success (json)

      {Password changed successfully you can now login with your new password.');

```
	   