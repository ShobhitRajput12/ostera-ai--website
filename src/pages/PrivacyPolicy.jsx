import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const metaCards = [
  {
    label: 'Privacy Model',
    title: 'On-Device by Default',
    body: 'Speech, text, and language model inference run locally on the user device, not on our servers.',
  },
  {
    label: 'Data Flow',
    title: 'No Personal Data Upload',
    body: 'We do not collect, store, or transmit user conversations, recordings, or identifiers to Ostera AI systems.',
  },
  {
    label: 'Compliance',
    title: 'India-Focused Legal Basis',
    body: 'Prepared with reference to the DPDP Act, the IT Act, and related Indian regulatory obligations.',
  },
];

const sections = [
  {
    id: 'commitment',
    title: 'Our Commitment to Privacy',
    blocks: [
      {
        type: 'paragraph',
        text: 'Ostera AI Private Limited ("Ostera AI", "we", "us", or "our") is committed to protecting your privacy and ensuring the security of your data. Our applications are designed with privacy as a foundational principle. All AI processing, including speech-to-text, text-to-speech, and language model inference, occurs entirely on your device. We do not collect, store, or transmit any personal data to our servers.',
      },
      {
        type: 'paragraph',
        text: 'This Privacy Policy is prepared in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and the rules framed thereunder, as applicable in India.',
      },
    ],
  },
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    blocks: [
      {
        type: 'paragraph',
        text: '1.1 Information We Do NOT Collect',
      },
      {
        type: 'bullets',
        items: [
          'Voice recordings or audio inputs (processed locally).',
          'Chat messages or conversation history (stored only on your device).',
          'Personal identifiers such as name, email address, phone number, or any other personally identifiable information.',
          'Location data.',
          'Device identifiers or advertising IDs for tracking purposes.',
          'Usage analytics, behavioral data, crash reports, or any telemetry data.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No account registration is required to use the app, and we do not maintain any user accounts on our servers.',
      },
      {
        type: 'paragraph',
        text: '1.2 Information Processed Locally',
      },
      {
        type: 'bullets',
        items: [
          'Audio input from the microphone for on-device speech-to-text transcription.',
          "Conversation history stored in the app's private storage.",
          'Downloaded AI models (sourced from public repositories).',
        ],
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'All data remains on your device and is used solely for the following purposes:',
      },
      {
        type: 'bullets',
        items: [
          'Providing real-time speech-to-text transcription using on-device AI models.',
          'Generating text-to-speech audio output.',
          'Processing chat conversations with locally running language models.',
          'Enabling local storage of conversation history for user convenience.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No data is uploaded, analysed, or used for training models, advertising, or any other purpose.',
      },
    ],
  },
  {
    id: 'sharing-and-disclosure',
    title: '3. Data Sharing and Disclosure',
    blocks: [
      {
        type: 'paragraph',
        text: 'We do not share, sell, rent, or disclose any user data with any third parties. No data is transmitted to our servers or to any external service providers.',
      },
      {
        type: 'paragraph',
        text: '3.1 Model Downloads - Third-Party Sources',
      },
      {
        type: 'paragraph',
        text: 'The app may download open-source AI models from public repositories such as:',
      },
      {
        type: 'bullets',
        items: ['Hugging Face (huggingface.co)', 'GitHub (github.com)'],
      },
      {
        type: 'paragraph',
        text: 'These are standard file downloads that do not include any of your personal data. We recommend that you review the terms and privacy policies of these third-party platforms independently. Ostera AI does not endorse or guarantee the security of third-party repositories.',
      },
    ],
  },
  {
    id: 'storage-and-security',
    title: '4. Data Storage and Security',
    blocks: [
      {
        type: 'paragraph',
        text: "4.1 Local Storage. All user-generated data is stored locally in the app's private storage on your Android device, protected by Android's application sandboxing mechanism. This storage is accessible only to the Ostera AI application.",
      },
      {
        type: 'paragraph',
        text: '4.2 Data Retention',
      },
      {
        type: 'bullets',
        items: [
          'Conversation history remains on the device until you manually delete it or uninstall the app.',
          'Downloaded models remain until you delete them via the app or uninstall the application.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Uninstalling the app will permanently delete all associated local data.',
      },
    ],
  },
  {
    id: 'permissions-requested',
    title: '5. Permissions Requested',
    blocks: [
      {
        type: 'paragraph',
        text: 'The application requests only the following permissions, with clear justification:',
      },
      {
        type: 'bullets',
        items: [
          'Microphone (RECORD_AUDIO) - For on-device speech-to-text functionality',
          'Internet (INTERNET) - Solely for downloading AI models from public repositories',
          'Storage (READ/WRITE) - For storing downloaded models (required on Android 9 and below)',
        ],
      },
      {
        type: 'paragraph',
        text: 'The Internet permission is used exclusively for model downloads. No user data, conversations, or personal information is ever transmitted over the internet. You may revoke these permissions at any time through your device settings.',
      },
    ],
  },
  {
    id: 'processing-verification',
    title: '6. On-Device Processing Verification',
    blocks: [
      {
        type: 'paragraph',
        text: "After the initial download of AI models, the application is designed to function completely offline. All inference and processing occur locally using your device's CPU/GPU/NPU within the sandboxed environment of the app. No network requests are made to any external servers during normal operation.",
      },
    ],
  },
  {
    id: 'rights-under-indian-law',
    title: '7. Your Rights under Indian Law',
    blocks: [
      {
        type: 'paragraph',
        text: 'In accordance with the DPDP Act and other applicable laws, you have the following rights with respect to any data processed on your device:',
      },
      {
        type: 'bullets',
        items: [
          'Right to Access: All your data is stored locally and can be accessed through the app.',
          'Right to Correction / Erasure: You may delete individual conversations, all chat history, or downloaded models directly within the app.',
          'Right to Withdraw Consent / Complete Deletion: Uninstalling the application removes all data associated with Ostera AI from your device.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Since we do not collect or store any personal data on our systems, requests under the DPDP Act may be directed to the contact details below.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    title: "8. Children's Privacy",
    blocks: [
      {
        type: 'paragraph',
        text: "Ostera AI does not knowingly process personal data of children below the age of 18. Given that no personal data is collected by us, the application may be used by users of all ages. Parents or guardians are encouraged to supervise minors' use of the application.",
      },
    ],
  },
  {
    id: 'changes-to-policy',
    title: '9. Changes to This Privacy Policy',
    blocks: [
      {
        type: 'paragraph',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Any material changes will be notified by updating the Effective Date and posting the revised policy on our website. Continued use of the application after such changes constitutes acceptance of the updated policy.',
      },
    ],
  },
  {
    id: 'contact-us',
    title: '10. Contact Us',
    blocks: [
      {
        type: 'contact',
        lines: [
          'Ostera AI Private Limited',
          'D Block, 3rd Floor, IITM Research Park,',
          'Kanagam Road, Kanagam, Tharamani,',
          'Chennai, Tamil Nadu 600113',
          'Email: coo@ostera.ai',
          'Phone: +91 94287 28709',
          { text: 'Grievance Officer', emphasis: true },
          'Email: coo@ostera.ai',
        ],
      },
      {
        type: 'paragraph',
        text: 'We shall endeavour to address all grievances within the timelines prescribed under applicable Indian law.',
      },
      {
        type: 'paragraph',
        text: 'Note: This Privacy Policy applies to the Ostera AI mobile application(s) distributed through the Google Play Store and any other official distribution channels. By using our application, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy.',
      },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="A privacy-first operating model for on-device AI. No cloud inference, no silent telemetry, and no personal data collection by default."
      effectiveDate="08 May 2026"
      metaCards={metaCards}
      sections={sections}
    />
  );
}
