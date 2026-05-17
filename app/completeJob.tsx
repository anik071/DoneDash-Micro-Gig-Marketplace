import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import ReportIssueScreen from './submitReport';
// ─── Colour tokens ─────────────────────────────────────────────────────────────
const GREEN_DARK   = '#1E6B2E';
const GREEN_MID    = '#2E7D32';
const GREEN_CARD   = '#246030';
const TEAL         = '#1A8FA0';
const TEAL_INFO_BG = '#EAF4F6';
const BG           = '#EEF2F4';
const WHITE        = '#FFFFFF';
const TEXT_DARK    = '#111111';
const TEXT_GRAY    = '#6B7280';
const TEXT_LIGHT   = '#9CA3AF';
const INPUT_BG     = '#F0F3F4';
const DASH_BORDER  = '#C8CDD0';
const SLOT_BG      = '#E8ECEE';
const RED          = '#D32F2F';
const MAX_CHARS    = 300;
const MAX_PHOTOS   = 4;

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function CompleteJobScreen({ navigation }: any) {
  const [notes, setNotes]   = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const isReady = notes.trim().length > 0;
  const route = useRouter();
  function submitReport(): void {
    route.push('/submitReport')
  }
  const handleAddPhoto = () => {
    // TODO: wire expo-image-picker or react-native-image-picker
    if (photos.length < MAX_PHOTOS) {
      setPhotos(prev => [
        ...prev,
        ``,
      ]);
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleMarkComplete = () => {
    if (!isReady) return;
    // TODO: submit to API
    route.back();
  };

  // Build 4 photo slots
  const slots = Array.from({ length: MAX_PHOTOS });

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => route.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete job</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* ── Job Overview Card ── */}
          <View style={styles.overviewCard}>
            {/* Dot pattern overlay – simulated with low-opacity circles */}
            <View style={styles.dotOverlay} pointerEvents="none" />

            <View style={styles.overviewTopRow}>
              <View style={styles.overviewBadge}>
                <Text style={styles.overviewBadgeText}>JOB OVERVIEW</Text>
              </View>
              <View style={styles.earnedBox}>
                <Text style={styles.earnedLabel}>EARNED</Text>
                <Text style={styles.earnedAmount}>৳ 250</Text>
              </View>
            </View>

            <Text style={styles.overviewTitle}>Dorm Furniture Assembly</Text>

            <View style={styles.helperRow}>
              {/* Avatar */}
              <View style={styles.helperAvatar}>
                <Text style={styles.helperAvatarText}>SC</Text>
              </View>
              <Text style={styles.helperText}>Poster: Shraban C.</Text>
            </View>
          </View>

          {/* ── Main white card ── */}
          <View style={styles.mainCard}>

            {/* Proof of Completion */}
            <Text style={styles.cardSectionTitle}>Proof of Completion</Text>
            <Text style={styles.cardSectionSub}>
              Upload up to 4 photos showing the finished task.
            </Text>

            {/* Photo slots */}
            <View style={styles.photoRow}>
              {slots.map((_, idx) => {
                const uri = photos[idx];
                const isFirst = idx === 0;
                if (uri) {
                  return (
                    <View key={idx} style={styles.photoSlotFilled}>
                      <Image source={{ uri }} style={styles.photoThumb} />
                      <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => handleRemovePhoto(idx)}>
                        <Text style={styles.removeBtnText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
                if (isFirst || idx === photos.length) {
                  // Active add slot
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.photoSlot, isFirst && styles.photoSlotDashed]}
                      onPress={handleAddPhoto}
                      activeOpacity={0.7}>
                      {isFirst && (
                        <Text style={styles.cameraIcon}>📷</Text>
                      )}
                    </TouchableOpacity>
                  );
                }
                // Empty disabled slot
                return (
                  <View key={idx} style={[styles.photoSlot, styles.photoSlotDisabled]} />
                );
              })}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Completion Notes */}
            <View style={styles.notesHeaderRow}>
              <Text style={styles.cardSectionTitle}>Completion Notes</Text>
              <Text style={styles.requiredTag}>REQUIRED</Text>
            </View>

            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder={
                  'Detail any specific instructions or maintenance the user should know about...'
                }
                placeholderTextColor={TEXT_LIGHT}
                multiline
                maxLength={MAX_CHARS}
                value={notes}
                onChangeText={setNotes}
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.charCount}>
              {notes.length} / {MAX_CHARS} characters
            </Text>

            {/* Info box */}
            <View style={styles.infoBox}>
              <View style={styles.infoIconCircle}>
                <Text style={styles.infoIconText}>i</Text>
              </View>
              <Text style={styles.infoText}>
                Once you mark this as complete,{' '}
                <Text style={styles.infoTextBold}>Shraban C.</Text>
                {' '}will be notified to release the payment. Ensure all tasks were
                performed as requested.
              </Text>
            </View>

          </View>

        </ScrollView>

        {/* ── Mark as complete button (sticky bottom) ── */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.completeBtn, !isReady && styles.completeBtnDisabled]}
            activeOpacity={isReady ? 0.85 : 1}
            onPress={handleMarkComplete}>
            <Text style={[styles.completeBtnText, !isReady && styles.completeBtnTextDisabled]}>
              Mark as complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => submitReport()} activeOpacity={0.7}>
            <Text style={[styles.reportBtn]}>
              Report an issue
            </Text>
          </TouchableOpacity>
          <Text style={styles.warningText}>THIS ACTION CANNOT BE UNDONE</Text>
        </View>

      </KeyboardAvoidingView>
    </ScrollView>
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
  },
  cancelText: {
    fontSize: 16,
    color: TEAL,
    fontWeight: '400',
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    textAlign: 'center',
  },

  // ── Scroll ─────────────────────────────────────────────────────────────────
  scroll: { flex: 1, backgroundColor: BG },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 18,
  },

  // ── Job Overview Card ───────────────────────────────────────────────────────
  overviewCard: {
    backgroundColor: GREEN_CARD,
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    gap: 10,
  },
  dotOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
  },
  overviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  overviewBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  overviewBadgeText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  earnedBox: {
    alignItems: 'flex-end',
  },
  earnedLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  earnedAmount: {
    color: WHITE,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 2,
  },
  overviewTitle: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  helperAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  helperAvatarText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '700',
  },
  helperText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '500',
  },

  // ── Main white card ─────────────────────────────────────────────────────────
  mainCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  cardSectionSub: {
    fontSize: 14,
    color: TEXT_GRAY,
    marginTop: -8,
  },

  // Photo slots
  photoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  photoSlot: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: SLOT_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoSlotDashed: {
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: DASH_BORDER,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  photoSlotDisabled: {
    opacity: 0.5,
  },
  photoSlotFilled: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'visible',
    position: 'relative',
  },
  photoThumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: -7,
    right: -7,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  removeBtnText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
  },
  cameraIcon: {
    fontSize: 22,
  },

  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 4,
  },

  // Notes
  notesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requiredTag: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT_LIGHT,
    letterSpacing: 0.8,
  },
  textAreaWrapper: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    padding: 14,
    minHeight: 130,
  },
  textArea: {
    fontSize: 15,
    color: TEXT_DARK,
    lineHeight: 22,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: TEXT_GRAY,
    textAlign: 'right',
    marginTop: -8,
  },

  // Info box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: TEAL_INFO_BG,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  infoIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  infoIconText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
    lineHeight: 20,
  },
  infoTextBold: {
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── Sticky bottom bar ───────────────────────────────────────────────────────
  bottomBar: {
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 30 : 18,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E5E7',
  },
  completeBtn: {
    backgroundColor: GREEN_MID,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  completeBtnDisabled: {
    backgroundColor: '#D0D8DA',
  },
  completeBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },
  completeBtnTextDisabled: {
    color: '#8E9DA2',
  },
  reportBtn: {
    textAlign: 'center',
    backgroundColor: RED,
    color: WHITE,
    fontWeight: '700',
    fontSize: 17,
    borderRadius: 16,
    paddingVertical: 20,
  },
  warningText: {
    textAlign: 'center',
    fontSize: 11,
    color: TEXT_GRAY,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});