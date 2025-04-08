import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import StaffCard from '@/components/StaffCard';
import { staffMembers } from '@/mocks/staff';

export default function StaffScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Our Team</Text>
        <Text style={styles.subtitle}>Meet the people who make it all happen</Text>
        
        <View style={styles.staffList}>
          {staffMembers.map((staff) => (
            <StaffCard key={staff.id} staff={staff} />
          ))}
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
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Fonts.sizes.md,
    color: Colors.textLight,
    marginBottom: 24,
  },
  staffList: {
    marginBottom: 16,
  },
});
