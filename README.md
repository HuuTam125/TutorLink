
```
tutorhub-project3
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ applicationController.js
│  │  ├─ authController.js
│  │  ├─ chatController.js
│  │  ├─ classRequestController.js
│  │  ├─ invitationController.js
│  │  ├─ tutorController.js
│  │  └─ walletController.js
│  ├─ middleware
│  │  ├─ adminMiddleware.js
│  │  └─ authMiddleware.js
│  ├─ models
│  │  ├─ ClassApplication.js
│  │  ├─ ClassRequest.js
│  │  ├─ Conversation.js
│  │  ├─ Invitation.js
│  │  ├─ Message.js
│  │  ├─ PaymentSession.js
│  │  ├─ Transaction.js
│  │  ├─ TutorProfile.js
│  │  └─ User.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ adminRoutes.js
│  │  ├─ applicationRoutes.js
│  │  ├─ authRoutes.js
│  │  ├─ chatRoutes.js
│  │  ├─ classRequestRoutes.js
│  │  ├─ invitationRoutes.js
│  │  ├─ tutorRoutes.js
│  │  └─ walletRoutes.js
│  ├─ server.js
│  ├─ services
│  └─ utils
└─ frontend
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ api
   │  │  └─ axiosClient.js
   │  ├─ App.css
   │  ├─ App.jsx
   │  ├─ assets
   │  ├─ components
   │  │  ├─ admin
   │  │  │  ├─ dashboard
   │  │  │  │  ├─ AdminDashboard.jsx
   │  │  │  │  └─ StatCard.jsx
   │  │  │  ├─ layout
   │  │  │  │  ├─ AdminSidebar.jsx
   │  │  │  │  ├─ AdminTutorDetailPanel.jsx
   │  │  │  │  └─ ConfirmModal.jsx
   │  │  │  └─ tables
   │  │  │     ├─ AdminChatPanel.jsx
   │  │  │     ├─ ApplicationManagementTable.jsx
   │  │  │     ├─ ClassesTable.jsx
   │  │  │     ├─ MatchedClassesTable.jsx
   │  │  │     ├─ ParentsTable.jsx
   │  │  │     ├─ PendingClassesTable.jsx
   │  │  │     ├─ PendingTutorsTable.jsx
   │  │  │     ├─ RefundReportsTable.jsx
   │  │  │     ├─ SharedComponents.jsx
   │  │  │     ├─ TransactionsTable.jsx
   │  │  │     └─ TutorsTable.jsx
   │  │  ├─ ClassRequestList.jsx
   │  │  ├─ common
   │  │  │  └─ ChatWidget.jsx
   │  │  ├─ TutorList.jsx
   │  │  └─ user
   │  │     ├─ classes
   │  │     │  ├─ ClassHeader.jsx
   │  │     │  ├─ InviteModal.jsx
   │  │     │  ├─ RequestCard.jsx
   │  │     │  └─ RequestFilterSidebar.jsx
   │  │     ├─ contact
   │  │     │  ├─ ContactForm.jsx
   │  │     │  └─ ContactInfo.jsx
   │  │     ├─ home
   │  │     │  ├─ ClassSection.jsx
   │  │     │  ├─ ContactSection.jsx
   │  │     │  ├─ HomeHeroSection.jsx
   │  │     │  ├─ HowItWorksSection.jsx
   │  │     │  ├─ StatSection.jsx
   │  │     │  ├─ TestimonialsSection.jsx
   │  │     │  ├─ TutorsSection.jsx
   │  │     │  └─ ValueProposition.jsx
   │  │     ├─ layout
   │  │     │  ├─ BackToTop.jsx
   │  │     │  ├─ Footer.jsx
   │  │     │  ├─ Header.jsx
   │  │     │  ├─ PageTransition.jsx
   │  │     │  └─ ScrollToTop.jsx
   │  │     ├─ profile
   │  │     │  ├─ MyApplicationsTab
   │  │     │  │  ├─ ContactModal.jsx
   │  │     │  │  ├─ MyApplicationsTab.jsx
   │  │     │  │  ├─ PaymentModal.jsx
   │  │     │  │  └─ ReportModal.jsx
   │  │     │  ├─ MyInvitationsTab
   │  │     │  │  └─ MyInvitationsTab.jsx
   │  │     │  ├─ MyRequestsTab
   │  │     │  │  └─ MyRequestsTab.jsx
   │  │     │  ├─ PostRequestTab
   │  │     │  │  └─ PostRequestTab.jsx
   │  │     │  ├─ TutorProfileTab
   │  │     │  │  └─ TutorProfileTab.jsx
   │  │     │  ├─ UserInfoTab
   │  │     │  │  └─ UserInfoTab.jsx
   │  │     │  ├─ UserSidebar
   │  │     │  │  └─ UserSidebar.jsx
   │  │     │  └─ WalletTab
   │  │     │     ├─ TransactionHistory.jsx
   │  │     │     ├─ WalletBalance.jsx
   │  │     │     └─ WalletTab.jsx
   │  │     ├─ toast
   │  │     │  └─ CustomToast.jsx
   │  │     └─ tutors
   │  │        ├─ FilterSidebar.jsx
   │  │        ├─ TutorCard.jsx
   │  │        ├─ TutorHeader.jsx
   │  │        └─ TutorList.jsx
   │  ├─ context
   │  │  └─ AuthContext.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  └─ pages
   │     ├─ admin
   │     │  └─ AdminPage.jsx
   │     ├─ auth
   │     │  ├─ LoginPage.jsx
   │     │  └─ RegisterPage.jsx
   │     ├─ class
   │     │  ├─ ClassDetailPage.jsx
   │     │  ├─ ClassesPage.jsx
   │     │  ├─ MyRequestsPage.jsx
   │     │  └─ PostRequestPage.jsx
   │     ├─ contact
   │     │  └─ ContactPage.jsx
   │     ├─ home
   │     │  └─ HomePage.jsx
   │     ├─ tutor
   │     │  ├─ TutorDetailPage.jsx
   │     │  ├─ TutorPage.jsx
   │     │  └─ TutorProfilePage.jsx
   │     └─ user
   │        └─ UserProfilePage.jsx
   ├─ tailwind.config.js
   └─ vite.config.js

```