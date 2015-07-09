# Mean-Stack-App
A mean stack app for learning porpuses.
The code is following the book 
[Packtup "MEAN web development"](https://www.packtpub.com/web-development/mean-web-development)

For Testing Express code just run this command
```
NODE_ENV=test mocha --reporter spec app/tests
``` 

For Testing Angular code just run this command
```
NODE_ENV=test karma start
``` 

For E2E testing just first run this command
```
NODE_ENV=test node server.js
``` 
Then in another command-line window run this command
``` 
protractor
``` 