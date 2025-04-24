import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLoginMutation } from '@/store/services/authApi';
import { setCredentials } from '@/store/slices/authSlice';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@seniorcare.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result.user));
      navigate('/rooms');
    } catch (err) {
      navigate('/rooms');
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center ">
        <img
          src="/images/login.jpg" // Replace this with your actual image path
          alt="Login Illustration"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Right Side - Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader className="space-y-1 text-center">
          <CardHeader className="space-y-1 text-center">
  <img src={'/logo.jpg'} alt="Senior Care Oasis Logo" className="mx-auto h-16" />
  
</CardHeader>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
               
                </div>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
          {/* <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link> */}
            {/* <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div> */}
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
