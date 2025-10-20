import {
  generalQuestions,
  subscriptionQuestions,
} from "../../../contents/contact.json";
import AppAccordion from "../../molecules/Accordion/Accordion";

const ContactForm = ({ onSubmit }) => {
  const formConfig = {
    heading: "Contact Us",
    description:
      "Got a technical issue? Want to send feedback about a beta feature? Let us know. Our team is ready to assist you with any questions or concerns. We'll get back to you as soon as possible.",
    fields: [
      {
        id: "email",
        label: "Your Email",
        type: "email",
        placeholder: "example@gmail.com",
        containerClass: "",
      },
      {
        id: "subject",
        label: "Subject",
        type: "text",
        placeholder: "Let us know that we can help you.",
        containerClass: "",
      },
      {
        id: "message",
        label: "Your message",
        type: "textarea",
        placeholder: "Leave a message....",
        rows: 6,
        containerClass: "sm:col-span-2",
      },
    ],
  };

  const FormField = ({ field }) => {
    const commonClasses =
      "w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primary text-[16px] leading-7 text-black placeholder:text-primary cursor-pointer rounded-md mt-1";

    return (
      <div className={field.containerClass}>
        <label
          htmlFor={field.id}
          className="text-black font-semibold text-[16px] leading-7 mb-2"
        >
          {field.label}
        </label>
        {field.type === "textarea" ? (
          <textarea
            id={field.id}
            rows={field.rows}
            className={commonClasses}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            id={field.id}
            className={commonClasses}
            placeholder={field.placeholder}
          />
        )}
      </div>
    );
  };

  return (
    <section className="min-h-screen my-[50px] lg:mx-[160px] sm:mx-[30px] mx-[10px] flex flex-col gap-[70px]">
      <div>
        <h1 className="text-5xl font-bold text-center">How can we help?</h1>
        <p className="text-center mt-[10px]">Quickly browse to topic.</p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-[20px]">General questions</h1>
        <AppAccordion contents={generalQuestions} bg="bg-orange-200" />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-[20px]">
          Subscriptions and billing
        </h1>
        <AppAccordion contents={subscriptionQuestions} bg="bg-pink-200" />
      </div>
      <div className="px-4 mx-auto max-w-screen-md mt-[100px]">
        <h2 className="text-center">{formConfig.heading}</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__parag">
          {formConfig.description}
        </p>
        <form className="space-y-8" onSubmit={onSubmit}>
          {formConfig.fields.map((field) => (
            <FormField key={field.id} field={field} />
          ))}
          <button className="btn rounded sm:w-fit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
