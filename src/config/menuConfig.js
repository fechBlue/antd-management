const menuList = [
    {
        title:'首页',
        key:'/main/home'
    },
    {
        title:'UI',
        key:'/main/ui',
        children:[
            {
                title:'按钮',
                key:'/main/ui/buttons',
            },
            {
                title:'弹框',
                key:'/main/ui/modals',
            },
            {
                title:'Loading',
                key:'/main/ui/loadings',
            },
            {
                title:'通知提醒',
                key:'/main/ui/notifications',
            },
            {
                title:'全局Message',
                key:'/main/ui/messages',
            },
            {
                title:'Tab页签',
                key:'/main/ui/tabs',
            },
            {
                title:'图片画廊',
                key:'/main/ui/gallerys',
            }
        ]
    },
    {
        title:'表单',
        key:'/main/form',
        children:[
            {
                title:'登录',
                key:'/main/form/login',
            },
            {
                title:'注册',
                key:'/main/form/reg',
            }
        ]
    },
    {
        title:'表格',
        key:'/main/table',
        children:[
            {
                title:'基础表格',
                key:'/main/table/basic',
            },
            {
                title:'高级表格',
                key:'/main/table/high',
            }
        ]
    },
    {
        title:'富文本',
        key:'/main/rich'
    },
    {
        title:'城市管理',
        key:'/main/city'
    },
    {
        title:'订单管理',
        key:'/main/order',
        btnList:[
            {
                title:'订单详情',
                key:'detail'
            },
            {
                title:'结束订单',
                key:'finish'
            }
        ]
    },
    {
        title:'员工管理',
        key:'/main/user'
    },
    {
        title:'车辆地图',
        key:'/main/bikeMap'
    },
    {
        title:'图标',
        key:'/main/charts',
        children:[
            {
                title:'柱形图',
                key:'/main/charts/bar'
            },
            {
                title:'饼图',
                key:'/main/charts/pie'
            },
            {
                title:'折线图',
                key:'/main/charts/line'
            },
        ]
    },
    {
        title:'权限设置',
        key:'/main/permission'
    },
];
export default menuList;