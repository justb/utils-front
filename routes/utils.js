/* eslint-disable prettier/prettier */

/**
 * 检查{own}中是否有{need}中的任意值
 * @param own {Array}
 * @param need {Array}
 * @returns {boolean} 都为空时返回true
 */
export const hasRole = (own, need) => {
    return (need.length === own.length && need.length === 0) || need.some(n => own.indexOf(n) > -1)
}

export const findSecondaryMenus= (menus = [], path) => {
    let ret = menus.find(item => item.path === path)
    return (ret && ret.children) ? ret.children : []
}

const postOrderDF = (mapEntries, fn) => {
    if (mapEntries.children) {
        for(let i = 0, l = mapEntries.children.length; i < l; i++){
            postOrderDF(mapEntries.children[i],fn);
            fn(mapEntries.children[i],mapEntries);
        }
    }
}

export const addRoleAndAuth = (menus =[], ownRoles = []) => {
    const _root = {};
    _root.children = menus.slice()
    const isAdmin = ownRoles.indexOf('ROLE_ADMIN') > -1
    const addRole = (current, parent) => {
        const { roles = []} = current;
        current.auth = current.auth || isAdmin || hasRole(ownRoles, roles)
        parent.auth = parent.auth || current.auth
    }
    postOrderDF(_root, addRole)
    return _root.children;
}
