import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductContext';

interface MyListingsScreenProps {
  navigation: any;
}

export const MyListingsScreen: React.FC<MyListingsScreenProps> = ({ navigation }) => {
  const { products, deleteProduct, updateProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');

  const activeProducts = products.filter(p => p.isAvailable);
  const soldProducts = products.filter(p => !p.isAvailable);

  const displayedProducts = activeTab === 'active' ? activeProducts : soldProducts;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>MY LISTINGS</Text>
        <Text style={styles.headerSubtitle}>Manage your inventory and track sales.</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            ACTIVE ({activeProducts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sold' && styles.activeTab]}
          onPress={() => setActiveTab('sold')}
        >
          <Text style={[styles.tabText, activeTab === 'sold' && styles.activeTabText]}>
            SOLD ({soldProducts.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderProductItem(item, navigation, deleteProduct)}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <MaterialIcons name="add" size={40} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
};

const renderProductItem = (
  product: any,
  navigation: any,
  onDelete: (id: string) => void
) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.productImage} />
        {product.isAvailable && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>ACTIVE</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productTitle} numberOfLines={2}>{product.title.toUpperCase()}</Text>
          <Text style={styles.productPrice}>${product.price.toLocaleString()}</Text>
          
          <View style={styles.productMeta}>
            <Text style={styles.metaText}>VIEWS: {product.views?.toLocaleString() || 0}</Text>
            <Text style={styles.metaText}>SAVES: {product.likes?.toLocaleString() || 0}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProduct', { productId: product.id })}
          >
            <MaterialIcons name="edit" size={20} color="#1a1a1a" />
            <Text style={styles.editButtonText}>EDIT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              if (confirm('Are you sure you want to delete this listing?')) {
                onDelete(product.id);
              }
            }}
          >
            <MaterialIcons name="delete" size={20} color="#e63b2e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  headerContainer: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a4a4a',
    marginTop: 16,
    textTransform: 'uppercase',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f0e8',
    padding: 16,
    gap: 16,
  },
  tab: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    backgroundColor: '#e2ddd4',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  activeTab: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  tabText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f0e8',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    marginBottom: 32,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 192,
    height: 192,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    backgroundColor: '#e2ddd4',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ffcc00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  productInfo: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    lineHeight: 28,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 30,
    fontWeight: '900',
    color: '#e63b2e',
    marginBottom: 16,
  },
  productMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a4a4a',
    textTransform: 'uppercase',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e2ddd4',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2ddd4',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 80,
    height: 80,
    backgroundColor: '#ffcc00',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
});
