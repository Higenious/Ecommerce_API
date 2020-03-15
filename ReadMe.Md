 ## Ecommerce API

### Technology Required
 + Node js
 + Mongo db
 + Express 

### How to Start
 - Download zip or Clone project.
 - Navigate to folder.
 - for sendig mail just enter id and password in config folder.
 - npm install 
 - npm start  



#### Validations 

  - User will get verification mail.
  - email should be unique.   
  - if email is verified he can logged in successfuly!



-  `https://localhost:5000/api/v1/singUp`
    
     - Method  : POST
     - Reqbody  : JSON
     
     ```sh       
          {
           "name" : "chetan",
           "mobile" : 7757842157,
           "city" : "Pune",
           "role" : "Admin",
           "email" : "cchetantayade@gmail.com",
           "password" : "admin@123"
         }
    ```
    '
    ![Screenshot from 2020-03-16 01-22-27](https://user-images.githubusercontent.com/13375134/76709860-2d9f7880-6728-11ea-8057-7f57360bb4c8.png)

    '

    
- `https://localhost:5000/api/v1/singIn`
    
     - Method  : POST
     - Reqbody  : JSON
     
     ```sh       
          {
           "email" : "cchetantayade@gmail.com",
           "password" : "admin@123"
         }
     ```


- `https://localhost:5000/verify/uniquecode1snwbaxkk7tgob7m`
    
     - Method  : GET

