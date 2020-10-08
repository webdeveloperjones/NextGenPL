import React from 'react'

const ChartButton = ({ label, selected, setTimeFrame, timeFrame }) => {
    const handleClick = e => {
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

export default ChartButton