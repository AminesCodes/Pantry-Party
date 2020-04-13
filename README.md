# Pantry-Party
Our application allows users to host a cooking party. Users will have the option to find recipes and follow an interactactive cooking video for recipes or input their personal recipe and follow the directions on a streaming platform. Pantry Party allows users to virtually interact with others and cook a meal in the comfort of their home - giving them the ability to share a meal together while apart.

## Database Schema
### Tables and Columns 
* __Users__
  * `id` : Integer Primary Key
  * `firstname`: String
  * `lastname`: String
  * `email`: String
  * `password`: String
  * `avatar`: String
  * `bio`: String
  * `active`: Boolean
  
* __Recipes__
  * `id` : Integer Primary Key
  * `user_id`: Integer REFERENCES users(id)
  * `recipe_name`: String
  * `directions`: String
  * `recipe_img`: String
  * `ingredients`: String
  * `location`: String
  * `type`: String
  
* __Followers__
  * `id`: Integer Primary Key
  * `user_id`: Integer REFERENCES users(id)
  * `follower_id`: Integer REFERENCES users(id)
  
* __Calendar__
  * `id`: Integer Primary Key
  * `user_id`: Integer REFERENCES users(id)
  * `active`: BOOLEAN
  
* __Events__
  * `id`: Integer Primary Key
  * `party_name`: String
  * `calendar_id`: Integer REFERENCES calendar(id)
  * `party_description`: String
  * `recipe_id`: Integer REFERENCES recipe(id)
  
* __Notifications__
  * `id`: Integer Primary Key
  * `event_id`: Integer REFERENCES event(id)
  * `users_id`: Integer REFERENCES users(id)
  * `recipe_id`: Integer REFERENCES recipe(id)
  * `follower`: Integer REFERENCES followers(follower_id)
  * `status`: String

### Diagram 
![database](./database_schemaG7.png)

## Backend Routes/API
* __Users__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET| `/users`| Gets all of the users.| N/A|
  |GET| `/users/:id`| Get a single user by id.| N/A|
  |POST| `/users/new`| Creates new user.| firstname, lastname, email, password, avatar, bio, active|
  |PATCH| `/users/update/:id`| Update single user.|firstname, lastname, email, password, avatar, bio, active|
  |DELETE| `/users/remove/:id`| Delete single user.|N/A|

* __Recipes__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET| `/recipe/:recipe_id`| Gets single recipe in users database.| N/A|
  |GET| `/recipe/search/:recipe_type`| Get single recipe by type of dish.| N/A|
  |GET| `/recipe/search/:ingredient`| Get single recipe by ingredient.| N/A|
  |GET | `/recipe/search/:location`| Get single recipe by location of origin.| N/A|
  |POST| `/recipe/new`| Create new recipe.| recipe_name, directions, recipe_img, ingredients, location, type|
  |PATCH| `/recipe/update/:recipe_id`| Update single recipe.| recipe_name, directions, recipe_img, ingredients, location, type|
 
* __Followers__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET| `/followers/all/:user_id`| Gets all followers for user.| N/A|
  |GET| `/followers/following/all/:user_id`| Gets all accounts user is following.| N/A|
  |POST | `/followers/:user_id/:follower_id`| Create new follower. |follower_id|
  |DELETE| `/followers/:user_id/:follower_id`| Delete single follow. | N/A|
  
* __Calendar__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET| `/calendar/:user_id`| Get calendar for user.| N/A|
  |PATCH| `/calendar/update/:user_id`| Update single calendar.| active|
  
* __Events__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET |`/event/all/:calendar_id`| Gets all event for user.|N/A|
  |GET | `/event/:event_id`| Get single event. | N/A|
  |POST|`/event/new/:calendar_id`| Create new event.|party_name, calendar_id, party_description, recipe_id|
  |PATCH| `/event/update/:event_id`| Update single event.|party_name, calendar_id, party_description, recipe_id|
  |DELETE| `/event/remove/:event_id`| Delete single event.| N/A|
  
* __Notifications__
  | Method | Endpoint  | Description    | Body Data    |
  |--------|-----------|----------------|--------------|
  |GET|

## Frontend
### Routes
| Route | Feature  |
|--------|-----------|
|/ | Landing page will direct you to a log in form where registered users are able to input their credentials to log in. It will also provide a link to a sign up form.|
|/signup| User will be able to sign up for account to our application by filling out the required fields of the form.|

### Wireframes
Find wireframes [here](./wireframes.md).
