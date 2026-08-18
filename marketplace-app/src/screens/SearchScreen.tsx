import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState(500);
  const [selectedConditions, setSelectedConditions] = useState(['MINT / NEW']);

  const categories = ['ALL', 'FURNITURE', 'LIGHTING', 'CERAMICS', 'TEXTILES'];
  const conditions = ['MINT / NEW', 'EXCELLENT', 'GOOD (VINTAGE)', 'RESTORATION NEEDED'];

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const featuredProducts = [
    {
      id: '1',
      title: 'Wassily Chair Reissue',
      price: '€850',
      category: 'FURNITURE',
      condition: 'MINT CONDITION',
      location: 'BERLIN, DE',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAriB34v7thJvSlEks85bPtF3AvjS-l0P4GnVSEWBdNtyOWwsk1FIWf18fN5oOkAeMyQYCH5AjsvmjkI_0ZC3JQI6uuO-H3paJAHXMfHB9UfjH_IfipmP2scXV3eN3RCFNFQJ8fMVb5y8pAbogy2kf-APvsrTMzsXZy0wPGW_pbssuE3dPN9eNxlx0QIm3WHFnSE7BEVkOVi8E6YqnMbg-ZUF93JG9b8xvSXvU0nVDx21gB6nKWLIR',
      description: 'Pristine condition reissue of the classic Marcel Breuer design. Tubular steel frame with premium black leather slung seating.',
      isFeatured: true,
      badge: 'NEW LISTING'
    },
    {
      id: '2',
      title: 'Geo Ceramic Vase',
      price: '€120',
      category: 'CERAMICS',
      condition: 'EXCELLENT',
      location: 'PARIS, FR',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ltIPlbXcd0O3PnT3cAPsZaoOq6VBbso2WFFbIacrkVv5xtFQeHPDknABb7w9kis8tBEo2qJU9JrcGam5g4gyQ2qU3Vb_QQH19ZqBWXfXncnFz4UOehw4iHdCkVs9eieLgnWsS8qrbMPSmZsKjD9xrP0988cgNGwzQ0Po4Vm0Et3GeUjQ4sRNKI7_FZIAbsy8oVJPvSVrC_ySNWbChEXOjY440Ia8EIqUEqGXzkI1g2suXyPusJ_q',
      isFeatured: false
    },
    {
      id: '3',
      title: 'Kaiser Idell Lamp',
      price: '€340',
      category: 'LIGHTING',
      condition: 'GOOD (VINTAGE)',
      location: 'AMSTERDAM, NL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2e3DPltSAduCJK9SVWCtlQ_3Wty7hVZ9PPSwWK7Pf3hSEQj1W1YVJgLf2bRW5Y9a3hV1SJqlVpZCLk0bl1FKilLlMN3beO5kQ2i91McgEd-yHyzukqAl5hPrJqWIk-TuflyGzjohxCYExzhZ1P7N8c3puz8gS10Ns0cg8TNgv1YlN6Xa46QTEQoO8h4n6tM4QD-6Do8WsQLoDh4U5OSEMZo9koAJAYCVy7tfIBJ7wt3X0YUXYN2Q8',
      isFeatured: false
    },
    {
      id: '4',
      title: 'Gunta Stölzl Pattern Rug',
      price: '€450',
      category: 'TEXTILES',
      condition: 'RESTORATION NEEDED',
      location: 'VIENNA, AT',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR8tcGJAl8Pz-YG_EWb2UoznWgEooCxx6HezJgxal4rc1Q9zTNNZhYhwE5VOVLIGFc1xLpgtFlIdSf_tF_RM_K6HE6Hd8yTJUfY4hhcoWvJtV0uESQcb8l8ScREhnkZZVAZ1TYmb3ljSFO7UBqHH-c5i27AlxJDLqWd6ftMzzGy2NjvH08SsmKTchgahZVAp08sULe91jijjaJlsPYBBME_u2WaOhnunNDWtthS-LC4CwsJ0n8kDnx',
      isFeatured: false
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={32} color="#1a1a1a" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="SEARCH FOR OBJECTS..."
            placeholderTextColor="#4a4a4a"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.goButton}>
            <Text style={styles.goButtonText}>GO</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>FILTERS</Text>
            <TouchableOpacity>
              <Text style={styles.resetText}>RESET</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterGroup}>
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabel}>CATEGORY</Text>
            </View>
            <View style={styles.categoriesRow}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabel}>PRICE RANGE</Text>
            </View>
            <View style={styles.priceRangeContainer}>
              <Text style={styles.priceLabel}>€0</Text>
              <View style={styles.priceValueContainer}>
                <Text style={styles.priceValue}>€{priceRange}</Text>
              </View>
              <Text style={styles.priceLabel}>€1000+</Text>
            </View>
          </View>

          <View style={styles.filterGroup}>
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabel}>CONDITION</Text>
            </View>
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={styles.conditionItem}
                onPress={() => toggleCondition(condition)}
              >
                <View style={[
                  styles.checkbox,
                  selectedConditions.includes(condition) && styles.checkboxActive
                ]}>
                  {selectedConditions.includes(condition) && (
                    <Icon name="check" size={14} color="#ffffff" />
                  )}
                </View>
                <Text style={styles.conditionText}>{condition}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>APPLY FILTERS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              24 RESULTS <Text style={styles.resultsAccent}>FOUND</Text>
            </Text>
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>SORT BY:</Text>
              <Text style={styles.sortValue}>RECENT</Text>
              <Icon name="arrow-drop-down" size={20} color="#1a1a1a" />
            </View>
          </View>

          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                product.isFeatured && styles.productCardFeatured
              ]}
            >
              <View style={[
                styles.productImageContainer,
                product.isFeatured && styles.productImageContainerFeatured
              ]}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name="favorite-border" size={20} color="#1a1a1a" />
                </TouchableOpacity>
              </View>
              
              <View style={[
                styles.productDetails,
                product.isFeatured && styles.productDetailsFeatured
              ]}>
                <View style={styles.productHeader}>
                  <Text style={[
                    styles.productTitle,
                    product.isFeatured && styles.productTitleFeatured
                  ]}>
                    {product.title}
                  </Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                
                {(product.category || product.condition) && (
                  <Text style={styles.productMeta}>
                    {product.category} • {product.condition}
                  </Text>
                )}
                
                {product.description && (
                  <Text style={styles.productDescription}>{product.description}</Text>
                )}
                
                <View style={styles.productFooter}>
                  {product.location && (
                    <View style={styles.locationContainer}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationText}>{product.location}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>VIEW ITEM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.pagination}>
            <TouchableOpacity style={styles.pageButton}>
              <Icon name="chevron-left" size={24} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.pageButton, styles.pageButtonActive]}>
              <Text style={styles.pageButtonTextActive}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageButton}>
              <Text style={styles.pageButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageButton}>
              <Text style={styles.pageButtonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageButton}>
              <Icon name="chevron-right" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f0e8', paddingBottom: 80 },
  searchSection: { padding: 20, paddingTop: 30 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#faf7f2', borderWidth: 4, borderColor: '#1a1a1a', shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0 },
  searchIcon: { marginLeft: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 20, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a', paddingVertical: 16, textTransform: 'uppercase' as const },
  goButton: { backgroundColor: '#1a1a1a', paddingHorizontal: 24, paddingVertical: 12, borderLeftWidth: 2, borderColor: '#1a1a1a' },
  goButtonText: { color: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', fontSize: 18, textTransform: 'uppercase' as const },
  contentWrapper: { padding: 20 },
  filtersSection: { backgroundColor: '#f5f0e8', borderWidth: 4, borderColor: '#1a1a1a', shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0, padding: 24, marginBottom: 32 },
  filtersHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 4, borderBottomColor: '#1a1a1a' },
  filtersTitle: { fontSize: 28, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase' as const, letterSpacing: -1 },
  resetText: { fontSize: 12, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#4a4a4a', textTransform: 'uppercase' as const, textDecorationLine: 'underline' },
  filterGroup: { marginBottom: 32 },
  filterLabelContainer: { marginBottom: 16 },
  filterLabel: { fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase' as const, backgroundColor: '#ffcc00', paddingHorizontal: 8, borderWidth: 2, borderColor: '#1a1a1a', alignSelf: 'flex-start' },
  categoriesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: { borderWidth: 2, borderColor: '#1a1a1a', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#faf7f2' },
  categoryButtonActive: { backgroundColor: '#1a1a1a' },
  categoryButtonText: { fontSize: 12, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a', textTransform: 'uppercase' as const },
  categoryButtonTextActive: { color: '#ffffff' },
  priceRangeContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8 },
  priceLabel: { fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a' },
  priceValueContainer: { backgroundColor: '#faf7f2', borderWidth: 2, borderColor: '#1a1a1a', paddingHorizontal: 12, paddingVertical: 4 },
  priceValue: { fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a' },
  conditionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#1a1a1a', backgroundColor: '#faf7f2', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#1a1a1a' },
  conditionText: { fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a', textTransform: 'uppercase' as const },
  applyButton: { backgroundColor: '#e63b2e', borderWidth: 4, borderColor: '#1a1a1a', paddingVertical: 16, shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0 },
  applyButtonText: { color: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', fontSize: 18, textTransform: 'uppercase' as const, textAlign: 'center' as const },
  resultsSection: { flex: 1 },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 16, borderBottomWidth: 4, borderBottomColor: '#1a1a1a' },
  resultsTitle: { fontSize: 28, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase' as const, letterSpacing: -1 },
  resultsAccent: { color: '#e63b2e' },
  sortContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#faf7f2', borderWidth: 4, borderColor: '#1a1a1a', paddingHorizontal: 16, paddingVertical: 8, shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0 },
  sortLabel: { fontSize: 10, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#4a4a4a', textTransform: 'uppercase' as const, marginRight: 8 },
  sortValue: { fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a', textTransform: 'uppercase' as const },
  productCard: { flexDirection: 'row', backgroundColor: '#faf7f2', borderWidth: 4, borderColor: '#1a1a1a', shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0, marginBottom: 24 },
  productCardFeatured: { flexDirection: 'column' as const },
  productImageContainer: { width: '40%', aspectRatio: 1, borderBottomWidth: 4, borderColor: '#1a1a1a', position: 'relative' as const, backgroundColor: '#e2ddd4' },
  productImageContainerFeatured: { width: '100%', aspectRatio: 1, borderBottomWidth: 4, borderRightWidth: 0 },
  productImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute' as const, top: 16, left: 16, backgroundColor: '#ffcc00', borderWidth: 2, borderColor: '#1a1a1a', paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { color: '#1a1a1a', fontFamily: 'Space Grotesk', fontWeight: '900', fontSize: 12, textTransform: 'uppercase' as const },
  favoriteButton: { position: 'absolute' as const, top: 16, right: 16, width: 40, height: 40, backgroundColor: '#faf7f2', borderWidth: 2, borderColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  productDetails: { width: '60%', padding: 24, justifyContent: 'space-between' },
  productDetailsFeatured: { width: '100%', padding: 32 },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  productTitle: { fontSize: 20, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase' as const, lineHeight: 24, letterSpacing: -1, flex: 1, marginRight: 12 },
  productTitleFeatured: { fontSize: 32, lineHeight: 36 },
  productPrice: { fontSize: 20, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#e63b2e' },
  productMeta: { fontSize: 10, fontFamily: 'Inter', color: '#4a4a4a', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 },
  productDescription: { fontSize: 14, fontFamily: 'Inter', color: '#1a1a1a', lineHeight: 20, borderLeftWidth: 4, borderLeftColor: '#ffcc00', paddingLeft: 16, marginBottom: 24 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 4, borderTopColor: '#1a1a1a', paddingTop: 24 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationDot: { width: 16, height: 16, backgroundColor: '#1a1a1a', borderRadius: 8, marginRight: 8 },
  locationText: { fontSize: 12, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#1a1a1a', textTransform: 'uppercase' as const },
  viewButton: { backgroundColor: '#1a1a1a', borderWidth: 2, borderColor: '#1a1a1a', paddingHorizontal: 24, paddingVertical: 12 },
  viewButtonText: { color: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', fontSize: 14, textTransform: 'uppercase' as const },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 48, gap: 8 },
  pageButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#1a1a1a', backgroundColor: '#faf7f2', shadowColor: '#1a1a1a', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 0 },
  pageButtonActive: { backgroundColor: '#1a1a1a' },
  pageButtonText: { fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#1a1a1a' },
  pageButtonTextActive: { fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: '900', color: '#ffffff' },
});

export default SearchScreen;
