import { Button, Paper, useTheme } from "@mui/material"
import { useState } from "react"
import { useRecoilState } from "recoil"
import CharacterCount from "./CharacterCount"
import { themeModeState } from "./recoil/theme"
import TextInput from "./TextInput"

export default () => {
    const $ = useTheme();
    const [useInput, setUserInput] = useState(false);
    const [themeMode, setThemeMode] = useRecoilState(themeModeState);

    // const toggle = () => {
    //     setUserInput(!useInput);
    // }

    const changeTheme = () => {
        setThemeMode(themeMode === "light" ? "dark" : "light");
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CharacterCount />
                <button onClick={changeTheme} style={{ color: $.palette.primary.light }} >토글</button>
            </div>
            <p>{document.cookie}</p>
                {useInput ?  <TextInput /> : null}
            <Button variant="contained" color="error" >하이하이</Button>
            <Button variant="contained" color="primary">CARRY</Button>
            <Paper>dfsfasdfasfds??</Paper>
        </div>
    )
}