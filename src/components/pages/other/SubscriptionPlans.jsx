import React from "react";
import "./SubscriptionPlans.css";

const plans = [
  {
    name: "Silver Plan",
    price: "₹599",
    gst: "+18% GST",
    includes: "Contact numbers of 6 houses",
    validity: "15 days",
    color: "#f5f5f5", // light grey card
    buttonColor: "#999999", // muted grey button
    headingColor: "#e74c3c" // red
  },
  {
    name: "Gold Plan",
    price: "₹1199",
    gst: "+18% GST",
    includes: "Contact numbers of 19 houses",
    validity: "15 days",
    color: "#fff8e7", // soft warm accent
    buttonColor: "#f7b733", // soft yellow button
    headingColor: "#3498db" // blue
  },
  {
    name: "Diamond Plan",
    price: "₹1799",
    gst: "+18% GST",
    includes: "Contact numbers of 25 houses",
    validity: "15 days",
    color: "#f5f5f5", // light grey card
    buttonColor: "#999999", // muted grey button
    headingColor: "#e74c3c" // red
  }
];

const SubscriptionPlans = () => {
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
            style={{ backgroundColor: plan.color }}
          >
            <div className="plan-header">
              <h3 className="plan-name" style={{ color: plan.headingColor }}>{plan.name}</h3>
              <p className="plan-price">{plan.price} <span className="gst">{plan.gst}</span></p>
            </div>
            <div className="plan-body">
              <p className="plan-includes"><strong>Includes:</strong> {plan.includes}</p>
              <p className="plan-validity"><strong>Validity:</strong> {plan.validity}</p>
              <button className="subscribe-button" style={{ backgroundColor: plan.buttonColor }}>
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
