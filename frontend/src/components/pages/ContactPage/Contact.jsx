const ContactForm = ({ onSubmit }) => {
  const formConfig = {
    heading: "Contact Us",
    description: "Got a technical issue? Want to send feedback about a beta feature? Let us know. Our team is ready to assist you with any questions or concerns. We'll get back to you as soon as possible.",
    fields: [
      {
        id: "email",
        label: "Your Email",
        type: "email",
        placeholder: "example@gmail.com",
        containerClass: ""
      },
      {
        id: "subject", 
        label: "Subject",
        type: "text",
        placeholder: "Let us know that we can help you.",
        containerClass: ""
      },
      {
        id: "message",
        label: "Your message",
        type: "textarea",
        placeholder: "Leave a message....",
        rows: 6,
        containerClass: "sm:col-span-2"
      }
    ]
  };

  const FormField = ({ field }) => {
    const commonClasses = "w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primary text-[16px] leading-7 text-black placeholder:text-primary cursor-pointer rounded-md mt-1";
    
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
    <section className="min-h-screen">
      <div className="px-4 mx-auto max-w-screen-md mt-[100px]">
        <h2 className="text-center">{formConfig.heading}</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__parag">
          {formConfig.description}
        </p>
        <form className="space-y-8" onSubmit={onSubmit}>
          {formConfig.fields.map(field => (
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