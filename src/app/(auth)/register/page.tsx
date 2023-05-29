import AuthForm from "@/components/Authform";

export const metadata = {
  title: "Register",
  description: "Create a new Account",
};
const RegisterPage = () => {
  return <AuthForm mode="register" />;
};

export default RegisterPage;
