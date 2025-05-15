# SPEAK UI Component Structure

## Overview

This document outlines the component structure of the SPEAK UI project. The components are organized into feature-specific directories to enhance maintainability and code clarity.

## Component Organization

### Core Structure

\`\`\`
components/
├── ui/                 # Reusable UI components (buttons, inputs, etc.)
├── layout/             # Layout components (navbar, sidebar, footer)
├── chat/               # Chat-related components
├── project/            # Project-related components
├── user/               # User-related components
├── pricing/            # Pricing-related components
├── settings/           # Settings-related components
├── admin/              # Admin-related components
├── shared/             # Shared utility components
├── feedback/           # Feedback-related components
├── toast/              # Toast notification components
├── effects/            # Visual effects components
├── icons/              # Icon components
└── index.ts            # Main component exports
\`\`\`

### Feature-Specific Directories

Each feature directory contains components related to that specific feature:

#### Layout Components
\`\`\`
layout/
├── navbar/             # Top navigation components
├── sidebar/            # Sidebar navigation components
├── footer/             # Footer components
└── index.ts            # Layout component exports
\`\`\`

#### User Components
\`\`\`
user/
├── profile/            # User profile components
├── dropdown/           # User dropdown menu components
├── avatar/             # User avatar components
└── index.ts            # User component exports
\`\`\`

#### Chat Components
\`\`\`
chat/
├── message/            # Chat message components
├── section/            # Chat section components
├── input/              # Chat input components
└── index.ts            # Chat component exports
\`\`\`

#### Project Components
\`\`\`
project/
├── item/               # Project item components
├── category/           # Project category components
├── avatar/             # Project avatar components
└── index.ts            # Project component exports
\`\`\`

#### Pricing Components
\`\`\`
pricing/
├── plan/               # Pricing plan components
├── feature/            # Plan feature components
├── modal/              # Pricing modal components
└── index.ts            # Pricing component exports
\`\`\`

#### Settings Components
\`\`\`
settings/
├── general/            # General settings components
├── billing/            # Billing settings components
├── profile/            # Profile settings components
└── index.ts            # Settings component exports
\`\`\`

#### Admin Components
\`\`\`
admin/
├── preview/            # Plan preview components
├── context/            # Admin context providers
└── index.ts            # Admin component exports
\`\`\`

## Best Practices

1. **Component Naming**: Use PascalCase for component names
2. **File Organization**: Group related components in feature-specific directories
3. **Exports**: Use index.ts files to export components from each directory
4. **Imports**: Import components from their feature directory, not directly from files
5. **Separation of Concerns**: Keep components focused on a single responsibility
6. **Reusability**: Place reusable components in the appropriate shared directories
7. **Documentation**: Document complex components with comments

## Usage Examples

\`\`\`tsx
// Good: Import from feature directory
import { UserProfile } from '@/components/user';
import { ChatMessage } from '@/components/chat';
import { Button } from '@/components/ui';

// Avoid: Direct imports from files
// import UserProfile from '@/components/user/profile/user-profile';
// import ChatMessage from '@/components/chat/message/chat-message';
// import Button from '@/components/ui/button';
