# About project

My project is a website allowing users to look for movies and tv series. If logged in, they can rate them by giving them reviews and add them to favourites/watched. All of that is saved in the Mongo database that this project uses. The project is divided into two directories - client and server. Front-end of the application is based on React.js with the help of Vite, back-end is based on Node.js with express.js used as a framework.


# Installation

Clone the repo and install the dependencies.
```bash
https://github.com/Bartolomeo26/CinemaCentre.git
```
```bash
npm install
```

# Using the application
After installing all the dependencies, the next step is to run the local database (MongoDB), seed the database and then start the application. 

Running the database:
```bash
mongo
```
Seeding the database:
```bash
cd server/seeds
node seeds_actors.js seeds_movies.js seeds_series.js
```
Starting the application:
```bash
cd server
nodemon index.js
```
```bash
cd client
npm run dev
```
The home page which is a starting point of the application presents us six different carousels - each showing three different productions (movies/series) in the order which is based on notes, number of reviews and number of 'favourites' that logged in users are able to give them.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/c9e8b52f-5c9f-4faf-87ef-68574f5a6f6a)

Navbar visible at the top of the screen consists of many options such as Movies, TV Series, Actors, Rankings, Login, Register and a search bar allowing anyone to look for movies, series and actors based on their names (and surnames when it comes to actors).

Movies option displays all the movies seeded into the database with an image, short description, year of release and an average rating. 

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/d074d026-451d-404e-a5c9-2b2123e7db79)

Every single one of those tiles is a link which would lead us into the details of the movie. There, we can see all the information that is related to the specific production - number of ratings and 'favourites' given by users, top cast, all the reviews with yours (if it exists) highlighted and other details like director and country the movie was created in.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/8347045f-2977-4640-8c64-973fa3baaf20)

The top cast tiles are also links to the site with details about the actors with the movies/series they played in displayed there.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/175b9a85-bfdf-4d6b-922c-050cbb16544e)

TV Series option in the navbar works analogically showing us the tiles of all the series in the database with a possibility to go into the details of each one of those.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/60a3f7b0-899f-4949-81e6-1674fc466d07)

Rankings option allows every user to see all the best movies and series (ranking is divided into two categories) in the order based on the avarage notes given to them by community.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/e2910ede-8adc-4b83-a179-64fd4af0d43c)
![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/b8355649-7165-4178-b8ba-c575b6992a4e)


All the CRUD operations are implemented when it comes to reviews giving the users freedom to display all of them, but add, edit and delete just theirs. Every user can add only one review for each of the productions.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/e8cbb077-aa2b-4db1-a8f8-0944bd7edb3d)

Website offers also a possibility of seeing other users' watched/favourite movies/series with the ratings given to them by this very user seen next to titles.

![image](https://github.com/Bartolomeo26/CinemaCentre/assets/64313992/f5cb59b1-fd44-4e1d-8ffc-5551498c5d3f)

# Possible development

The project still does a have great potential for further development given the fact that there are plenty of other features seen on sites like IMDB or Filmweb that could definitely be implemented. My further learning process when it comes to React will surely help in making those changes by making the site even more user friendly when it comes to UI and increasing number of possibilites that it offers to them.
