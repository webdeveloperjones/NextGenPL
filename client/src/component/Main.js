import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import { getAllWeights } from '../utils/requests'
import { useDispatch, useSelector } from 'react-redux'
import { setEntries } from '../reducers/entryReducer'


const ChartButton = ({ label, selected, setTimeFrame, timeFrame }) => {
    const handleClick = e => {
        console.log(e.currentTarget)

        let allBtns = document.getElementsByClassName('main--chart--buttons--btn')
        for (let i = 0; i < allBtns.length; ++i) {
            if (allBtns[i].classList.contains('selected')) {
                allBtns[i].classList.toggle('selected')
                allBtns[i].classList.toggle('closed')
            }
        }
        let thisBtn = e.currentTarget
        if (thisBtn.classList.contains('closed')) {
            thisBtn.classList.toggle('closed')
        }
        thisBtn.classList.toggle('selected')

        let newMin = new Date()
        newMin.setDate(newMin.getDate() - timeFrame)
        setTimeFrame(newMin)


    }

    const classstr = selected ? "main--chart--buttons--btn selected" : "main--chart--buttons--btn"
    return (
        <button onClick={handleClick} className={classstr}><span>{label}</span></button>
    )
}



const Main = () => {
    const dispatch = useDispatch()

    let initAxisMin = new Date()
    initAxisMin.setDate(initAxisMin.getDate() - 7)

    const [axisMin, setAxisMin] = useState(initAxisMin)
    useEffect(() => {
        const getData = async () => {
            const data = await getAllWeights()
            data ? dispatch(setEntries([...data])) : alert('Error loading data, first refresh then reach out to tech.')
        }
        getData()
    }, [dispatch])

    let data = useSelector(state => state.entries)

    console.log('amin', axisMin)
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
                            colors: ['#3B7C12'],
                            pointsVisible: true
                        }}
                    />
                </div>
                <div className="main--chart--buttons">
                    <ChartButton timeFrame={7} setTimeFrame={setAxisMin} label="Week" selected={true} />
                    <ChartButton timeFrame={30} setTimeFrame={setAxisMin} label="Month" />
                    <ChartButton timeFrame={90} setTimeFrame={setAxisMin} label="3 Months" />
                </div>
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
