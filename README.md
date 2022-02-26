# Push Server

## How I created the project
 npx create-nx-workspace // empty, nx. myorg-repo
 cd push-server
 npm install --save-dev @nrwl/angular
 npm install --save-dev @nrwl/express

 nx g @nrwl/express:app push-server
 nx g @nrwl/angular:app client

## How to run both client and server
npx nx run-many --parallel --target=serve --projects=push-server,client