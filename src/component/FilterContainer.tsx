import React, {useState} from "react";
import classes from '../styles/component/FilterContainer.module.css'
import SearchField from "./SearchField";
import {FilterSelection, getToday, getYesterday, INITIAL_VIEW_STATE} from "../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import exampleData from '../export.json'
import {GeoJsonLayer} from '@deck.gl/layers/typed';
import {
    faMagnifyingGlass,
    faChevronDown,
    faChevronUp,
    faPenToSquare,
    faArrowsToCircle,
    faVectorSquare,
    faFilter,
    faFilterCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import {layer} from "@fortawesome/fontawesome-svg-core";

const DEFAULT_SELECT_COLOR = 'rgb(157,157,157)'


function FilterContainer({
                             layers,
                             setLayers,
                             onViewStateChange,
                             currentFilterSelection,
                             setCurrentFilterSelection
                         }: FilterContainerProps) {


    // Chemnitz
    const CHEMNITZ_VIEW_STATE = {
        longitude: 12.9209,
        latitude: 50.8282,
        zoom: 10,
        pitch: 0,
        bearing: 0
    };

    // Leipzig
    const DRESDEN_VIEW_STATE = {
        longitude: 13.7373,
        latitude: 51.0504,
        zoom: 10,
        pitch: 0,
        bearing: 0
    };

    // Dresden
    const LEIPZIG_VIEW_STATE = {
        longitude: 12.3731,
        latitude: 51.3397,
        zoom: 10,
        pitch: 0,
        bearing: 0
    };

    const geoLayer = new GeoJsonLayer({
        id: 'GeoJsonLayer',
        data: exampleData,
        // extruded: true,
        // filled: true,
        // getElevation: 30,
        // getFillColor: [245, 141, 66],
        getLineColor: [14, 69, 19],
        // getLineWidth: 20,
        // getPointRadius: 4,
        // getTextSize: 12,
        lineWidthMinPixels: 1,
    })

    const [open, setOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isPredefinedActive, setIsPredefinedActive] = useState(false)
    const [isSelectionActive, setIsSelectionActive] = useState(false)
    const [isDateSelectionActive, setIsDateSelectionActive] = useState(false)
    const [isPredefinedDateSelectionActive, setIsPredefinedDateSelectionActive] = useState(false)
    const [isDrawingRectangle, setIsDrawingRectangle] = useState(false)
    const [isEnterCoordinatesActive, setIsEnterCoordinatesActive] = useState(false)
    const [isBoundingBoxShown, setIsBoundingBoxShown] = useState(false)
    const [predefinedAreaSelectValue, setPredefinedAreaSelectValue] = useState('Chemnitz')
    const [predefinedDateSelectValue, setPredefinedDateSelectValue] = useState('1 Week')
    const [startDate, setStartDate] = useState(getYesterday())
    const [endDate, setEndDate] = useState(getToday())
    const onOpenClickHandler = () => {
        setOpen(!open)
        setIsSearchActive(true)
        setIsPredefinedActive(false)
        setIsSelectionActive(false)
        setIsDateSelectionActive(true)
        setIsPredefinedDateSelectionActive(false)
        setIsDrawingRectangle(false)
        setIsEnterCoordinatesActive(false)
    }
    const onSearchFieldClickHandler = () => {
        setIsSearchActive(true)
        setIsPredefinedActive(false)
        setIsSelectionActive(false)
        setIsDrawingRectangle(false)
    }

    const onEnterBoundingBoxCoordinatesClickHandler = () => {
        setIsEnterCoordinatesActive(!isEnterCoordinatesActive)
        onSearchFieldClickHandler()
        if (isEnterCoordinatesActive)
            setIsBoundingBoxShown(false)
        if (isBoundingBoxShown)
            return
        else
            setIsBoundingBoxShown(!isBoundingBoxShown)

    }
    const onPredefinedClickHandler = () => {
        setIsSearchActive(false)
        setIsPredefinedActive(true)
        setIsSelectionActive(false)
        setIsDrawingRectangle(false)
        setIsEnterCoordinatesActive(false)
        setIsBoundingBoxShown(false)
    }
    const onSelectionClickHandler = () => {
        setIsDrawingRectangle(!isDrawingRectangle)
        setIsSearchActive(false)
        setIsPredefinedActive(false)
        setIsSelectionActive(true)
        setIsEnterCoordinatesActive(false)
        setIsBoundingBoxShown(true)
    }
    const onDateSelectionClickHandler = () => {
        setIsDateSelectionActive(true)
        setIsPredefinedDateSelectionActive(false)
        setIsDrawingRectangle(false)
        setIsEnterCoordinatesActive(false)
    }
    const onPredefinedDateSelectionClickHandler = () => {
        setIsPredefinedDateSelectionActive(true)
        setIsDateSelectionActive(false)
        setIsDrawingRectangle(false)
        setIsEnterCoordinatesActive(false)
    }

    const onSelectLocationHandler = (e: any) => {

        if (e?.target?.value) {
            const key = e?.target?.value
            if (key === 'Chemnitz') {
                setPredefinedAreaSelectValue('Chemnitz')
                onViewStateChange(CHEMNITZ_VIEW_STATE)
            }
            if (key === 'Dresden') {
                setPredefinedAreaSelectValue('Dresden')
                onViewStateChange(DRESDEN_VIEW_STATE)
            }
            if (key === 'Leipzig') {
                setPredefinedAreaSelectValue('Leipzig')
                onViewStateChange(LEIPZIG_VIEW_STATE)
            }
        }
    }

    const onSelectDateHandler = (e: any) => {

        if (e?.target?.value) {
            const key = e?.target?.value
            if (key === '1 Week') {
                setPredefinedDateSelectValue('1 Week')
            }
            if (key === '2 Weeks') {
                setPredefinedDateSelectValue('2 Weeks')
            }
            if (key === '1 Month') {
                setPredefinedDateSelectValue('1 Month')
            }
        }
    }

    const resetFiltersAndViewState = () => {
        setLayers([])
        onViewStateChange(INITIAL_VIEW_STATE)
        setIsSearchActive(true)
        setIsPredefinedActive(false)
        setIsSelectionActive(false)
        setIsDateSelectionActive(true)
        setIsPredefinedDateSelectionActive(false)
        setIsDrawingRectangle(false)
        setIsEnterCoordinatesActive(false)
        setIsBoundingBoxShown(false)
        setPredefinedAreaSelectValue('Chemnitz')
        setPredefinedDateSelectValue('1 Week')
        setStartDate(getYesterday())
        setEndDate(getToday())
    }

    const filterButtonClickHandler = () => {
        setLayers([...layers, geoLayer])
        onViewStateChange(CHEMNITZ_VIEW_STATE)
    }

    const test = open ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: '1px solid rgba(166, 166, 166, 1)'
    } : {}

    const test2 = isSearchActive ? {background: DEFAULT_SELECT_COLOR} : {}


    return (
        <>
            <div className={classes.container}>
                <div className={classes.containerSearchField}
                     style={{...test, ...test2}}
                >
                    <div className={classes.rowDisplay}>
                        <button
                            className={classes.button}
                            style={isEnterCoordinatesActive ? {background: 'rgb(121,121,121)'} : {}}
                            onClick={onEnterBoundingBoxCoordinatesClickHandler}
                        >
                            <FontAwesomeIcon icon={faArrowsToCircle}></FontAwesomeIcon>
                        </button>
                        <SearchField
                            onSearchFieldClickHandler={onSearchFieldClickHandler}
                            placeHolder={isEnterCoordinatesActive ? '{xx.xx;yy.yy},{xx.xx;yy.yy}' : 'Search location'}
                            toolTip={
                                'Enter location as word or coordinates! ' +
                                'To enter coordinates activate "search coordinates" ' +
                                'Coordinates should be the North-West and ' +
                                'South East Points of the Bounding Box ' +
                                'entered like "{xx.xx;yy.yy},{xx.xx;yy.yy}"'
                            }
                        />
                        <button
                            className={classes.button}
                            onClick={() => {
                                onViewStateChange(CHEMNITZ_VIEW_STATE)
                            }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </button>
                        <button
                            className={classes.button}
                            style={isBoundingBoxShown ? {background: 'rgb(121,121,121)'} : {}}
                            onClick={() => {
                                setIsBoundingBoxShown(!isBoundingBoxShown)
                            }}
                        >
                            <FontAwesomeIcon icon={faVectorSquare}></FontAwesomeIcon>
                        </button>
                        <button
                            className={classes.button}
                            onClick={onOpenClickHandler}
                            style={open ? {background: 'rgb(121,121,121)'} : {}}>
                            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>
                {open &&
                    <>
                        <div className={classes.containerPredefind}
                             style={isPredefinedActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                        >
                            <div className={classes.rowDisplay}>
                                <text fontSize={'10px'}>Predefined Areas:</text>
                                <select value={predefinedAreaSelectValue} onChange={onSelectLocationHandler}
                                        onClick={onPredefinedClickHandler}
                                        className={classes.select}>
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
                                <button className={classes.button}
                                        style={isDrawingRectangle ? {background: 'rgb(121,121,121)'} : {}}
                                        onClick={onSelectionClickHandler}>
                                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>
                        <div className={classes.containerDateSelection}
                             style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}>
                            <text>Date Range:</text>
                            <div className={classes.rowDisplay}
                                 style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                            >
                                <text>Start Date:</text>
                                <input defaultValue={getYesterday()} style={{fontSize: '10px'}} type={"date"}
                                       onClick={onDateSelectionClickHandler}
                                       onChange={(e: any) => {
                                           setStartDate(e.target.value)
                                       }}
                                       value={startDate}/>
                            </div>
                            <div className={classes.rowDisplay}
                                 style={isDateSelectionActive ? {background: DEFAULT_SELECT_COLOR} : {}}
                            >
                                <text>End Date:</text>
                                <input defaultValue={getToday()} style={{fontSize: '10px'}} type={"date"}
                                       onClick={onDateSelectionClickHandler}
                                       onChange={(e: any) => {
                                           setEndDate(e.target.value)
                                       }}
                                       value={endDate}/>
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
                                    value={predefinedDateSelectValue}
                                    onChange={onSelectDateHandler}
                            >
                                <option>1 Week</option>
                                <option>2 Weeks</option>
                                <option>1 Month</option>
                            </select>
                        </div>
                    </>
                }
                <div style={{width: '100%', display: "flex", justifyContent: "space-around"}}>
                    <div className={classes.rowDisplayApplyFilters}>
                        <div className={`${classes.containerApplyFilters}`}>
                            <button className={classes.button} onClick={filterButtonClickHandler}>
                                <FontAwesomeIcon size={'2x'} icon={faFilter}></FontAwesomeIcon>
                            </button>
                            <button className={classes.button} onClick={resetFiltersAndViewState}>
                                <FontAwesomeIcon size={'2x'} icon={faFilterCircleXmark}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterContainer;

export type FilterContainerProps = {
    currentFilterSelection: FilterSelection,
    setCurrentFilterSelection: any,
    onViewStateChange: any,
    setLayers: any,
    layers: any[]
}
