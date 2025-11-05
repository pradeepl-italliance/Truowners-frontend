"use client";
import React, { useState } from "react";
import "./TermConditionPage.css";

const TermConditionPage = () => {
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <div className="terms-container">
      {/* ✅ Banner Section */}
      <section className="terms-banner">
        <h1>Terms & Conditions</h1>
      </section>

      {/* ✅ Short Basic Terms */}
      <section className="terms-content">
        <p className="updated-date">Last Updated on 29 May, 2023</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to TruOwners. By accessing our website or using our services,
          you agree to abide by these Terms and Conditions. These terms apply to
          all users, including property owners, buyers, tenants, and visitors.
        </p>
      </section>

      <section className="terms-content">
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years of age to register and use TruOwners.
          You agree to provide accurate, complete, and updated information while
          creating an account or listing a property.
        </p>
      </section>

      <section className="terms-content">
        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You agree not to post false, misleading, or unlawful content.</li>
          <li>
            You are solely responsible for the accuracy and legality of the
            information you provide.
          </li>
          <li>
            You shall not use this platform for fraudulent or illegal
            activities.
          </li>
        </ul>
      </section>

      <section className="terms-content">
        <h2>4. Listing Rules</h2>
        <ul>
          <li>
            Only genuine property owners or their authorized representatives may
            list properties.
          </li>
          <li>All listings are subject to verification by the TruOwners team.</li>
          <li>
            Listings that violate our content policy or appear suspicious may be
            removed without notice.
          </li>
        </ul>
      </section>

      <section className="terms-content">
        <h2>5. Service Charges</h2>
        <p>
          Basic listing is free. Additional paid services such as premium
          listings, legal assistance, and promotions are optional and
          non-refundable unless explicitly mentioned.
        </p>
      </section>

      <section className="terms-content">
        <h2>6. Limitation of Liability</h2>
        <p>
          TruOwners acts as a technology platform and is not a party to any
          real estate transaction. We are not responsible for disputes between
          buyers, sellers, or agents. You agree to indemnify TruOwners for any
          claims arising from your use of the platform.
        </p>
      </section>

      <section className="terms-content">
        <h2>7. Termination</h2>
        <p>
          TruOwners reserves the right to suspend or delete accounts or
          listings that violate our terms or involve suspicious activity without
          notice.
        </p>
      </section>

      <section className="terms-content">
        <h2>8. Intellectual Property</h2>
        <p>
          All content, branding, and technology used on this site is the
          intellectual property of TruOwners and may not be copied or
          reproduced without permission.
        </p>
      </section>

      <section className="terms-content">
        <h2>9. Governing Law</h2>
        <p>
          These terms shall be governed by the laws of the Republic of India.
          Any disputes will be subject to the exclusive jurisdiction of the
          competent courts located in and around your registered city.
        </p>
      </section>

      {/* ✅ View Button */}
      <div className="terms-popup-btn-container">
        <button
          className="view-more-btn"
          onClick={() => setShowFullTerms(!showFullTerms)}
        >
          {showFullTerms
            ? "Hide Full Terms & Conditions"
            : "View Full Terms & Conditions"}
        </button>
      </div>

      {/* ✅ Full Terms and Conditions Inline */}
      {showFullTerms && (
        <section className="terms-content expanded">
          <h2>DEFINITIONS</h2>
          <p>
            TruOwners means and includes TruOwners Technologies Solutions,
            having its registered office at Bengaluru, India including its
            officers, directors, employees and representatives along with its
            Site.
          </p>
          <p>
            Privacy Policy means and includes the privacy policy of TruOwners
            more particularly described in Section.
          </p>
          <p>
                Unless otherwise specified, the capitalized terms shall have the meanings set out below:
    Account means and includes the account created on the Site, by the User, in accordance with the terms of the Agreement, registered with and approved by TruOwners.
    Agreement means and includes the Terms and Conditions, Privacy Policy and any other such terms and conditions that may be mutually agreed upon between TruOwners and the User in relation to the Services.
    Applicable Law means and includes any statute, law, regulation, sub-ordinate legislation, ordinance, rule, judgment, rule of law, order (interim or final), writ, decree, clearance, authorizations, approval, directive, circular guideline, policy, requirement, code of practice or guidance note, or other governmental, regulatory, statutory, administrative restriction or any similar form of decision, or determination by, or any interpretation or administration of any of the foregoing by, any statutory or regulatory authority or government agency or any other authority, in each case having jurisdiction over the subject matter of this Agreement.
     Broker means and includes all brokers, channel partners, sales agencies and other third parties who/which negotiate or act on behalf of one person in a transaction of transfer including sale, purchase, leave and license, lease or such other form of transfer in relation to a plot, apartment or building, as the case may be, including marketing and promotion of such plot, apartment or building, for remuneration or fees or any other charges for his services whether as commission or otherwise and induces a person who introduces, through any medium, prospective parties to each other for negotiations and includes property dealers, brokers, middlemen by whatever name called and real estate agent as defined under the Real Estate (Regulation and Development) Act, 2016.
    <p>
    Computer Virus means and includes any computer instruction, information, data or program that destroys, damages, degrades or adversely affects the performance of a computer resource or attaches itself to another computer resource and operates when a program, data or instruction is executed or some other event takes place in that computer resource.
     Confidential Information means and includes all information that is not in the public domain, in spoken, printed, electronic or any other form or medium, relating directly or indirectly to, the assets, business processes, practices, methods, policies, subscription plans, publications, documents, research, operations, services, strategies, techniques, agreements, contracts, terms of agreements, transactions, potential transactions, negotiations, pending negotiations, know-how, trade secrets, computer programs, computer software, applications, operating systems, software design, web design, work-in-process, databases, manuals, records and reports, articles, systems, material, sources of material, supplier identity and information, vendor identity and information, user identity and information, financial information, results, accounting information, accounting records, legal information, marketing information, advertising information, pricing information, credit information, developments internal controls, security procedures, graphics, drawings, sketches, sales information, costs, formulae, product plans, designs, ideas, inventions, original works of authorship, discoveries and specification, of TruOwners and/or affiliated or their respective businesses, or any existing or prospective customer, supplier, investor or other associated third party, or of any other person or entity that has entrusted information to TruOwners in confidence.
     Content means and includes any information all data and information on the site. 
     </p>
      Government Authority means and includes any government, any state or other political subdivision thereof, any entity exercising executive, legislative, judicial, regulatory or administrative functions of or pertaining to government, or any other government authority, agency, department, board, commission or instrumentality or any political subdivision thereof, and any court, tribunal or arbitrator(s) of competent jurisdiction, and, any Government or non-Government self-regulatory organization, agency or authority, having jurisdiction over the Agreement and the Services contemplated under the Agreement.
     Information Technology Act means the Information Technology Act, 2000.<br></br>
     Intellectual Property means and includes patents, inventions, know how, trade secrets, trademarks, service marks, designs, tools, devices, models, methods, procedures, processes, systems, principles, algorithms, works of authorship, flowcharts, drawings, and other confidential and proprietary information, data, documents, instruction manuals, records, memoranda, notes, user guides, ideas, concepts, information, materials, discoveries, developments, and other copyrightable works, and techniques in either printed or machine-readable form, whether or not copyrightable or patentable, each of which is not in the public domain or would by its very nature fall within public domain. 
     Intellectual Property Rights means and include<br></br> (i) all right, title, and interest under including but not limited to patent, trademark, copyright under the Patents Act, 1970, Trademarks Act, 1999 and Copyright Act, 1957 respectively, any statute or under common law including patent rights; copyrights including moral rights: and any similar rights in respect of Intellectual Property, anywhere in the world, whether negotiable or not; <br></br>(ii) any licenses, permissions and grants in connection therewith; (iii) applications for any of the foregoing and the right to apply for them in any part of the world. (iv) right to obtain and hold appropriate registrations in Intellectual Property (v) all extensions and renewals thereof, (vi) causes of action in the past, present or future, related thereto including the rights to damages and Profits due or accrued, arising out of past, present or future infringements or violations thereof and the right to sue for and recover the same, (vii) any Confidential information. 
     TruOwners means and includes TruOwners Technologies Solutions,  having its registered office at, Bengaluru, India including its officers, directors, employees and representatives along with its Site.
    Privacy Policy means and includes the privacy policy of TruOwners more particularly described in Section.
          </p>
          <p>
            Prohibited Conduct means and includes the User's use of the Service in contravention of the Agreement and Applicable Law, violation of or the abetment of violation of third party rights; infringement or misappropriation of TruOwners or any persons Intellectual Property Right, attempt to gain or assist another person/ User to gain unauthorized access to the Site and/or Services or its related systems or` networks, create internet links to the Site or "frame" or "mirror" any content on any other server or wireless or Internet-based device; act of sending spam, duplicated or unsolicited messages, usage or storage of obscene, threatening, libelous, or otherwise unlawful or tortious material, including material harmful to children or in violation of third party privacy rights leading to harassment, annoyance, disquiet or inconvenience to any person; modify or make derivative works based upon the Service and/or impersonation in relation to any person or entity, claiming a false affiliation, accessing any other Account without permission, or falsely representing User Information.
     Registration Data means and includes the mobile number, e-mail address, username and such other particulars and/or information as may be required by TruOwners and supplied by the User on initial application and subscription.
     Personal Information means and includes details of Aadhaar Card, PAN Card, biometric information, financial information such as bank account, debit card, credit card details and such other sensitive information, of the User, and/or concerned person which personally identifies such User and/or person.
   Services means and includes the services provided by TruOwner  within the territory of India to the User of the Site and shall include the provision of (i) connecting tenants and owners to find each other without paying any brokerage, (ii) services to the Users who wish to post their listings for the purposes of renting their property,<br></br> (iii)  services to those who wish to purchase advertisement space of their products or services on the Site, (iv) services to the Users who wish to receive advertisements and promotional messages on the Site and through e-mails and text messages, (v) providing residents with a building specific network to enable interaction with neighbours for sharing knowledge of the neighbourhood (vi) connecting the users to various third party service providers for the provision of other related services.
    Site means and includes the website owned, operated and managed by TruOwner at the URL  www.truowner.com    and also includes the mobile application owned, operated and managed by TruOwner.
          </p>
          <p>
            Terms and conditions means and includes the terms and conditions contained in the Agreement more particularly set out in Section  1.
    Third Party Service Provider means and includes any service provider with whom TurOwner has an agreement for the purposes of making service in addition to the Service in addition to the Services available for the User.
     User means any person who accesses the site or avails services on the site for the purposes of hosting, publishing, shating, transacting, displaying or uploading information or views and whether as tenant or as an owner looking for potential tenats includes other persons jointly participating in using the site. 
    User information means and includes registtation data, personal information and any other data, details or information in relation to the use, provided by the user to TurOwner in relation to the services, whether through the site, e-mail or any other form of communication, agreeable to the user and TruOwner.
          </p>

          <h2>INTERPRETATION</h2>
<ol>
  <li>
    Unless the context otherwise requires or a contrary indication appears:
  </li>
  <li>
    Reference to any legislation or law shall include references to any such
    legislation or law as it may from time to time be amended, supplemented, or
    re-enacted, and any reference to a provision shall include any subordinate
    legislation made from time to time under that provision.
  </li>
  <li>
    Any reference in this Agreement to a person includes any individual,
    corporation, partnership, unincorporated organization, or governmental
    agency and shall include their respective successors and permitted assigns,
    and in case of an individual shall include his legal representatives,
    administrators, executors, and heirs, and in case of a trust shall include
    the trustee or the trustees for the time being.
  </li>
  <li>
    Headings to Sections and Clauses are for ease of reference only and shall be
    ignored in the construction of the relevant Sections and Clauses.
  </li>
  <li>
    The singular includes the plural and vice versa and words importing a
    particular gender include all genders.
  </li>
  <li>
    The words "other" or “otherwise” and “whatsoever” will not be construed
    ejusdem generis or be construed as any limitation upon the generality of any
    preceding words or matters specifically referred to.
  </li>
</ol>

         <h2>ACCEPTANCE OF THE TERMS AND CONDITIONS</h2>
<p>
  By using TruOwners’ services, the user acknowledges that they have
  read, understood, and agree to be bound by the terms and policies
  mentioned herein.
</p>
<ul>
  <li> TruOwner agrees to provide to the User and the User agrees to avail from TruOwner 
    the Services in accordance with and on the basis of this Agreement and the User's 
    acceptance of the Terms and Conditions and Privacy Policy constitute the Agreement 
    between the User and TruOwner and such Agreement shall deem to replace all previous 
    arrangements between the User and TruOwner in relation to the Services and access of the Site.
  </li>
  <li>
     The User undertakes to be bound by the Agreement each time the User accesses 
    the Site, completes the registration process.
  </li>
  <li>
     The User represents and warrants to TruOwner that the User is 18 (eighteen) 
    years of age or above, and is capable of entering into, performing and adhering 
    to the Agreement. Individuals under the age of 18 (eighteen) may access the Site 
    or avail a Service only with the involvement, guidance, supervision and/or prior 
    consent of their parents and/or legal guardians, through the Account of or under 
    the guidance of such parent/legal guardian. TruOwner shall not be responsible for 
    verifying if the user is at least 18 (eighteen) years of age.
  </li>
</ul>


      <h2>ACCESS TO THE SITE</h2>
<ul>
  <li>
    First time Users can access the Site for preliminary browsing without creating an Account.
  </li>
  <li>
    The User undertakes and agrees to provide User Information, upload Content, and create an Account 
    in order to retrieve specific information and avail the Services.
  </li>
  <li>
    TruOwner shall verify the Account by requesting a one-time password from the User. 
    The User undertakes and agrees that a mobile number can only be used once to create an Account. 
    The User is prohibited from creating multiple Accounts and TruOwner reserves the right to conduct 
    appropriate verification to detect such multiplicity of Accounts and take appropriate action.
  </li>
  <li>
    The User undertakes to cooperate with any of TruOwner personnel in connection with the User's 
    access to the Site, as may be required by TruOwner.
  </li>
</ul>

<h2>RIGHTS OF TRUOWNERS</h2>
<p>
1. TruOwner, at all times, reserves the right to reject or disable an Account in the event of the User's 
violation of any Applicable Law or anything done by the User in contravention of this Agreement, 
including but not limited to any other reason relating to the safe and secure operation of the Site.<br/><br/>

2. Subject to Applicable Law, TruOwner has an internal infrastructure to conduct a background check 
and verification of the User Information and the Account to ensure that brokers are not registering 
themselves on the Site. In the event a User is detected as a broker, TruOwner has the right to 
reject or disable such Account without cause.<br/><br/>

3. TruOwner has the right to modify, suspend, or terminate all or any part of the Services including 
its features, structure, fees, and layout, and/or suspend or deactivate, whether temporarily or 
permanently, the User Account and/or User's access to the Site at any time, without any prior notice.<br/><br/>

4. TruOwner shall endeavor to provide the User an advance notice, without obligation, of any 
suspension or deactivation of the Site for repair, inspection, maintenance, upgradation, testing, 
or for any other reason as TruOwner may deem fit. TruOwner shall use its best efforts to rectify 
any disruption or error on the Site and restore regular operations promptly.<br/><br/>

5. TruOwner has the right to issue notifications, confirmations, and other communications to the User 
via the Site, email, text message, or any other agreed mode. TruOwner may also send promotional or 
informational messages related to its Services or third-party offers. TruOwner does not take 
responsibility for the validity of such third-party offers. Users may unsubscribe from receiving 
such promotional information at any time by sending an email to <b>assisttruowners@gmail.com</b>.<br/><br/>

6. TruOwners reserves the right to modify or discontinue services at any time.<br/><br/>

7. TruOwners may suspend or terminate user access if any conduct violates these Terms or applicable law.<br/><br/>

8. TruOwners may collect, process, and share user data in accordance with its Privacy Policy.
</p>


<h2>UNAUTHORIZED ACCESS</h2>
<p>
1. The User shall be liable for all acts conducted through the User's Account and shall be responsible 
for the safe keeping of the details and password of the Account.<br/><br/>

2. Subject to Applicable Law, the User is responsible for notifying TruOwner immediately upon 
becoming aware of any unauthorized access into or misuse of the Account causing a breach of security 
as per the Terms and Conditions and Privacy Policy of TruOwner.<br/><br/>

3. TruOwner shall extend support by ensuring immediate termination or suspension of such Account and 
shall take such other appropriate safety measures as it may deem necessary. Further, TruOwner shall 
not be held liable for any unauthorized access into the Account and/or any loss or damage caused to 
the User by such unauthorized access or loss or damage caused as a consequence of the delay or 
failure of the User in informing TruOwner about such unauthorized access.<br/><br/>

4. In order to better protect the secrecy of the User information, the User is encouraged to change 
the password of the Account from time to time.
</p>

<h2>USE OF INFORMATION</h2>
<p>
1. TruOwner undertakes that the procurement, storage, usage and dissemination of all information, including User Information and/or Content, as the case may be, pursuant to this Agreement, shall at all times, including upon expiration of the Services or termination of the Agreement with the User, be in accordance with the Information Technology Act 2000, the rules made thereunder, and other relevant Applicable Laws.<br/><br/>

2. The User hereby irrevocably and unequivocally authorizes TruOwner to utilize User Information for purposes including those set out below:<br/>
   i. Provision of Services in accordance with the Agreement.<br/>
   ii. Disclose User Information to its directors, officers, employees, advisors, auditors, counsel, or its authorized representatives on a need-to-know basis for provision of the Services.<br/>
   iii. Contacting a Third Party Service Provider and/or facilitating/enabling the services of a Third Party Service Provider for the User pursuant to the arrangement between TruOwner and such Third Party Service Provider.<br/>
   iv. Conducting internal studies, consumer research, surveys and preparing reports in connection with the Services.<br/>
   v. Entering the registration data for an Account or receiving alerts, contacting a property seller/buyer.<br/>
   vi. Sending alerts, contact details, promotional messages and promotional calls whether by TruOwner itself or through its partners/vendors and sub-partners/sub-vendors.<br/>
   vii. Disclosing to third parties (including law enforcement agencies and the User's building management personnel) personally identifiable information where TruOwner has reasonable cause to believe that the Users are guilty of any Prohibited Conduct.
</p>

<h2>THIRD PARTY SERVICES</h2>
<p>
i. Subject to the need and request of the User, TruOwner shall engage, directly or indirectly, the services of Third-Party Service Providers from time to time in order to provide the Services to the Users, in accordance with the terms and conditions separately agreed to between TruOwner and such Third-Party Service Provider.<br/><br/>

ii. TruOwner may recommend services of a Third-Party Service Provider to the User to provide a one-stop shop experience in relation to ancillary services, including but not limited to packaging and moving furniture, neighborhood information, or doorstep registration facilities to the User.<br/><br/>

iii. TruOwner shall have the unequivocal consent of the User to share User Information, in whole or in part, with the Third-Party Service Provider, without intimation to the User.<br/><br/>

iv. The Site may serve as a platform for relevant and interested Third-Party Service Providers for the purposes of advertising or promoting their services in relation to the Services provided by TruOwner.<br/><br/>

v. Nothing contained herein shall constitute or be deemed to constitute an agency or partnership or association of persons for and on behalf of TruOwner or any Third-Party Service Provider. The arrangement specified in this clause is strictly executed on a principal-to-principal basis and each concerned person shall be bound for their distinct responsibilities, rights, liabilities, and obligations in accordance with the relevant bilateral agreement between such persons.
</p>

<h2>TAILORED ADVERTISING</h2>
<p>
i. The User acknowledges and agrees that Third Party Service Providers may use cookies or similar technologies to collect information about the User's pattern of availing the Services, in order to inform, optimize, and provide advertisements based on the User's visits on the Site and general browsing pattern and report how Third-Party Service Providers advertisement impressions, other uses of advertisement services, and interactions with these impressions and services are in relation to the User's visits on such third party's website.<br/><br/>

ii. TruOwner also permits Third Party Service Providers to serve tailored advertisements to the User on the Site, and further permits them to access their own cookies or similar technologies on the User's device to access the Site or avail the Services.<br/><br/>

iii. The User undertakes and agrees that when accessing the Services from a mobile application, the User may also receive tailored in-application advertisements. Each operating system provides specific instructions on the prevention of tailored in-application advertisements.<br/><br/>

iv. It is to be noted that TruOwner does not guarantee the accuracy, integrity, or quality of any content provided by such Third-Party Service Provider. Further, the Users’ interactions with such Third-Party Service Providers found on or through the Services provided by TruOwner on the Site, including payment and delivery of goods or services, and any other terms, conditions, warranties, or representations associated with such dealings, are solely between the Users and the Third Party Service Providers. In no event shall TruOwner be liable for any damages arising out of any interaction between the User and such Third Party Service Provider. The information provided on the Site is provided to the Users on an "AS IS, WHERE IS" basis.
</p>

<h2>TRUOWNER PLATFORM</h2>
<p>
1. The Users agree and acknowledge that TruOwner is only an online platform that allows the Users to interact with each other for the purpose of listing their property on the Site and/or searching for appropriate options. The Users further understand and accept that:<br/><br/>

a. The Users are ultimately responsible for choosing and/or interacting with other Users on the Site and TruOwner is only a facilitator that shall not be held responsible or liable for the selection and/or interaction of the Users with other Users on the Site.<br/><br/>

b. TruOwner may provide the Users the profile previews of other Users who may be suitable to tender to the requirements of the Users based on information that the Users provide to TruOwner. Please note that TruOwner (1) does not recommend or endorse any other User, i.e., it does not endorse any house owners and tenants registered on the Site; and (2) does not make any representations or warranties with respect to the other Users or the property listed by them. TruOwner shall not be liable, for any reason whatsoever, for any disputes amongst the Users and there is no liability on TruOwner for the consequences that the Users may be subjected to while dealing with other Users on the Site.<br/><br/>

2. Information regarding all the Users and/or any third party whose services the Users avail through the Site as displayed on the Site is intended for general reference purposes only. Such information is mainly self-reported by the Users and/or the third party and may change from time to time or become out of date or inaccurate. The Users are encouraged to independently verify any such information the Users see on the Site with respect to the other Users or the property listed by them.<br/><br/>

3. The Users understand and agree that any interactions and associated issues with the other Users and/or the third parties with whom the Users interact through the Site or the third party whose services the Users avail through the Site, including but not limited to any service-related issues, any Prohibited Conduct issue, any fraudulent activity, is strictly amongst the Users and/or the third party and the User shall not hold TruOwner responsible for any such interactions and associated issues. If the Users decide to engage with other Users, the Users do so at their own risk.<br/><br/>

4. TruOwner cannot assure that all the transactions will be completed, nor does TruOwner guarantee the ability or intent of the Users to fulfill their obligations under any transaction. TruOwner advises the Users to perform their own investigation prior to selecting and/or interacting with the other Users on the Site.
</p>

        <h2>TRUOWNER PAY TERMS & CONDITIONS</h2>
<p>
1. Role: Any registered User of the Site may choose to make rent payments, maintenance payments, and payment of security deposit/token amounts through the payment gateway(s) authorized by TruOwner. In this regard, the Users are asked to provide customary billing information such as name, financial instrument information (which shall include the bank account number, IFSC code of the User), the details of the landlord to whom the payment has to be made, and the address of the property with regard to which the rent or security deposit is to be paid. Users may also be asked to provide a copy of the rental agreement pursuant to which such rent payments are being made. The Users must provide accurate, current, and complete information while making the payment through the Site and it shall be the User's obligation to keep this information up-to-date at all times. The Users are solely responsible for the accuracy and completeness of the information provided by them and TruOwner shall not be responsible for any loss suffered by the User as a result of any incorrect information, including payment information provided by the Users. Except for TruOwner’s limited role in processing the payments that registered Users authorize or initiate, TruOwner is not involved in any underlying transaction between the User, any other User, any third person, or any service providers. TruOwner is not a bank and does not offer any banking or related services. TruOwner may use the services of one or more third parties (each a "Processor") to provide the Service and process the User's transactions. Further, TruOwner does not guarantee payment on behalf of any registered User, other User, or Processor and explicitly disclaims all liability for any act or omission of any User or Processor. TruOwner is neither an agent of the lessor or lessee or any registered User. TruOwner acts solely as an intermediary which facilitates payments between the registered Users, making the payment and the intended third-party beneficiaries.<br/><br/>

2. Authorization: The User acknowledges that TruOwner is authorized by the User to hold, receive, and disburse funds in accordance with the User's payment instructions provided through the Site for the purposes of facilitating the transfer of monies to the intended beneficiary as specified by the User on the Site. The authorization given by the Users permits TruOwner: <br/>
(i) to debit or credit the user's balance, bank account, any credit card, debit card, or other payment cards or any other payment method that TruOwner accepts; or<br/>
(ii) to process payment transactions that the Users authorize, by generating an electronic funds transfer. By instructing TruOwner to pay another User, the Users authorize and order TruOwner to make the payments (less any applicable fees or other amounts we may collect under this Agreement) to such User. TruOwner may limit the recipient's ability to use or withdraw the committed funds for such period of time that TruOwner has agreed to with the recipient.<br/><br/>

3. Fees: The User agrees that they may be charged a service charge by TruOwner for using the Site to make rental payments or payment of security deposits.<br/><br/>

4. Transaction Limits: TruOwner may delay, suspend, or reject a transaction for any payment for any reason, including without limitation if TruOwner suspects that the transaction subjects it to financial or security risk, is unauthorized, fraudulent, suspicious, unlawful, in violation of the terms of this Agreement, subject to dispute, or otherwise unusual.<br/><br/>

5. Chargebacks: The amount of a transaction may be charged back or reversed to the User (a "Chargeback") if the transaction: <br/>
(i) is disputed by the sender; <br/>
(ii) is reversed for any reason; <br/>
(iii) was not authorized or TruOwner has reason to believe that the transaction was not authorized; or <br/>
(iv) is allegedly unlawful, suspicious, or in violation of the terms of this Agreement. <br/>
The Users owe TruOwner and will immediately pay TruOwner the amount of any Chargeback and any associated fees, fines, or penalties assessed by TruOwner, the Processor, processing financial institutions, or MasterCard, Visa, American Express, Discover, and other payment card networks, associations, or companies ("Networks"). The Users agree to assist TruOwner when requested, at the User's expense, to investigate any of the User's transactions processed through the Service. For Chargebacks associated with cards, TruOwner will work with the Users to contest the Chargeback with the Network or issuing banks should the User choose to contest the Chargeback; in this regard, TruOwner will request necessary information from the User to contest the Chargeback and the User's failure to timely assist TruOwner in investigating a transaction, including without limitation providing necessary documentation within 6 business days of TruOwner's request, may result in an irreversible Chargeback.<br/><br/>

6. Liability: The Users agree not to hold TruOwner responsible and/or liable for any issue or claim arising out of any dispute whatsoever between the User and the Processor and/or the User and the User's bank or financial institution. Additionally, TruOwner shall not be responsible for any additional fees or charges deducted by the Processors while processing payments in connection with the User's transaction and TruOwner disclaims all liability in this regard. Further, the Users may also be subject to additional terms and conditions imposed by such Processors and the Users should review these terms and conditions before authorizing any payments through the Processors.<br/><br/>

7. Fraud and Restrictions: TruOwner may ask for additional documents (like Rental Agreement, Owner/Tenant PAN, Maintenance Bill) where it deems necessary, including in case the transaction looks suspicious. TruOwner will refund the full amount (excluding the nominal processing fees collected by TruOwner) without any deductions if TruOwner determines it is not a valid rent/token/security deposit/maintenance payment or if such payment is fraudulent. A valid rent/security deposit payment is one where there exists a legally valid rental agreement between the tenant and the landlord with the rent amount equivalent to what is being transferred on TruOwner Pay. A valid maintenance payment is one where there exists a maintenance bill between the payer and the society/RWA.<br/><br/>

8. Refunds: In case TruOwner is not able to facilitate transfer of the rent amount to the beneficiary account due to any technical difficulties, TruOwner will refund the payment back to the source. The Users are advised not to transfer the rent directly to the landlord until a refund ID is generated and sent to the Users via email and SMS. Refunds will be processed within 15 working days and credited to the customer's original payment method, subject to respective bank timelines.<br/><br/>

9. Risk Acknowledgement: The Users acknowledge and agree that, to the maximum extent permitted by law, the entire risk arising out of the User's access to and use of the payment Services remains with the Users. If the Users permit or authorize another person to use their TruOwner account in any way, the Users shall be responsible for the actions taken by that person. Neither TruOwner nor any other party or Processor involved in creating, producing, or delivering the payment Services will be liable for any incidental, special, exemplary, or consequential damages, including lost profits, loss of data, or loss of goodwill, service interruption, computer damage or system failure, or the cost of substitute products or services, or for any damages for personal or bodily injury or emotional distress arising out of or in connection with these payment terms.
</p>


          <h2>CONTENT ON THE SITE</h2>
<p>
1. TruOwner shall endeavor to ensure that the Content on its Site is monitored to ensure that the same is not in contravention of Applicable Law and this Agreement. In this regard, the Users represent and warrant that they shall not do any of the following via the Site or otherwise in connection with the Service:<br/>
1) Attempt or help anyone else attempt to gain unauthorized access to the Site or TruOwner's related systems or networks (including without limitation the impersonation of another User or use of a false identity or address to gain access to the Site);<br/>
2) Use the Site to violate the Intellectual Property Rights of any person (including without limitation posting pirated music or computer programs or links to such material on Site or on the User's Profile);<br/>
3) Send spam or otherwise duplicative or unsolicited messages in violation of Applicable Laws;<br/>
4) Send or store infringing, obscene, threatening, libelous, or otherwise unlawful or tortious material, including material harmful to children or violative of third party privacy rights;<br/>
5) Send or store material containing software viruses, worms, Trojan horses or other harmful computer code, files, scripts, agents or programs;<br/>
6) Interfere with or disrupt the integrity or performance of the Service or the data contained therein;<br/>
7) License, sublicense, sell, resell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the Service or any content contained in or made available through the Service in any way;<br/>
8) Modify or make derivative works based upon the Service or the Content of TruOwner;<br/>
9) Create internet "links" to the Site or "frame" or "mirror" any Content on any other server or wireless or internet-based device;<br/>
10) Reverse engineer or access the Service in order to (i) build a product competitive with the Service, (ii) build a product using ideas, features, functions or graphics similar to those of the Service, or (iii) copy any ideas, features, functions or graphics contained in the Service.
</p>


          <h2>USER GENERATED CONTENT</h2>
