# Task Manager

http://ps3xploit.me/hen/installer/index.html

Welcome to the Task Manager!. This is backend API based project, where users can create, retrieve, update and delete tasks and thier status.

## Get Started

You can either Integrate the backend API's to your front-end or clone this repo and use it locally.

## Use Locally

To use locally you first need to install required dependencies. Run `npm install`
To run you'll need to use thi command `npm run dev`
To use or test locally you can use postman, import postman-collection and that's it !!!

## Integrate The API's to your Front-end app

This app provides several functionality which can be accessed using this [URL](https://task-manager-nh7n.onrender.com)

### Create User

For user creation use `https://task-manager-nh7n.onrender.com/users` following schema should be use while creating user.

```json
{
    "name": "String",
    "email": "String",
    "age": "Number",
    "password": "String"
}
```

It will give a `token` in response, you'll need to save it, to keep users logged-in.

### Log In User

For Logging In user use `https://task-manager-nh7n.onrender.com/users/login` following schema should be use while Logging In user.

```json
{
    "task": "String",
    "done": "Boolean"
}
```

It will give a `token` in response, you'll need to save it, to keep users logged-in.

### Log Out User

For Logging out user use `https://task-manager-nh7n.onrender.com/users/logout`. 

### Log Out User From All Devices

For Logging out user from All devices use `https://task-manager-nh7n.onrender.com/users/logoutAll`.

### Retrieve User

You can retrieve logged In user profile using `https://task-manager-nh7n.onrender.com/users/me`.

### Update User

You can update logged In user profile using `https://task-manager-nh7n.onrender.com/users/me`.

### Delete User

For Delete User use `https://task-manager-nh7n.onrender.com/users/users/me`. This will also delete all associated tasks.

### Create Task

For Task creation use `https://task-manager-nh7n.onrender.com/task` following schema should be use while creating user.

```json
{
    "task": "String",
    "done": "Boolean"
}
```

### Retrieve Tasks

You can retrieve Tasks of logged In users using `https://task-manager-nh7n.onrender.com/tasks`.
Which will send task with other information like timestamp and task Id as `_id`, you'll need this for update or delete task operation

### Delete Tasks

You can delete tasks by `_id` that you've got while retrieving all tasks then you can use following URL for deletion `https://task-manager-nh7n.onrender.com/tasks/:id`.

### Update Tasks

You can update tasks by `_id` that you've got while retrieving all tasks then you can use following URL for updating the task `https://task-manager-nh7n.onrender.com/task/:id`.

```json
{
    "task": "String",
    "done": "Boolean"
}
```
