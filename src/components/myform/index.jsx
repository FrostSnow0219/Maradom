import React, { useState } from "react";
import { useForm } from "react-hook-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (data) => {
    await sleep(2000);
    setSuccess(true);
  };
  const handleClose = () => {
    document.getElementsByClassName("form")[0].style.display = "none";
    document.body.style.overflow = "auto";
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          {success ? "Welcome aboard!" : "Join the Inner Circle!"}
        </div>
        <div className="subtitle">
          {success
            ? "We’re thrilled to have you. Keep an eye on your inbox for exciting updates."
            : "Subscribe now and be the first to receive exclusive updates, news, and early-bird offers on our upcoming product MajorDom!"}
        </div>
        {!success && <input type="text" placeholder="Name" required />}
        {!success && <input type="email" placeholder="Email" required />}
        {!success && (
          <input
            placeholder="Additional Info. Here you can specify your experience, requirements, request features, or ask questions."
            required
          />
        )}
        {success ? (
          <a className="submit-btn" onClick={() => setSuccess(false)}>
            Done
          </a>
        ) : (
          <button type="submit" className="submit-btn">
            Count Me In!
          </button>
        )}
      </form>

      <button className="close-btn" onClick={() => handleClose()}>
        <img src="/images/close.svg" alt="not found" width={40} height={40} />
      </button>
    </div>
  );
};

export default MyForm;
