
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSignupMutation } from '@/store/services/authApi';
import { setCredentials } from '@/store/slices/authSlice';
import { AlertCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const result = await signup(formData).unwrap();
      dispatch(setCredentials(result.user));
      navigate('/');
    } catch (err) {
      setError(err.data?.message || 'Signup failed');
    }
  };
  
  return (
    
     <div className='min-h-screen max-w-5xl mx-auto flex'>
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center ">
        <img
          src="/images/sign-up.jpg" // Replace this with your actual image path
          alt="Login Illustration"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-background">
     <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
        <CardHeader className="space-y-1 text-center">
  <img src={'/logo.jpg'} alt="Senior Care Oasis Logo" className="mx-auto h-16" />
  
</CardHeader>
          <CardDescription>Enter your information to create an account</CardDescription>
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
              <label className="text-sm font-medium" htmlFor="name">Full Name</label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                placeholder="email@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
      </div>
     </div>
    
  );
};

export default Signup;
