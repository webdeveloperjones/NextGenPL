import React, { useState } from 'react'
import { addRecord } from '../utils/requests'


const AddForm = ({ show }) => {
    const [weight, setWeight] = useState("")
    const [img, setImg] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()
        let uploadBtn = document.getElementById('addForm--form--button')
        if (!Number(weight) > 0) {
            let fieldWeight = document.getElementsByClassName('field-weight')[0]
            console.log(fieldWeight)
            if (!fieldWeight.classList.contains('error')) {
                fieldWeight.classList.toggle('error')
            }
        }
        const Data = new FormData();
        Data.append('weight', Number(weight))
        if (img.length) {
            Data.append('file', img[0])
        }
        uploadBtn.innerText = "Uploading..."
        uploadBtn.classList.toggle('uploading')

        const res = await addRecord(Data)
        if (res.status !== 201) {
            alert('error of some kind')
            return
        }
        uploadBtn.innerText = "Done!"
        uploadBtn.classList.toggle('uploading')
        uploadBtn.classList.toggle('done')
        setTimeout(() => {
            uploadBtn.classList.toggle('done')
            uploadBtn.innerText = "Upload"

        }, 3000)
        setWeight("")
        setImg([])
        let btn = document.getElementById('addButton')
        btn.classList.toggle('open')
        show(0)
    }

    return (
        <div id="addForm" className="container">
            <div className="addForm--wrapper">
                <form id="addForm--form">
                    <div className="addForm--form--field field-weight">
                        <label><span>Weight - lbs:</span><span className="required">*required</span></label>
                        <input type="number" step="0.2" value={weight} onChange={e => setWeight(e.currentTarget.value)}></input>
                    </div>
                    <div className="addForm--form--field field-image">
                        <label>Image:</label>
                        <input type="file" id="file-upload" onChange={e => setImg([...e.target.files])}></input>
                    </div>
                    <button id="addForm--form--button" onClick={handleSubmit}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default AddForm
