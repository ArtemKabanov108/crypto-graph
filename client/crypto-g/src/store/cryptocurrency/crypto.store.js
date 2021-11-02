import {makeAutoObservable} from "mobx";
import {GET} from "../requests/request";
import {GET_CRYPTO} from "../../serverRouting/switch";
import {getLocalStorage} from "../../helpers/helpersFoo";


class CryptoStore {
    cryptoStore = {}
    constructor() {
        makeAutoObservable(this)
    }

    async getCryptoList() {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await GET( GET_CRYPTO, jwtForFavorites)
            this.cryptoStore = data.data
            console.log("response GET favorite list", data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
}
export default new CryptoStore()