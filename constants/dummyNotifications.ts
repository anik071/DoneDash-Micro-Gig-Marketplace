export type NotificationType = 'gig' | 'payment' | 'profile' | 'review' | 'recap' | 'proposal';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'gig',
    title: 'New Gig Available Nearby',
    message: 'A grocery delivery task at Pine Street is open. Earn ৳150 + tips today.',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Processed Successfully',
    message: "Your earnings for 'Library Tutoring' have been deposited into your wallet.",
    time: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'profile',
    title: 'Profile Identity Verified',
    message: 'Your university student status has been confirmed. You now have full access.',
    time: '2h ago',
    read: true,
  },
  {
    id: '4',
    type: 'review',
    title: '5-Star Review Received',
    message: 'Sarah left you a review: "Fast and reliable delivery. Thanks!"',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'recap',
    title: 'Weekly Campus Recap',
    message: 'See how much you earned and how many peers you helped this week.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'proposal',
    title: 'New Proposal on Your Job',
    message: 'Karim submitted a proposal for "Fix my React bug". Tap to review.',
    time: '3 days ago',
    read: true,
  },
];