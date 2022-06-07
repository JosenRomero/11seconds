# 11seconds

A website for videos with React and Firebase.

## Built using

- ReactJS
- Redux
- Bootstrap
- firebase (auth, firestore, storage)

## Features

- Login using Email/Username
- Add New Videos
- Watch Videos
- Delete Own Videos
- Update Profile User Account
- Error Management
- Loading Spinners
- Infinite Scroll Videos

## Installation

```
$ git clone https://github.com/JosenRomero/11seconds.git
$ cd 11seconds
$ npm install
$ npm start
```

### Firebase:

- Create your own firebase project 
  - Enable auth (Email/Username)
  - Enable cloud firestore
  - Enable firebase storage (folders: images, videoThumbnail, videos)

### Env variable:

Create .env.local file and add the following:

```
REACT_APP_API_KEY = ""
REACT_APP_AUTH_DOMAIN = ""
REACT_APP_PROJECT_ID = ""
REACT_APP_STORAGE_BUCKET = ""
REACT_APP_MESSAGING_SENDER_ID = ""
REACT_APP_APP_ID = ""
```

### Build the app:

```
$ npm run build
```
