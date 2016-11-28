# AutoControlServer

Car in DB:

CarId
VIN
Brand
Model
CreateDate

CarsController:

[GET]
/api/cars/getall - return all cars
/api/cars/get/id - return car with "id"
/api/cars/getlast - return last added car (sort by carId)

[POST]
/api/cars/postproduct - add new car to db (todo: change name to post)
  header: 
    Content-Type application/json
  body example:
    {
		  "Model": "focus",
		  "Brand": "ford",
		  "VIN": "198219821"
    }
    CarId is autoincrement
    CreateDate is added on REST (todo)
    
Error in DB:

ErrorId
CarId
ErrorCode
ErrorString
CreateDate

ErrorsController:

[GET]
/api/errors/getall - return all errors
/api/errors/get/id - return first error for car with "id" (todo: return all errors for car with "id")
/api/errors/getlast - todo

[POST]
/api/cars/post - add new error to db
  header: 
    Content-Type application/json
  body example:
    {
		  "CarId": 1,
		  "ErrorCode": "A65",
		  "ErrorString": "Blad"
    }
    ErrorId is autoincrement
    CreateDate is added on REST (todo)
    
Detail in DB:

DetailId
CarId
Speed
Rpm
EngineLoad
Voltage
Lon
Lat
CreateDate

DetailssController:

[GET]
/api/details/getall - return all details
/api/details/get/id - return first detail for car with "id" (todo: return all details for car with "id")
/api/details/getlast - todo
/api/details/getlastdetailforeachcar - return last added detail for each car in DB

[POST]
/api/cars/post - add new detail to db
  header: 
    Content-Type application/json
  body example:
    {
		  "CarId": 1,
		  "Speed": 150,
		  "Rpm": 2000,
      "EngineLoad": 50,
      "Voltage": 12.44,
      "Lon": 13.2321,
      "Lat": 78.2312
    }
    DetailId is autoincrement
    CreateDate is added on REST
