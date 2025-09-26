# Secure Dashboard App

A modern, responsive dashboard application built with React, TypeScript, and SCSS. This application demonstrates best practices in frontend development, including authentication, role-based access control, data management, and responsive design.

## Features

### 🔐 Authentication System
- **Secure Login**: Email and password authentication with comprehensive validation
- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, and special characters
- **Role-Based Access**: Editor and Viewer roles with different permissions
- **Session Management**: Automatic session persistence using localStorage

### 📊 Data Management
- **Sortable Tables**: Click on any column header to sort data
- **Search Functionality**: Real-time search across all table fields
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for Editor role
- **API Integration**: Uses JSONPlaceholder API for demo data
- **Caching System**: Intelligent caching with automatic invalidation

### 🎨 UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Animations**: Smooth transitions and hover effects
- **Loading States**: Beautiful loading spinners and states
- **Error Handling**: User-friendly error messages and retry functionality
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Demo Accounts

Use these credentials to test different role capabilities:

| Email | Password | Role | Capabilities |
|-------|----------|------|-------------|
| `editor@test.com` | `Editor123!` | Editor | View, Create, Edit, Delete posts |
| `viewer@test.com` | `Viewer123!` | Viewer | View posts only |
| `admin@test.com` | `Admin123!` | Editor | View, Create, Edit, Delete posts |

## Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secure-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/       # Main dashboard layout
│   ├── DataTable/       # Sortable data table
│   ├── Login/           # Authentication form
│   ├── PostForm/        # Post creation/editing form
│   └── UI/              # Generic UI components
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   ├── useLocalStorage.ts # LocalStorage hook
│   └── usePosts.ts      # Posts data management
├── services/            # API services
│   └── api.ts           # JSONPlaceholder API integration
├── styles/              # SCSS stylesheets
│   ├── abstracts/       # Variables, mixins, functions
│   ├── base/            # Reset, typography
│   └── components/      # Component-specific styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx              # Root application component
```

## Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced CSS with variables, mixins, and nesting
- **JSONPlaceholder** - RESTful API for demo data
- **React Query** - Data fetching and caching
- **ESLint** - Code linting and quality assurance

## Key Implementation Details

### Authentication Flow
1. User enters credentials on login form
2. Credentials validated against demo user database
3. JWT-like user session stored in localStorage
4. Protected routes check authentication status
5. Role-based permissions control feature access

### Data Management
- Posts fetched from JSONPlaceholder API
- Local caching with 5-minute expiration
- Optimistic updates for better UX
- Error boundaries for graceful failure handling

### Responsive Design
- Mobile-first approach
- Flexible grid system using CSS Grid and Flexbox
- Responsive typography using clamp()
- Touch-friendly interface elements

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Code Splitting**: Automatic bundle splitting for optimal loading
- **Lazy Loading**: Components loaded on demand
- **Caching**: API responses cached locally
- **Optimized Images**: Responsive image loading
- **Minimal Bundle**: Tree-shaking eliminates unused code

## Security Features

- **Input Validation**: All user inputs validated and sanitized
- **XSS Protection**: Proper escaping of user-generated content
- **CSRF Prevention**: State management protects against cross-site attacks
- **Secure Storage**: Sensitive data properly handled in localStorage

## Future Enhancements

- Real backend integration
- Advanced filtering and pagination
- Export functionality (CSV, PDF)
- Dark mode support
- PWA capabilities
- Real-time updates with WebSockets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using modern web technologies**