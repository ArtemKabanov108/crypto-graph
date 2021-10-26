import JwtCheckingStore from "../store/jwtChecking/jwtChecking.store";

//TODO create authChecker for auth
export const authChecker = async () => {
    try {

        const userDataStorage = localStorage.getItem('rememberMe')
        const parsData = JSON.parse(userDataStorage)
        await JwtCheckingStore.addResponseToJwtCheckingStore(parsData)

    } catch (e) {
        throw new Error(e)
    }
}