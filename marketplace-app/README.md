# Marketplace Mobile Application

A comprehensive mobile marketplace application built with React Native and Expo for buying and selling second-hand products.

## Features

### Core Functionality
- **Browse Products**: View featured listings with images, prices, and details
- **Search & Filter**: Advanced search with category, price range, condition, and sorting options
- **Product Details**: Detailed product view with image carousel, seller info, and location
- **Add Listings**: Create new product listings with photos/videos from camera or gallery
- **Manage Listings**: View, edit, mark as sold, or delete your listings
- **Messaging System**: Real-time chat between buyers and sellers
- **User Profiles**: User profiles with ratings, reviews, and verification status

### Key Screens
1. **Home Screen**
   - Search bar
   - Category quick access
   - Featured products grid

2. **Search Screen**
   - Full-text search
   - Category filters
   - Price range filter
   - Condition filter
   - Sort options (recent, price low-high, price high-low)

3. **Add Product Screen**
   - Photo/video upload (up to 10 media files)
   - Title, description, price input
   - Category selection
   - Condition selection (New, Like New, Good, Fair, Poor)

4. **Product Detail Screen**
   - Image carousel
   - Product information
   - Seller details with rating
   - Location information
   - Message seller button
   - Share functionality
   - Like/favorite feature

5. **Chat/Messages Screen**
   - Conversation list with unread count
   - Real-time messaging
   - Message history
   - Send text messages

6. **My Listings Screen**
   - Active/Sold tabs
   - Edit listings
   - Mark as sold
   - Delete listings
   - Add new listing FAB

7. **Profile Screen**
   - User information
   - Rating and reviews
   - Settings menu
   - Logout option

### Technical Features
- TypeScript for type safety
- React Navigation for screen navigation
- Context API for state management
- Expo Image Picker for media selection
- Responsive design
- Mock data for demonstration

## Project Structure

```
marketplace-app/
├── App.tsx                 # Main app component
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ProductCard.tsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ProductContext.tsx
│   │   └── ChatContext.tsx
│   ├── navigation/        # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── MainTabs.tsx
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── AddProductScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── MyListingsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   └── utils/             # Utility functions
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marketplace-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# For web
npm run web

# For iOS simulator
npm run ios

# For Android emulator
npm run android

# Or use Expo Go
npx expo start
```

## Running the App

The app can be run on:
- **Web**: `npm run web`
- **iOS**: `npm run ios` (requires macOS)
- **Android**: `npm run android`
- **Expo Go**: Scan QR code from `npx expo start`

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Context API**: State management
- **Expo Image Picker**: Media selection
- **Expo Camera**: Camera access

## Future Enhancements

- Backend integration (Node.js/Firebase)
- User authentication (email/password, social login)
- Push notifications
- Payment integration
- Image/video hosting
- Real-time chat with WebSocket
- Location-based search
- User verification system
- Review and rating system
- Saved searches and alerts
- Analytics dashboard

## License

MIT License
