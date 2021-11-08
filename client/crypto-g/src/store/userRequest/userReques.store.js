import {makeAutoObservable, toJS} from "mobx";
import {GET, POST} from "../requests/request";
import {GET_FAVORITES, SET_FAVORITE} from "../../serverRouting/switch";
import {getLocalStorage} from "../../helpers/helpersFoo";


class UserRequestStore {
    userStore = []
    constructor() {
        makeAutoObservable(this)
    }

    async setFavorite(payloadSetFavorite) {
        try {
            const {data} = await POST( SET_FAVORITE, payloadSetFavorite)
            console.log("response Set favorite", data)
        } catch (err) {
            console.log(err)
        }
    }

    async getFavoritesList() {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await GET( GET_FAVORITES, jwtForFavorites)
            this.userStore = data.watchlist
            toJS(this.userStore)
            console.log("User Store favorite list", toJS(this.userStore))
            return data
        } catch (err) {
            console.log(err)
        }
    }
}
export default new UserRequestStore()