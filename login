import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Phone, Mail } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      login({
        name,
        phone,
        email
      });
      
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'You have successfully logged in',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Enter your details to continue</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User size={20} color={Colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Phone size={20} color={Colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={Colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={Colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.textLight}
            />
          </View>
          
          <Button
            title="Login"
            onPress={handleLogin}
            loading={isSubmitting}
            style={styles.loginButton}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            By logging in, you can track your orders and access your order history.
          </Text>
        </View>
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
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: Fonts.weights.bold,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.textLight,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: Fonts.sizes.md,
    color: Colors.text,
  },
  loginButton: {
    marginTop: 8,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  infoText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.text,
    lineHeight: 20,
  },
});
