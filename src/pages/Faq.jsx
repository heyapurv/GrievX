import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqList = [
  {
    question: "What is GrievX?",
    answer: "GrievX is a smart civic complaint management platform that connects citizens, administrators, and supervisors for rapid, transparent issue resolution. Anyone can submit complaints, track their progress, and interact with authorities.",
  },
  {
    question: "Who can use GrievX?",
    answer: "GrievX is built for: (1) Citizens who want to report and follow civic complaints; (2) Admins who manage, assign, and resolve issues; (3) Supervisors who monitor overdue complaints and overall system health.",
  },
  {
    question: "How do I file a complaint?",
    answer: "Sign up, log in as a citizen, and go to your dashboard. Click 'Create Complaint', fill out the details, optionally attach images, and submit. You can track its status throughout the process.",
  },
  {
    question: "How will I know if my complaint is resolved?",
    answer: "Each complaint's dashboard status is updated in real-time. Notifications or emails may also be sent when there is a change in your complaint's status.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, GrievX uses authentication and privacy best practices. Your personal details and complaints are only visible to authorized personnel handling your case.",
  },
  {
    question: "Which areas can I report issues for?",
    answer: "GrievX covers every district and taluka in Maharashtra. Complaints are routed to the correct authority based on your location details.",
  },
  {
    question: "What if my complaint is ignored or delayed?",
    answer: "Supervisors and Chiefs monitor all overdue complaints. You can also view the escalation path and contact details for authorities if necessary.",
  },
  {
    question: "How is GrievX different?",
    answer: "GrievX is designed for fast, transparent, and accountable resolution, with analytics for authorities, mobile-friendly access, and locally-relevant area mapping.",
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  const toggle = (idx) => setOpen(open === idx ? -1 : idx);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-12 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg">Find answers to common questions about GrievX</p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqList.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
            <button
              className="w-full flex justify-between items-center px-6 py-5 hover:bg-blue-50 transition"
              onClick={() => toggle(idx)}
              aria-expanded={open === idx}
            >
              <span className="text-lg font-semibold text-gray-900 text-left">{item.question}</span>
              <FaChevronDown className={`text-blue-600 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
            </button>

            {open === idx && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}