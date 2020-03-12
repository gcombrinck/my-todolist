# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
1. Requirement #4
- I added an edit route to render an update task list page and created a edit.ejs file for the html
- Created an update route to replace the old value with the new value entered
- Added a bit of styling with bootstrap

2. Requirement #5
- Created a simple docker file using the latest version of nodejs
- To build the container run the following command `docker build -t gcombrinck/node-web-app .`
- To run the container use the following command: `docker run -p 49160:8080 -d gcombrinck/node-web-app`
- The app will be available here: http://localhost:49160/todo assuming you are running docker on your local machine
- Added chrome to the container to allow running of the tests inside the container

3. Test Script
- Tests can be found in `tests` folder.
- Framework were created using `mocha`, `chai`, `selenium` and I'm using `gulp` as a test runner
- Test can be executed by running `npm test`
- Test report can be found in the `reports` folder. Just open the html file
- To run test in docker get the docker container id using `docker ps -a` then run `docker exec -it <container-id> bash`
- Once inside the container run `npm test`

4. Tags
- `v1.0` added code for requirement #4
- `v2.0` added code for requirement #5 and added the tests

5. XSS Vulnerability
- I have to be honest, I have not done security testing before.
- I added a test for `Reflected Cross Site Scripting`
- I also tried some other methods from documentation but could not identify the vulnerability. Would be nice if you could point it out to me for future reference.
- I however, added `helmet` to the app as recommended in the express js documentation.
- Used `snyk` to check for vulnerabilities in the node dependencies 