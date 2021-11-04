import {HomeTab} from "../../Components/Tabs/HomeTab/HomeTab";
import {TopChart} from "../../Components/Tabs/TopChartTab/TopChartTab";
import {FavoriteTab} from "../../Components/Tabs/FavoriteTab/FavoriteTab";

export const userPageTabFactory = {
    "Home": HomeTab,
    "Top Chart": TopChart,
    "Favorites": FavoriteTab,
}

const constructProps = (typeComponent) => ({
    tabType: typeComponent
})

export const renderTabFactory = (props) => {
    const Component = userPageTabFactory[props.key]
    return <Component {...constructProps(props.key)}/>
}