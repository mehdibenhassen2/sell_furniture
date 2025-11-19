# Project Structure

## Root Organization

- Main Angular app is in `sell_furniture/` directory
- Root level contains minimal config files

## Angular Application Structure

```
sell_furniture/
├── src/
│   ├── app/
│   │   ├── components/        # UI components
│   │   ├── services/          # Business logic & API calls
│   │   ├── models/            # TypeScript interfaces/types
│   │   ├── pipes/             # Custom pipes
│   │   ├── app.component.*    # Root component
│   │   ├── app.config.*       # App configuration
│   │   └── app.routes.ts      # Route definitions
│   ├── assets/                # Static assets
│   ├── styles.scss            # Global styles
│   ├── index.html             # HTML entry point
│   └── main.ts                # Bootstrap entry point
├── dist/                      # Build output
├── angular.json               # Angular CLI config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
└── server.ts                  # SSR Express server
```

## Component Organization

Components follow Angular standalone pattern with co-located files:

- `*.component.ts` - Component logic
- `*.component.html` - Template
- `*.component.scss` - Styles
- `*.component.spec.ts` - Tests

## Key Directories

### `/components`

Feature-based organization with nested sub-components:

- `items-list/` - Main listing view with search-bar, pictures-container, spinner
- `add-new/` - Form for adding items (auth protected)
- `delivery/` - Delivery information page
- `top-bar/` - Navigation header
- `signin-modal/` - Authentication modal

### `/services`

- `sale.service.ts` - Item and location management
- `authentication.service.ts` - User auth with JWT
- `auth.guard.ts` - Route protection

### `/models`

TypeScript interfaces for type safety (e.g., User.ts)

### `/pipes`

Custom transformation pipes (e.g., description-format.pipe.ts)

## Conventions

- Use standalone components (no NgModules)
- Lazy load routes with `loadComponent()`
- Services use `providedIn: 'root'`
- Component selector prefix: `app-`
- Style language: SCSS
- Strict TypeScript mode enabled
