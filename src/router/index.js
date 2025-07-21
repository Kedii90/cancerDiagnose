import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../view/login.vue';
import register from "../view/register.vue"
import home from "../view/home.vue"
import result from '../view/result.vue';
import forgot from "../view/forgot.vue"
const routes = [{
           path:"/",
           redirect:"/login"
       },{
          path:"/login",
          component:login,
      },{
          path:"/register",
          component:register
      },{
          name:"home",
          path:"/home:data",
          component:home
      },{
         name:"result",
         path:"/result/:data",
         component:result
      },{
          path:"/forgot",
          component:forgot
      }
];
const router = createRouter({
    history:createWebHashHistory(),
    routes   
})

router.beforeEach(async (to,from,next)=>{
     if(to.path=="/login"){
        const response =await fetch("https://192.168.1.5:3000/login-verify",{
        method: "GET",
        credentials: "include",

     })
  
   const result = await response.json();
   if(result.msg == "登录成功"){
       next( 
             {name:"home",
                params: {
                    data:JSON.stringify({data:result.data.a})
                }
            }
       )
   }
   
}
    next();
  


})

export default router;