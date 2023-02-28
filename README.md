# rs-clone-back
# Примеры отдельных запросов к серверу: 

 регистрация

http://localhost:5000/api/auth/register
method: "POST",
headers: {
   "Content-Type": "application/json"
},
body:{ 
  email: string;
  password: string
}

 авторизация

http://localhost:5000/api/auth/login
method: "POST",
headers: {
   "Content-Type": "application/json"
},
body: body:{ 
  email: string;
  password: string
}

 создание userInfo

http://localhost:5000/api/user/create
method: "POST",
headers: {
   "Content-Type": "application/json"
},
body: {
  userId: string,
  goal: string // "keep-fit"/ "lose-weight"/ "get-stronger"
  timeRest: string, 
  load: string // от 1 до 7
  weight: string, // есть валидация, вводить реальный вес
  height: string, // есть валидация, вводить реальный рост
  units: string, // "kg-cm" / "Lbs-inches"

}

 получение userInfo

http://localhost:5000/api/user/get/id

 обновление userInfo

http://localhost:5000/api/user/update/id
method: "PUT"
headers: {
   "Content-Type": "application/json"
},
body: {
            weight: string,
            height: srring,
          }
и другие...
