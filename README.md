# calm/me - Your Personal AI Therapist

![calm/me Logo](https://via.placeholder.com/200x80/FCD34D/000000?text=calm%2Fme)

> **Your free 24/7 AI therapist** - Talk through your problems with ease, no fees, no wait times, no downloads, no hassle.

## 🌟 Overview

calm/me is an innovative AI-powered therapy platform that provides empathetic, real-time voice conversations whenever you need support. Built with cutting-edge emotion recognition technology, it offers a safe space to talk about your feelings, thoughts, and concerns without judgment.

## 🚀 Features

- **🎙️ Real-time Voice Therapy**: Natural voice conversations with AI therapist
- **🧠 Emotion Recognition**: Advanced emotion detection and analysis using Hume AI
- **🔒 Secure & Private**: End-to-end encrypted conversations with complete confidentiality
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🌙 Dark/Light Mode**: Customizable theme preferences
- **📊 Chat History**: Track your therapy journey with conversation history
- **👤 User Profiles**: Personalized experience with profile management
- **🎨 3D Visualizations**: Interactive audio visualizations during conversations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D audio visualizations
- **Radix UI** - Accessible component primitives

### Backend & Services
- **Hume AI** - Emotion recognition and voice processing
- **Firebase Auth** - User authentication and management
- **Supabase** - Database and real-time data
- **Cloudinary** - Image upload and management

### Development Tools
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing
- **Geist Font** - Modern typography

## 🏗️ Architecture

```
calm/me/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── chat/              # Chat interface
│   ├── account/           # User account management
│   └── (legal)/           # Legal pages
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── three/            # 3D visualization components
│   └── audio/            # Audio processing utilities
├── lib/                  # Core libraries and configurations
│   ├── firebase.ts       # Firebase configuration
│   ├── supabase.ts       # Supabase client
│   └── cloudinary.ts     # Image upload utilities
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
└── supabase/             # Database migrations
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm 9+
- Firebase project
- Supabase project
- Hume AI account
- Cloudinary account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key

# Hume AI Configuration
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key
NEXT_PUBLIC_FEMALE_VOICE_CONFIG_ID=your_female_voice_config
NEXT_PUBLIC_MALE_VOICE_CONFIG_ID=your_male_voice_config

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushmaninbox/calm-me.git
   cd calm-me
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Supabase database**
   ```bash
   # Run the migration file in your Supabase SQL editor
   # File: supabase/migrations/query1_works.sql
   ```

4. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication with Email/Password and Google providers
   - Generate service account credentials

5. **Set up Hume AI**
   - Create a Hume AI account
   - Generate API keys
   - Configure voice models

6. **Configure Cloudinary**
   - Create a Cloudinary account
   - Set up upload presets
   - Configure image transformations

7. **Run the development server**
   ```bash
   pnpm dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Key Features Implementation

### Voice Processing & Emotion Recognition
- **Hume AI Integration**: Real-time emotion detection from voice input
- **WebRTC**: Browser-based audio capture and streaming
- **Voice Synthesis**: AI-generated responses with emotional context

### Authentication System
- **Multi-provider Auth**: Email/password and Google OAuth
- **Email Verification**: Secure account activation
- **Password Reset**: Self-service password recovery

### Real-time Communication
- **WebSocket Connections**: Live voice streaming to Hume AI
- **Audio Visualization**: Real-time 3D audio waveforms
- **Emotion Display**: Live emotion analysis visualization

### Data Management
- **Profile Management**: User data with Cloudinary image uploads
- **Chat History**: Persistent conversation storage
- **Emotion Analytics**: Historical emotion tracking

## 🔐 Security & Privacy

- **End-to-end Encryption**: All conversations are encrypted
- **GDPR Compliant**: User data protection and privacy controls
- **No Data Sharing**: Conversations are never shared with third parties
- **Secure Storage**: Encrypted database storage with Supabase RLS
- **Authentication**: Firebase Auth with secure token management

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Touch Interactions**: Gesture-based controls
- **Adaptive UI**: Dynamic layouts for different screen sizes
- **Accessibility**: WCAG 2.1 compliant components

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment
1. Build the application: `pnpm build`
2. Deploy the `.next` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hume AI** - For emotion recognition technology
- **Firebase** - For authentication and hosting
- **Supabase** - For database and real-time features
- **Vercel** - For deployment platform
- **Open Source Community** - For the amazing tools and libraries

## 📞 Support

- **Email**: [ai.calmme@gmail.com](mailto:ai.calmme@gmail.com)
- **Instagram**: [@ai.calmme](https://www.instagram.com/ai.calmme/)
- **Issues**: [GitHub Issues](https://github.com/ayushmaninbox/calm-me/issues)

## 🔗 Links

- **Live Demo**: [calm-me.vercel.app](https://calm-me.vercel.app)
- **Documentation**: [docs.calm-me.com](https://docs.calm-me.com)
- **API Reference**: [api.calm-me.com](https://api.calm-me.com)

---

**Made with ❤️ by [Ayushman Mohapatra](https://ayushmanmohapatra.netlify.app/) & [Kavyan Jain](https://www.linkedin.com/in/kavyan-jain-768742305/)**

*Be heard. Be understood. Be better.*