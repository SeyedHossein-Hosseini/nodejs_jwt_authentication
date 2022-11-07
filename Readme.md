# How to run this program
1. Downlaod the project code 
2. Unzip the files
3. Rename the `config.example` folder to `config`
4. Now go to `config` folder and rename `.env.example` file to `.env`
5. Now go to `.env` file and set a `PORT` and `SECRET_KEY`
6. Create a mongoDB cluster and obtain its connection string
7. Replace the connection string you got in step 6 in `STRING_CONNECTION_MONGODB` in `.env` file
8. Install all pakages required by project by typing command `npm install`
9. Now run the project by typing `npm start`

--> Remeber to set your IP address in network access section in mongoDB if you are using mongoDB atlas service
