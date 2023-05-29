import React, {useState} from "react";
import classes from '../styles/component/SearchField.module.css'

function SearchField({onSearchFieldClickHandler, placeHolder, toolTip}: SearchFieldProps) {
    const [showToolTip, setShowToolTip] = useState(false)

    return (
        <>
            <input
                onClick={onSearchFieldClickHandler}
                onFocus={(event) => event.target.select()}
                placeholder={placeHolder}
                className={classes.input}
                onMouseEnter={() => {setShowToolTip(true)}}
                onMouseLeave={() => {setShowToolTip(false)}}
            />
            {showToolTip &&
                <div className={classes.tooltip}>
                    <text className={classes.text}>{toolTip}</text>
                </div>
            }
        </>
    );
}

export default SearchField;

export type SearchFieldProps = {
    onSearchFieldClickHandler: () => void
    placeHolder: string
    toolTip: string
}
