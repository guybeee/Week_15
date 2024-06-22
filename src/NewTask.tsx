import { MouseEvent, useState } from 'react'

export default function NewTask({addTask}: {addTask: (newTask: {text: string}) => void}) {
    const [textValue, setTextValue] = useState("")
    
    const submit = (event: MouseEvent) => {
        // prevent default event refresh
        event.preventDefault()
        // textValue = input value entered
        addTask({text: textValue})
    }


    return (
        // value={textValue} onChange={(event) => setTextValue(event.target.value)}
        // in order to tie the text value together 
        <form className="d-flex gap-1 my-1" >
            <input value={textValue} onChange={(event) => setTextValue(event.target.value)}type="text" placeholder="Task" className="form-control-sm"/>
            <button className="btn btn-success btn-sm" onClick={submit}>Add Task</button>
        </form>
    )
}