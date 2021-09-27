/**
 * Creates an About page that will show information about this website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import styles from "../../assets/Information.module.css";

/**
 * The webpage containing information about this website
 * @returns This about page
 */
const About = () => {
    return (
        <div className={styles.blueBlock}>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <h5 className="text-light">About</h5>
                </div>
            </div>
        </div>
    );
};

export default About;
