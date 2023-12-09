# Cryptocurrency Exchange Platform
Welcome to our Cryptocurrency Exchange Platform project! This platform provides a secure and user-friendly environment for trading cryptocurrencies without the usual market risks.

<img width="1170" alt="Screenshot 2023-12-09 at 8 11 55 AM" src="https://github.com/rs545837/CS35L-Project/assets/114828377/a8abc200-3557-4a9a-ae57-f84d801f4066">

## Features
User Authentication: Create accounts via email/password or social login.
Wallet: View your crypto holdings.
Transaction History: View past transactions with pagination support.
Exchange: Buy, sell, and transfer cryptocurrencies.
Current Price and Graph: Real-time data with graphical representation.


## Getting Started

### Clone the repository:
```
git clone https://github.com/chewableanimal/CS35L-Project.git
```

### Install Dependencies:
```
cd coincase
npm install
```

### Firebase:
Follow step 1 of this tutorial (Create a Firebase project and register your app):

https://firebase.google.com/docs/web/setup#create-firebase-project-and-app

Once your Firebase project is set up, save the configuration data somewhere safe. It'll look something like this:


```
const firebaseConfig = {
  apiKey: ...,
  authDomain: ...,
  projected: ...,
  storageBucket: ...,
  messagingSenderId: ...,
  appId: ...,
  measurementId: ...
};
```
<img width="1308" alt="Screenshot 2023-12-09 at 8 13 03 AM" src="https://github.com/rs545837/CS35L-Project/assets/114828377/8c84b800-14e8-4dda-a862-c24e22555011">

### Configuration:

Add a file name .env.local to the root folder using the code editor or through a terminal with:

```
touch .env.local
```

Copy and paste the corresponding values from your firebaseConfig to the .env.local file:

```
NEXT_PUBLIC_FIREBASE_API_KEY= ...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= ...
NEXT_PUBLIC_FIREBASE_PROJECT_ID= ...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= ...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= ...
NEXT_PUBLIC_FIREBASE_APP_ID= ...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID= ...
```

## Run the Application:

Run the following command to run your program through the terminal

```
npm run dev
```

Open your favorite browser and enter the following url into the url bar:

```
http://localhost:3000/
```

## Team
Luciano Kholos<br>
Matthew Tapia<br>
Stepan Muradyan<br>
Yoseph Chong<br>
Rohan Sharma
