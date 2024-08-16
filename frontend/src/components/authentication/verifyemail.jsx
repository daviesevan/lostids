import { useToast } from "@/contexts/toastcontext";
import { api } from "@/interceptor";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const { token } = useParams();
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus("No verification token found.");
        showErrorToast("No verification token found.");
        return;
      }

      try {
        const response = await api.post(`/api/auth/verify-email/${token}`);

        if (response.status === 200) {
          setVerificationStatus("Email verified successfully!");
          showSuccessToast("Email verified successfully! You can now login", {
            position: "top-center",
            duration: 4000,
          });
          setTimeout(() => navigate("/signup"), 3000);
        }
      } catch (error) {
        if (error.response) {
          setVerificationStatus(error.response.data.message);
          showErrorToast(error.response.data.message, {
            position: "top-center",
            duration: 4000,
          });
        } else {
          setVerificationStatus("An error occurred during verification.");
          showErrorToast("An error occurred during verification.", {
            position: "top-center",
            duration: 4000,
          });
        }
      }
    };

    verifyEmail();
  }, [navigate, showSuccessToast, showErrorToast]);

  return <div>{verificationStatus}</div>;
};

export default VerifyEmail;
