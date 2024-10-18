export {}; // To ensure this file is treated as a module

declare global {
  // Example of a global type

  interface GameType {
    id: number;
    name: string;
    image: string;
  };

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface FormData {
    title: string;
    description: string;
    sport: string;
    location: string;
    zipcode: string;
    image: File | null; // The image can be a File or null
    date: string; // Date as a string, usually in 'YYYY-MM-DD' format
  }

  // Example of a global type for API responses
  interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
}