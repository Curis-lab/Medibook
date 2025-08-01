import React, { useState, useContext } from "react";
import Modal from "./Modal";
import useAccountDeletionModal from "../../../hooks/Modals/useAccountDeletionModal";
import { deleteDoctorAccount } from "../../../apis/doctor";
import { deleteCurrentUserProfile } from "../../../apis/patient";
import { authContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AccountDeletionModal() {
  const accountDeletionModal = useAccountDeletionModal();
  const [comfirmText, setComfirmText] = useState("");
  const { dispatch, user, role } = useContext(authContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    //check by role
    let res;
    if (role === "doctor") {
      res = await deleteDoctorAccount(user._id);
    } else {
      res = await deleteCurrentUserProfile(user._id);
    }
    if (res.ok) {
      dispatch({
        type: "LOGOUT",
      });
      accountDeletionModal.onClose();
      navigate("/");
    } else {
      toast.error("Cannot Delete this account.");
    }
  };

  const body = (
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold">To confirm, type "delete" in the box below</h1>
      <input
      className="p-2 border-2 w-full rounded-lg"
        type="text"
        placeholder="Please confirm account"
        value={comfirmText}
        onChange={(e) => setComfirmText(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      isOpen={accountDeletionModal.isOpen}
      title="Account Deletion"
      body={body}
      onClose={() => accountDeletionModal.onClose()}
      onSubmit={handleSubmit}
      onDisabled={comfirmText !== "delete"}
    />
  );
}

export default AccountDeletionModal;
