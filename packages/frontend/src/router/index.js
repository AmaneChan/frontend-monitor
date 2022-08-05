import { createRouter,createWebHistory } from 'vue-router'

import overview from "../view/overview.vue";

const router = createRouter(
    {
        history:createWebHistory(),
        routes:[
            {path:"/",component:overview},
        ]
    }
);

export default router;