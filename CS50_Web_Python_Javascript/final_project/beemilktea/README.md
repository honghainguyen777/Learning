# Final Project - BeeMilkTea

Web Programming with Python and JavaScript

## Short description of the application:
- This application is for selling cool tea, coffee and drinks. It has a very user-friendly interface.
- Images in this app serve for non-profit/business purpose.

## Features of the website for administrators (used easily by any non-technical admins):
- View and updating orders (status, delivery time,..)
- Add new items to the website (not via admin or Django shell)
- Edit the existing items (changing info or/and picture) via the web application

## Features of the website for user (suits the eyes of the customers):
- Mobile-responsive with a better user interface (animation JS, popup..)
- Find an item by its category or the search feature
- Add/modify/deleting items in the cart (using bootstrap modal without refreshing the page)
- Login/Register for checkout (bootstrap modals)
- Checkout and view order info

## what’s contained in each file
### Views.py:
- 13 views for handling and processing the above features
### Models.py:
- 3 models with 25 fields for storing all needed user and project data
- Content ManyToManyFields and OneToOneFields relationships
### order/templates folder:
- 8 different html pages for rendering contents
### statics/order/css folder:
- a css file for styling parts of the application along with heavily used bootstrap
### statics/order/js folder:
- 4 JavaScript files with lots of codes to handling every event in the frontend such as changing quantity, deleting items, empty the cart, rendering information, storing data in localStorage, empty the cart when the checkout is successful, animation for the pages...
### statics/order/images folder:
- contains all images uploaded by administrators via UI (not Django admin interface)
