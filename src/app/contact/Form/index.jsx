"use client";
import { Input, TextArea, Button } from "@/components/common";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus("pending");
      setError(null);
      const myForm = event.target;
      const formData = new FormData(myForm);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (res.status === 200) {
        setStatus("ok");
      } else {
        setStatus("error");
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus("error");
      setError(`${e}`);
    }
  };

  return (
    <form
      method="POST"
      name="contact"
      onSubmit={handleFormSubmit}
      className="w-full lg:w-6/12"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact-form" />

      <div className="mt-10 flex flex-col justify-between lg:flex-row">
        <Input
          name="first-name"
          label="First Name"
          className="w-full lg:mr-4"
          required
        />
        <Input
          name="last-name"
          label="Last Name"
          className="mt-5 w-full lg:ml-4 lg:mt-0"
          required
        />
      </div>
      <Input name="email" label="Email" className="mt-5" required />
      <Input
        name="organization-name"
        label="Organization Name"
        className="mt-5"
      />
      <TextArea name="message" label="Message" className="mt-5" required />
      <Button
        type="submit"
        className="mt-8 w-full"
        disabled={status === "pending"}
      >
        Submit
      </Button>
      {status === "ok" && (
        <div className="alert alert-success">
          <SuccessIcon />
          Submitted!
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-error">
          <ErrorIcon />
          {error}
        </div>
      )}
      <p className="mt-8 font-semibold text-white md:text-base">
        {"By submitting this form, I agree to the "}
        <a href="#" style={{ color: "#4951DB" }}>
          privacy policy.
        </a>
      </p>
    </form>
  );
}

function SuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function ErrorIcon(success) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
