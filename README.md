# Push Server
## Prerequisite
- Install Redis server and run it on default port.

## How to run both client and server
- npm install
- npx nx run-many --parallel --target=serve --projects=push-server,client

## Client
Connect to client using the below URL
- http://localhost:4200/messages
- Each client will be assigned an unique id by the server.
- Use client id from other tab/window to send message
- Messages will be streamed to the other client instantly.

### Screen shots
![image](https://user-images.githubusercontent.com/13273593/155869129-a03fdcd8-83aa-4d4a-ad14-ea3855a0b469.png)

## Project Creation Steps
- npx create-nx-workspace
- cd push-server
- npm install --save-dev @nrwl/angular
- npm install --save-dev @nrwl/express
- nx g @nrwl/express:app push-server
- nx g @nrwl/angular:app client

## How to add Angular component to project
npx nx generate @nrwl/angular:component components/messages --project=client







