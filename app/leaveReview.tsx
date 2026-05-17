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
const TEAL       = '#1A8FA0';
const GREEN_BTN  = '#2E7D32';
const GREEN_BTN2 = '#1B6B3A';
const BG         = '#EAF3F6';
const WHITE      = '#FFFFFF';
const TEXT_DARK  = '#111111';
const TEXT_GRAY  = '#6B7280';
const INPUT_BG   = '#E8ECEE';
const STAR_GOLD  = '#F5A623';
const STAR_EMPTY = '#D1D5DB';
const ONLINE_DOT = '#4CD964';

// ─── Interactive Star Rating ───────────────────────────────────────────────────
function StarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (val: number) => void;
}) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star)}
          activeOpacity={0.7}
          style={styles.starBtn}>
          <Text style={[styles.star, star <= rating ? styles.starFilled : styles.starEmpty]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function LeaveReviewScreen({ navigation }: any) {
  const [rating,   setRating]   = useState(4);
  const [feedback, setFeedback] = useState('');
  const Router = useRouter();
  const handleSubmit = () => {
    // TODO: submit rating + feedback to API
    Router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => Router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leave a review</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* ── Review Card ── */}
          <View style={styles.reviewCard}>

            {/* Avatar with online dot */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                {/* Replace with <Image> when you have a real photo */}
                <Text style={styles.avatarEmoji}>👨‍💼</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>

            <Text style={styles.questionText}>How was Anik?</Text>

            <StarRating rating={rating} onChange={setRating} />

            <Text style={styles.feedbackLabel}>OPTIONAL FEEDBACK</Text>

            {/* Text area */}
            <TextInput
              style={styles.textArea}
              placeholder="Anik was great! Arrived on time and helped carry the extra boxes..."
              placeholderTextColor="#ABABAB"
              multiline
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />

            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.85}
              onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit review</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <Text style={styles.disclaimer}>
              Your feedback helps keep the DoneDash campus community{'\n'}
              safe and reliable for everyone.
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
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
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },

  // ── Review Card ─────────────────────────────────────────────────────────────
  reviewCard: {
    backgroundColor: WHITE,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 32,
    width: '100%',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  // Avatar
  avatarWrapper: {
    position: 'relative',
    width: 72,
    height: 72,
    marginBottom: 4,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2B3A4A',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: ONLINE_DOT,
    borderWidth: 2,
    borderColor: WHITE,
  },

  // Question
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: TEXT_DARK,
    textAlign: 'center',
  },

  // Stars
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starBtn: {
    padding: 4,
  },
  star: {
    fontSize: 38,
  },
  starFilled: {
    color: STAR_GOLD,
  },
  starEmpty: {
    color: STAR_EMPTY,
  },

  // Feedback label
  feedbackLabel: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_GRAY,
    letterSpacing: 1,
    marginBottom: -6,
  },

  // Text area
  textArea: {
    width: '100%',
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: TEXT_DARK,
    lineHeight: 22,
    minHeight: 130,
  },

  // Submit button
  submitBtn: {
    width: '100%',
    backgroundColor: GREEN_BTN,
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    // Subtle gradient feel via shadow
    shadowColor: GREEN_BTN2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },

  // Disclaimer
  disclaimer: {
    textAlign: 'center',
    fontSize: 13,
    color: TEXT_GRAY,
    lineHeight: 20,
    marginTop: -4,
  },
});