import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredProducts, isLoading, loadProducts } = useProducts();
  
  React.useEffect(() => {
    loadProducts();
  }, []);

  const categories = [
    { id: '1', name: 'Furniture', icon: 'bed' },
    { id: '2', name: 'Art', icon: 'color-palette' },
    { id: '3', name: 'Electronics', icon: 'tv' },
    { id: '4', name: 'Apparel', icon: 'shirt' },
    { id: '5', name: 'Books', icon: 'book' },
    { id: '6', name: 'Vehicles', icon: 'car' },
    { id: '7', name: 'Sports', icon: 'basketball' },
    { id: '8', name: 'Other', icon: 'apps' },
  ];

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color="#1a1a1a" />
          <Text style={styles.searchPlaceholder}>SEARCH CATALOG...</Text>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>GO</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryItem,
                item.name === 'Art' && styles.categoryArt,
                item.name === 'Electronics' && styles.categoryElectronics,
              ]}
              onPress={() => navigation.navigate('Search', { category: item.name })}
            >
              <Ionicons 
                name={item.icon as any} 
                size={32} 
                color={
                  item.name === 'Art' || item.name === 'Electronics' 
                    ? '#ffffff' 
                    : '#1a1a1a'
                } 
              />
              <Text 
                style={[
                  styles.categoryName,
                  item.name === 'Art' || item.name === 'Electronics' 
                    ? styles.categoryNameLight 
                    : styles.categoryNameDark
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>FEATURED{'\n'}ITEMS</Text>
          <TouchableOpacity 
            style={styles.viewAll}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.viewAllText}>VIEW ALL</Text>
            <Ionicons name="arrow-forward" size={16} color="#0055ff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredProducts.slice(0, 6)}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={[
              styles.productWrapper,
              index === 2 && styles.featuredProduct
            ]}>
              <ProductCard 
                product={item} 
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                isFeatured={index === 2}
              />
            </View>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.productsList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f0e8',
  },
  loadingText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 2,
  },
  searchBar: {
    backgroundColor: '#f5f0e8',
    padding: 16,
    paddingTop: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f0e8',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    borderRadius: 0,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  searchButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1a1a1a',
  },
  searchButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -1,
    textTransform: 'uppercase' as const,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    width: 160,
    height: 100,
    borderWidth: 4,
    borderColor: '#1a1a1a',
    backgroundColor: '#ffcc00',
    borderRadius: 0,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  categoryArt: {
    backgroundColor: '#e63b2e',
  },
  categoryElectronics: {
    backgroundColor: '#0055ff',
  },
  categoryName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  categoryNameDark: {
    color: '#1a1a1a',
  },
  categoryNameLight: {
    color: '#ffffff',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 8,
  },
  featuredTitle: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 40,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: -2,
    lineHeight: 44,
    textTransform: 'uppercase' as const,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#0055ff',
    paddingBottom: 4,
  },
  viewAllText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#0055ff',
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
    marginRight: 4,
  },
  productsList: {
    paddingBottom: 20,
  },
  productWrapper: {
    width: '50%',
    padding: 8,
  },
  featuredProduct: {
    // Special styling for featured product card
  },
});
