import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const user = {
    name: 'MAX BILL',
    memberSince: '2021',
    rating: 4.9,
    totalReviews: 142,
    isVerified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-4u2HWgY7UT0Oqovrcu1j7g5tAe_rnS0U_mypikcta1mKP-pODPS-KTT1uCeymrs73MBuejCyEx2yHNP6SGlAXc75iWdYCSYv1ZVAaQr88QdifotIs63jHkZXKg-4cHK8Q5R0AVG4wPXO9AJfz-1T3hJ-7fm2bC2URWqFra4BgTg9dImQAYpA10hRVDaLXMQ4Ctq6E4Bz6HOhcauMI3QkjzOJCev2h_nn2iHqXCz105Kj8olO-uRu',
  };

  const settingsItems = [
    { id: '1', label: 'Account Details' },
    { id: '2', label: 'Payment Methods' },
    { id: '3', label: 'Notifications' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.memberSince}>MEMBER SINCE {user.memberSince}</Text>
            
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={24} color="#1a1a1a" />
              <Text style={styles.ratingValue}>{user.rating}</Text>
              <Text style={styles.reviewsCount}>({user.totalReviews} REVIEWS)</Text>
            </View>
          </View>
        </View>

        {/* Grid Content */}
        <View style={styles.gridContainer}>
          {/* Verification Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>VERIFICATION</Text>
              <MaterialIcons name="verified" size={36} color="#1a1a1a" />
            </View>
            <View style={styles.verifiedButton}>
              <Text style={styles.verifiedText}>VERIFIED SELLER</Text>
            </View>
            <Text style={styles.verifiedDescription}>Identity and banking confirmed.</Text>
          </View>

          {/* Reviews Card */}
          <View style={[styles.card, styles.reviewsCard]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, styles.reviewsCardTitle]}>MY REVIEWS</Text>
              <MaterialIcons name="reviews" size={36} color="#1a1a1a" />
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewQuote}>"Excellent communication, item exactly as described. Pure functional design piece."</Text>
              <Text style={styles.reviewAuthor}>— ANNI A.</Text>
            </View>
            <TouchableOpacity style={styles.readAllButton}>
              <Text style={styles.readAllText}>READ ALL</Text>
            </TouchableOpacity>
          </View>

          {/* Settings Card */}
          <View style={[styles.card, styles.settingsCard]}>
            <View style={styles.settingsHeader}>
              <Text style={styles.settingsTitle}>SETTINGS</Text>
            </View>
            
            {settingsItems.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.settingItem,
                  index !== settingsItems.length - 1 && styles.settingItemBorder
                ]}
              >
                <Text style={styles.settingLabel}>{item.label}</Text>
                <MaterialIcons name="arrow-forward" size={24} color="#1a1a1a" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 24,
    borderBottomWidth: 8,
    borderBottomColor: '#1a1a1a',
    gap: 32,
  },
  avatarContainer: {
    width: 192,
    height: 192,
    borderWidth: 4,
    borderColor: '#1a1a1a',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: '#e2ddd4',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: '#4a4a4a',
    marginBottom: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    alignSelf: 'flex-start',
  },
  ratingValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  reviewsCount: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  gridContainer: {
    padding: 24,
    gap: 32,
  },
  card: {
    borderWidth: 4,
    borderColor: '#1a1a1a',
    padding: 24,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  reviewsCard: {
    backgroundColor: '#ffcc00',
  },
  reviewsCardTitle: {
    color: '#1a1a1a',
  },
  verifiedButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  verifiedDescription: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#4a4a4a',
    marginTop: 8,
  },
  reviewContent: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewQuote: {
    fontSize: 18,
    fontWeight: '700',
    borderLeftWidth: 4,
    borderLeftColor: '#1a1a1a',
    paddingLeft: 16,
    marginBottom: 16,
    color: '#1a1a1a',
    lineHeight: 28,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#4a4a4a',
  },
  readAllButton: {
    backgroundColor: '#f5f0e8',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  readAllText: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  settingsCard: {
    padding: 0,
    backgroundColor: '#f5f0e8',
  },
  settingsHeader: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    backgroundColor: '#e8e3da',
  },
  settingsTitle: {
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  settingItemBorder: {
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
  },
  settingLabel: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  logoutButton: {
    backgroundColor: '#e63b2e',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    paddingVertical: 24,
    marginHorizontal: 24,
    marginTop: 32,
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  logoutText: {
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
});
