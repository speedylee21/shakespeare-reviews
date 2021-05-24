import {Pie} from "@nivo/pie";
import React from 'react';

const PieChart = ({data, onClick}) => {

    const toNivoPie = (groupedData) => {
        return Object.keys(groupedData).map(key => {
            return {
                id: key,
                value: groupedData[key] ? groupedData[key].length : 0
            }
        });
    }

    return <Pie
        height={400}
        width={400}
        data={toNivoPie(data)}
        onClick={onClick}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.3}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'yellow_green' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}>
    </Pie>
}

export default PieChart;
