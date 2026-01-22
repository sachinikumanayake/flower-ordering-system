import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../../../../shared/context/StoreContext";
const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId"); 

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

   
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { orderId, success });

        if (response.data.success) {
            navigate("/myorders"); 
        } else {
            alert("Payment Verification Failed. Please try again.");
            navigate("/");
        }
    }

    useEffect(() => {
        if (orderId && (success === "true" || success === "false")) {
            verifyPayment();
        } else {
            navigate("/");
        }
    }, [orderId, success, navigate]); 

    return (
        <div className='verify'>
            <div className="spinner">
            </div>
            <p>Verifying payment status...</p>
        </div>
    )
}

export default Verify;