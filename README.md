# rs-clone-back
# Примеры отдельных запросов к серверу: 

регистрация

https://rs-clone-back-production-b4b7.up.railway.app/api/auth/register
method: "POST",
headers: {
   "Content-Type": "application/json"
},
body:{ 
  email: string;
  password: string
}

авторизация
https://rs-clone-back-production-b4b7.up.railway.app/api/auth/login
method: "POST",
headers: {
   "Content-Type": "application/json"
},
body: body:{ 
  email: string;
  password: string
}

создание userInfo

https://rs-clone-back-production-b4b7.up.railway.app/api/user/create
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
и другие ...
