import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SearchFilters } from '../types';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'seller' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleLike: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Excellent Condition',
    description: 'Selling my iPhone 13 Pro in excellent condition. No scratches, battery health 95%. Comes with original box and charger.',
    price: 799,
    currency: 'USD',
    category: 'Mobile Phones',
    condition: 'Like New',
    images: ['https://picsum.photos/400/400?random=1', 'https://picsum.photos/400/400?random=2'],
    seller: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      location: {
        latitude: 40.7580,
        longitude: -73.9855,
        address: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10022',
      },
      rating: 4.9,
      totalReviews: 42,
      joinedDate: '2023-01-15T10:00:00Z',
      isVerified: true,
    },
    location: {
      latitude: 40.7580,
      longitude: -73.9855,
      address: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10022',
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    isAvailable: true,
    views: 234,
    likes: 45,
  },
  {
    id: '2',
    title: 'Samsung 55" 4K Smart TV',
    description: 'Great condition Samsung 4K TV. Moving out, need to sell quickly. Works perfectly, no issues.',
    price: 350,
    currency: 'USD',
    category: 'Electronics',
    condition: 'Good',
    images: ['https://picsum.photos/400/400?random=3'],
    seller: {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      location: {
        latitude: 40.7489,
        longitude: -73.9680,
        address: '789 5th Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10065',
      },
      rating: 4.7,
      totalReviews: 18,
      joinedDate: '2023-06-20T10:00:00Z',
      isVerified: false,
    },
    location: {
      latitude: 40.7489,
      longitude: -73.9680,
      address: '789 5th Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10065',
    },
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    isAvailable: true,
    views: 156,
    likes: 28,
  },
  {
    id: '3',
    title: 'IKEA Sofa - Grey',
    description: 'Comfortable 3-seater sofa from IKEA. Some minor wear but still in good condition. Perfect for apartment.',
    price: 200,
    currency: 'USD',
    category: 'Furniture',
    condition: 'Fair',
    images: ['https://picsum.photos/400/400?random=4', 'https://picsum.photos/400/400?random=5'],
    seller: {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      location: {
        latitude: 40.7614,
        longitude: -73.9776,
        address: '321 Madison Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10017',
      },
      rating: 4.6,
      totalReviews: 12,
      joinedDate: '2023-09-10T10:00:00Z',
      isVerified: true,
    },
    location: {
      latitude: 40.7614,
      longitude: -73.9776,
      address: '321 Madison Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10017',
    },
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
    isAvailable: true,
    views: 89,
    likes: 15,
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFiltersState] = useState<SearchFilters>({});

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to fetch products
      // Simulated delay for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.condition && filters.condition.length > 0) {
      result = result.filter(p => filters.condition!.includes(p.condition));
    }

    switch (filters.sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const setFilters = (newFilters: SearchFilters) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'seller' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) => {
    // TODO: Implement actual API call to create product
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      seller: { /* current user */ } as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleLike = (productId: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  const getProductsBySeller = (sellerId: string) => products.filter(p => p.seller.id === sellerId);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        isLoading,
        filters,
        setFilters,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleLike,
        getProductById,
        getProductsBySeller,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
