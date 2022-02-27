# Push Server

## Project Creation Steps
- npx create-nx-workspace
- cd push-server
- npm install --save-dev @nrwl/angular
- npm install --save-dev @nrwl/express
- nx g @nrwl/express:app push-server
- nx g @nrwl/angular:app client


## How to add Angular component to project
npx nx generate @nrwl/angular:component components/messages --project=client
## How to run both client and server
- npx nx run-many --parallel --target=serve --projects=push-server,client

## Client
Connect to client using the below URL
- http://localhost:4200/messages
- Each client will be assigned an unique id by the server.
- Use the others client id to send the message to the client
- Messages will be streamed to the other client instantly.




