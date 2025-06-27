import { useState } from "react";
import { VideoIcon, MailIcon, LockIcon, SparklesIcon, GlobeIcon, UsersIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-200/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Card variant="glass" className="overflow-hidden animate-fade-in">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* LOGIN FORM SECTION */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              {/* LOGO */}
              <div className="mb-8 text-center lg:text-left animate-slide-up">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="relative">
                    <VideoIcon className="size-12 text-primary-600" />
                    <SparklesIcon className="size-4 absolute -top-1 -right-1 text-secondary-500 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold font-display text-gradient-primary tracking-tight">
                      StreamifyPro
                    </span>
                    <span className="text-sm text-neutral-500 font-medium -mt-1">
                      Professional Video Platform
                    </span>
                  </div>
                </div>
              </div>

              {/* ERROR MESSAGE DISPLAY */}
              {error && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl animate-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                    <span className="text-error font-medium text-sm">
                      {error.response?.data?.message || "Login failed. Please try again."}
                    </span>
                  </div>
                </div>
              )}

              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Header */}
                  <div className="text-center lg:text-left mb-8">
                    <h2 className="text-3xl font-bold font-display text-base-content mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-neutral-500 text-lg">
                      Sign in to continue your professional video calling experience
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      leftIcon={MailIcon}
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      size="lg"
                    />

                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      leftIcon={LockIcon}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      size="lg"
                    />

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                        <span className="text-neutral-600">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isPending}
                      className="shadow-glow-primary"
                    >
                      {isPending ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center pt-6 border-t border-base-300/50">
                    <p className="text-neutral-600">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* ILLUSTRATION SECTION */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary-50 via-secondary-50/50 to-accent-50/30 items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary-300 rounded-full"></div>
                <div className="absolute top-32 right-16 w-16 h-16 border-2 border-secondary-300 rounded-2xl rotate-45"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-accent-300 rounded-full"></div>
                <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-primary-300 rounded-2xl rotate-12"></div>
              </div>

              <div className="relative z-10 max-w-lg p-8 text-center animate-fade-in">
                {/* Main Illustration */}
                <div className="relative mb-8">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center shadow-soft">
                    <div className="relative">
                      {/* Video Call Icons */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium">
                          <VideoIcon className="size-8 text-white" />
                        </div>
                        <div className="w-4 h-1 bg-primary-300 rounded-full"></div>
                        <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-medium">
                          <UsersIcon className="size-8 text-white" />
                        </div>
                      </div>

                      {/* Connection Lines */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <GlobeIcon className="size-12 text-primary-600 animate-pulse" />
                        <MessageCircleIcon className="size-8 text-secondary-600 animate-bounce" style={{ animationDelay: '0.5s' }} />
                      </div>

                      {/* Feature Icons */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: VideoIcon, color: 'primary' },
                          { icon: MessageCircleIcon, color: 'secondary' },
                          { icon: UsersIcon, color: 'accent' }
                        ].map((item, index) => (
                          <div
                            key={index}
                            className={`w-12 h-12 bg-gradient-to-br from-${item.color}-200 to-${item.color}-300 rounded-xl flex items-center justify-center animate-pulse`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <item.icon className={`size-6 text-${item.color}-700`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <SparklesIcon className="absolute top-4 right-4 size-6 text-primary-500 animate-pulse" />
                  <SparklesIcon className="absolute bottom-8 left-8 size-4 text-secondary-500 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-display text-gradient-primary">
                    Professional Video Calling
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Connect with colleagues, clients, and teams worldwide through our secure,
                    high-quality video platform designed for professionals.
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                    {[
                      "HD Video Quality",
                      "Screen Sharing",
                      "Secure Calls",
                      "Global Reach"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-neutral-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
