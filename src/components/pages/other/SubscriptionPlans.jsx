import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./SubscriptionPlans.css";

const plans = [
  {
    name: "Silver Plan",
    price: "₹599",
    gst: "+18% GST",
    includes: "Contact numbers of 6 houses",
    validity: "15 days",
    color: "#f5f5f5",
    buttonColor: "#555555", // Updated darker silver
    headingColor: "#e74c3c"
  },
  {
    name: "Gold Plan",
    price: "₹1199",
    gst: "+18% GST",
    includes: "Contact numbers of 19 houses",
    validity: "15 days",
    color: "#fff8e7",
    buttonColor: "linear-gradient(90deg, #f7b733, #fc4a1a)", // Gradient gold
    headingColor: "#3498db"
  },
  {
    name: "Diamond Plan",
    price: "₹1799",
    gst: "+18% GST",
    includes: "Contact numbers of 25 houses",
    validity: "15 days",
    color: "#f5f5f5",
    buttonColor: "#3498db", // Blue for diamond
    headingColor: "#e74c3c"
  }
];

const SubscriptionPlans = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="subscription-section">
      <div className="overview">
        <h2 className="section-title" style={{ color: "#3498db" }}>Subscription Plans Overview</h2>
        <p className="section-description">
          We offer three subscription plans to provide access to property contact information.
          Each plan includes a limited number of house contact details and has a validity period of 15 days.
        </p>
      </div>

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="plan-card"
            style={{ backgroundColor: plan.color, border: "3px solid #ccc" }} // thicker elegant border
          >
            <div className="plan-header">
              <h3 className="plan-name" style={{ color: plan.headingColor }}>{plan.name}</h3>
              <p className="plan-price">
                {plan.price} <span className="gst">{plan.gst}</span>
              </p>
            </div>
            <div className="plan-body">
              <p className="plan-includes"><strong>Includes:</strong> {plan.includes}</p>
              <p className="plan-validity"><strong>Validity:</strong> {plan.validity}</p>
              <button
                className="subscribe-button"
                style={{
                  background: plan.buttonColor,
                  color: "#fff",
                  borderRadius: "10px",
                  border: "none"
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div className="subscription-note">
        <p>
          All plans are valid for 15 days.{" "}
          <span className="tnc-link" onClick={handleOpenModal}>T&C apply</span>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-light">
            <button className="close-modal-light" onClick={handleCloseModal}>X</button>
            <h2>Terms and Conditions</h2>
            <div className="modal-summary-light">
              <p>
                TruOwners means and includes TruOwners Technologies Solutions, having its registered office at Bengaluru, India including its officers, directors, employees and representatives along with its Site.
              </p>
              <p>
                Privacy Policy means and includes the privacy policy of TruOwners more particularly described in Section.
              </p>
              <p>
                Account means and includes the account created on the Site, by the User, in accordance with the terms of the Agreement, registered with and approved by TruOwners.
              </p>
              <p>
                Agreement means and includes the Terms and Conditions, Privacy Policy and any other such terms and conditions that may be mutually agreed upon between TruOwners and the User in relation to the Services.
              </p>
              
              {/* Link to existing T&C page */}
              <p style={{ marginTop: "15px" }}>
                <Link to="/termcondition" className="detailed-tnc-link">
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
