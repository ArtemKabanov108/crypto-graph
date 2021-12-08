export const neonTheme = {
    background: 'transparent',
    fontFamily: 'sans-serif',
    fontSize: 13,
    textColor: '#ffffff',
    axis: {
        domain: {
            line: {
                stroke: 'transparent',
                strokeWidth: 1
            }
        },
        ticks: {
            line: {
                stroke: '#ffffff',
                strokeWidth: 1
            },
            text: {}
        },
        legend: {
            text: {
                fontSize: 12
            }
        }
    },
    grid: {
        line: {
            stroke: '#dddddd',
            strokeWidth: 1
        }
    },
    legends: {
        text: {
            fill: '#ffffff'
        }
    },
    labels: {
        text: {}
    },
    markers: {
        lineColor: '#000000',
        lineStrokeWidth: 1,
        text: {}
    },
    dots: {
        text: {}
    },
    tooltip: {
        container: {
            background: 'white',
            color: 'inherit',
            fontSize: 'inherit',
            borderRadius: '2px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
            padding: '5px 9px'
        },
        basic: {
            whiteSpace: 'pre',
            display: 'flex',
            alignItems: 'center'
        },
        table: {},
        tableCell: {
            padding: '3px 5px'
        }
    },
    crosshair: {
        line: {
            stroke: '#ffffff',
            strokeWidth: 1,
            strokeOpacity: 0.75,
            strokeDasharray: '6 6'
        }
    },
    annotations: {
        text: {
            fontSize: 13,
            outlineWidth: 2,
            outlineColor: '#ffffff'
        },
        link: {
            stroke: '#000000',
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: '#ffffff'
        },
        outline: {
            fill: 'none',
            stroke: '#000000',
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: '#ffffff'
        },
        symbol: {
            fill: '#000000',
            outlineWidth: 2,
            outlineColor: '#ffffff'
        }
    }
}