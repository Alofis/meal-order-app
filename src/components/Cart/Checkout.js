import classes from './Checkout.module.css'
import { useRef, useState } from 'react';

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true  
    })

    const isEmpty = value => value.trim() === '';
    const isFiveChars = value => value.trim().length === 5;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostCode = postCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostCodeIsValid = isFiveChars(enteredPostCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostCodeIsValid
        })
        
        const isFormValid = enteredNameIsValid && enteredStreetIsValid && enteredPostCodeIsValid && enteredCityIsValid;

        if (!isFormValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostCode
        })
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

    console.log(props)
    return (
        <form className={classes.form}onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}></input>
                {!formInputsValidity.name && <p>Please enter a valid Name.</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='name'>Street</label>
                <input type='text' id='street' ref={streetInputRef}></input>
                {!formInputsValidity.street && <p>Please enter a valid Street.</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='name'>Postal Code</label>
                <input type='text' id='postal' ref={postCodeInputRef}></input>
                {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code - 5 chars.</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='name'>City</label>
                <input type='text' id='city' ref={cityInputRef}></input>
                {!formInputsValidity.city && <p>Please enter a valid City</p>}
            </div>
            <div className={classes.actions}>
            <button type='button' onClick={props.onCancel} className={classes.button}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;