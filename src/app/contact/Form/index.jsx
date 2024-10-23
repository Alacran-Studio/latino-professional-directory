"use client";
import { Input, TextArea, Button } from "@/components/common";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus("pending");
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
      }
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full lg:w-1/2">
      {(status === null || status === "pending") && (
        <form
          method="POST"
          name="contact"
          onSubmit={handleFormSubmit}
          className="w-full"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />

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
          {/* // Commented out until we incorporate the privacy policy. 
        <p className="mt-8 font-semibold text-white md:text-base">
          {"By submitting this form, I agree to the "}
          <a href="#" style={{ color: "#4951DB" }}>
            privacy policy.
          </a>
        </p> */}
        </form>
      )}
      {status && status !== "pending" && <StatusMessage status={status} />}
    </section>
  );
}

function StatusMessage({ status }) {
  if (!status || status === "pending") return null;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center lg:w-1/2">
      <div className="flex">
        {status === "ok" && <SuccessIcon className="mb-4" />}
        {status === "error" && <ErrorIcon className="mb-4" />}
        <p className="ml-2 text-xl font-semibold">
          {status === "ok" ? "Submitted!" : "Oops!"}
        </p>
      </div>

      <p className="mt-2">
        {status === "ok"
          ? "Your response was successfully submitted! Thank you for your interest."
          : "We apologize. Something went wrong, please try again later."}
      </p>
    </div>
  );
}

function SuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-green-500"
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

function ErrorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-red-500"
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
