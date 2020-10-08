import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import { getAllWeights } from '../utils/requests'
import { useDispatch, useSelector } from 'react-redux'
import { setEntries } from '../reducers/entryReducer'
import ChartButton from './ChartButton'
import MainTable from './MainTable'



const Main = () => {
    const dispatch = useDispatch()

    const defaultChartStart = 7

    let initAxisMin = new Date()
    initAxisMin.setDate(initAxisMin.getDate() - defaultChartStart)

    const [axisMin, setAxisMin] = useState(initAxisMin)
    useEffect(() => {
        const getData = async () => {
            const data = await getAllWeights()
            data ? dispatch(setEntries([...data])) : alert('Error loading data, first refresh then reach out to tech.')
        }
        getData()
    }, [dispatch])

    let data = useSelector(state => state.entries)
    if (data.length) {
        return (
            <main id="main" className="container">
                <div id="main--chart">
                    <Chart
                        width={'100%'}
                        id="weightChart"
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        rows={[
                            ...data
                                .sort((a, b) => a.Date - b.Date)
                                .map(item => {
                                    let date = new Date(item.Date)
                                    return [date, item.Weight]
                                })
                        ]}
                        columns={[
                            {
                                type: "date",
                                label: "Date"
                            },
                            {
                                type: "number",
                                label: "Weight"
                            }
                        ]}
                        options={{
                            curveType: 'function',
                            legend: {
                                position: 'none'
                            },
                            hAxis: {
                                format: 'MM/dd',
                                viewWindow: {
                                    min: axisMin
                                }
                            },
                            vAxis: {
                                viewWindowMode: 'pretty'
                            },
                            colors: ['#025C93'],
                            // colors: ['#3B7C12'],
                            pointsVisible: true
                        }}
                    />
                </div>
                <div className="main--chart--buttons">
                    <ChartButton timeFrame={defaultChartStart} setTimeFrame={setAxisMin} label="Week" selected={true} />
                    <ChartButton timeFrame={30} setTimeFrame={setAxisMin} label="Month" />
                    <ChartButton timeFrame={90} setTimeFrame={setAxisMin} label="3 Months" />
                </div>
                <MainTable />
            </main>
        )
    }
    else {
        return (
            <main id="main" className="container">
            </main>
        )
    }

}

export default Main
