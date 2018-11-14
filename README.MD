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

![Movie page](readme_img/movie.PNG)

# Technology
For this project we were required to make a database of some type of object that was accessible from a React frontend through an API. This API would also have to support searching/filtering of information, and for a user to change or add to the data stored in the database. With these requirements in mind, we decided to use the following technologies.
## Backend
### Node / Express
The backend service itself is running through [Express](https://expressjs.com/) which is a Javascript web-framework for Node.js.

Due to the fact that Express is made to be "minimal and flexible", use of this framework made setup easy, and we were able to get a functioning API service up and running very fast. The fact that Express uses Javascript, which we have been using throughout this course, also made getting started easy.

The API is setup to be available on port 4000, at the _/graphql_ endpoint. Due to the fact that we are not very concerned about security, and for ease of use, the Express server is set up to allow cross-origin requests from all sources (\*).

### sqlite
Due to the relatively simple requirements of our database, and for ease of use. We decided to use sqlite3 as our database of choice. This allowed for easy portability and deployment on the virtual machine and among team members, while still allowing us to use regular SQL-syntax in our queries (with some exceptions, see [SQL Features That SQLite Does Not Implement](https://www.sqlite.org/omitted.html).

### GraphQl
For the API itself, we were allowed to use either a regular REST api, or GraphQL. Since neither of the group members had used GraphQl previously, but were interested in learning how to implement it, the choice was made to use GraphQl. In retrospect, this turned out to be a good solution, as GraphQl proved to be easy to use and implement, as well as having many nifty features that worked well with how we implemented our application.

In essence GrapQl allows you to ask for just what you need, meaning that we could get responses that only contain the data we are interested in for different sections of application. The main type of our schema is the Movie object, which is able to contain the following information
~~~
type Movie {
    id: String
    title: String
    released: String
    genre: String
    director: String
    plot: String
    writer: String
    runtime: String
    year: String
    awards: String
    poster: String
    imdbRating: String
    production: String
    actors: String
    watched: Int
    liked: Int
    rank: String
}
~~~

A typical query would then look like this
~~~
query{
  films (uid:1, first:3, skip:0) {
    movies {
      title
      released
      runtime
    }
   	total
    offset
  }
}
~~~
Which would return a response containing the following information
~~~
{
  "data": {
    "films": {
      "movies": [
        {
          "title": "The Shawshank Redemption",
          "released": "14 Oct 1994",
          "runtime": "142 min"
        },
        {
          "title": "The Godfather",
          "released": "24 Mar 1972",
          "runtime": "175 min"
        },
        {
          "title": "The Godfather: Part II",
          "released": "20 Dec 1974",
          "runtime": "202 min"
        }
      ],
      "total": 250,
      "offset": 0
    }
  }
}
~~~
As is demonstrated, the fields are pick-and-choose, meaning you could include _director_ or _plot_ as well, or any of the fields defined in the schema. We also have _mutations_ allowing changes to the database, such as updating liked/watched status or adding users.

The benefit of defining mutations, is that you always know when you will be making changes to the database as opposed yo just reading, as you specifically need to define the request as a mutation instead of just a query.

## Frontend

### React
As mentioned previously, using React was a requirement for this project. React has been explained in detail in previous documentation, and if you're reading this you're probably familiar with it. Nonetheless, it is an extremely useful framework that makes it possible to write powerful single page applications and user interfaces using modular components that updates only when they need to.

Some of the concepts integral to React, such as components, props and state are important to learn and use correctly, but when used well it is possible to create advanced user interfaces that are maintainable and modular.  

### Redux

### react-router

# Work Methodology

# Testing
