import React from 'react';
import './TermConditionPage.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            {/* Section 1: Banner */}
            <section className="terms-banner">
                <h1>Terms & Conditions</h1>
            </section>

            {/* Section 2: Content */}
            <section className="terms-content">
                <p className="updated-date">Last Updated on 29 May, 2023</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to Tru Owners. By accessing our website or using our services, you agree to abide by these terms and conditions. These terms apply to all users, including property owners, buyers, tenants, and visitors.
                </p>
            </section>

            <section className="terms-content">
                <h2>2. Eligibility</h2>
                <p>
                    You must be at least 18 years of age to register and use Tru Owners. You agree to provide accurate, complete, and updated information while creating an account or listing a property.
                </p>
            </section>

            <section className="terms-content">
                <h2>3. User Responsibilities</h2>
                <ul>
                    <li>You agree not to post false, misleading, or unlawful content.</li>
                    <li>You are solely responsible for the accuracy and legality of the information you provide.</li>
                    <li>You shall not use this platform for fraudulent or illegal activities.</li>
                </ul>
            </section>

            <section className="terms-content">
                <h2>4. Listing Rules</h2>
                <ul>
                    <li>Only genuine property owners or their authorized representatives may list properties.</li>
                    <li>All listings are subject to verification by the Tru Owners team.</li>
                    <li>Listings that violate our content policy or appear suspicious may be removed without notice.</li>
                </ul>
            </section>

            <section className="terms-content">
                <h2>5. Service Charges</h2>
                <p>
                    Basic listing is free. Additional paid services such as premium listings, legal assistance, and promotions are optional and non-refundable unless explicitly mentioned.
                </p>
            </section>

            <section className="terms-content">
                <h2>6. Limitation of Liability</h2>
                <p>
                    Tru Owners acts as a technology platform and is not a party to any real estate transaction. We are not responsible for disputes between buyers, sellers, or agents. You agree to indemnify Tru Owners for any claims arising from your use of the platform.
                </p>
            </section>

            <section className="terms-content">
                <h2>7. Termination</h2>
                <p>
                    Tru Owners reserves the right to suspend or delete accounts or listings that violate our terms or involve suspicious activity without notice.
                </p>
            </section>

            <section className="terms-content">
                <h2>8. Intellectual Property</h2>
                <p>
                    All content, branding, and technology used on this site is the intellectual property of Tru Owners and may not be copied or reproduced without permission.
                </p>
            </section>

            {/* ✅ Updated Governing Law Section (style now matches others) */}
            <section className="terms-content">
                <h2>9. Governing Law</h2>
                <p>
                    These terms shall be governed by the laws of the Republic of India. Any disputes will be subject to the exclusive jurisdiction of the competent courts located in and around your registered city.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
