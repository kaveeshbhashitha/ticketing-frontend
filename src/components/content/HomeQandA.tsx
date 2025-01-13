import React from "react";

const faqData = [
  {
    id: "faq1",
    question: "How do I purchase tickets on your website?",
    answer:
      "To purchase tickets, simply browse the event categories (sports, theater, outdoor activities, or conventions) on our homepage. Select the event you want to attend and then select the number of tickets. After that, proceed to checkout to complete your purchase.",
  },
  {
    id: "faq2",
    question: "How can I access my tickets after purchase?",
    answer:
      "Once you complete your purchase, you will receive a confirmation email. You can also log in to your account on our website to view your tickets at any time before the event.",
  },
  {
    id: "faq3",
    question: "Is my personal information safe when I buy tickets?",
    answer:
      "Yes, your personal and payment information is fully secure. We use industry-standard encryption methods and comply with all relevant privacy regulations to ensure your data is protected at all times.",
  },
  {
    id: "faq4",
    question: "What forms of payment do you accept?",
    answer:
      "We accept a variety of payment methods, including online payment options such as credit cards (Visa, MasterCard), debit cards . We ensure that all payment methods are safe and reliable.",
  },
  {
    id: "faq5",
    question: "Can I cancel my ticket after purchasing?",
    answer:
      "Yes, you can cancel your purchased tickets under My Tickets section.",
  },
  {
    id: "faq6",
    question:
      "Is there a mobile app to buy tickets?",
    answer:
      "We currently do not have a dedicated mobile app, but our website is fully optimized for mobile devices. You can easily browse, select, and purchase tickets directly from your smartphone or tablet.",
  },
];

const HomeQandA: React.FC = () => {
  return (
    <section id="faq" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>F.A.Q</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <ul id="faq-list">
              {faqData.map((faq) => (
                <li key={faq.id}>
                  <a
                    data-toggle="collapse"
                    href={`#${faq.id}`}
                    className="collapsed"
                  >
                    {faq.question} <i className="fa fa-minus-circle"></i>
                  </a>
                  <div
                    id={faq.id}
                    className="collapse"
                    data-parent="#faq-list"
                  >
                    <p>{faq.answer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeQandA;
