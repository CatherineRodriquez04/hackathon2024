"use client";

import Image from "next/image";
import beach from "@/public/assets/beach.webp"; // Update with your image path

export default function Privacy() {
  return (
    <div className="container mx-auto h-screen w-full overflow-auto p-8">
      <h1 className="text-4xl font-bold mb-2 text-black text-center">Privacy Policy</h1>
      <p className="text-lg text-accent2 text-center mb-8">Last updated: November 2, 2024</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-accent">1. Introduction</h2>
          <p>
            Welcome to <span className="font-semibold">Beyond Boundaries</span>. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us through our website. This information may include:
          </p>
          <ul className="list-disc list-inside">
            <li>Your name</li>
            <li>Email address</li>
            <li>Travel preferences</li>
            <li>Other necessary details to facilitate our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">3. Use of Your Information</h2>
          <p>
            Your information is used for various purposes, including:
          </p>
          <ul className="list-disc list-inside">
            <li>Connecting travelers with guides</li>
            <li>Enhancing our website and service offerings</li>
            <li>Communicating with you regarding inquiries or bookings</li>
            <li>Sending promotional content where permitted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">4. Data Protection</h2>
          <p>
            We take appropriate security measures to protect your personal information from unauthorized access and misuse. However, please note that no method of transmission over the internet is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">5. Sharing Your Information</h2>
          <p>
            We do not sell or trade your personal information to third parties without your consent, except as required by law or to provide our services. We may share information with trusted service providers assisting us in operating our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or request deletion of your personal information. To exercise these rights, please contact us through the official channels available on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on our website with an updated effective date. We encourage you to review this policy regularly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">8. Contact Us</h2>
          <p>
            For any questions or concerns about this Privacy Policy or our data practices, please reach out to us via the contact options available on our website.
          </p>
        </section>
      </div>

      {/* Image Placeholder Section */}
      <div className="mt-8 flex justify-center">
        <Image 
          src={beach} 
          alt="Visual representation of Privacy Policy" 
          width={700} 
          height={700} 
          className="object-cover" 
        />
      </div>
    </div>
  );
}
