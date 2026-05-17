import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
// ─── Colour tokens ─────────────────────────────────────────────────────────────
const TEAL         = '#1A8FA0';
const TEAL_BADGE   = '#B2DCE5';
const TEAL_BADGE_T = '#0D5F70';
const GREEN        = '#2E7D32';
const GREEN_LIGHT  = '#E8F5E9';
const GREEN_FEE    = '#2E7D32';
const BG           = '#EAF3F6';
const WHITE        = '#FFFFFF';
const TEXT_DARK    = '#111111';
const TEXT_GRAY    = '#6B7280';
const INPUT_BG     = '#E8ECED';

const MAX_CHARS = 500;

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ApplyScreen() {
  const [proposal, setProposal]   = useState('');
  const [offeredPay, setOfferedPay] = useState('250');

  const charCount = proposal.length;
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply</Text>
          
          <Text style={[styles.cancelText, { opacity: 0 }]}>Cancel</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* ── Job Summary Card ── */}
          <View style={styles.jobCard}>
            {/* Top row: badge + budget */}
            <View style={styles.cardTopRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>CAMPUS DELIVERY</Text>
              </View>
              <View style={styles.budgetBox}>
                <Text style={styles.budgetLabel}>BUDGET</Text>
                <Text style={styles.budgetAmount}>৳ 250</Text>
              </View>
            </View>

            {/* Job title */}
            <Text style={styles.jobTitle}>
              Urgent: Library Textbook Pickup &amp; Delivery
            </Text>

            {/* Location + Deadline row */}
            <View style={styles.metaRow}>
              {/* Location */}
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>📍</Text>
                <Text style={styles.metaText}>
                  5th Floor,{'\n'}SMUCT Permanent Campus
                </Text>
              </View>

              {/* Separator dot */}
              <View style={styles.separatorDot} />

              {/* Deadline */}
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⏱</Text>
                <Text style={styles.metaText}>
                  Today,{'\n'}before 5 PM
                </Text>
              </View>
            </View>
          </View>

          {/* ── Your Proposal ── */}
          <Text style={styles.sectionLabel}>Your Proposal</Text>

          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Detail your experience or availability for this specific job..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={MAX_CHARS}
              value={proposal}
              onChangeText={setProposal}
              textAlignVertical="top"
            />
            {/* Character counter */}
            <View style={styles.charCountBadge}>
              <Text style={styles.charCountText}>
                {charCount}/{MAX_CHARS}
              </Text>
            </View>
          </View>

          {/* Hint text */}
          <Text style={styles.hintText}>
            Describe how you'll complete this dash with precision.
          </Text>

          {/* ── Offered Pay ── */}
          <Text style={styles.sectionLabel}>Offered Pay</Text>

          <View style={styles.payInputWrapper}>
            <Text style={styles.currencySymbol}>৳</Text>
            <TextInput
              style={styles.payInput}
              value={offeredPay}
              onChangeText={setOfferedPay}
              keyboardType="decimal-pad"
              selectTextOnFocus
            />
          </View>

          {/* ── Platform Fee row ── */}
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Platform Service Fee (5%)</Text>
            <Text style={styles.feeAmount}>-৳ {(parseFloat(offeredPay || '0') * 0.05).toFixed(2)}</Text>
          </View>

          {/* ── Send Proposal Button ── */}
          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85}>
            <Text style={styles.sendBtnText}>Send proposal</Text>
          </TouchableOpacity>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            BY SENDING, YOU AGREE TO THE DASH TERMS OF SERVICE
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: BG,
  },
  cancelText: {
    fontSize: 16,
    color: TEAL,
    fontWeight: '400',
    width: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEAL,
    textAlign: 'center',
  },

  // ── Scroll ─────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 32,
    gap: 14,
  },

  // ── Job Card ───────────────────────────────────────────────────────────────
  jobCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: TEAL_BADGE,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  categoryBadgeText: {
    color: TEAL_BADGE_T,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  budgetBox: {
    alignItems: 'flex-end',
  },
  budgetLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_GRAY,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  budgetAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: GREEN,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    flex: 1,
  },
  metaIcon: {
    fontSize: 15,
    marginTop: 1,
  },
  metaText: {
    fontSize: 14,
    color: TEXT_DARK,
    lineHeight: 20,
    flexShrink: 1,
  },
  separatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5DA',
    marginTop: 8,
  },

  // ── Section label ──────────────────────────────────────────────────────────
  sectionLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: TEAL,
    marginTop: 6,
  },

  // ── Text area ──────────────────────────────────────────────────────────────
  textAreaWrapper: {
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    minHeight: 160,
    padding: 14,
    position: 'relative',
  },
  textArea: {
    fontSize: 15,
    color: TEXT_DARK,
    lineHeight: 22,
    minHeight: 130,
    paddingBottom: 30,
  },
  charCountBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: WHITE,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  charCountText: {
    fontSize: 12,
    color: TEXT_GRAY,
    fontWeight: '500',
  },
  hintText: {
    fontSize: 14,
    color: TEXT_GRAY,
    fontStyle: 'italic',
    lineHeight: 20,
    marginTop: -4,
  },

  // ── Offered Pay input ──────────────────────────────────────────────────────
  payInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 4,
  },
  currencySymbol: {
    fontSize: 26,
    fontWeight: '700',
    color: GREEN,
  },
  payInput: {
    fontSize: 28,
    fontWeight: '700',
    color: TEXT_DARK,
    flex: 1,
    padding: 0,
  },

  // ── Fee row ────────────────────────────────────────────────────────────────
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GREEN_LIGHT,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  feeLabel: {
    fontSize: 15,
    color: TEXT_DARK,
    fontWeight: '400',
  },
  feeAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: GREEN_FEE,
  },

  // ── Send button ────────────────────────────────────────────────────────────
  sendBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 4,
  },
  sendBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },

  // ── Disclaimer ─────────────────────────────────────────────────────────────
  disclaimer: {
    textAlign: 'center',
    fontSize: 10,
    color: TEXT_GRAY,
    letterSpacing: 0.5,
    lineHeight: 16,
    marginTop: -4,
  },
});