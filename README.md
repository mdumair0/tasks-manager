# Task Manager

Welcome to the Task Manager!. This is backend API based project, where users can create, retrieve, update and delete tasks and thier status.

## Get Started

You can either Integrate the backend API's to your front-end or clone this repo and use it locally.

## Integrate The API's to your Front-end app

This app provides several functionality which can be accessed using this [URL](https://task-manager-nh7n.onrender.com)

### Create User

For user creation use `https://task-manager-nh7n.onrender.com/users` following schema should be use while creating user.

```json
{
    "name": '',
    "email": '',
    "age": '',
    "password": ''
}
```

It will give a `token` in response, you'll need to save it, to keep users logged-in.

### Log In User

For Logging In user use `https://task-manager-nh7n.onrender.com/users/login` following schema should be use while Logging In user.

```json
{
    "email": '',
    "password": ''
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
    "task": String,
    "done": Boolean
}
```

### Retrieve Tasks

You can retrieve Tasks of logged In users using `https://task-manager-nh7n.onrender.com/tasks`.
Which will send task with other information like timestamp and task Id as `_id`, you'll need this for update or delete task operation

### Delete Tasks

You can delete tasks by `_id` that you've got while retrieving all tasks then you can use following URL for deletion `https://task-manager-nh7n.onrender.com/tasks/:id`.
