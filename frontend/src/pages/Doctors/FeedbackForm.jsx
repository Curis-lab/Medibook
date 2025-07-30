import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { patientReviews } from "../../apis/review";

function FeedbackForm() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ()=> patientReviews(id, reviewText, rating),
    onSuccess: () => {
      queryClient.invalidateQueries(["doctor", parseInt(id)]);
      toast.success("Review submitted successfully");
      setRating(0);
      setReviewText("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form action="" onSubmit={(e) =>{
      e.preventDefault();
      mutate()
    }}>
      <div>
        <h3 className="text-black text-[16px] leading-6 font-semibold mb-4">
          How would you rate the overrall expericne?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                className={`${
                  index <= (rating && hover) || hover
                    ? "text-yellow-600"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                type="button"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-black text-[16px] leading-6 font-semibold mb-4 mt-0">
          Shre your feedbck or suggestion*
        </h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="border border-solid border-[#0066ff34] focus:outline outline-primary w-full px-4 py-3 rounded-md"
          placeholder="Write your message"
          rows={5}
        />
      </div>
      <button className="btn" type="submit">
        {isPending ? (
          <HashLoader size={25} color="#0066ff61" />
        ) : (
          "Submit Feedback"
        )}
      </button>
    </form>
  );
}

export default FeedbackForm;
