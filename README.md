# AutoControlServer

<b>Car in DB:</b>

CarId</br>
VIN</br>
Brand</br>
Model</br>
CreateDate</br>

<b>CarsController:</b>

[GET] </br>
/api/cars/getall - return all cars </br>
/api/cars/get/id - return car with "id"</br>
/api/cars/getlast - return last added car (sort by carId)</br>

[POST]</br>
/api/cars/postproduct - add new car to db (todo: change name to post)</br>
  header: </br>
    Content-Type application/json</br>
  body example:</br>
    {</br>
		  "Model": "focus",</br>
		  "Brand": "ford",</br>
		  "VIN": "198219821"</br>
    }</br>
    CarId is autoincrement</br>
    CreateDate is added on REST (todo)</br>
    
<b>Error in DB:</b>

ErrorId</br>
CarId</br>
ErrorCode</br>
ErrorString</br>
CreateDate</br>

<b>ErrorsController:</b>

[GET]</br>
/api/errors/getall - return all errors</br>
/api/errors/get/id - return first error for car with "id" (todo: return all errors for car with "id")</br>
/api/errors/getlast - todo</br>

[POST]</br>
/api/cars/post - add new error to db</br>
  header: </br>
    Content-Type application/json</br>
  body example:</br>
    {</br>
		  "CarId": 1,</br>
		  "ErrorCode": "A65",</br>
		  "ErrorString": "Blad"</br>
    }</br>
    ErrorId is autoincrement</br>
    CreateDate is added on REST (todo)</br>
    
<b>Detail in DB:</b>

DetailId</br>
CarId</br>
Speed</br>
Rpm</br>
EngineLoad</br>
Voltage</br>
Lon</br>
Lat</br>
CreateDate</br>

<b>DetailsController:</b>

[GET]</br>
/api/details/getall - return all details</br>
/api/details/get/id - return first detail for car with "id" (todo: return all details for car with "id")</br>
/api/details/getlast - todo</br>
/api/details/getlastdetailforeachcar - return last added detail for each car in DB</br>

[POST]</br>
/api/cars/post - add new detail to db</br>
  header: </br>
    Content-Type application/json</br>
  body example:</br>
    {</br>
	"CarId": 1,</br>
	"Speed": 150,</br>
	"Rpm": 2000,</br>
	"EngineLoad": 50,</br>
	"Voltage": 12.44,</br>
	"Lon": 13.2321,</br>
	"Lat": 78.2312</br>
    }</br>
    DetailId is autoincrement</br>
    CreateDate is added on REST</br>
