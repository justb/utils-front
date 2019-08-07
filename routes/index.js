const routes = [
    {
        name: '交易额',
        roles: ['ROLE_USER'],
        path: '/deal-amount',
        children: [],
        disabled: true,
    },
    {
        name: '主营收入',
        path: '/main-income',
        children: [],
        disabled: true,
    },
    {
        name: '其他收入',
        path: '/other-income',
        children: [],
        disabled: true,
    },
    {
        name: '固定成本',
        path: '/fixed-cost',
        children: [],
        disabled: true,
    },
    {
        name: '变动成本',
        path: '/changed-cost',
        children: [
            {
                name: '风险备付金',
                path: '/changed-cost/risk-reservation',
            },
            // {
            //     name: '获客',
            //     path: '/changed-cost/customer-acquisition',
            //     roles: ['ROLE_USER'],
            // },
        ],
    },
    {
        name: '销售及管理费用',
        path: '/sales-management-cost',
        children: [],
        disabled: true,
    },
]

const getPathTitleMap = (routes = []) => {
    let ret = {}
    const walkFunc = routeChildren => {
        return routeChildren.forEach(item => {
            const { children, name, path } = item
            ret[path] = name
            if (children && children.length) {
                walkFunc(children)
            }
        })
    }
    walkFunc(routes)
    return ret
}

export const pathTitleMap = getPathTitleMap(routes)

export default routes
