import React from "react";
import classes from '../styles/component/SearchField.module.css'

function SearchField(props: any) {
    return (
        <input onClick={props.onSearchFieldClickHandler} onFocus={(event) => event.target.select()} placeholder={'Search Location'} className={classes.input}/>
    );
}

export default SearchField;
