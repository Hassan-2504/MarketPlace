import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductContext';

interface SearchScreenProps {
  navigation: any;
  route?: {
    params?: {
      category?: string;
    };
  };
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
  const { filteredProducts, filters, setFilters } = useProducts();
  const [searchQuery, setSearchQuery] = useState(route?.params?.category ? '' : '');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = [
    'All',
    'Mobile Phones',
    'Electronics',
    'Furniture',
    'Vehicles',
    'Fashion',
    'Sports',
    'Books',
    'Home & Garden',
    'Toys & Games',
    'Other',
  ];

  const conditions = ['All', 'New', 'Like New', 'Good', 'Fair', 'Poor'];
  const sortOptions = [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Price: Low to High', value: 'price_low' },
    { label: 'Price: High to Low', value: 'price_high' },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setFilters({ query: text || undefined });
  };

  const applyFilters = () => {
    setFilters({
      category: filters.category === 'All' ? undefined : filters.category,
      minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    });
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({});
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search marketplace"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name="filter"
            size={24}
            color={Object.keys(filters).length > 0 ? '#007AFF' : '#666'}
          />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipsContainer}>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.chip,
                        filters.category === cat && styles.chipSelected,
                      ]}
                      onPress={() => setFilters({ category: cat === 'All' ? undefined : cat })}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          filters.category === cat && styles.chipTextSelected,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Min"
                    value={priceRange.min}
                    onChangeText={(text) => setPriceRange(prev => ({ ...prev, min: text }))}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.priceSeparator}>-</Text>
                <View style={styles.priceInputWrapper}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Max"
                    value={priceRange.max}
                    onChangeText={(text) => setPriceRange(prev => ({ ...prev, max: text }))}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Condition Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Condition</Text>
              <View style={styles.chipsContainer}>
                {conditions.map(cond => (
                  <TouchableOpacity
                    key={cond}
                    style={[
                      styles.chip,
                      // Add condition filter logic here if needed
                    ]}
                    onPress={() => {}}
                  >
                    <Text style={styles.chipText}>{cond}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Options */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Sort By</Text>
              {sortOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.sortOption}
                  onPress={() => setFilters({ sortBy: option.value as any })}
                >
                  <Text style={styles.sortOptionText}>{option.label}</Text>
                  {filters.sortBy === option.value && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          >
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={40} color="#ccc" />
              </View>
              {item.images[0] && (
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageCount}>📷</Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.price}>${item.price.toLocaleString()}</Text>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={12} color="#999" />
                <Text style={styles.location} numberOfLines={1}>{item.location.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.resultsContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBarContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  filtersPanel: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    maxHeight: 400,
  },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  priceSymbol: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  priceSeparator: {
    fontSize: 16,
    color: '#666',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sortOptionText: {
    fontSize: 15,
    color: '#333',
  },
  filterActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  resultsContainer: {
    padding: 6,
  },
  productCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    aspectRatio: 1,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCount: {
    fontSize: 12,
  },
  productInfo: {
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    height: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 11,
    color: '#999',
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
