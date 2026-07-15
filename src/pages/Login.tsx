import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

const Login = () => {
  const { t } = useLanguage();

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");


      const response = await fetch(
        `${API_BASE}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message || t("login.loginFailed")
        );

        return;

      }


      // Save authentication data

      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Navigate based on user role

      const role = data.user?.role;
      if (role === "SENIOR") navigate("/senior");
      else if (role === "FAMILY") navigate("/family");
      else if (role === "OFFICER") navigate("/officer");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/role-selector");


    }

    catch (err) {

      console.error(err);

      setError(
        t("login.connectionError")
      );

    }

    finally {

      setLoading(false);

    }

  };



  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">


        {/* Logo */}

        <div className="text-center mb-6">

          <ShieldCheck className="mx-auto h-14 w-14 text-primary" />

          <h1 className="text-3xl font-bold mt-3">
            ANWESHAN
          </h1>

          <p className="text-muted-foreground mt-2">
            {t("login.subtitle")}
          </p>

        </div>



        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("login.welcome")}
        </h2>



        <div className="space-y-4">


          <input

            type="email"

            placeholder={t("login.email")}

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="w-full px-4 py-3 rounded-lg border bg-background"

          />



          <input

            type="password"

            placeholder={t("login.password")}

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            className="w-full px-4 py-3 rounded-lg border bg-background"

          />



          {
            error && (

              <p className="text-red-500 text-sm">
                {error}
              </p>

            )
          }



          <div className="flex justify-between items-center text-sm">


            <label className="flex items-center gap-2">

              <input type="checkbox" />

              {t("login.rememberMe")}

            </label>



            <button className="text-primary">

              {t("login.forgotPassword")}

            </button>


          </div>




          <Button

            onClick={handleLogin}

            disabled={loading}

            className="w-full py-6"

          >

            {loading ? "Logging in..." : "Login"}

          </Button>





          <div className="text-center text-muted-foreground">

            ───────── OR ─────────

          </div>





          <Button

            variant="outline"

            className="w-full"

            onClick={() => navigate("/role-selector")}

          >

            {t("login.continueAsDemo")}

          </Button>





          <p className="text-center text-sm mt-4">


            {t("login.noAccount")}{" "}



            <Link

              to="/register"

              className="text-primary font-semibold"

            >

              {t("login.createAccount")}

            </Link>


          </p>



        </div>





        <div className="border-t mt-6 pt-5 text-center text-sm">

          <p className="font-semibold">

            {t("login.emergencyNumbers")}

          </p>



          <p className="text-primary mt-2">

            1930 • 112

          </p>



          <p className="mt-4">

            {t("login.govt")}

          </p>



          <p className="text-muted-foreground">

            {t("login.cyberBranch")}

          </p>


        </div>





        <div className="flex justify-center gap-4 mt-6">


          <Button

            variant="ghost"

            size="sm"

          >

            EN / HI

          </Button>





          <Button

            variant="ghost"

            size="icon"

            onClick={() => setDarkMode(!darkMode)}

          >

            {darkMode ? (

              <Sun />

            ) : (

              <Moon />

            )}

          </Button>



        </div>



      </div>


    </div>
  );
};


export default Login;