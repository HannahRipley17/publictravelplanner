import React, {useState} from 'react';
import './Welcome.css';

const WelcomeScreen = (props) => {
    const [showWelcome, setShowWelcome] = useState(true);
    let body = (
        <div className="WelcomeScreen">
            <h2>Welcome</h2>
        </div>
    );
    // setTimeout(() => {
    //     setShowWelcome(false);
    // }, 3000);

    return(
        <div>
            {/* {showWelcome ? body : null} */}
            {body}
        </div>
        // <div className="WelcomeScreen">
        //     <h2>Welcome</h2>
        // </div>
    );
};

export default WelcomeScreen;