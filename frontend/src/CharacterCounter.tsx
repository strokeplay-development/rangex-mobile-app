import { useState } from "react"
import CharacterCount from "./CharacterCount"
import TextInput from "./TextInput"

export default () => {
    const [useInput, setUserInput] = useState(false);

    const toggle = () => {
        setUserInput(!useInput);
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CharacterCount />
                <button onClick={toggle}>토글</button>
            </div>
                {useInput ?  <TextInput /> : null}
            <p>{document.cookie}</p>
        </div>
    )
}