import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../constants/authConfig";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    const res1 = await instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });

    // const res1 = await instance.acquireTokenPopup(loginRequest);
    console.log(res1);
    console.log(res1.accessToken);
  };

  return (
    <div variant="secondary" className="ml-auto" drop="start" title="Sign In">
      <button as="button" onClick={() => handleLogin()}>
        Sign in Popup
      </button>
    </div>
  );
};
