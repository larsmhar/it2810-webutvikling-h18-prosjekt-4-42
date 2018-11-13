# Project 4 documentation

The movie data in our database is gathered from [The Open Movie Database API](http://www.omdbapi.com/) [(CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)  
# Setup
The repository includes 2 folders, one for the frontend part of the project and one for the backend part, each with their own package.json. The frontend part is a normal create-react-app project, using the normal commands for running and building the application (i.e. just use _npm start_ or _npm run build_ after running _npm install_).

It is also necessary to run _npm run install_ in the backend-folder, which can then be started using _npm start_.

The _src/actions/constants.js_ includes includes a line that can be commented in/out to switch between using the backend on localhost or the one on the virtual machine

# Site functionality and features
The website created for this project is a database that allows user to mark movies as watched and/or liked, as well as different methods of searching and filtering the dataset.

The first page a user will see is the login page, where for simplicity's sake we only use usernames.

![Login](readme_img/login.PNG)

After loging in, the user will be presented with the front page, showing the list of movies in our database ranked in order of their IMDb rating.

![Front page](readme_img/frontpage.PNG)

Here, watched and liked movies will be visually reflected in the movie posters by either being darkened or having a heart in the lover left corner respectively.

The bars at the top allows the user to search for a movie by title, filter away movies if they are watched or by year of release. It is also possible to sort the movies by their IMDb top 250 rank, release year or runtime.

![Search functionality](readme_img/search.gif)

Clicking on a movie takes the user the movie page for that specific movie, showing more information about it such as director, actors, plot, year of release etc.

This page also allows the user to mark the movie as watched or liked, which will then be stored in the database.

![Movie page](readme_img/movie.png)

# Technology

## Backend

### Node / Express

### sqlite

### GraphQl

## Frontend

### React

### Redux

### react-router

# Work Methodology

# Testing
