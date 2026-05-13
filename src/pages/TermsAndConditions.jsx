import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const metaCards = [
  {
    label: 'Service Scope',
    title: 'Mobile AI Services',
    body: 'These terms govern use of Ostera AI mobile applications, features, and related service experiences.',
  },
  {
    label: 'Commercial Model',
    title: 'Free Today, Expandable Tomorrow',
    body: 'Core services are currently free, with possible premium or enterprise offerings under separate terms later.',
  },
  {
    label: 'Jurisdiction',
    title: 'Governed by Indian Law',
    body: 'Disputes and enforceability are handled under Indian law and Chennai court jurisdiction.',
  },
];

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    blocks: [
      {
        type: 'paragraph',
        text: 'Ostera AI Private Limited ("Ostera AI", "we", "us", or "our") provides mobile applications and related services that enable users to interact with on-device artificial intelligence tools. These Terms and Conditions (the "Terms") govern your access and use of the Ostera AI mobile applications, features, and services (collectively, the "Ostera AI Services" or "Services").',
      },
      {
        type: 'paragraph',
        text: 'These Terms constitute the entire agreement between you and Ostera AI Private Limited regarding your use of the Services and supersede any prior agreements.',
      },
      {
        type: 'paragraph',
        text: 'By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Services.',
      },
    ],
  },
  {
    id: 'services-we-provide',
    title: '1. The Services We Provide',
    blocks: [
      {
        type: 'paragraph',
        text: 'Ostera AI is committed to delivering high-quality, private AI experiences. Our Services include the following:',
      },
      {
        type: 'bullets',
        items: [
          '1.1 Provide a personalised AI experience: We offer tools such as speech-to-text, text-to-speech, and conversational AI capabilities that adapt to your usage and preferences within the app.',
          '1.2 Enable you to communicate and interact with AI: You can engage in conversations, generate content, and utilise AI features for productivity, creativity, and daily tasks.',
          '1.3 Empower you to express yourself: The Services allow you to create, edit, and manage content through AI assistance while maintaining full control over your inputs and outputs.',
          '1.4 Promote the safety, security, and integrity of our Services: We work to maintain the security and proper functioning of the Services and may remove content or restrict access that violates these Terms.',
          '1.5 Research and improve our Services: We may analyse aggregated and anonymised usage patterns (where applicable) to develop, test, and improve our applications, in compliance with our Privacy Policy.',
          '1.6 Ensure consistent performance: We strive to provide reliable and uninterrupted access to the Services where technically feasible.',
        ],
      },
    ],
  },
  {
    id: 'funding',
    title: '2. How Our Services Are Funded',
    blocks: [
      {
        type: 'paragraph',
        text: 'The Ostera AI Services are provided free of charge. We do not display advertisements, sell user data, or engage in any form of data monetisation. We may, in the future, offer premium features or enterprise versions under separate terms.',
      },
    ],
  },
  {
    id: 'your-commitments',
    title: '3. Your Commitments to Ostera AI and Our Community',
    blocks: [
      {
        type: 'paragraph',
        text: '3.1 Who Can Use Ostera AI',
      },
      {
        type: 'paragraph',
        text: 'You must:',
      },
      {
        type: 'bullets',
        items: [
          'Provide accurate information if you choose to contact us or provide feedback.',
          'Use the Services only for lawful purposes.',
          'Not create multiple accounts for abusive purposes.',
          'Not share your login credentials with others (if applicable).',
        ],
      },
      {
        type: 'paragraph',
        text: 'You cannot use the Services if:',
      },
      {
        type: 'bullets',
        items: [
          'You are under the age of 18 (or the minimum age required in your jurisdiction).',
          'You have previously been suspended or removed from the Services.',
          'Your use is prohibited under applicable laws.',
        ],
      },
      {
        type: 'paragraph',
        text: '3.2 What You Can Share and Do on Ostera AI Services',
      },
      {
        type: 'paragraph',
        text: 'You agree not to:',
      },
      {
        type: 'bullets',
        items: [
          'Use the Services for any unlawful, misleading, discriminatory, or fraudulent purpose.',
          'Upload or generate content that violates intellectual property rights, is harmful, abusive, or violates any applicable laws.',
          'Attempt to reverse-engineer, decompile, or extract source code from the Services, except as permitted by law.',
          'Use automated means to access or scrape the Services without our prior permission.',
          'Interfere with the proper working of the Services or impose an unreasonable load on our systems.',
          'Circumvent any security or technological measures we implement.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We may remove content, suspend, or terminate your access if you violate these Terms.',
      },
      {
        type: 'paragraph',
        text: '3.3 The Permissions You Give Us',
      },
      {
        type: 'paragraph',
        text: 'By using the Services, you grant Ostera AI a non-exclusive, royalty-free, worldwide licence to host, store, and process the content you input solely as necessary to provide and improve the Services. This licence ends when you delete the content or your data from the app, subject to our Privacy Policy.',
      },
      {
        type: 'paragraph',
        text: 'You retain ownership of all content you create or input. We do not claim ownership of your content.',
      },
      {
        type: 'paragraph',
        text: '3.4 Limits on Using Our Intellectual Property',
      },
      {
        type: 'paragraph',
        text: 'All intellectual property rights in the Ostera AI Services, logos, trademarks, and underlying technology belong to Ostera AI Private Limited. You may not use our trademarks or copy any part of the Services without our prior written permission, except as expressly allowed under these Terms.',
      },
    ],
  },
  {
    id: 'additional-provisions',
    title: '4. Additional Provisions',
    blocks: [
      {
        type: 'paragraph',
        text: '4.1 Updating These Terms. We may update these Terms from time to time. We will notify you of material changes by posting the revised Terms with a new Effective Date. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms. If you do not agree, you must stop using the Services and uninstall the application.',
      },
      {
        type: 'paragraph',
        text: '4.2 Account Suspension or Termination. We may suspend or terminate your access to the Services at our discretion if you breach these Terms, engage in harmful conduct, or for legal reasons. Upon termination, your right to use the Services ceases immediately.',
      },
      {
        type: 'paragraph',
        text: '4.3 Limits on Liability. The Services are provided "as is" without any warranties. To the maximum extent permitted by law, Ostera AI Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services.',
      },
      {
        type: 'paragraph',
        text: '4.4 Disputes and Governing Law. These Terms shall be governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu.',
      },
      {
        type: 'paragraph',
        text: '4.5 Miscellaneous',
      },
      {
        type: 'bullets',
        items: [
          'Severability: If any provision is held invalid, the remaining provisions remain in full force.',
          'No Waiver: Our failure to enforce any right does not constitute a waiver.',
          'Assignment: We may assign these Terms in connection with a merger, acquisition, or sale of assets. You may not assign your rights without our consent.',
          'Feedback: Any feedback you provide may be used by us without compensation or restriction.',
        ],
      },
    ],
  },
  {
    id: 'other-policies',
    title: '5. Other Policies',
    blocks: [
      {
        type: 'paragraph',
        text: 'Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms.',
      },
      {
        type: 'paragraph',
        text: 'Note: These Terms apply to the Ostera AI mobile applications distributed through official channels. By using our Services, you acknowledge that you have read, understood, and agree to these Terms and Conditions.',
      },
      {
        type: 'contact',
        lines: [
          { text: 'For questions, contact us at:', emphasis: true },
          'Ostera AI Private Limited',
          'D Block, 3rd Floor, IITM Research Park,',
          'Kanagam Road, Kanagam, Taramani,',
          'Chennai, Tamil Nadu 600113',
          'Email: coo@ostera.ai',
          'Phone: +91 94287 28709',
        ],
      },
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      subtitle="The operating terms for using Ostera AI applications, covering access, acceptable use, intellectual property, and service governance."
      effectiveDate="08 May 2026"
      metaCards={metaCards}
      sections={sections}
    />
  );
}
