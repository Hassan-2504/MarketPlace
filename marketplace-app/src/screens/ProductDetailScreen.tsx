import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Share, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProductDetailScreenProps {
  route: {
    params: {
      productId: string;
    };
  };
  navigation: any;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { productId } = route.params;
  const { getProductById, toggleLike } = useProducts();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = getProductById(productId);

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product.title} - $${product.price}`,
        url: product.images[0],
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleMessage = () => {
    if (user?.id === product.seller.id) {
      alert('You cannot message yourself');
      return;
    }
    navigation.navigate('Chat', { sellerId: product.seller.id, productId: product.id });
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topAppBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BAUHAUS MARKET</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="shopping-cart-outline" size={28} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <View style={styles.mainImageContainer}>
            <Image
              source={{ uri: product.images[currentImageIndex] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionBadgeText}>{product.condition}</Text>
            </View>
          </View>

          {/* Thumbnail Carousel */}
          {product.images.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.thumbnailCarousel}
              contentContainerStyle={styles.thumbnailContent}
            >
              {product.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.thumbnail,
                    index === currentImageIndex && styles.thumbnailSelected,
                  ]}
                  onPress={() => setCurrentImageIndex(index)}
                >
                  <Image source={{ uri: image }} style={styles.thumbnailImage} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          {/* Title & Price */}
          <View style={styles.titlePriceSection}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>€{product.price.toLocaleString()}</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Seller Info */}
          <View style={styles.sellerCard}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{product.seller.rating}</Text>
            </View>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar}>
                <Text style={styles.sellerInitials}>
                  {product.seller.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{product.seller.name}</Text>
                <View style={styles.starRating}>
                  {[1, 2, 3, 4].map((star) => (
                    <Ionicons key={star} name="star" size={16} color="#ffcc00" />
                  ))}
                  <Ionicons name="star-half" size={16} color="#ffcc00" />
                </View>
              </View>
            </View>
            <View style={styles.sellerLocation}>
              <Ionicons name="location" size={20} color="#4a4a4a" />
              <Text style={styles.locationText}>{product.seller.location} • Ships Worldwide</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
              <Ionicons name="chatbubble" size={24} color="#ffffff" />
              <Text style={styles.messageButtonText}>Message Seller</Text>
            </TouchableOpacity>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => toggleLike(product.id)}
              >
                <Ionicons
                  name={product.isLiked ? 'heart' : 'heart-outline'}
                  size={20}
                  color={product.isLiked ? '#e63b2e' : '#1a1a1a'}
                />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Ionicons name="share-outline" size={20} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacer */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#1a1a1a" />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#1a1a1a" />
          <Text style={styles.navTextActive}>SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Ionicons name="add-box" size={24} color="#1a1a1a" />
          <Text style={styles.navTextActive}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-outline" size={24} color="#1a1a1a" />
          <Text style={styles.navText}>CHAT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#1a1a1a" />
          <Text style={styles.navText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  notFoundText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  topAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#f5f0e8',
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    zIndex: 50,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  imageGallery: {
    marginBottom: 32,
  },
  mainImageContainer: {
    width: SCREEN_WIDTH,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#1a1a1a',
    backgroundColor: '#e2ddd4',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  conditionBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  conditionBadgeText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#ffffff',
  },
  thumbnailCarousel: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  thumbnailContent: {
    gap: 16,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderWidth: 3,
    borderColor: '#1a1a1a',
    backgroundColor: '#eee9e0',
    overflow: 'hidden',
  },
  thumbnailSelected: {
    borderColor: '#e63b2e',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titlePriceSection: {
    marginBottom: 32,
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 24,
  },
  productTitle: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    color: '#1a1a1a',
    lineHeight: 40,
    marginBottom: 16,
  },
  productPrice: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#4a4a4a',
  },
  sellerCard: {
    borderWidth: 3,
    borderColor: '#1a1a1a',
    backgroundColor: '#f2ede5',
    padding: 16,
    marginBottom: 32,
    gap: 16,
    position: 'relative',
  },
  ratingBadge: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 48,
    height: 48,
    backgroundColor: '#ffcc00',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '12deg' }],
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  ratingText: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sellerAvatar: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    backgroundColor: '#e8e3da',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerInitials: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 28,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  starRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  sellerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 2,
    borderTopColor: '#1a1a1a',
    paddingTop: 12,
  },
  locationText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#4a4a4a',
  },
  actionsSection: {
    gap: 16,
    marginTop: 'auto',
  },
  messageButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
  messageButtonText: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#eee9e0',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  shareButton: {
    width: 64,
    backgroundColor: '#eee9e0',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f5f0e8',
    borderTopWidth: 4,
    borderTopColor: '#1a1a1a',
    height: 64,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  navItemActive: {
    backgroundColor: '#ffcc00',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#1a1a1a',
    opacity: 1,
  },
  navText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 4,
    color: '#1a1a1a',
  },
  navTextActive: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 4,
    color: '#1a1a1a',
  },
});
