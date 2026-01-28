import { LoginForm } from "@/features/auth/components/login-form";
import { optionalAuth } from "@/lib/better-auth/auth-utils";

const Login = async () => {
  await optionalAuth();

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
