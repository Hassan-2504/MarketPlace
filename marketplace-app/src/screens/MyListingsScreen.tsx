import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductContext';

interface MyListingsScreenProps {
  navigation: any;
}

export const MyListingsScreen: React.FC<MyListingsScreenProps> = ({ navigation }) => {
  const { products, getProductsBySeller, deleteProduct, updateProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');

  // Filter products - in real app, filter by current user ID
  const activeProducts = products.filter(p => p.isAvailable);
  const soldProducts = products.filter(p => !p.isAvailable);

  const displayedProducts = activeTab === 'active' ? activeProducts : soldProducts;

  const handleToggleAvailability = (productId: string, currentStatus: boolean) => {
    updateProduct(productId, { isAvailable: !currentStatus });
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({activeProducts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sold' && styles.activeTab]}
          onPress={() => setActiveTab('sold')}
        >
          <Text style={[styles.tabText, activeTab === 'sold' && styles.activeTabText]}>
            Sold ({soldProducts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderProductItem(item, navigation, handleToggleAvailability, deleteProduct)}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Listing Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const renderProductItem = (
  product: any,
  navigation: any,
  onToggleAvailability: (id: string, status: boolean) => void,
  onDelete: (id: string) => void
) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toLocaleString()}</Text>
        
        <View style={styles.productMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="eye-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{product.views}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="heart-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{product.likes}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              {new Date(product.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProduct', { productId: product.id })}
          >
            <Ionicons name="create-outline" size={18} color="#007AFF" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          {product.isAvailable && (
            <TouchableOpacity
              style={styles.markSoldButton}
              onPress={() => onToggleAvailability(product.id, product.isAvailable)}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
              <Text style={styles.markSoldButtonText}>Mark Sold</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              if (confirm('Are you sure you want to delete this listing?')) {
                onDelete(product.id);
              }
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    height: 40,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E8F4FF',
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  markSoldButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
  },
  markSoldButtonText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
  },
  deleteButtonText: {
    fontSize: 13,
    color: '#FF3B30',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
