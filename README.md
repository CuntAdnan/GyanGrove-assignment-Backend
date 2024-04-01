1) This is the Repository for the implementation of the BackEnd Assignemnt Gyan Grove. The tech Stack that is used in this Project is Nodejs, express js for the Backend, MongoDB for the database, and RapidAPI/Postman for Client Request.
Along with these as mentioned in the project document external APIs are also used in this project which are used to calculate the weather and the distance based on the latitude and the longitudes.


2) The Project folder consists of a Different Folder. The main piece of logic lies in the router. Here I have defined two routes for adding a event  and fetching a events.

3) The given dataset is converted to JSON which is directly fed to MongoDB for retrieval.

4) To implement a get request go to getDataCurl.http file and change the parameters . I have implemented curl requests in vs code using rest client API .The user specifies the latitude, longitude and date of events. Then this is used to find the events which will be happening within 14 days from the given date and also some extra information like the weather of the city and distance between cities.
5) The JSON response is sorted and displayed on pages each of size of 10 each.
 ![image](https://github.com/CuntAdnan/GyanGrove-assignment-Backend/assets/98183132/b2dd0627-d30e-4c83-bbba-816c9ad6f642)

6) For adding a new event we simply make a post request to "https://gyangrove-assignment-backend-1.onrender.com/add/data" where we enter all the details for the events and the changes are reflected in the Mongodb database.
![image](https://github.com/CuntAdnan/GyanGrove-assignment-Backend/assets/98183132/230ebad0-528b-475a-bb58-3aea04da4d30)
![image](https://github.com/CuntAdnan/GyanGrove-assignment-Backend/assets/98183132/5cead5b7-4c5d-4ff1-9c28-895206113220)



To run this project simply fork this project . Set up your mongodb credentials and store the credentials in your env files.
Simply run the server using nodemon index.js and project should be running.
