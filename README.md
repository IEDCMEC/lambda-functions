# express-to-lambda

API Functions made with express server, automatically deployed to AWS Lambda


## Usage
- Install dependencies using `npm install`
- Develop locally using `npm run dev`
- Once you are sure that everythig works locally, push changes and it will be automatically deployed to AWS Lambda ✨

## Note:
 
- Since everything's running on serverless, in-memory sessions, web sockets won't be a good idea to try :)
- Don't hardcode any env vars publically. 
- Create a .env file to add in all your env variables. Before pushing, just remember to add them in github secrets as well.
