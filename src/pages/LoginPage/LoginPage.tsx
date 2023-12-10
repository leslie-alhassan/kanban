import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className='mt-32 my-auto flex justify-center'>
      <SignIn />
    </div>
  );
};

export default LoginPage;
