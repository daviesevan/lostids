import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/contexts/authcontext";
import { useToast } from "@/contexts/toastcontext";
import { loginUser, signupUser } from "@/interceptor";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AuthForm({ method }) {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleAuth = () => {
    window.location.href = "https://lostids.onrender.com/api/auth/authorize/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (method === "signup") {
        const response = await signupUser(
          formData.username,
          formData.fullname,
          formData.email,
          formData.password
        );
        showSuccessToast(response.message || "Signup successful!", {
          duration: 4000,
          position: "top-right",
        });
        navigate("/signup/success");
      } else if (method === "login") {
        const response = await loginUser(formData.email, formData.password);
        login(response.access_token);
        showSuccessToast(response.message || "Login successful!", {
          duration: 4000,
          position: "top-right",
        });
        navigate("/");
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
    
      if (error.response) {
        if (error.response.data) {
          errorMessage = error.response.data.message || error.response.data.error || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
    
      setError(errorMessage);
      showErrorToast(errorMessage, {
        duration: 4000,
        position: "top-center",
      });
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-4 space-y-4">
          <div>
            {/* Title */}
            <h1 className="text-4xl font-medium tracking-tight text-center">
              {method === "signup" ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="mt-2 text-xl text-center text-muted-foreground">
              {method === "signup"
                ? "Join us to build beautiful cross-platform apps."
                : "Sign in to continue your journey."}
            </p>
            {/* End Title */}
          </div>
          <div className="grid">
            <Button
              variant={"outline"}
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg
                className="w-4 h-auto mr-2"
                width={46}
                height={47}
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              {method === "signup"
                ? "Sign up with Google"
                : "Login with Google"}
            </Button>
          </div>
          <Separator className="my-6 bg-background" />
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {method === "signup" && (
              <>
                <div className="mb-4">
                  <Label htmlFor="username" className="sr-only">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="fullname" className="sr-only">
                    Full name
                  </Label>
                  <Input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            {method === "login" && (
              <div className="mb-4 text-right">
                <Link to="/forgot-password" className="text-sm text-primary">
                  Forgot Password?
                </Link>
              </div>
            )}
            <div className="grid">
              <Button type="submit" disabled={isLoading}>
                {method === "signup" ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </form>
          {/* End Form */}
          <div className="mt-4 text-center">
            {method === "signup" ? (
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary">
                  Sign in
                </Link>
              </p>
            ) : (
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Sign up
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
