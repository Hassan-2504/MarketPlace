import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isFeatured = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isFeatured && styles.featuredContainer
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.imageContainer,
        isFeatured && styles.featuredImageContainer
      ]}>
        <Image 
          source={{ uri: product.images[0] }} 
          style={[
            styles.image,
            isFeatured && styles.featuredImage
          ]} 
        />
        {!product.isAvailable && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>SOLD</Text>
          </View>
        )}
        {isFeatured && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons
            name={product.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={product.isLiked ? '#FF3B30' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={[
        styles.infoContainer,
        isFeatured && styles.featuredInfoContainer
      ]}>
        <Text style={[
          styles.price,
          isFeatured && styles.featuredPrice
        ]}>${product.price.toLocaleString()}</Text>
        <Text style={[
          styles.title,
          isFeatured && styles.featuredTitle
        ]} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.location} numberOfLines={1}>
            {product.location.city}
          </Text>
        </View>
        <Text style={styles.date} numberOfLines={1}>
          {new Date(product.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f5f0e8',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    borderRadius: 0,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
  },
  featuredContainer: {
    backgroundColor: '#ffcc00',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    backgroundColor: '#e8e3da',
  },
  featuredImageContainer: {
    backgroundColor: '#e8e3da',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredImage: {
    // Optional grayscale effect for featured items
  },
  soldBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#e63b2e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 0,
  },
  soldText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e63b2e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 0,
  },
  saleText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  likeButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 0,
    padding: 8,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  infoContainer: {
    padding: 12,
  },
  featuredInfoContainer: {
    // Special styling for featured product info
  },
  price: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -1,
  },
  featuredPrice: {
    fontSize: 28,
    color: '#e63b2e',
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 18,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#4a4a4a',
    marginLeft: 4,
    flex: 1,
  },
  date: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#4a4a4a',
  },
});
