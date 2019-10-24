# cab-service
Basic Application which will use to book cab


- User can book a cab by providing location (.lattitude and longitude)
- Nearest cab will assign to user. 
- User can book only single cab at a time.
- User request gets reject if cab is not avaiable 
- Once user reached to destination ride will complete


## Setup
Clone the repository.
Run npm install to install all dependencies.
Run npm start to run the project.

API : bookCab <br/>
URL : http://localhost:3000/bookCab?lattitude={lattitude}&longitude={longitude}&id={userid} <br/>
TYPE: **GET** <br/>

parameters: lattitude - lattitude of the user (optional),
            longitude - longitude of the user (optional) ,
            id(userid) - get lattitude and longitude from user id (compulsary) 
<br/><br/>

API : userHistory <br/>
URL : http://localhost:3000/userHistory?id={userid} <br/>
TYPE: **GET** <br/>

parameters: id(userid) - (compulsary)

<br/><br/>

API : completeRide <br/>
URL : http://localhost:3000/completeRide?lattitude={lattitude}&longitude={longitude}&id={cabId} <br/>
TYPE: **GET** <br/>

parameters: lattitude  - lattitude of the user (compulsary),
            longitude  - longitude of the user (compulsary) ,
            id(cabid) -  to complete ride status (compulsary) 

<br/><br/>
 
