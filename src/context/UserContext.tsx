import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, CreateUserRequest } from '@/types/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string };

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  fetchUsers: () => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => User | undefined;
} | null>(null);

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
}

// Mock API simulation
const generateId = () => Math.random().toString(36).substr(2, 9);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    company: {
      name: 'Tech Solutions Inc.',
      catchPhrase: 'Innovative technology solutions',
      bs: 'synergistic solutions'
    },
    address: {
      street: '123 Main St',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' }
    },
    website: 'john-doe.com',
    username: 'johndoe'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0456',
    company: {
      name: 'Design Studios LLC',
      catchPhrase: 'Creative design solutions',
      bs: 'innovative designs'
    },
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      zipcode: '90210',
      geo: { lat: '34.0522', lng: '-118.2437' }
    },
    website: 'jane-smith.com',
    username: 'janesmith'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1-555-0789',
    company: {
      name: 'Marketing Pro',
      catchPhrase: 'Strategic marketing excellence',
      bs: 'digital marketing'
    },
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      zipcode: '60601',
      geo: { lat: '41.8781', lng: '-87.6298' }
    },
    website: 'mike-johnson.com',
    username: 'mikejohnson'
  }
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SET_USERS', payload: mockUsers });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createUser = async (userData: CreateUserRequest) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const newUser: User = {
        id: generateId(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        company: {
          name: userData.company,
          catchPhrase: 'New company',
          bs: 'business solutions'
        },
        address: userData.address,
        website: `${userData.name.toLowerCase().replace(' ', '-')}.com`,
        username: userData.name.toLowerCase().replace(' ', '')
      };
      dispatch({ type: 'ADD_USER', payload: newUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create user' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      const existingUser = state.users.find(user => user.id === id);
      if (existingUser) {
        const updatedUser = { ...existingUser, ...userData };
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update user' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteUser = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete user' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getUserById = (id: string) => {
    return state.users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}