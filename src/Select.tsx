import { on } from 'events';
import {useState, useEffect} from 'react';

import styles from "./styles.module.css";


// we are setting up the types
type SelectOption = {
    label: string
    value: any
}

type SelectProps = {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined ) => void
}



export default function Select ({value, onChange, options }: SelectProps){
    // here we are setting the default state of the dropdown menu
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    // in this function we are clearing the option inside the bar
    function clearOptions() {
        onChange(undefined)
    };

    // in this function we are selecting an option from the option list and setting is up
    // if the option is the same dont run
    function selectOption(option: SelectOption) {
        if (option !== value) onChange(option)
    };
// we run the onChange event when ever the user

    function isOptionSelected(option: SelectOption){
        return option === value
    }

    // on box open it returns highlighted to the original
    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)}, [isOpen])

    return (
        // we are using the onBlur event this runs a function when a click outside of the current element is interacted with
        <div onBlur={()=> setIsOpen(false)}
        // we are running onclick event to change the prev state which is a boolean to the opposite
        onClick={()=> setIsOpen(prev => !prev)}
        // tab index is used as the focus with tab or mouse click
        tabIndex={0} className={styles.container}> 
        {/* here we are passing down the value?.label which means the value is optional it might be there it might not. This is used to evade errors */}
        <span className={styles.value}>{value?.label}</span>
        {/* on click we are running 2 functions, the first one is to stop propagation between other elements. this stops the user from being able to click layers of elements, and just that single one */}
        <button onClick={e => { e.stopPropagation(); clearOptions();}} className={styles["clear-button"]}> &times; </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        {/* inside the classname we are running multiple styles and the 2nd one is running based on the the state isOpen is true or false */}
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
            {options.map((option, index) => (
                <li onClick={e => {e.stopPropagation(); selectOption(option); setIsOpen(false);}}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.label}
                // here we are running multiple css classes the second class runs a function which takes a boolean and if ? true run this if false run other
                className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}>
                    {option.label}
                </li>
            ))}

        </ul>
        </div>


    )

}