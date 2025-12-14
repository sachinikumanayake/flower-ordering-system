import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../../../../shared/context/StoreContext";
const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success"); // URL එකේ ඇති ?success=true/false
    const orderId = searchParams.get("orderId"); // URL එකේ ඇති &orderId=XXX

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    // -------------------------------------------------------------
    // Order Verification Function - Backend API Call
    // -------------------------------------------------------------
    const verifyPayment = async () => {
        // Backend API එකට Call කර payment තත්ත්වය යවනු ලැබේ
        const response = await axios.post(url + "/api/order/verify", { orderId, success });

        if (response.data.success) {
            // Verification සාර්ථක නම්, User ව Order History පිටුවට යොමු කරන්න
            navigate("/myorders"); 
        } else {
            // Verification අසාර්ථක නම් (Error එකක් නම්), Home පිටුවට යොමු කරන්න
            alert("Payment Verification Failed. Please try again.");
            navigate("/");
        }
    }

    // Component එක Load වන විට පමණක් මෙම Verification process එක ක්‍රියාත්මක විය යුතුයි
    useEffect(() => {
        // orderId එක සහ success status එක තිබේ නම් පමණක් verifyPayment එක ක්‍රියාත්මක කරයි
        if (orderId && (success === "true" || success === "false")) {
            verifyPayment();
        } else {
            // orderId එක හෝ success parameter එක නොමැති නම්, Home එකට යවන්න (වැරදි URL එකක් නම්)
            navigate("/");
        }
    }, [orderId, success, navigate]); // Dependencies ඇතුළත් කිරීම

    return (
        <div className='verify'>
            {/* Loading Spinner එකක් හෝ Message එකක් මෙහිදී පෙන්වන්න */}
            <div className="spinner">
                {/* CSS මඟින් spinner එකක් නිර්මාණය කරන්න. උදා: Tailwind CSS spin class එක */}
            </div>
            <p>Verifying payment status...</p>
        </div>
    )
}

export default Verify;