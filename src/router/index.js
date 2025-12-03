import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../view/login.vue';
import register from "../view/register.vue"
import home from "../view/home.vue"
import result from '../view/result.vue';
import forgot from "../view/forgot.vue"
import { getApiUrl } from '../config/api.js';
import API_CONFIG from '../config/api.js';
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
        const response =await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN_VERIFY),{
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