# Project Overview
Blog App is an React Based Web platform that allows user to share, create and manage their own posts.

## Live Demo
https://lifehacker.netlify.app/

## Tech Stack
MERN
- Frontend: React
- Backend: ExpressJS
- Database: MongoDB
- Server: Node

## Prerequisites

Before running this project, make sure you have the following software installed in your environment:

- [Node.js](https://nodejs.org) - Version X.X.X

Check if Node is installed:
```
node -V
```
## Getting Started

Follow these steps to set up and run My Blog App on your local machine:

1. Clone the repository:

```
git clone https://github.com/your-username/my-blog-app.git
```
2. Navigate to the project directory:
```
cd my-blog-app
```
3. Install the dependencies:
```
cd blog-app/client
npm install
```
```
cd blog-app/server
npm install
```
4. Set up the database connection:

Ensure MongoDB is running on your local machine.
Update the MongoDB connection URL in the config.js file.
```
PORT = 5001
CONNECTION_STRING = Your Connection String
```
5. Start the development server:
```
cd blog-app/server
npm devStart
```
6. Start the client:
```
cd blog-app/client
npm Start
```
Open your browser and visit http://localhost:3000 to access My Blog App.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.
Please make sure to follow the existing code style and include appropriate tests for your changes.
