import React from "react";
import { Line } from "react-chartjs-2"
import "./linechart.css"

const LineChart = (props) => {

    // console.log(props.dataPoints)

    const [NBobj, DMobj, A1obj] = props.dataPoints;



    const yearLabels = props.dataPoints[0].map(el => {
        return el.year
    })


    //stores count per year  only in a new array 
    const NBcount = NBobj.map(el => {
        return el.count
    })

    const DMcount = DMobj.map(el => {
        return el.count
    })

    const A1count = A1obj.map(el => {
        return el.count
    })

    function determineFontSize() {
        const width = window.innerHeight;
        const size = Math.round(width / 55);
        return size
    }

    function determineChartHeight() {

        const width = window.innerWidth;
        console.log(width)

        if (width >= 1100) {
            console.log(5)
            return 5
        }
        if (width >= 768 && width <= 1100) {
            console.log(6)
            return 6
        }
        if (width >= 480 && width < 768) {
            console.log(7)
            return 7
        }
        if (width <= 480) {
            return 8.2
        }
        else {
            console.log("else 7")
            return 7;
        }

    }

    return (
        <div className="outter_linegraph_wrapper">

            <div className="lineGraph_wrapper">
                <h3 className="linechart_title">
                    City Wide Construction Data since 1990
                </h3>
                <Line
                    height={determineChartHeight()}
                    width={5}
                    data={{
                        //labels: ["Demolitions", "New Buildings", "Building Alterations"],
                        labels: yearLabels,
                        //labels: [1990, 1991, 1992, 1993],
                        datasets: [
                            {
                                label: "New Buildings",

                                data: NBcount,
                                //data: [1, 2, 4, 5, 6],
                                backgroundColor: [
                                    "blue" // "#2F78CE", "#EB9B3B"
                                ],
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.2
                            },
                            {
                                label: "Demolitions",
                                data: DMcount,
                                //data: [1, 2, 4, 5, 6],
                                backgroundColor: [
                                    "red" // "#2F78CE", "#EB9B3B"
                                ],
                                borderColor: "#BC6176",
                                tension: 0.2
                            },
                            {
                                label: "Building Alterations",
                                data: A1count,
                                backgroundColor: [
                                    "orange"
                                ],
                                borderColor: "#D5951F",
                                tension: 0.2
                            }

                        ],
                        //labels: ["Demolitions", "New Buildings", "Building Alterations"],
                    }}
                    options={{
                        maintainAspectRation: false,
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    data: ["Demolitions", "New Buildings", "Building Alterations"],
                                    color: "white",
                                    font: {
                                        size: determineFontSize()
                                    },
                                    padding: 25
                                }
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    color: 'white'
                                },
                            },
                            x: {
                                ticks: {
                                    color: 'white'
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>

    )
}

export default LineChart;
