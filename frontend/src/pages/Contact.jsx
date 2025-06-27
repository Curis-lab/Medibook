function Contact() {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know. Our team is ready to assist you with any questions or
          concerns. We'll get back to you as soon as possible.
        </p>
        <form className="space-y-8" action="">
          <div>
            <label
              htmlFor="email"
              className="text-black font-semibold text-[16px] leading-7 mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primary text-[16px] leading-7 text-black placeholder:text-primary cursor-pointer rounded-md mt-1"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-black font-semibold text-[16px] leading-7 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primary text-[16px] leading-7 text-black placeholder:text-primary cursor-pointer rounded-md mt-1"
              placeholder="Let us know that we can help you."
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor=""
              className="text-black font-semibold text-[16px] leading-7 mb-2"
            >
              Your message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primary text-[16px] leading-7 text-black placeholder:text-primary cursor-pointer rounded-md mt-1"
              placeholder="Leave a message...."
            />
          </div>
          <button className="btn rounded sm:w-fit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
