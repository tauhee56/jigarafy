import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  VideoIcon,
  MapPinIcon,
  ShuffleIcon,
  UserIcon,
  SparklesIcon,
  GlobeIcon,
  MessageCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "lucide-react";
import { LANGUAGES } from "../constants";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile setup completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Setup failed. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("New profile picture generated!");
  };

  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Card variant="glass" className="overflow-hidden animate-fade-in">
          <div className="p-8 lg:p-12">
            {/* Header Section */}
            <div className="text-center mb-8 animate-slide-up">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <VideoIcon className="size-12 text-primary-600" />
                  <SparklesIcon className="size-4 absolute -top-1 -right-1 text-secondary-500 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-display text-gradient-primary tracking-tight">
                    StreamifyPro
                  </span>
                  <span className="text-sm text-neutral-500 font-medium -mt-1">
                    Professional Setup
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold font-display text-base-content mb-3">
                Complete Your Professional Profile
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Set up your profile to connect with colleagues and clients worldwide through our premium video platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Profile Picture Section */}
              <Card className="text-center">
                <Card.Header>
                  <Card.Title className="flex items-center justify-center gap-2">
                    <UserIcon className="size-5 text-primary-600" />
                    Profile Picture
                  </Card.Title>
                  <Card.Description>
                    Choose a professional profile picture for your account
                  </Card.Description>
                </Card.Header>

                <Card.Content>
                  <div className="flex flex-col items-center gap-6">
                    {/* Profile Picture Preview */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-2xl ring-4 ring-primary-200 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                        {formState.profilePic ? (
                          <img
                            src={formState.profilePic}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <UserIcon className="size-12 text-primary-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="size-4 text-white" />
                      </div>
                    </div>

                    {/* Generate Avatar Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRandomAvatar}
                      icon={ShuffleIcon}
                    >
                      Generate Random Avatar
                    </Button>
                  </div>
                </Card.Content>
              </Card>

              {/* Personal Information */}
              <Card>
                <Card.Header>
                  <Card.Title className="flex items-center gap-2">
                    <UserIcon className="size-5 text-primary-600" />
                    Personal Information
                  </Card.Title>
                  <Card.Description>
                    Tell us about yourself and your professional background
                  </Card.Description>
                </Card.Header>

                <Card.Content className="space-y-6">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    leftIcon={UserIcon}
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    required
                  />

                  <div className="space-y-2">
                    <label className="form-label">Professional Bio</label>
                    <textarea
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="input-professional min-h-[120px] resize-none"
                      placeholder="Tell others about your professional background, expertise, and communication goals..."
                      rows={4}
                    />
                    <p className="text-sm text-neutral-500">
                      A good bio helps colleagues understand your background and expertise
                    </p>
                  </div>

                  <Input
                    label="Location"
                    type="text"
                    placeholder="City, Country"
                    leftIcon={MapPinIcon}
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    helperText="Your location helps with timezone coordination"
                  />
                </Card.Content>
              </Card>

              {/* Communication Preferences */}
              <Card>
                <Card.Header>
                  <Card.Title className="flex items-center gap-2">
                    <GlobeIcon className="size-5 text-primary-600" />
                    Communication Preferences
                  </Card.Title>
                  <Card.Description>
                    Help us understand your communication needs and language preferences
                  </Card.Description>
                </Card.Header>

                <Card.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Native Language */}
                    <div className="space-y-2">
                      <label className="form-label">Primary Language</label>
                      <select
                        value={formState.nativeLanguage}
                        onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                        className="input-professional"
                        required
                      >
                        <option value="">Select your primary language</option>
                        {LANGUAGES.map((lang) => (
                          <option key={`native-${lang}`} value={lang.toLowerCase()}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-neutral-500">
                        The language you're most comfortable communicating in
                      </p>
                    </div>

                    {/* Secondary Language */}
                    <div className="space-y-2">
                      <label className="form-label">Secondary Language</label>
                      <select
                        value={formState.learningLanguage}
                        onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                        className="input-professional"
                      >
                        <option value="">Select a secondary language</option>
                        {LANGUAGES.map((lang) => (
                          <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-neutral-500">
                        Additional language for international communication
                      </p>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Completion */}
              <Card variant="gradient" className="text-center">
                <Card.Content>
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary">
                      <CheckCircleIcon className="size-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-base-content mb-2">
                        Ready to Get Started?
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Complete your profile setup to start connecting with professionals worldwide
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isPending}
                      className="shadow-glow-primary min-w-[200px]"
                      icon={ArrowRightIcon}
                    >
                      {isPending ? "Setting Up..." : "Complete Setup"}
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default OnboardingPage;
