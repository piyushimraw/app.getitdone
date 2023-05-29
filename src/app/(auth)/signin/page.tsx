import AuthForm from "@/components/Authform";

export const metadata = {
  title: "Sign in",
  description: "Please login to continue",
};
const SignInPage = () => {
  return <AuthForm mode="signin" />;
};

export default SignInPage;
