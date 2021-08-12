import React from "react";
import { ResponsiveBump } from '@nivo/bump'

export const MyResponsiveBump = ({ data }) => {
    return (
        <ResponsiveBump
            data={data}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            colors={{ scheme: 'nivo' }}
            lineWidth={5}
            activeLineWidth={6}
            inactiveLineWidth={3}
            opacity={0.45}
            inactiveOpacity={0.5}
            startLabelPadding={15}
            startLabelTextColor={"#e81111"}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
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