/**
 * FAQ content.
 *
 * `answer` is `null` where the business information has not been confirmed.
 * Never fill these with guessed policies: replace `null` with the confirmed
 * text (an array of paragraphs) and optional links.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string[] | null;
  link?: { label: string; href: string };
};

export const PENDING_ANSWER =
  "Confirmed details will be published here shortly. In the meantime, our client care team will be glad to help.";

export const faqItems: FaqItem[] = [
  {
    id: "sizing",
    question: "How do I choose the right size?",
    answer: [
      "We recommend consulting our Size Guide before placing your order. If you are between sizes or unsure about the fit, please contact our client care team for assistance.",
    ],
    link: { label: "View the size guide", href: "/size-guide" },
  },
  {
    id: "delivery",
    question: "Where do you deliver?",
    answer: [
      "Available delivery destinations, shipping costs and estimated delivery times are displayed at checkout.",
    ],
    link: { label: "Shipping & returns", href: "/shipping-returns" },
  },
  {
    id: "payment",
    question: "Which payment methods can I use?",
    answer: [
      "You can choose from the secure payment methods available at checkout.",
    ],
  },
  {
    id: "returns",
    question: "Can I exchange or return my order?",
    answer: [
      "Exchanges and returns are subject to our Shipping & Returns policy. Please consult the policy for eligibility, timeframes and return instructions.",
    ],
    link: { label: "Read the Shipping & Returns policy", href: "/shipping-returns" },
  },
];
