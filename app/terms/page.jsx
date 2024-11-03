"use client";

import Image from "next/image";

export default function Terms() {
  return (
    <div className="container mx-auto h-screen w-full overflow-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-accent">Terms and Conditions</h1>
        <p className="text-lg text-accent">Last updated: November 2, 2024</p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-accent">1. Introduction</h2>
          <p>
            Welcome to <span className="font-semibold">Beyond Boundaries</span>, a platform originating from Louisiana State University at SASE 2024 Hackathon, aimed at connecting travelers with local volunteer guides who assist in navigating travel plans and enhancing communication during their journeys. By accessing or using our website, you agree to comply with these Terms and Conditions. If you do not agree, please refrain from using our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">2. Service Overview</h2>
          <p>
            Our platform serves to facilitate connections between travelers seeking guidance and local guides prepared to assist. While guides may choose to host travelers, this is not a requirement. We strive to match travelers with suitable guides based on individual preferences and needs, enhancing the travel experience and fostering meaningful interactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">3. User Responsibilities</h2>
          <p>
            Users of our website are expected to conduct themselves respectfully and responsibly. You acknowledge that you are responsible for your interactions with guides or other users. We recommend conducting due diligence and taking necessary precautions when meeting with guides or engaging in travel-related activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">4. Limitation of Liability</h2>
          <p>
            <span className="font-semibold">Beyond Boundaries</span> endeavors to provide a safe and reliable platform; however, we cannot be held liable for any incidents that may occur during your interactions with guides or while traveling. This includes, but is not limited to, issues of personal safety, loss, trafficking, or any unforeseen circumstances. By using our service, you acknowledge that you do so at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">5. Intellectual Property</h2>
          <p>
            All content featured on this website, including text, graphics, logos, and images, is the property of <span className="font-semibold">Beyond Boundaries</span> or its licensors and is protected by copyright, trademark, and other intellectual property laws. Unauthorized reproduction, distribution, or creation of derivative works is prohibited without express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We do not endorse or assume any responsibility for the content or practices of these external sites. Your use of third-party websites is at your own risk, and we encourage you to review their terms and privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on our website, and it is your responsibility to review these Terms periodically. Continued use of the website after modifications will constitute your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">8. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Louisiana, without regard to its conflict of law principles. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located within Louisiana.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">9. Contact Information</h2>
          <p>
            For any questions or concerns regarding these Terms and Conditions, please reach out through our official channels on the website. Your understanding and cooperation are appreciated as we strive to maintain a safe and enjoyable environment for all users.
          </p>
        </section>
      </div>
    </div>
  );
}
