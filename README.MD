# Doclusion - Find Your Perfect Doctor

Doclusion is a modern, user-friendly web application that helps patients find and connect with healthcare professionals. Built with React, TypeScript, and Tailwind CSS, it offers a seamless experience for searching and filtering doctors based on various criteria.

## Features

### 🔍 Advanced Search & Filtering

- **Search by Name**: Quickly find doctors using the search bar
- **Specialty Filter**: Filter doctors by their medical specialties
- **Consultation Mode**: Choose between video consultations and in-clinic visits
- **Smart Sorting**: Sort doctors by fees or experience
- **Mobile-Friendly Filters**: Responsive design with mobile-optimized filter panel

### 👨‍⚕️ Doctor Profiles

- **Comprehensive Information**: View detailed doctor profiles including:
  - Professional photo
  - Specializations
  - Years of experience
  - Consultation fees
  - Languages spoken
  - Clinic details
  - Available consultation modes

### 🎨 Modern UI/UX

- **Responsive Design**: Seamless experience across all devices
- **Animated Transitions**: Smooth animations using Framer Motion
- **Intuitive Interface**: Easy-to-use filters and search functionality
- **Loading States**: Clear feedback during data fetching
- **Error Handling**: User-friendly error messages

## Technology Stack

- **Frontend Framework**: React 18
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Routing**: React Router
- **Development**: Vite
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/doclusion.git
   ```

2. Install dependencies:

   ```bash
   cd doclusion
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── DoctorGrid.tsx
│   │   ├── FilterPanel.tsx
│   │   └── Header.tsx
│   └── UI/
│       ├── CheckboxGroup.tsx
│       ├── DoctorCard.tsx
│       ├── DoctorModal.tsx
│       ├── RadioGroup.tsx
│       ├── SearchBar.tsx
│       └── SortSelector.tsx
├── hooks/
│   ├── useDoctors.ts
│   └── useQueryParams.ts
├── types/
│   └── doctor.ts
├── utils/
│   └── filterDoctors.ts
├── App.tsx
└── main.tsx
```

## Key Components

### Header

- Hero section with search functionality
- Animated floating tags
- Key statistics display

### FilterPanel

- Specialty selection
- Consultation mode toggle
- Sorting options
- Mobile-responsive design

### DoctorGrid

- Responsive grid layout
- Doctor cards with key information
- Click-to-view detailed modal

### DoctorModal

- Comprehensive doctor information
- Clinic details with map link
- Booking functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/MustHaveFeature`)
3. Commit your changes (`git commit -m 'Add some MustHaveFeature'`)
4. Push to the branch (`git push origin feature/MustHaveFeature`)
5. Open a Pull Request

## Acknowledgments

- Design inspiration from modern healthcare platforms
- UI components built with Headless UI
- Animations powered by Framer Motion
