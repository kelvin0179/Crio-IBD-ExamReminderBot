# Discord Exam Reminder Bot
* A Discord Bot which alerts user when an exam is close by , User can also post , edit and delete Exam Schedules.

## Built With
* [NodeJS](https://nodejs.org/en/docs/) -  evented I/O for the backend
* [Express](https://expressjs.com/) - framework for backend
* [Mongoose](https://mongoosejs.com/) - ODM
* [MongoDB](https://www.mongodb.com/) - Database
* [Node Cron](https://www.npmjs.com/package/node-cron) - Job scheduler

## Getting Started
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have `Node` or `npm` installed on your machine.

### Install dependencies 
```sh
$ npm install
```

### Set up environment variables 

```sh
    cd config
```
fill the values for environment variables.

### Local Run
After setting up environment proceed with local run 
```sh
$ npm start
```

## File System
```sh
.
├── config 
│             ├── config.env
│             ├── db.js
├── models                        
│             ├── quiz.js
├── routes                        
│             ├── route.js
├── src                        
│             ├── bot.js
│             ├── scheduler.js
├── index.js
├── package.json
├── package-lock.json
├── README.md

```

## Deployment

### Heroku Deployment
```sh
$ heroku login -i
$ heroku git:remote -a <your-app-name>
$ git push heroku master
```
Set up environment variables 
```sh
$ heroku config:set ENV_VAR=<value>
```

## Screen Shots

### Say hello to the Bot!
![1](https://user-images.githubusercontent.com/56430190/124385415-1efd1c00-dcf3-11eb-8b08-fd1fce35944b.PNG)
### In the Bot's Description `$help` command is provided so that any new user can access the Bot easily.
![2](https://user-images.githubusercontent.com/56430190/124385641-430d2d00-dcf4-11eb-8fe8-a08386763250.PNG)
### The help command.
![3](https://user-images.githubusercontent.com/56430190/124385642-443e5a00-dcf4-11eb-9ee4-5bae0ba27d11.PNG)
### The post command according to help.
![4](https://user-images.githubusercontent.com/56430190/124385643-44d6f080-dcf4-11eb-9f3f-23b802e2b637.PNG)
### The get command according to help.
![5](https://user-images.githubusercontent.com/56430190/124385644-456f8700-dcf4-11eb-81a4-1038fc6053e8.PNG)
### The delete command according to help.
![6](https://user-images.githubusercontent.com/56430190/124385646-46081d80-dcf4-11eb-810b-594c671976b7.PNG)
### The get after deleting.
![7](https://user-images.githubusercontent.com/56430190/124385648-46081d80-dcf4-11eb-8e30-90592512e25c.PNG)

