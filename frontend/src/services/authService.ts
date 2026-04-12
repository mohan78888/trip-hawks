
// Fixed: Add proper interfaces for type safety
interface UserData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ApiError {
  message: string;
}

const API_URL = '/api';

export const authService = {
  async signup(userData: UserData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      // Fixed: Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Backend may not be running.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      
      this.setToken(data.token);
      return data;
    } catch (error: any) {
      console.error('Signup service error:', error);
      
      // Fixed: Better error messages for common issues
      if (error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure backend is running on port 5000.');
      }
      
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      // Fixed: Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Backend may not be running.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      
      this.setToken(data.token);
      return data;
    } catch (error: any) {
      console.error('Login service error:', error);
      
      // Fixed: Better error messages for common issues
      if (error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure backend is running on port 5000.');
      }
      
      throw error;
    }
  },

  async getProfile(): Promise<any | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await fetch(`${API_URL}/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) {
        this.logout();
        return null;
      }
      
      return response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      this.logout();
      return null;
    }
  },

  setToken(token: string): void {
    localStorage.setItem('triphawks_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('triphawks_token');
  },

  logout(): void {
    localStorage.removeItem('triphawks_token');
  }
};