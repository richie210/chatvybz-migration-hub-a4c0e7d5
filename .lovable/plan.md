# WhatsApp Clone - Build Plan

## Overview
A full-featured WhatsApp clone with real-time messaging, voice/video calls, group chats, and media sharing. Authentication via phone number (SMS).

---

## Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Lovable Cloud (Supabase)
- **Real-time**: Supabase Realtime for messaging
- **Calls**: WebRTC with STUN/TURN servers
- **SMS Auth**: Twilio via Edge Functions
- **File Storage**: Supabase Storage

---

## Phase 1: Foundation & Authentication

### 1.1 Database Schema
```sql
-- Users/Profiles
profiles (id, phone, display_name, avatar_url, about, last_seen, online)

-- User Roles (security)
user_roles (id, user_id, role)

-- Contacts
contacts (id, user_id, contact_user_id, nickname, blocked)
```

### 1.2 Phone Authentication Flow
1. User enters phone number
2. Edge function sends OTP via Twilio
3. User enters OTP code
4. Supabase Auth validates and creates session
5. Profile created via database trigger

### 1.3 Core Pages
- `/login` - Phone number input
- `/verify` - OTP verification
- `/profile-setup` - Name, avatar on first login

---

## Phase 2: Messaging Core

### 2.1 Database Schema
```sql
-- Conversations (1:1 and group)
conversations (id, type, name, avatar_url, created_by, created_at)

-- Participants
conversation_participants (conversation_id, user_id, role, joined_at, last_read_at)

-- Messages
messages (id, conversation_id, sender_id, content, type, media_url, reply_to_id, created_at, edited_at, deleted_at)

-- Message status
message_receipts (message_id, user_id, delivered_at, read_at)
```

### 2.2 Features
- Real-time message sync via Supabase Realtime
- Typing indicators
- Read receipts (double blue ticks)
- Message replies
- Message editing/deletion
- Emoji reactions

### 2.3 Pages
- `/chats` - Conversation list
- `/chat/:id` - Individual chat view

---

## Phase 3: Media Sharing

### 3.1 Storage Buckets
- `chat-media` - Images, videos, documents
- `voice-notes` - Audio recordings
- `avatars` - Profile pictures

### 3.2 Features
- Image/video upload with preview
- Document sharing (PDF, DOC, etc.)
- Voice note recording (WaveSurfer.js)
- Image compression before upload
- Thumbnail generation

---

## Phase 4: Group Chats

### 4.1 Features
- Create group with name & icon
- Add/remove participants
- Admin roles (admin, member)
- Group settings (only admins can send, etc.)
- Leave group
- Group info page

### 4.2 Pages
- `/group/new` - Create group
- `/group/:id/settings` - Group management

---

## Phase 5: Voice & Video Calls

### 5.1 Database
```sql
calls (id, caller_id, callee_id, conversation_id, type, status, started_at, ended_at)
```

### 5.2 WebRTC Implementation
- Signaling via Supabase Realtime
- STUN servers for NAT traversal
- 1:1 voice calls
- 1:1 video calls
- Call UI (incoming, ongoing, ended)

### 5.3 Features
- Incoming call notification
- Accept/decline
- Mute/unmute
- Camera toggle
- Speaker toggle
- Call duration display

---

## Phase 6: Advanced Features

### 6.1 Status/Stories
- 24-hour disappearing status updates
- Text, image, video statuses
- View count

### 6.2 Additional
- Contact search & add
- Block/unblock users
- Notification sounds
- Push notifications (PWA)
- Dark/light theme
- Message search
- Starred messages

---

## Implementation Order

1. **Enable Lovable Cloud** ← First step
2. **Database schema** - All tables with RLS
3. **Auth flow** - Phone + Twilio OTP
4. **Basic UI** - Login, chat list, chat view
5. **Real-time messaging** - Send/receive
6. **Media sharing** - Images, voice notes
7. **Group chats** - Create, manage
8. **Voice calls** - WebRTC 1:1
9. **Video calls** - WebRTC 1:1
10. **Polish** - Animations, sounds, PWA

---

## Dependencies Needed
- ✅ react, react-dom (installed)
- ✅ framer-motion (installed)
- ✅ wavesurfer.js (installed)
- ✅ simple-peer (installed) - WebRTC
- ✅ socket.io-client (installed) - backup signaling
- ✅ lucide-react (installed)
- Need: Twilio credentials for SMS

---

## Ready to Start?

Reply with "Start Phase 1" to begin building!
