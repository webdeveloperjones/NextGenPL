import React from 'react'
import { useSelector } from 'react-redux'

const MainTable = () => {
    let data = useSelector(state => state.entries)

    return (
        <section id="main--table">
            <div className="main--table--row">
                <div className="main--table--row--header">Weight</div>
                <div className="main--table--row--header">Date</div>
                <div className="main--table--row--header">Image</div>
            </div>
            {
                data.length
                    ? data
                        .sort((a, b) => a.Date - b.Date)
                        .map(item => {
                            let date = new Date(item.Date)
                            return (
                                <div key={item.Date} className="main--table--row">
                                    <div className="main--table--row--field main--table--row--weight"><span>{item.Weight}</span></div>
                                    <div className="main--table--row--field main--table--row--date"><span>{date.toLocaleDateString()}</span></div>
                                    <div className="main--table--row--field main--table--row--image">
                                        {
                                            item.s3url && item.s3url.length > 0
                                                ? <a href={item.s3url} target="_blank" rel="noopener noreferrer">
                                                    <img src="/images/cameraIcon.svg" alt="Camera Icon" />
                                                </a>
                                                : false
                                        }

                                    </div>
                                </div>
                            )
                        })



                    : false
            }

        </section>
    )

}

export default MainTable