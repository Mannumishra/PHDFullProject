import React, { useState } from 'react';
import './ContactUs.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactUs = () => {

  const handleFocus = (e) => {
    const container = e.target.closest('.input-container');
    container.classList.add('focus');
  };

  const handleBlur = (e) => {
    const container = e.target.closest('.input-container');
    if (!e.target.value) {
      container.classList.remove('focus');
    }
  };

  // Define state to store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);  // Log the name and value
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post('https://api.iirhe.org/api/send-consultation', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
    }
  };

  return (
    <>
      <div className="contact_us_form">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolorum adipisci recusandae praesentium dicta!
            </p>

            <div className="info">
              <div className="information">
                <i className="fas fa-map-marker-alt"></i> &nbsp; &nbsp;
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div>
              <div className="information">
                <i className="fas fa-envelope"></i> &nbsp; &nbsp;
                <p>lorem@ipsum.com</p>
              </div>
              <div className="information">
                <i className="fas fa-phone"></i>&nbsp;&nbsp;
                <p>123-456-789</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form onSubmit={handleSubmit}>
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label htmlFor="name">Username</label>
                {/* <span>Username</span> */}
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label htmlFor="email">Email</label>
                {/* <span>Email</span> */}
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label htmlFor="phone">Phone</label>
                {/* <span>Phone</span> */}
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <label htmlFor="message">Message</label>
                {/* <span>Message</span> */}
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
