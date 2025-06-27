import { useState } from "react";
import { VideoIcon, MailIcon, LockIcon, UserIcon, SparklesIcon, RocketIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/4 left-1/2 w-56 h-56 bg-accent-200/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Card variant="glass" className="overflow-hidden animate-fade-in">
          <div className="flex flex-col lg:flex-row min-h-[700px]">
            {/* SIGNUP FORM SECTION */}
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
                      {error.response?.data?.message || "Registration failed. Please try again."}
                    </span>
                  </div>
                </div>
              )}

              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Header */}
                  <div className="text-center lg:text-left mb-8">
                    <h2 className="text-3xl font-bold font-display text-base-content mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-neutral-500 text-lg">
                      Join thousands of professionals using StreamifyPro for seamless video communication
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="Enter your full name"
                      leftIcon={UserIcon}
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                      size="lg"
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      leftIcon={MailIcon}
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      size="lg"
                    />

                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      leftIcon={LockIcon}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      size="lg"
                      helperText="Password must be at least 6 characters long"
                    />

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3 p-4 bg-base-200/50 rounded-xl">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm mt-1"
                        required
                      />
                      <div className="text-sm text-neutral-600 leading-relaxed">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                          Privacy Policy
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isPending}
                      className="shadow-glow-primary"
                      icon={RocketIcon}
                    >
                      {isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center pt-6 border-t border-base-300/50">
                    <p className="text-neutral-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* ILLUSTRATION SECTION */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-secondary-50 via-accent-50/50 to-primary-50/30 items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-16 left-12 w-24 h-24 border-2 border-secondary-300 rounded-2xl rotate-12"></div>
                <div className="absolute top-40 right-20 w-20 h-20 border-2 border-accent-300 rounded-full"></div>
                <div className="absolute bottom-24 left-24 w-16 h-16 border-2 border-primary-300 rounded-2xl rotate-45"></div>
                <div className="absolute bottom-40 right-40 w-28 h-28 border-2 border-secondary-300 rounded-full"></div>
              </div>

              <div className="relative z-10 max-w-lg p-8 text-center animate-fade-in">
                {/* Main Illustration */}
                <div className="relative mb-8">
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-secondary-100 to-accent-100 rounded-3xl flex items-center justify-center shadow-soft">
                    <div className="relative">
                      {/* Feature Grid */}
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
                          <ShieldIcon className="size-10 text-white" />
                        </div>
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center shadow-medium">
                          <ZapIcon className="size-10 text-white" />
                        </div>
                        <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-medium">
                          <VideoIcon className="size-10 text-white" />
                        </div>
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center shadow-medium">
                          <RocketIcon className="size-10 text-white" />
                        </div>
                      </div>

                      {/* Central Icon */}
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-hard animate-pulse">
                          <UserIcon className="size-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <SparklesIcon className="absolute top-6 right-6 size-6 text-secondary-500 animate-pulse" />
                  <SparklesIcon className="absolute bottom-12 left-12 size-4 text-primary-500 animate-pulse" style={{ animationDelay: '1s' }} />
                  <SparklesIcon className="absolute top-1/2 left-4 size-5 text-accent-500 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-display text-gradient-secondary">
                    Join the Future of Communication
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Experience next-generation video calling with enterprise-grade security,
                    crystal-clear quality, and seamless collaboration tools.
                  </p>

                  {/* Benefits List */}
                  <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                    {[
                      { icon: ShieldIcon, text: "Enterprise Security" },
                      { icon: ZapIcon, text: "Lightning Fast" },
                      { icon: VideoIcon, text: "4K Video Quality" },
                      { icon: RocketIcon, text: "Easy Setup" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <benefit.icon className="size-4 text-primary-600" />
                        <span className="text-neutral-600 font-medium">{benefit.text}</span>
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

export default SignUpPage;
