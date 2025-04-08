import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Utensils, Tag, Users, Info, ShoppingBag, Package, User, UserCog } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import HomeCard from '@/components/HomeCard';
import { useOrderStore } from '@/store/order-store';
import { useAuthStore } from '@/store/auth-store';

export default function HomeScreen() {
  const router = useRouter();
  const items = useOrderStore(state => state.items);
  const orderCompleted = useOrderStore(state => state.orderCompleted);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const isStaffLoggedIn = useAuthStore(state => state.isStaffLoggedIn);
  const user = useAuthStore(state => state.user);
  const staff = useAuthStore(state => state.staff);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500' }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>Café UPTM</Text>
            <Text style={styles.subtitle}>Campus Dining Made Easy</Text>
          </View>
        </View>
        
        {isLoggedIn && user && (
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
          </View>
        )}
        
        {isStaffLoggedIn && staff && (
          <View style={[styles.welcomeCard, styles.staffWelcomeCard]}>
            <Text style={styles.welcomeText}>Welcome back, {staff.name}!</Text>
            <Text style={styles.staffText}>Staff Dashboard Available</Text>
            <Text 
              style={styles.dashboardLink}
              onPress={() => router.push('/staff-dashboard')}
            >
              Go to Dashboard →
            </Text>
          </View>
        )}
        
        <View style={styles.cardsContainer}>
          <HomeCard 
            title="Menu" 
            icon={<Utensils size={32} color={Colors.background} />} 
            route="/menu" 
            color={Colors.primary}
          />
          <HomeCard 
            title="Promotions" 
            icon={<Tag size={32} color={Colors.background} />} 
            route="/promotions" 
            color="#FF9800"
          />
          <HomeCard 
            title="Our Staff" 
            icon={<Users size={32} color={Colors.background} />} 
            route="/staff" 
            color="#2196F3"
          />
          <HomeCard 
            title="About Us" 
            icon={<Info size={32} color={Colors.background} />} 
            route="/about" 
            color="#607D8B"
          />
          {isLoggedIn ? (
            <HomeCard 
              title="Your Orders" 
              icon={<ShoppingBag size={32} color={Colors.background} />} 
              route="/your-orders" 
              color="#9C27B0"
            />
          ) : (
            <HomeCard 
              title="Login" 
              icon={<User size={32} color={Colors.background} />} 
              route="/login" 
              color="#9C27B0"
            />
          )}
          {!isStaffLoggedIn && (
            <HomeCard 
              title="Staff Login" 
              icon={<UserCog size={32} color={Colors.background} />} 
              route="/staff-login" 
              color="#795548"
            />
          )}
        </View>
        
        {totalItems > 0 && (
          <View style={styles.orderCard}>
            <View style={styles.orderCardContent}>
              <ShoppingBag size={24} color={Colors.primary} />
              <View style={styles.orderCardTextContainer}>
                <Text style={styles.orderCardTitle}>Current Order</Text>
                <Text style={styles.orderCardSubtitle}>{totalItems} items in your cart</Text>
              </View>
            </View>
            <Text 
              style={styles.orderCardAction}
              onPress={() => router.push('/order')}
            >
              View
            </Text>
          </View>
        )}
        
        {orderCompleted && (
          <View style={styles.orderCard}>
            <View style={styles.orderCardContent}>
              <Package size={24} color={Colors.success} />
              <View style={styles.orderCardTextContainer}>
                <Text style={styles.orderCardTitle}>Order Ready</Text>
                <Text style={styles.orderCardSubtitle}>Your order is being prepared</Text>
              </View>
            </View>
            <Text 
              style={styles.orderCardAction}
              onPress={() => router.push('/pickup')}
            >
              View
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: '700',
    color: Colors.background,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.background,
  },
  welcomeCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  staffWelcomeCard: {
    backgroundColor: '#5D4037', // Darker brown for staff
  },
  welcomeText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '600',
    color: Colors.background,
    textAlign: 'center',
  },
  staffText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.background,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  dashboardLink: {
    fontSize: Fonts.sizes.md,
    color: Colors.background,
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  orderCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCardTextContainer: {
    marginLeft: 12,
  },
  orderCardTitle: {
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  orderCardSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textLight,
  },
  orderCardAction: {
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
});
