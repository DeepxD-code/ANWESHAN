import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { t } = useLanguage();

  const navigate = useNavigate();


  return (

    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-lg bg-card border rounded-2xl shadow-xl p-8">


        <h1 className="text-3xl font-bold text-center mb-2">
          {t("register.title")}
        </h1>


        <p className="text-center text-muted-foreground mb-6">
          {t("register.subtitle")}
        </p>


        <div className="grid gap-4">


          <input
            placeholder={t("register.fullName")}
            className="input-style"
          />


          <input
            placeholder={t("register.age")}
            className="input-style"
          />


          <select className="input-style">
            <option>
              {t("register.selectGender")}
            </option>
            <option>
              {t("register.male")}
            </option>
            <option>
              {t("register.female")}
            </option>
            <option>
              {t("register.other")}
            </option>
          </select>


          <input
            placeholder={t("register.mobile")}
            className="input-style"
          />


          <input
            placeholder={t("register.email")}
            className="input-style"
          />


          <input
            type="password"
            placeholder={t("register.password")}
            className="input-style"
          />


          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            className="input-style"
          />


          <select className="input-style">

            <option>
              {t("register.preferredLanguage")}
            </option>

            <option>
              {t("register.english")}
            </option>

            <option>
              {t("register.hindi")}
            </option>

          </select>


          <input
            placeholder={t("register.city")}
            className="input-style"
          />


          <input
            placeholder={t("register.emergencyContact")}
            className="input-style"
          />


          <Button
            onClick={() => navigate("/role-selector")}
            className="w-full py-6"
          >
            {t("register.register")}
          </Button>


          <p className="text-center text-sm">

            {t("register.hasAccount")}{" "}

            <Link
              to="/login"
              className="text-primary font-semibold"
            >
              {t("register.login")}
            </Link>

          </p>


        </div>

      </div>

    </div>

  );
};


export default Register;