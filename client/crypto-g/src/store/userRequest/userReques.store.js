import {makeAutoObservable, toJS} from "mobx";
import {DELETE, GET, POST} from "../requests/request";
import {DELETE_FAVORITE, GET_FAVORITES, SET_FAVORITE} from "../../serverRouting/switch";
import {getLocalStorage} from "../../helpers/helpersFoo";


class UserRequestStore {
    userFavoriteStore = []
    constructor() {
        makeAutoObservable(this)
    }

    async setFavoriteCrypto(payloadSetFavorite) {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await POST( SET_FAVORITE, payloadSetFavorite, jwtForFavorites)
            this.userFavoriteStore = data
            toJS(this.userFavoriteStore)
            // console.log("response Set the favorite", data)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteFavoriteCrypto(payloadDeleteFavorite) {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await DELETE( DELETE_FAVORITE, payloadDeleteFavorite,  jwtForFavorites)
            this.userFavoriteStore = data
            toJS(this.userFavoriteStore)
            // console.log("response delete the favorite", data)
        } catch (err) {
            console.log(err)
        }
    }

    async getFavoritesList() {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await GET( GET_FAVORITES, jwtForFavorites)
            this.userFavoriteStore = data.watchlist
            toJS(this.userFavoriteStore)
            return data
        } catch (err) {
            console.log(err)
        }
    }
}
export default new UserRequestStore()