<p>
1. The Site may contain user generated content ("UGC") which TruOwner does not pre-screen and which contains views that may be opinions of Users and also of experts.<br/>
2. These views do not represent TruOwner’s views, opinions, beliefs, morals, or values.<br/>
3. TruOwner does not claim any ownership rights in the text, files, images including photos, videos, sounds, musical works or any UGC that the Users submit or publish on the Site.<br/>
4. After posting any UGC on the Site, the Users continue to own the rights that the Users may have in that UGC, subject to the limited license set out here.<br/>
5. TruOwner shall do its best to monitor, edit, or remove such UGC where TruOwner considers it appropriate or necessary to do so.<br/>
6. TruOwner does not promise that the content in or on the Site is accurate, complete, or updated, that it will not offend or upset any person, or that it does not infringe the Intellectual Property Rights of third parties.<br/>
7. The Users hereby expressly acknowledge and agree that TruOwner will not be liable for the User's losses or damages (whether direct or indirect) caused by any activity undertaken by the User on the basis of any UGC.
</p>


          {/* ✅ ADDITIONAL CONTENT (newly inserted below governing law) */}
          <h2>CONTENT ON THE SITE</h2>
          <p>
            TruOwner shall endeavor to ensure that the Content on its Site is
            monitored to ensure compliance with Applicable Law and this
            Agreement. Users represent and warrant that they shall not:
          </p>
          <ul>
            <li>Attempt unauthorized access or impersonation.</li>
            <li>Violate Intellectual Property Rights of others.</li>
            <li>Send spam or duplicate messages in violation of law.</li>
            <li>
              Transmit unlawful, obscene, or tortious material or any malware.
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Service.
            </li>
            <li>
              Modify, sublicense, distribute, or exploit content commercially.
            </li>
            <li>
              Reverse engineer, frame, or mirror TruOwner’s content or platform.
            </li>
          </ul>

          <h2>USER GENERATED CONTENT</h2>
          <p>
            The Site may contain user-generated content (“UGC”), which TruOwner
            does not pre-screen and which may include opinions not representing
            TruOwner’s own. Users retain ownership of their UGC but grant
            TruOwner a limited license to use, display, and manage such content
            in accordance with law.
          </p>

          <h2>INTELLECTUAL PROPERTY</h2>
          <p>
            TruOwner respects Intellectual Property Rights of others and expects
            Users to do the same. Users are solely responsible for ensuring they
            hold rights to content submitted. TruOwner reserves the right to
            initiate legal proceedings for any infringement.
          </p>

          <h2>OPERATIONAL HAZARDS / COMPUTER VIRUS ATTACKS</h2>
          <p>
            TruOwner does not warrant that its Site or software is free of
            viruses or technical defects but will strive to maintain security.
            TruOwner shall not be held liable for damages due to such issues.
          </p>

          <h2>RENTAL AGREEMENT</h2>
          <p>
            Users availing rental agreement services agree that TruOwner is not
            liable for disputes, damages, or losses between parties. Users are
            responsible for legal compliance and costs.
          </p>

          <h2>DISCLAIMER</h2>
          <p>
            Information on the Site is for general guidance only and not legal or
            financial advice. TruOwner disclaims all liabilities for errors,
            omissions, third-party data, or loss arising from Service use.
          </p>

          <h2>GRANT OF RIGHTS TO TRUOWNER FINANCE PARTNERS</h2>
          <p>
            By using TruOwner finance services, users authorize TruOwner to share
            information with its finance partners for verification, marketing,
            and product offerings, and waive NDNC restrictions for such
            communication.
          </p>

          <h2>LIMITATION OF LIABILITY</h2>
          <p>
            TruOwner’s total aggregate liability under this Agreement shall be
            limited to the fees paid by the user for the specific services
            involved.
          </p>

          <h2>INDEMNITY</h2>
          <p>
            Users shall indemnify TruOwner and its affiliates against any claims,
            losses, or damages arising from user actions, negligence, or breach
            of these Terms.
          </p>

          <h2>REAL ESTATE REGULATORY AUTHORITY</h2>
          <p>
            Users are deemed aware of RERA rules. TruOwner shall not be liable
            for listings violating RERA norms.
          </p>

          <h2>USER GRIEVANCE</h2>
          <p>
            Grievances may be addressed to the Grievance Officer at
            Truowners@gmail.com, who shall respond within one month.
          </p>

          <h2>GUIDELINES FOR LAW ENFORCEMENT AGENCIES / REPORT A FRAUD</h2>
          <p>
            Legal requests can be sent to Truowners@gmail.com or contact
            +8867721812. TruOwner aims to respond within 72 hours.
          </p>

          <h2>WAIVER AND SEVERABILITY</h2>
          <p>
            No failure to enforce rights constitutes waiver. If any term is
            deemed invalid, the remainder remains enforceable.
          </p>

          <h2>AMENDMENTS</h2>
          <p>
            TruOwner may modify this Agreement without prior notice. Continued
            use of the site indicates acceptance of changes.
          </p>

          <h2>GOVERNING LAW AND JURISDICTION</h2>
          <p>
            This Agreement is governed by Indian law, and disputes shall be
            subject to the jurisdiction of Bengaluru courts.
          </p>
        </section>
      )}
    </div>
  );
};

export default TermConditionPage;
