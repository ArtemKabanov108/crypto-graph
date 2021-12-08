import React, {useEffect} from "react";
import {Header} from "../../Components/Header/Header";
import {observer} from "mobx-react-lite";
import {Card} from "../../Components/common/Card/Card";
import {MyResponsiveBump} from "../../Components/Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../Components/common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../store/cryptocurrency/crypto.store"
import {toJS} from 'mobx'
import {Loader} from "../../Components/common/Loader/Loader";

export const MainPage = observer(
  () => {
    useEffect(() => {
      (async () => {
        try {
          await CryptoStore.pingMaker()
        } catch (err) {
          console.log(err)
        }
      })()

    }, [])

    const cryptoStoreToJs = toJS(CryptoStore.cryptoStore)

    return (
      <>
        <Header/>
        <Surface
          wrapping={true}
          centring={'center'}
        >
          {!cryptoStoreToJs.length ? <Loader/> : cryptoStoreToJs.map((item) => {
            return (
              <Card
                key={item.id}
                cryptoName={item.id}
              >
                <MyResponsiveBump data={[item]}/>
              </Card>
            )
          })}

        </Surface>
      </>
    )
  }
)