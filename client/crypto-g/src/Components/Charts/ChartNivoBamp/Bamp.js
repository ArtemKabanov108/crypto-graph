import React from "react";
import { ResponsiveBump } from '@nivo/bump'
import {colors} from "../../../styles-common/common.style";
import {neonTheme} from "../../../styles-common/themesCharts/themesForCharts";

export const MyResponsiveBump = ({ data }) => {
    return (
        <ResponsiveBump
            data={data}
            theme={neonTheme}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            lineWidth={5}
            activeLineWidth={6}
            inactiveLineWidth={3}
            opacity={0.45}
            inactiveOpacity={0.5}
            startLabelPadding={15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            endLabelTextColor={colors.textForLabels}
            startLabelTextColor={colors.textForLabels}
            enableGridX={false}
            enableGridY={false}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ranking',
                legendPosition: 'middle',
                legendOffset: -40
            }}
        />


    )
}