import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProductScreen = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('FURNITURE');
  const [selectedCondition, setSelectedCondition] = useState('VINTAGE/PATINA');
  const [mediaCount, setMediaCount] = useState(0);

  const categories = ['FURNITURE', 'LIGHTING', 'ART', 'TEXTILES', 'OBJECTS'];
  const conditions = ['PRISTINE', 'VINTAGE/PATINA', 'NEEDS REPAIR'];

  const handleUpload = () => {
    // Handle media upload logic
    console.log('Upload triggered');
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Publish listing', { title, price, description, selectedCategory, selectedCondition });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>CREATE LISTING</Text>
        <View style={styles.headerUnderline} />
        <Text style={styles.headerSubtitle}>
          Upload images and describe your piece. Remember, form follows function.
        </Text>
      </View>

      {/* Upload Area */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="photo-camera" size={28} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>MEDIA VISUALS</Text>
        </View>
        
        <TouchableOpacity style={styles.uploadArea} onPress={handleUpload}>
          <Ionicons name="upload-file" size={64} color="#1a1a1a" />
          <Text style={styles.uploadText}>DRAG & DROP OR CLICK</Text>
          <Text style={styles.uploadSubtext}>JPG, PNG, WEBP (Max 5MB)</Text>
        </TouchableOpacity>
        
        {mediaCount > 0 && (
          <View style={styles.mediaCount}>
            <Text style={styles.mediaCountText}>{mediaCount} files selected</Text>
          </View>
        )}
      </View>

      {/* Text Fields */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="PRODUCT TITLE / NOMENCLATURE"
          placeholderTextColor="#4a4a4a"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="words"
        />

        <View style={styles.priceRow}>
          <View style={styles.priceInputContainer}>
            <Text style={styles.priceSymbol}>$</Text>
            <TextInput
              style={[styles.input, styles.priceInput]}
              placeholder="0.00"
              placeholderTextColor="#4a4a4a"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.currencyContainer}>
            <TextInput
              style={[styles.input, styles.currencyInput]}
              value="USD"
              editable={false}
            />
          </View>
        </View>

        <Text style={styles.detailsTitle}>STRUCTURAL DETAILS</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Describe the materials, dimensions, and history of the object..."
          placeholderTextColor="#4a4a4a"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      {/* Categorization */}
      <View style={styles.categorizationSection}>
        <View style={styles.categoryColumn}>
          <Text style={styles.columnTitle}>CATEGORY</Text>
          <View style={styles.chipContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.chip,
                  selectedCategory === category && styles.chipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === category && styles.chipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.categoryColumn}>
          <Text style={styles.columnTitle}>CONDITION</Text>
          <View style={styles.chipContainer}>
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  styles.chip,
                  selectedCondition === condition && styles.chipActive,
                ]}
                onPress={() => setSelectedCondition(condition)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCondition === condition && styles.chipTextActive,
                  ]}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.submitSection}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>PUBLISH LISTING</Text>
          <Ionicons name="arrow-forward" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Spacer for Mobile Nav */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
    paddingHorizontal: Platform.OS === 'web' ? 48 : 16,
    paddingTop: 32,
  },
  headerSection: {
    marginBottom: 48,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerUnderline: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#ffcc00',
    zIndex: -1,
  },
  headerSubtitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    fontWeight: '700',
    color: '#4a4a4a',
    maxWidth: 400,
    marginTop: 8,
  },
  section: {
    marginBottom: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  uploadArea: {
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: '#1a1a1a',
    backgroundColor: '#ffffff',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    marginTop: 16,
  },
  uploadSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 8,
  },
  mediaCount: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#ffcc00',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  mediaCountText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  input: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    borderBottomWidth: 4,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 16,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 32,
    marginBottom: 32,
  },
  priceInputContainer: {
    flex: 2,
    position: 'relative',
  },
  priceSymbol: {
    position: 'absolute',
    left: 0,
    top: 8,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    zIndex: 1,
  },
  priceInput: {
    paddingLeft: 32,
  },
  currencyContainer: {
    flex: 1,
  },
  currencyInput: {
    textAlign: 'center',
  },
  detailsTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    marginTop: 32,
    marginBottom: 16,
  },
  textarea: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 4,
    borderColor: '#1a1a1a',
    backgroundColor: '#ffffff',
    padding: 16,
    minHeight: 120,
    color: '#1a1a1a',
  },
  categorizationSection: {
    borderTopWidth: 4,
    borderTopColor: '#1a1a1a',
    paddingTop: 32,
    flexDirection: 'row',
    gap: 48,
    marginBottom: 48,
  },
  categoryColumn: {
    flex: 1,
  },
  columnTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    borderWidth: 2,
    borderColor: '#1a1a1a',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#ffcc00',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  chipText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#1a1a1a',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  submitSection: {
    paddingTop: 48,
    paddingBottom: 32,
  },
  submitButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 4,
    borderColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#ffcc00',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontFamily: 'SpaceGrotesk_900Black',
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#ffffff',
    letterSpacing: 1,
  },
});

export default AddProductScreen;
