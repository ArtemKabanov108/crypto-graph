import {makeAutoObservable, toJS} from "mobx";
import {GET} from "../requests/request";
import {GET_CRYPTO} from "../../serverRouting/switch";
import {getLocalStorage} from "../../helpers/helpersFoo";

class CryptoStore {
    cryptoStore = []
    constructor() {
        makeAutoObservable(this)
    }

    async getCryptoList() {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await GET( GET_CRYPTO, jwtForFavorites)
            this.cryptoStore = data.map(({coin, data}) => ({ id: coin, data: data.price_average }))
            console.log("response GET favorite list", data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async pingCrypto() {
        try {
            const jwtForFavorites = getLocalStorage('rememberMe')
            const {data} = await GET( GET_CRYPTO, jwtForFavorites)
            this.cryptoStore = data.map(({coin, data}) => ({ id: coin, color: "hsl(257, 70%, 50%)", data: data.price_average }))
            toJS(this.cryptoStore)
            console.log("We have the response, guys!", data)
            if (this.cryptoStore.length) {
                setTimeout( async () => {
                    try {
                        console.log("start")
                        await this.pingCrypto();
                        console.log("end")
                    } catch (err) {
                        console.log(err)
                    }
                }, 30000)
            }
        } catch (err) {
            console.log(err)
        }
    }
}
export default new CryptoStore()