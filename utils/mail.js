 import { createTransport } from "nodemailer";


 export const mailtransporter = createTransport({
     host: 'smtp.gmail.com',
     port:'465',
     secure:true,
     auth:{
         user: 'berikisuibrahim227@gmail.com',
         pass:'avcnsoulzylscmsu'
     },
     from: 'berikisuibrahim@gmail.com'
 })