import React, {useState} from "react";
import classes from '../styles/component/FilterContainer.module.css'
import SearchField from "./SearchField";
import {FilterSelection, getToday, getYesterday} from "../App";

const DEFAULT_SELECT_COLOR = 'rgb(157,157,157)'



function FilterContainer({currentFilterSelection, setCurrentFilterSelection}: FilterContainerProps) {
    const [open, setOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isPredefinedActive, setIsPredefinedActive] = useState(false)
    const [isSelectionActive, setIsSelectionActive] = useState(false)
    const [isDateSelectionActive, setIsDateSelectionActive] = useState(false)
    const [isPredefinedDateSelectionActive, setIsPredefinedDateSelectionActive] = useState(false)
    const onOpenClickHandler = () => {
        setOpen(!open)
        setIsSearchActive(true)
        setIsPredefinedActive(false)
        setIsSelectionActive(false)
        setIsDateSelectionActive(true)
        setIsPredefinedDateSelectionActive(false)
        return
    }
    const onSearchFieldClickHandler = () => {
        setIsSearchActive(true)
        setIsPredefinedActive(false)
        setIsSelectionActive(false)
    }
    const onPredefinedClickHandler = () => {
        setIsSearchActive(false)
        setIsPredefinedActive(true)
        setIsSelectionActive(false)
    }
    const onSelectionClickHandler = () => {
        setIsSearchActive(false)
        setIsPredefinedActive(false)
        setIsSelectionActive(true)
    }
    const onDateSelectionClickHandler = () => {
        setIsDateSelectionActive(true)
        setIsPredefinedDateSelectionActive(false)
    }
    const onPredefinedDateSelectionClickHandler = () => {
        setIsPredefinedDateSelectionActive(true)
        setIsDateSelectionActive(false)
    }
    const test = open ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: '1px solid rgba(166, 166, 166, 1)'
    } : {}

    const test2 = isSearchActive ? {background: DEFAULT_SELECT_COLOR} : {}



    return (
        <div className={classes.container}>
            <div className={classes.containerSearchField}
                 style={{...test, ...test2}}
            >
                <div className={classes.rowDisplay}>
                    <SearchField onSearchFieldClickHandler={onSearchFieldClickHandler}/>
                    <button className={classes.button}>find</button>
                    <button className={classes.button} onClick={onOpenClickHandler}>open</button>
                </div>
            </div>
            {open &&
                <>
                    <div className={classes.containerPredefind}
                         style={isPredefinedActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                    >
                        <div className={classes.rowDisplay}>
                            <text fontSize={'10px'}>Predefined Areas:</text>
                            <select onClick={onPredefinedClickHandler} className={classes.select}>
                                <option>Chemnitz</option>
                                <option>Dresden</option>
                                <option>Leipzig</option>
                            </select>
                        </div>
                    </div>
                    <div className={classes.containerOtherSearchOptions}
                         style={isSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                    >
                        <div className={classes.rowDisplay}>
                            <text fontSize={'10px'}>Rectangle Selection:</text>
                            <button className={classes.button} onClick={onSelectionClickHandler}>selection</button>
                        </div>
                    </div>
                    {/*<div className={classes.containerDates}>*/}
                    <div className={classes.containerDateSelection}
                         style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}>
                        <text>Date Range:</text>
                        <div className={classes.rowDisplay}
                             style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                        >
                            <text>Start Date:</text>
                            <input defaultValue={getYesterday()} style={{fontSize: '10px'}} type={"date"} onClick={onDateSelectionClickHandler}/>
                        </div>
                        <div className={classes.rowDisplay}
                             style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                        >
                            <text>End Date:</text>
                            <input defaultValue={getToday()} style={{fontSize: '10px'}} type={"date"} onClick={onDateSelectionClickHandler}/>
                        </div>
                    </div>
                    <div className={classes.containerPredefinedDateSelection}
                         style={isPredefinedDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                    >
                        <text
                            style={isPredefinedDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                        >Predefined Date Range:
                        </text>
                        <select className={classes.select}
                                onClick={onPredefinedDateSelectionClickHandler}
                        >
                            <option>1 Week</option>
                            <option>2 Weeks</option>
                            <option>1 Month</option>
                        </select>
                    </div>
                    {/*</div>*/}
                </>
            }
        </div>
    );
}

export default FilterContainer;

export type FilterContainerProps = {
    currentFilterSelection: FilterSelection,
    setCurrentFilterSelection: any
}
