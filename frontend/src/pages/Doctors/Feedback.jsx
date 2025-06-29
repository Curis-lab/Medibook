import React, { useState } from "react";
import { formateDate } from "../../utils/formatDAte";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

function Feedback({ reviews }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="mb-[50px]">
      <h4 className="text-[20px] leading-[30px] font-bold text-primary mb-[30px]">
        All reviews (424)
      </h4>
      {reviews.map((review, idx) => (
        <div key={idx} className="flex justify-between gap-10 mb-[30px]">
          <div className="flex gap-3">
            <figure className="w-10 h-10 rounded-full">
              <img
                src={review.user?.photo || "https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"}
                className="w-full h-full object-cover rounded-full"
                alt="user profile"
              />
            </figure>
            <div>
              <h5 className="text-[16px] leading-6 text-primary font-bold">
                {review.user?.name || "Anonymous"}
              </h5>
              <p className="text-[14px] leading-6 text-primary">
                {formateDate(review.createdAt)}
              </p>
              <p className="text__parag mt-3 font-medium text-[15px]">
                {review.reviewText}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(5).keys()].map((_, idx) => (
              <AiFillStar key={idx} color="#0067FF" />
            ))}
          </div>
        </div>
      ))}
      {!showFeedbackForm && (
        <div className="text-center">
          <button onClick={() => setShowFeedbackForm(true)} className="btn">
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
}

export default Feedback;
