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
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
// ─── Colour tokens ─────────────────────────────────────────────────────────────
const TEAL        = '#1A8FA0';
const TEAL_BORDER = '#1A8FA0';
const RED         = '#C0392B';
const PINK_BG     = '#FEF0F0';
const PINK_LABEL  = '#E05A5A';
const BG          = '#EEF2F4';
const WHITE       = '#FFFFFF';
const TEXT_DARK   = '#111111';
const TEXT_GRAY   = '#6B7280';
const INPUT_BG    = '#F5F5F5';
const DASH_BORDER = '#C8CDD0';

// ─── Issue options data ────────────────────────────────────────────────────────
const ISSUES = [
  {
    id: 'extra_work',
    icon: '⏱+',
    title: 'Extra work',
    subtitle: 'Task was larger than described',
  },
  {
    id: 'unsafe',
    icon: '⚠',
    title: 'Unsafe',
    subtitle: 'Felt uncomfortable or unsafe',
  },
  {
    id: 'no_pay',
    icon: '💵',
    title: 'No pay',
    subtitle: 'Poster refused to pay',
  },
  {
    id: 'other',
    icon: '?',
    title: 'Other',
    subtitle: 'Something else happened',
  },
];

const MAX_CHARS = 500;

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ReportIssueScreen({ navigation }: any) {
  const [selectedIssue, setSelectedIssue] = useState<string>('unsafe');
  const [details, setDetails]             = useState('');
  // Simulated uploaded photos (replace with real picked images)
  const [photos, setPhotos]               = useState<string[]>([
    '', 
  ]);

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    // TODO: integrate react-native-image-picker or expo-image-picker here
    console.log('Add photo pressed');
  };
  const Router = useRouter();
  const handleSubmit = () => {
    // TODO: submit to API
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
          <Text style={styles.headerTitle}>Report issue</Text>
          {/* Invisible spacer */}
          <Text style={[styles.cancelText, { opacity: 0 }]}>Cancel</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* ── Disputed Job Card ── */}
          <View style={styles.disputedCard}>
            {/* Thumbnail */}
            <Image
              source={{ uri: '' }}
              style={styles.jobThumbnail}
            />
            <View style={styles.disputedInfo}>
              <Text style={styles.disputedLabel}>DISPUTED JOB</Text>
              <Text style={styles.disputedTitle}>Dorm Furniture Assembly</Text>
              <Text style={styles.disputedPoster}>
                Posted by <Text style={styles.disputedPosterBold}>Shraban Chakma</Text>
              </Text>
            </View>
          </View>

          {/* ── What's the issue? ── */}
          <Text style={styles.sectionTitle}>What's the issue?</Text>

          <View style={styles.issueGrid}>
            {ISSUES.map((issue, idx) => {
              const isSelected = selectedIssue === issue.id;
              const isLeft     = idx % 2 === 0;
              return (
                <TouchableOpacity
                  key={issue.id}
                  style={[
                    styles.issueCard,
                    isLeft ? styles.issueCardLeft : styles.issueCardRight,
                    isSelected && styles.issueCardSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedIssue(issue.id)}>
                  {/* Icon */}
                  <View style={styles.issueIconWrapper}>
                    <Text style={[
                      styles.issueIcon,
                      issue.id === 'unsafe' ? { color: TEAL } : {},
                    ]}>
                      {issue.icon}
                    </Text>
                  </View>
                  <Text style={styles.issueTitle}>{issue.title}</Text>
                  <Text style={styles.issueSubtitle}>{issue.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Details ── */}
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder={
                'Provide specific details about what happened.\nThis helps our team resolve the issue faster.'
              }
              placeholderTextColor="#ABABAB"
              multiline
              maxLength={MAX_CHARS}
              value={details}
              onChangeText={setDetails}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{details.length}/{MAX_CHARS}</Text>
          </View>

          {/* ── Evidence (Optional) ── */}
          <Text style={styles.sectionTitle}>Evidence (Optional)</Text>

          <View style={styles.photoRow}>
            {/* Add Photo button */}
            <TouchableOpacity
              style={styles.addPhotoBtn}
              activeOpacity={0.7}
              onPress={handleAddPhoto}>
              <Text style={styles.addPhotoIcon}>📷+</Text>
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>

            {/* Uploaded photos */}
            {photos.map((uri, idx) => (
              <View key={idx} style={styles.photoThumbWrapper}>
                <Image source={{ uri }} style={styles.photoThumb} />
                <TouchableOpacity
                  style={styles.removePhotoBtn}
                  onPress={() => handleRemovePhoto(idx)}
                  activeOpacity={0.8}>
                  <Text style={styles.removePhotoText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* ── Submit ── */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.85}
            onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit report</Text>
          </TouchableOpacity>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            Our safety team will review your report within 24 hours.{'\n'}
            If necessary, your pay will be held during the investigation.
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
    borderBottomWidth: 0,
  },
  cancelText: {
    fontSize: 16,
    color: TEXT_DARK,
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
    paddingTop: 20,
    paddingBottom: 36,
    gap: 16,
  },

  // ── Disputed Job Card ───────────────────────────────────────────────────────
  disputedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PINK_BG,
    borderRadius: 16,
    padding: 14,
    gap: 14,
  },
  jobThumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  disputedInfo: {
    flex: 1,
    gap: 3,
  },
  disputedLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: PINK_LABEL,
    letterSpacing: 0.8,
  },
  disputedTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: 22,
  },
  disputedPoster: {
    fontSize: 13,
    color: TEXT_GRAY,
    marginTop: 2,
  },
  disputedPosterBold: {
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── Section title ───────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginTop: 4,
  },

  // ── Issue grid ──────────────────────────────────────────────────────────────
  issueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  issueCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 6,
  },
  issueCardLeft: {
    flex: 1,
    marginRight: 0,
  },
  issueCardRight: {
    flex: 1,
    marginLeft: 0,
  },
  issueCardSelected: {
    borderColor: TEAL_BORDER,
  },
  issueIconWrapper: {
    marginBottom: 4,
  },
  issueIcon: {
    fontSize: 20,
    color: TEAL,
  },
  issueTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  issueSubtitle: {
    fontSize: 13,
    color: TEXT_GRAY,
    lineHeight: 18,
  },

  // ── Text area ──────────────────────────────────────────────────────────────
  textAreaWrapper: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 14,
    minHeight: 140,
    position: 'relative',
  },
  textArea: {
    fontSize: 15,
    color: TEXT_DARK,
    lineHeight: 22,
    minHeight: 100,
    paddingBottom: 24,
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    fontSize: 12,
    color: TEXT_GRAY,
  },

  // ── Evidence / Photos ──────────────────────────────────────────────────────
  photoRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  addPhotoBtn: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: DASH_BORDER,
    borderStyle: 'dashed',
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  addPhotoIcon: {
    fontSize: 22,
    color: TEXT_GRAY,
  },
  addPhotoText: {
    fontSize: 13,
    color: TEXT_GRAY,
    fontWeight: '500',
  },
  photoThumbWrapper: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'visible',
    position: 'relative',
  },
  photoThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#C8A882',
  },
  removePhotoBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  removePhotoText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },

  // ── Submit button ──────────────────────────────────────────────────────────
  submitBtn: {
    backgroundColor: RED,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },

  // ── Disclaimer ─────────────────────────────────────────────────────────────
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: TEXT_GRAY,
    lineHeight: 18,
    marginTop: -4,
  },
});