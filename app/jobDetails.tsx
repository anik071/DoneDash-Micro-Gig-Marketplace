import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DUMMY_JOBS } from '../constants/dummyJobs';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChevronLeft = ({ color = '#1A8FA0', size = 18 }) => (
  <Text style={{ color, fontSize: size, fontWeight: '400', marginRight: 2 }}>‹</Text>
);

const ClockIcon = ({ color = '#1A8FA0', size = 16 }) => (
  <Text style={{ color, fontSize: size }}>⏱</Text>
);

const PeopleIcon = ({ color = '#1A8FA0', size = 16 }) => (
  <Text style={{ color, fontSize: size }}>👥</Text>
);

const MapIcon = ({ color = '#fff', size = 20 }) => (
  <Text style={{ color, fontSize: size }}>⊞</Text>
);

const ArrowRight = ({ color = '#fff', size = 18 }) => (
  <Text style={{ color, fontSize: size, marginLeft: 8 }}>→</Text>
);

const StarRating = ({ rating = 4.0, max = 5 }) => {
  const filled = Math.floor(rating);
  return (
    <View style={styles.starsRow}>
      {Array.from({ length: max }).map((_, i) => (
        <Text key={i} style={i < filled ? styles.starFilled : styles.starEmpty}>
          ★
        </Text>
      ))}
      <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const JobDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const job = DUMMY_JOBS.find(j => j.id === id);

  if (!job) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Job not found.</Text>
      </View>
    );
  }

  const initials = job.posterName
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const proposalSubmission = () => {
    router.push('./submitProposals');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF3F6" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Details</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* ── Job Card ── */}
        <View style={styles.jobCard}>

          {/* Badges */}
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{job.category.toUpperCase()}</Text>
            </View>
            <View style={styles.openBadge}>
              <View style={styles.openDot} />
              <Text style={styles.openBadgeText}>Open</Text>
            </View>
          </View>

          {/* Title + Payout */}
          <View style={styles.titleRow}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View style={styles.payoutBox}>
              <Text style={styles.payoutAmount}>৳{job.payAmount}</Text>
              <Text style={styles.payoutLabel}>{job.payType.toUpperCase()}</Text>
            </View>
          </View>

          {/* Poster card */}
          <View style={styles.posterCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            </View>
            <View style={styles.posterInfo}>
              <Text style={styles.posterName}>{job.posterName}</Text>
              <StarRating rating={4.0} />
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionLabel}>DESCRIPTION</Text>
          <Text style={styles.descriptionText}>
            Need help with this task. Please reach out if you have the relevant skills and availability.
          </Text>

          {/* Info Pills */}
          <View style={styles.infoPill}>
            <ClockIcon />
            <Text style={styles.pillText}>Posted: {job.postedAgo}</Text>
          </View>

          <View style={styles.infoPill}>
            <PeopleIcon />
            <Text style={styles.pillText}>Proposals: 3</Text>
          </View>

        </View>

        {/* ── Location Card (Map) ── */}
        <View style={styles.locationCard}>
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/600x260/8DB87A/8DB87A' }}
            style={styles.mapBg}
            imageStyle={styles.mapBgImage}
            resizeMode="cover"
          >
            <View style={styles.locationBox}>
              <Text style={styles.locationLabel}>LOCATION</Text>
              <Text style={styles.locationName}>Campus Center, SMUCT</Text>
            </View>

            <TouchableOpacity style={styles.mapIconBtn} activeOpacity={0.8}>
              <MapIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} activeOpacity={0.85} onPress={proposalSubmission}>
              <Text style={styles.applyBtnText}>Apply now</Text>
              <ArrowRight />
            </TouchableOpacity>
          </ImageBackground>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const TEAL = '#1A8FA0';
const TEXT_DARK = '#1C1C1C';
const TEXT_GRAY = '#6B7280';
const STAR_GOLD = '#D4890A';
const GREEN_DARK = '#2E7D32';
const BG = '#EAF3F6';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },

  // ── Header ───────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    width: 70,
  },
  backText: {
    color: TEAL,
    fontSize: 15,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── Job Card ─────────────────────────────────────────────────────────────────
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  categoryBadge: {
    backgroundColor: '#B2E0EC',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#0E6878',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  openBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 6,
  },
  openDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  openBadgeText: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: '500',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 8,
  },
  jobTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: TEXT_DARK,
    lineHeight: 24,
  },
  payoutBox: {
    alignItems: 'flex-end',
  },
  payoutAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: TEAL,
  },
  payoutLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: TEXT_GRAY,
    letterSpacing: 0.5,
    marginTop: -2,
  },
  posterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F4',
    borderRadius: 14,
    padding: 14,
    marginBottom: 22,
    gap: 14,
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    borderColor: '#C8D8DE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7BA7B5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  posterInfo: {
    gap: 5,
  },
  posterName: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starFilled: {
    color: STAR_GOLD,
    fontSize: 18,
  },
  starEmpty: {
    color: '#D1D5DB',
    fontSize: 18,
  },
  ratingNumber: {
    color: TEXT_DARK,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_GRAY,
    letterSpacing: 1,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: TEXT_DARK,
    lineHeight: 23,
    marginBottom: 22,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 10,
    gap: 10,
    alignSelf: 'flex-start',
    minWidth: 200,
  },
  pillText: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: '500',
  },

  // ── Location Card ─────────────────────────────────────────────────────────────
  locationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  mapBg: {
    minHeight: 260,
    justifyContent: 'flex-end',
  },
  mapBgImage: {
    borderRadius: 20,
  },
  locationBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_GRAY,
    letterSpacing: 1,
    marginBottom: 3,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  mapIconBtn: {
    position: 'absolute',
    bottom: 72,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0D5F70',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREEN_DARK,
    paddingVertical: 18,
    borderRadius: 0,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default JobDetailScreen;