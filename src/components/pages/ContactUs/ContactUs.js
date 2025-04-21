// Proprietary Software License
// Copyright (c) 2025 Mark Robertson
// See LICENSE.txt file for details.


import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./ContactUs.module.css"

const ContactUs = () => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send the contact alert email (to you)
    emailjs
      .send("service_nmgxjq9", "template_7rmosy9", formData, "Nvoo2xgtKqLWexhFd")
      .then(
        (response) => {
          console.log("Contact alert email sent!", response.status, response.text);
          // After sending the alert, send the auto-reply email
          emailjs
            .send("service_nmgxjq9", "template_np119zb", formData, "Nvoo2xgtKqLWexhFd")
            .then(
              (response) => {
                console.log("Auto-reply email sent!", response.status, response.text);
                alert("Thank you for contacting me!");
                setFormData({ name: "", email: "", message: "" });
              },
              (err) => {
                console.error("Auto-reply FAILED...", err);
                alert("There was an error sending the auto-reply. Please try again.");
              }
            );
        },
        (err) => {
          console.error("Contact alert FAILED...", err);
          alert("There was an error sending your message. Please try again.");
        }
      );
  };

  return (
    <div className={styles.cuPage}>
      <div className="container my-5 contact-form-container" style={{ maxWidth: "600px" }}>
        <h1 className="text-center mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="from_name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="from_name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="from_email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="from_email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message:
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
