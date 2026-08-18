// Types for the Marketplace App

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: Location;
  rating?: number;
  totalReviews?: number;
  joinedDate: string;
  isVerified?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  images: string[];
  videos?: string[];
  seller: User;
  location: Location;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
  views: number;
  likes: number;
  isLiked?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  product?: Product;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Category[];
}

export interface Review {
  id: string;
  reviewer: User;
  reviewee: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'like' | 'comment' | 'sale' | 'purchase' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  radius?: number;
  condition?: string[];
  sortBy?: 'recent' | 'price_low' | 'price_high' | 'distance';
}
