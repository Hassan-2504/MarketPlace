import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useChat } from '../context/ChatContext';

// Bauhaus Market Color Palette
const COLORS = {
  background: '#f5f0e8',
  primary: '#1a1a1a',
  'on-primary': '#ffffff',
  'primary-container': '#ffcc00',
  'on-primary-container': '#1a1a1a',
  secondary: '#e63b2e',
  'on-error': '#ffffff',
  'surface-container-highest': '#e2ddd4',
  'surface-variant': '#e8e3da',
  'on-surface-variant': '#4a4a4a',
  tertiary: '#0055ff',
  'tertiary-container': '#d6e3ff',
  'on-tertiary': '#ffffff',
  'secondary-container': '#ffdad6',
  'error-container': '#ffdad6',
  white: '#ffffff',
  black: '#1a1a1a',
};

interface ChatScreenProps {
  navigation: any;
  route?: {
    params?: {
      sellerId?: string;
      productId?: string;
    };
  };
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const { conversations, selectConversation, currentConversation, messages, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const [isInChat, setIsInChat] = useState(false);

  // If we're coming from product detail with seller info
  React.useEffect(() => {
    if (route?.params?.sellerId) {
      // Find or create conversation with this seller
      const existingConv = conversations.find(
        c => c.participants[0].id === route.params?.sellerId
      );
      if (existingConv) {
        selectConversation(existingConv.id);
        setIsInChat(true);
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    
    await sendMessage(messageText.trim());
    setMessageText('');
  };

  const renderConversationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => {
        selectConversation(item.id);
        setIsInChat(true);
      }}
    >
      <Image
        source={{ uri: item.participants[0].avatar || 'https://picsum.photos/100/100?random=99' }}
        style={styles.avatar}
      />
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.participantName}>{item.participants[0].name}</Text>
          <Text style={styles.messageTime}>
            {new Date(item.lastMessage.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage.content}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: any }) => {
    const isOwnMessage = item.senderId === '1'; // Current user ID
    
    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer,
      ]}>
        {!isOwnMessage && (
          <Image
            source={{ uri: 'https://picsum.photos/50/50?random=99' }}
            style={styles.messageAvatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble,
        ]}>
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
          ]}>
            {item.content}
          </Text>
          <Text style={[
            styles.messageTimeSmall,
            isOwnMessage ? styles.ownMessageTime : styles.otherMessageTime,
          ]}>
            {new Date(item.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
      </View>
    );
  };

  if (isInChat && currentConversation) {
    return (
      <View style={styles.chatContainer}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setIsInChat(false)}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>{currentConversation.participants[0].name}</Text>
            <Text style={styles.chatHeaderStatus}>Online</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="info-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <MaterialIcons name="attach-file" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <MaterialIcons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show conversations list
  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '900',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  unreadCountBadge: {
    backgroundColor: COLORS.secondaryContainer,
    borderWidth: 3,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  unreadCountText: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  listContent: {
    padding: 16,
    gap: 24,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    gap: 16,
  },
  conversationItemUnread: {
    backgroundColor: COLORS.surfaceContainerHighest,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.tertiary,
  },
  unreadBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: COLORS.onPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  participantName: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '900',
    color: COLORS.primary,
    textTransform: 'uppercase',
    flex: 1,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700',
    marginLeft: 8,
  },
  messageTimeUnread: {
    color: COLORS.primary,
    opacity: 0.8,
  },
  messageTimeRead: {
    color: COLORS.onSurfaceVariant,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    fontWeight: '700',
    flex: 1,
  },
  lastMessageUnread: {
    color: COLORS.primary,
  },
  lastMessageRead: {
    color: COLORS.onSurfaceVariant,
  },
  arrowIcon: {
    opacity: 0,
  },
  loadButton: {
    margin: 16,
    marginTop: 8,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
    alignItems: 'center',
  },
  loadButtonText: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '900',
    color: COLORS.onPrimary,
    textTransform: 'uppercase',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '900',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  chatHeaderStatus: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    fontWeight: '700',
    color: '#4CAF50',
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  ownMessageBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 0,
  },
  otherMessageBubble: {
    backgroundColor: COLORS.surfaceContainerHighest,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  ownMessageText: {
    color: COLORS.onPrimary,
  },
  otherMessageText: {
    color: COLORS.primary,
  },
  messageTimeSmall: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontWeight: '700',
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: COLORS.onSurfaceVariant,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 3,
    borderTopColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  attachButton: {
    padding: 8,
  },
  messageInputWrapper: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageInput: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: COLORS.onSurfaceVariant,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderRadius: 0,
    padding: 12,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
});
