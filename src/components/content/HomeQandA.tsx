import React from "react";

const faqData = [
  {
    id: "faq1",
    question: "Non consectetur a erat nam at lectus urna duis?",
    answer:
      "Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.",
  },
  {
    id: "faq2",
    question: "Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  },
  {
    id: "faq3",
    question: "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?",
    answer:
      "Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis.",
  },
  {
    id: "faq4",
    question: "Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  },
  {
    id: "faq5",
    question: "Tempus quam pellentesque nec nam aliquam sem et tortor consequat?",
    answer:
      "Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.",
  },
  {
    id: "faq6",
    question:
      "Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor?",
    answer:
      "Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.",
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
