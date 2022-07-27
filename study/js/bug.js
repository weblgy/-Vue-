const auth = {
    state: {
        auth: [],
        authRouters: constantRouterMap,
        menu: [],
        nomenu: false
    },

    mutations: {
        SET_AUTH: (state, data) => {
            state.auth = data
        },
        SET_MENU: (state, data) => {
            state.menu = data
        },
        SET_NOMENU: (state, data) => {
            state.nomenu = data
        },
        SET_ROUTERS: (state, routers) => {
            state.authRouters = constantRouterMap.concat(routers);
        }
    },

    actions: {

        // 获取用户当前权限下的路由
        getAuth({ commit, state }) {
            return new Promise((resolve, reject) => {
                ajax.get('upms/user/getCurrentUserAuthority').then(response => {
                    const data = response.data
                    commit('SET_AUTH', data.btnStr.split(";"))
                    authCheck(authRouterMap, data.menuStr.split(";"))
                    commit('SET_ROUTERS', authRouterMap)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 异步方法  获取当前用户权限下的菜单权限
        getMenu({ commit, state }) {
            return new Promise((resolve, reject) => {
                ajax.get('/upms/menu/tree').then(response => {
                    if (typeof response === "string") {
                        response = JSON.stringify(response);
                    }
                    const data = response.data
                    commit('SET_MENU', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
}