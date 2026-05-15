import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// ─── Colour tokens ─────────────────────────────────────────────────────────────
const TEAL        = '#1A8FA0';
const TEAL_DARK   = '#1C7A8A';
const TEAL_CARD   = '#1D7E8F'; // "Post a new gig" card bg
const TEAL_LIGHT  = '#C8E9EF'; // "Support Center" card bg
const GREEN       = '#2E8B2E';
const BG          = '#EAF3F6';
const TEXT_DARK   = '#111111';
const TEXT_GRAY   = '#6B7280';
const WHITE       = '#FFFFFF';

// ─── Screen ───────────────────────────────────────────────────────────────────
// Filter tabs
const TABS: string[] = ['All', 'Active', 'Completed'];
export default function MyJobsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── Top nav bar ── */}
      <View style={styles.topBar}>
        {/* Logo + Brand */}
        <View style={styles.brandRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🎩</Text>
          </View>
          <Text style={styles.brandName}>DoneDash</Text>
        </View>
        {/* Bell */}
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Page title row ── */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>My jobs</Text>
          <Text style={styles.totalSpent}>Total spent: $43</Text>
        </View>

        {/* ── Filter chips ── */}
        <View style={styles.filterRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.filterChip,
                activeTab === tab && styles.filterChipActive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.filterChipText,
                  activeTab === tab && styles.filterChipTextActive,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Job card 1 – OPEN ── */}
        <TouchableOpacity style={styles.jobCard} activeOpacity={0.85} onPress={() => viewJobDetails()}>
          <View style={styles.cardTopRow}>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>OPEN</Text>
            </View>
            <Text style={styles.cardPrice}>৳ 250</Text>
          </View>

          <Text style={styles.cardTitle}>Help me move dorm stuff</Text>

          <View style={styles.cardBottomRow}>
            <TouchableOpacity activeOpacity={0.7} style={styles.proposalsBtn}>
              <Text style={styles.proposalsText}>3 proposals →</Text>
            </TouchableOpacity>
            <Text style={styles.postedTime}>Posted 2h ago</Text>
          </View>
        </TouchableOpacity>

        {/* ── Job card 2 – ACTIVE ── */}
        <TouchableOpacity style={styles.jobCard} activeOpacity={0.85}>
          <View style={styles.cardTopRow}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
            <Text style={styles.cardPrice}>$18</Text>
          </View>

          <Text style={styles.cardTitle}>Calculus tutor session</Text>

          {/* Assigned dashr row */}
          <View style={styles.dashrRow}>
            <View style={styles.dashrAvatar}>
              <Text style={styles.dashrAvatarText}>AJ</Text>
            </View>
            <View>
              <Text style={styles.dashrName}>Alex J.</Text>
              <Text style={styles.dashrLabel}>Assigned Dashr</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── Action cards row ── */}
        <View style={styles.actionRow}>
          {/* Post a new gig */}
          <TouchableOpacity style={styles.postCard} activeOpacity={0.85}>
            <View style={styles.actionIconCircle}>
              <Text style={styles.actionIconText}>+</Text>
            </View>
            <Text style={styles.postCardTitle}>Post a new{'\n'}gig</Text>
          </TouchableOpacity>

          {/* Support Center */}
          <TouchableOpacity style={styles.supportCard} activeOpacity={0.85}>
            <View style={styles.supportIconCircle}>
              <Text style={styles.supportIconText}>?</Text>
            </View>
            <Text style={styles.supportCardTitle}>Support{'\n'}Center</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  // ── Top bar ────────────────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: BG,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2B2B2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: TEAL,
  },
  bellIcon: {
    fontSize: 22,
    color: TEXT_DARK,
  },

  // ── Scroll ─────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 16,
  },

  // ── Title row ──────────────────────────────────────────────────────────────
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: TEXT_DARK,
    letterSpacing: -0.5,
  },
  totalSpent: {
    fontSize: 15,
    color: TEXT_GRAY,
    fontWeight: '400',
    paddingBottom: 4,
  },

  // ── Filter chips ───────────────────────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  filterChip: {
    flex: 1,
    backgroundColor: '#D9E6EA',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: TEAL_DARK,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  filterChipTextActive: {
    color: WHITE,
    fontWeight: '700',
  },

  // ── Job cards ──────────────────────────────────────────────────────────────
  jobCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openBadge: {
    backgroundColor: '#1A8FA0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  openBadgeText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  activeBadge: {
    backgroundColor: '#B2DCE5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  activeBadgeText: {
    color: '#0D5F70',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: GREEN,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: 26,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  proposalsBtn: {},
  proposalsText: {
    fontSize: 15,
    color: TEAL,
    fontWeight: '600',
  },
  postedTime: {
    fontSize: 13,
    color: TEXT_GRAY,
    fontStyle: 'italic',
  },

  // Assigned dashr
  dashrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  dashrAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashrAvatarText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 14,
  },
  dashrName: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  dashrLabel: {
    fontSize: 13,
    color: TEXT_GRAY,
    marginTop: 1,
  },

  // ── Action cards ───────────────────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    gap: 14,
  },
  postCard: {
    flex: 1,
    backgroundColor: TEAL_CARD,
    borderRadius: 20,
    padding: 20,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconText: {
    fontSize: 26,
    color: TEAL_CARD,
    fontWeight: '300',
    lineHeight: 30,
  },
  postCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: WHITE,
    lineHeight: 26,
    marginTop: 18,
  },
  supportCard: {
    flex: 1,
    backgroundColor: TEAL_LIGHT,
    borderRadius: 20,
    padding: 20,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  supportIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1C2B2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportIconText: {
    fontSize: 20,
    color: WHITE,
    fontWeight: '700',
  },
  supportCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: 26,
    marginTop: 18,
  },

  // ── Bottom Tab Bar ─────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  activeTabBg: {
    backgroundColor: '#C8E9EF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 11,
    color: TEXT_GRAY,
    fontWeight: '400',
  },
  tabLabelActive: {
    color: TEAL,
    fontWeight: '600',
  },
});