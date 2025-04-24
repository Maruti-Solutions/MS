import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import SEO from '../components/shared/SEO';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking session:', error);
        setError('Failed to check authentication status');
        setLoading(false);
        return;
      }
      
      if (data?.session) {
        setAuthenticated(true);
        fetchSubmissions();
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);
  
  // Fetch submissions from Supabase
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSubmissions(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions');
      setLoading(false);
    }
  };
  
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setAuthenticated(true);
      fetchSubmissions();
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid login credentials');
      setLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthenticated(false);
      setSubmissions([]);
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out');
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // If not authenticated, show login form
  if (!authenticated) {
    return (
      <div className="min-h-screen pt-24">
        <SEO 
          title="Admin | Maruti Solutions"
          description="Admin dashboard"
          noindex={true}
        />
        <section className="section bg-background-light/30">
          <div className="container max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gradient-animate">Admin Login</h1>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-white rounded-lg p-4 mb-6">
                <p>{error}</p>
              </div>
            )}
            
            <div className="card p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-background-light/30 rounded-lg px-4 py-3 text-white 
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full bg-background-light/30 rounded-lg px-4 py-3 text-white 
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full button-primary"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  // If authenticated, show submissions
  return (
    <div className="min-h-screen pt-24">
      <SEO 
        title="Admin Dashboard | Maruti Solutions"
        description="Admin dashboard"
        noindex={true}
      />
      <section className="section bg-background-light/30">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-animate">Contact Submissions</h1>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white rounded-lg p-4 mb-6">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-xl text-gray-300">No submissions found</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="card p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">{submission.name}</h2>
                    <span className="text-sm text-gray-400">{formatDate(submission.created_at)}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Company</p>
                      <p>{submission.company}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p>{submission.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p>{submission.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Project Type</p>
                      <p>{submission.project_type}</p>
                    </div>
                    {submission.budget && (
                      <div>
                        <p className="text-gray-400 text-sm">Budget</p>
                        <p>{submission.budget}</p>
                      </div>
                    )}
                    {submission.timeline && (
                      <div>
                        <p className="text-gray-400 text-sm">Timeline</p>
                        <p>{submission.timeline}</p>
                      </div>
                    )}
                    {submission.source && (
                      <div>
                        <p className="text-gray-400 text-sm">Source</p>
                        <p>{submission.source}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Project Description</p>
                    <p className="whitespace-pre-wrap">{submission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 