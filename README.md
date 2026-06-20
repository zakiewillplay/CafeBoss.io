# Digity Lead Manager

A professional lead management dashboard for restaurant and cafe owners to manage and contact 235+ verified business leads across India.

## Features

- **Lead Database**: 235+ verified restaurant and cafe leads across 50+ Indian cities
- **Advanced Search & Filtering**: Search by name, address, phone, and filter by city or cuisine type
- **WhatsApp Integration**: Send pre-filled WhatsApp messages with Digity pitch directly from the dashboard
- **Email Outreach**: Compose professional emails with pre-filled subject and body
- **CSV Export**: Export filtered leads for bulk outreach or external tools
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Build Tool**: Vite
- **Data**: CSV-based lead database

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The application will be available at `http://localhost:3000`

## Project Structure

```
client/
  src/
    pages/
      Home.tsx       - Landing page with features overview
      Leads.tsx      - Main leads management dashboard
    lib/
      leads.ts       - Lead data parsing and loading utilities
    components/      - Reusable UI components (shadcn/ui)
    contexts/        - React contexts for theming
  public/
    leads.csv        - Lead database with 235+ verified contacts
```

## Usage

### Viewing Leads

1. Navigate to `/leads` to access the lead management dashboard
2. All 235+ leads are displayed in a sortable table
3. Use the search bar to find leads by name, address, or phone number

### Filtering Leads

- **By City**: Select a city from the City dropdown to filter leads
- **By Cuisine**: Select a cuisine type from the Cuisine dropdown
- **Combine Filters**: Use multiple filters together for precise results

### Contacting Leads

#### WhatsApp
- Click the WhatsApp icon next to any lead with a phone number
- A pre-filled message with your Digity pitch will open in WhatsApp

#### Email
- Click the Email icon next to any lead with an email address
- Your default email client will open with a pre-filled subject and body

### Exporting Leads

1. Apply any filters or search criteria you want
2. Click the "Export CSV" button
3. A CSV file with filtered leads will download to your computer

## Deployment

The application is optimized for deployment on the Manus platform or any Node.js hosting service.

## Contact

**Zakir Rashid**
- Phone: 9103173043
- Email: zakiewillplay@gmail.com

---

Built with ❤️ for Digity - Digital Menus for Modern Restaurants
