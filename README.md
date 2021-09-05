# Burger Builder
# PLAN OF ATTACK FOR BUILDING THE FRONTEND 
1. rewrite auth to work with the did create api 
2. add an extra page similar to orders for documents.

## How it works
in index.js there is a root reducers for interactions for each page.

There is also a saga middleware setup where it links different reducers(functions) to different "Sagas" functions that play around with the state and listen for events you can find the mapping between the different functions in sagas/index.js 

For example authUserSaga uses the ACTION_TYPE "AUTH" and get's called everytime a users clicks on submitHandler in the Auth.js Container since the function gets mapped to onAuth which is an actions.auth which is defined in store/actions/auth.js. Finally the circle completes and authUserSaga ends up getting triggered defined in store/actions/auth.js. 
This function, itself yield other actions that can change the state. These functions are defined in the root reducers eg (actions.authFail()) 

#### User Authentication
To order a burger, you need to be logged in to the application. The authentication is created using Firebase Authentication feature.

#### Ordering a burger
You can choose different ingredients to create your own burger. The price of the burger is updated based on the ingredients you've selected. To complete the order, you need to include your email and address. The data is saved to the Firebase Realtime Database.

#### Orders
It's possible to see all the orders placed by the user in the "Orders" tab. The orders are visible only for the currently logged in user.

#### Local storage
Burger's data are stored in the local storage. After refreshing the website, it allows the user to still see the previously selected ingredients.
#### How to run
- ```npm install``` to install all dependencies
- ```npm start``` and ```http://localhost:3000/``` in the browser to preview the app
