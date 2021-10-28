import {HomeTab} from "../../Components/Tabs/HomeTab/HomeTab";
import {TopChart} from "../../Components/Tabs/TopChartTab/TopChartTab";
import {FavoriteTab} from "../../Components/Tabs/FavoriteTab/FavoriteTab";

export const userPageRenderMap = {
    "Home": <HomeTab />,
    "Top Chart": <TopChart />,
    "Favorites": <FavoriteTab />,
}