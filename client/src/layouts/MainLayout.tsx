import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { hideToast } from "../store/toastSlice";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { setUserLoggedIn, setUserLoggedOut } from "../store/authSlice";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const toast = useSelector((state: RootStateType) => state.toast);
  const dispatch = useDispatch();
  const location = useLocation();

  const { isError, isSuccess } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (isError) {
      dispatch(setUserLoggedOut());
    }

    if (isSuccess) {
      dispatch(setUserLoggedIn());
    }
  }, [dispatch, isError, isSuccess]);

  const isRegisterOrLoginPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen text-teal-900">
      <Header />
      {isRegisterOrLoginPage && <Hero />}
      <div className="container flex-1 mx-auto">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => {
              dispatch(hideToast());
            }}
          />
        )}
        {children}
      </div>
      {!isRegisterOrLoginPage && <Footer />}
    </div>
  );
};

export default MainLayout;
