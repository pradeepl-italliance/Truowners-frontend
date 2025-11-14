// src/components/pages/other/SubscriptionPlans.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initiateRazorpayPayment } from "../../../config/razorpay/payments"; 
import PayButton from "../other/PayNowButton"; // Import your PayButton component
import "./SubscriptionPlans.css";

const plans = [
  {
    name: "Silver Plan",
    price: "₹599",
    gst: "+18% GST",
    includes: "Contact numbers of 6 houses",
    validity: "15 days",
    color: "#f5f5f5",
    buttonColor: "#555555", 
    headingColor: "#e74c3c"
  },
  {
    name: "Gold Plan",
    price: "₹1199",
    gst: "+18% GST",
    includes: "Contact numbers of 19 houses",
    validity: "15 days",
    color: "#fff8e7",
    buttonColor: "linear-gradient(90deg, #f7b733, #fc4a1a)", 
    headingColor: "#3498db"
  },
  {
    name: "Diamond Plan",
    price: "₹1799",
    gst: "+18% GST",
    includes: "Contact numbers of 25 houses",
    validity: "15 days",
    color: "#f5f5f5",
    buttonColor: "#3498db", 
    headingColor: "#e74c3c"
  }
];

const SubscriptionPlans = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    const amount = parseInt(plan.price.replace("₹",""));
    initiateRazorpayPayment({
      amount,
      name: plan.name,
      description: plan.includes,
      callback: (response) => {
        if (response.razorpay_payment_id) {
          navigate("/subscription/success", { state: { planName: plan.name, paymentId: response.razorpay_payment_id } });
        } else {
          navigate("/subscription/error", { state: { planName: plan.name } });
        }
      }
    });
  };

  return (
    <section className="subscription-section">
      <div className="subscription-overview">
        <h2 className="subscription-section-title">Subscription Plans Overview</h2>
        <p className="subscription-section-description">
          We offer three subscription plans to provide access to property contact information.
          Each plan includes a limited number of house contact details and has a validity period of 15 days.
        </p>
      </div>

      <div className="subscription-plans-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="subscription-plan-card"
            style={{ backgroundColor: plan.color }}
          >
            <div className="subscription-plan-header">
              <h3 className="subscription-plan-name" style={{ color: plan.headingColor }}>{plan.name}</h3>
              <p className="subscription-plan-price">
                {plan.price} <span className="subscription-gst">{plan.gst}</span>
              </p>
            </div>
            <div className="subscription-plan-body">
              <p className="subscription-plan-includes"><strong>Includes:</strong> {plan.includes}</p>
              <p className="subscription-plan-validity"><strong>Validity:</strong> {plan.validity}</p>
              <button
                className="subscription-subscribe-button"
                style={{ background: plan.buttonColor }}
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --------------------- Pay Now Button Below Cards --------------------- */}
      <div className="subscription-paynow-container">
        <PayButton /> {/* Opens your PayButton popup */}
      </div>

      <div className="subscription-note">
        <p>
          All plans are valid for 15 days.{" "}
          <span className="subscription-tnc-link" onClick={() => setShowModal(true)}>T&C apply</span>
        </p>
      </div>

      {showModal && (
        <div className="subscription-modal-overlay">
          <div className="subscription-modal-content-light">
            <button className="subscription-close-modal-light" onClick={() => setShowModal(false)}>X</button>
            <h2>Terms and Conditions</h2>
            <div className="subscription-modal-summary-light">
              <p>
                TruOwners includes TruOwners Technologies Solutions, registered in Bengaluru, India, including its officers, directors, employees, and representatives.
              </p>
              <p>
                Privacy Policy refers to the privacy policy described in detail on our site.
              </p>
              <p>
                Account refers to the account created on the Site by the User, registered and approved by TruOwners.
              </p>
              <p>
                Agreement includes Terms and Conditions, Privacy Policy, and any mutually agreed terms related to our services.
              </p>
              <p style={{ marginTop: "15px" }}>
                <Link to="/termcondition" className="subscription-detailed-tnc-link">
                  Click here for detailed Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubscriptionPlans;
