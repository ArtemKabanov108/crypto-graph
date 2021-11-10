import React from "react";
import { ResponsiveLine } from '@nivo/line'
import {colors} from "../../../styles-common/common.style";
import {neonTheme} from "../../../styles-common/themesCharts/themesForCharts";

export const MyResponsiveBump = ({data}) => {
    return (
        <ResponsiveLine
            data={data}
            theme={neonTheme}
            colors={["hsl(54,100%,65%)"]}
            margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            enableGridX={false}
            enableGridY={false}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: -60,
                legendPosition: ''
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            debugMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'White',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: 'black',
                                symbolBorderColor: 'White',
                                itemBackground: 'White',
                                itemOpacity: 0.8
                            }
                        }
                    ]
                }
            ]}
        />
        // <ResponsiveBump
        //     data={data}
        //     theme={neonTheme}
        //     colors={["hsl(54,100%,65%)"]}
        //     margin={{top: 40, right: 90, bottom: 40, left: 80}}
        //     lineWidth={5}
        //     activeLineWidth={6}
        //     inactiveLineWidth={3}
        //     opacity={0.45}
        //     inactiveOpacity={0.5}
        //     startLabelPadding={15}
        //     pointSize={10}
        //     activePointSize={16}
        //     inactivePointSize={0}
        //     pointColor={{theme: 'background'}}
        //     pointBorderWidth={3}
        //     activePointBorderWidth={3}
        //     pointBorderColor={{from: 'serie.color'}}
        //     startLabelTextColor={colors.textForLabels}
        //     enableGridX={false}
        //     enableGridY={false}
        //     axisTop={{
        //         tickSize: 5,
        //         tickPadding: 5,
        //         tickRotation: 0,
        //         legend: '',
        //         legendPosition: 'middle',
        //         legendOffset: -36
        //     }}
        //     axisRight={null}
        //     axisBottom={{
        //         tickSize: 5,
        //         tickPadding: 5,
        //         tickRotation: 0,
        //         legend: '',
        //         legendPosition: 'middle',
        //         legendOffset: 32
        //     }}
        //     axisLeft={{
        //         tickSize: 0,
        //         tickPadding: 8,
        //         tickRotation: 0,
        //         legend: 'USD',
        //         legendPosition: 'middle',
        //         legendOffset: -70,
        //     }}
        // />
    )
}