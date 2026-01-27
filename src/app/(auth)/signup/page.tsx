import { RegisterForm } from "@/features/auth/components/register-form";
import { optionalAuth } from "@/lib/better-auth/auth-utils";

const Signup = async () => {
  await optionalAuth();

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Signup;
