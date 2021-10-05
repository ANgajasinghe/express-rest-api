# express-rest-api

## Team Management App

- Leaders can create a team with multiple number of members.
- Leaders can view his all teams in one page, and he can view all the members by selecting a team.
- Leaders and delete or update his team members.


## Tools

* express - handle req and res.
* mongoose - communicate with mongo db.
* bcrypt - to hash passwords.
* cors - cross-origin resource sharing.
* express-jwt - jwt validation middleware.
* express-validator - request data validation middleware.
* jsonwebtoken - jwt token creation and etc.

## Environment Variables

* ` MONGO_CONNECTION_STRING="mongodb+srv://{username}:{pwd}@cluster0.qfra2.mongodb.net/taskApp?retryWrites=true&w=majority" `  
* ` SECRECT="{your jwt secrect}" `


### Application Architecture

![application architecture](https://euuxswablrvfihzxbfml.supabase.in/storage/v1/object/public/github/express-rest-api/application-architecture.png)


* core
    * exception - Include Http exceptions with status.
    * helpers - helper functions for application.
    * validations - Include request payload validators.
    * middleware.js - Exception middleware and error logger
  
* routes
    * user.route - user login and registration roues.
    * group - leader's group CRUD
  
* schemas - mongodb schemas

* services - service layer.

---

### Use Case Diagram

![use case](https://euuxswablrvfihzxbfml.supabase.in/storage/v1/object/public/github/express-rest-api/use-case.png)

---

### Data Models

![use case](https://euuxswablrvfihzxbfml.supabase.in/storage/v1/object/public/github/express-rest-api/data-model.png)

---
