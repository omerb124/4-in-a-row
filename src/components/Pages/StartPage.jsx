import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';
import NiceBox from '../Utils/NiceBox.jsx';

function StartPage(props) {
    const text = <div>

        <p>טוב, אין לנו הרבה מה להגיד תכלס, לא נשקר לכם.&nbsp;
        אנחנו רק רוצים לבדוק את הניווט בריאקט.
    </p>
        <p>בשביל שהמשחק יראה רציני צריך הרבה טקסט, אז בואו נדביק שוב את השורות האלו:</p>
        <p>טוב, אין לנו הרבה מה להגיד תכלס, לא נשקר לכם.&nbsp;
            אנחנו רק רוצים לבדוק את הניווט בריאקט.
    </p>
        <p>טוב, אין לנו הרבה מה להגיד תכלס, לא נשקר לכם.&nbsp;
            אנחנו רק רוצים לבדוק את הניווט בריאקט.
    </p>
    </div>;
    const more = <div id="actionButtons" className="col-sm-9 mx-auto mb-2">
        <Link to='/create'>
            <button className="actionBtn">
                יאללה נו תן לי לשחק כבר
    </button>
        </Link>
        <button className="actionBtn" onClick={() => window.location = "http://piv.pivpiv.dk"}>
            לא רוצה יאללה ביי
</button>
    </div>;
    return (
        <NiceBox
            title="ברוך הבא למשחק דווקא לא רע בכלל!"
            text={text}
            more={more}
        />
    );
}

export default StartPage;