/**
 * Creates a Contact page that allows users to communicate with the creators of
 *  this website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, {useState} from 'react';
import styles from '../../assets/Information.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * The page that contains information about contacting the creators of the site
 * @returns This contact page
 */
const Contact = () => {

    const [loading, setLoading] = useState(true);

    /**
     * Finds if the user entered the correct Captcha selection
     */
    const handleChange = () => {
        if (loading !== false)
            setLoading(false);
    }

    /**
     * What happens when the users click the submit button
     */
    const handleSubmit = () => {

    }

    return (
        <>
            <div className = {styles.greenBlock}>  
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <h5 className="text-light">
                            Contact
                        </h5>
                    </div>
                </div>
            </div>
            <div className = "container mt-5">
                <div className = "mx-auto col-md-8 col-sm-10 col-xs-12">
                    <h2>Questions or concerns?</h2>
                    <form className = "mt-3" onSubmit = { handleSubmit }>
                        <div className="form-group">
                        <label htmlFor="form1">Email</label>             
                            <input type="email" className="form-control" id="form1" placeholder="example@email.com" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="form2">What should we know?</label>
                            <textarea id = "form2" placeholder = "Enter your comments here." name="description" type="text" className="form-control" minLength = "1" required />
                        </div>
                        <ReCAPTCHA sitekey = {process.env.REACT_APP_RECAPTCHA_PUBLIC} onChange={handleChange}/>
                        <button disabled={loading} className="btn btn-primary w-100 mt-3" type ="submit">Submit</button>
                    </form>
                </div>
            </div>
   
        </>
    )
}

export default Contact; 