

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React


* To run the app, cd into the directory and do:
```
npm start
```

## Running the Application

* In one terminal, Run Express Backend:
```
cd backend
npm install
npm start
```

* In another terminal, Run React Frontend:
```
cd frontend
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## Overview

* Implemented user registration with valid email error handeling.

* Implemented the hotel booking feature with the folloing cases handeling:
   * Not allowing the overlapping booking for a given user.
   * Not allowing the booking when there are insufficient rooms in the hotel.
* Implemented the map which shows the location of the hotel on the map. 
* Implemented popup on the map which shows the vacancy of hotel on hovering above it.


## LINKS



* [DEMO video](https://drive.google.com/file/d/1Ig-EntZgjd1lRDXrK6lGLQp5PreQv0k_/view?usp=sharing)
* [Github](https://github.com/Samarth-047/Hotel_management)



