# RealVibeAI Realty

## Overview

RealVibeAI Realty is an AI-powered real estate platform built with Next.js that provides solutions for real estate professionals. The application focuses on three core services: virtual property staging using AI, CRM integration capabilities, and automated lead qualification. The platform is designed to help real estate agents and brokers save time, close more deals, and deliver enhanced value to their clients through artificial intelligence and automation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses Next.js 15.5.3 with the App Router architecture, providing server-side rendering and static site generation capabilities. The frontend is built with React 19.1.0 and styled using Tailwind CSS v4 for utility-first styling. TypeScript is implemented throughout for type safety and better developer experience.

**Key Design Decisions:**
- **App Router Structure**: Utilizes Next.js App Router for file-based routing with layout components
- **Component Organization**: Pages are organized in feature-based directories (about, contact, solutions)
- **Styling Strategy**: Tailwind CSS v4 with custom CSS variables for theming and dark mode support
- **Performance Optimization**: Turbopack integration for faster development and build processes

### Rendering Strategy
The application employs a hybrid rendering approach with server-side rendering for initial page loads and client-side navigation for subsequent route changes. This provides optimal performance and SEO benefits while maintaining a smooth user experience.

### Styling and Theming
The styling system uses Tailwind CSS v4 with a custom theme configuration that supports automatic dark mode detection. CSS custom properties are used for consistent color management across light and dark themes.

### Navigation Architecture
A centralized navigation system is implemented in the root layout component, providing consistent navigation across all pages. The navigation uses Next.js Link components for optimized client-side routing.

## External Dependencies

### Core Framework Dependencies
- **Next.js 15.5.3**: Full-stack React framework providing SSR, routing, and optimization features
- **React 19.1.0 & React DOM**: Core React libraries for component-based UI development
- **TypeScript 5.x**: Static type checking for improved code quality and developer experience

### Styling and UI Dependencies
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **@tailwindcss/postcss**: PostCSS integration for Tailwind CSS processing

### Development Tools
- **ESLint 9.x**: Code linting with Next.js specific configurations
- **eslint-config-next**: Next.js optimized ESLint configuration
- **@eslint/eslintrc**: ESLint configuration utilities

### Future Integration Points
Based on the business model, the application is designed to integrate with:
- **CRM Systems**: HubSpot, Zoho, and Apptivo for lead management
- **AI Services**: For virtual property staging and lead qualification features
- **Real Estate APIs**: For property data and market information
- **Communication Services**: For automated lead follow-up and client communication

The current architecture provides a solid foundation for adding these integrations as the platform evolves from a marketing site to a full-featured SaaS application.