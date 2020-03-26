# WeatherApp Trip - Read Me

## Getting Started
First, fork this repo so you get your own copy of it. Once you have done that, you can clone your new repo to your machine, and get started.

You need **TWO** terminals for this.

In one terminal, run `bundle` to install the dependencies. Run `bin/rake db:setup` to create the databases (called rails_project_development by default). Run `bin/rails s` to run the server.

In the other terminal, `cd` into `client`. Run `npm install`. Then run `npm start` and go to `localhost:3000` in your browser.

## App Flow
Choose dates for your trip, search locations to add and drag and drop them into your calendar.

![](Weather1.gif)

Add more locations to view routes between destinations based on method of travel.

![](Weather2.gif)

Open the Reccomendations tab to view suggested places and their location on the map.


## APIs and Tech Stack
This project used ReactJs for the Frontend and Ruby on Rails for the Backend.

APIs used were DarkSky: Forecast and Time Machine, Google: Maps Javascript.
