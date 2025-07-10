# Construction Planning & Scheduling Application

## 🏆 Recent Accomplishments

- **Unified Data Model:** Migrated to a single, modern area statement JSON structure. Removed all legacy simple/complex format logic and types.
- **Professional UI Overhaul:** Redesigned all pages for a premium, open, and exclusive SaaS look using Tailwind CSS, with consistent spacing, card layouts, and accessibility.
- **Dynamic Data Review & Analysis:** Editable table for area statement review, multi-tab dashboard (Overview, Blocks, Analytics, Compliance), and export utilities (JSON/CSV).
- **OpenAI Schedule Generation:** Integrated OpenAI API to generate detailed, sectioned construction schedules from the reviewed area statement. Prompt is dynamically generated from user-uploaded data for optimal results.
- **Schedule Visualization:** Generated schedules are displayed in a modern, sectioned table view, ready for export and future Gantt/timeline support.
- **Export-Ready:** All data and generated schedules can be exported in multiple formats (JSON, CSV, PDF planned).
- **Robust Error Handling:** Improved validation, error messages, and user feedback throughout the workflow.

---

A modern React + TypeScript application for uploading and analyzing Area Statement JSON files from construction projects. Features smart format detection, comprehensive data validation, and detailed analysis dashboards.

## 🚀 Features

### Core Functionality
- **File Upload System:** Drag-and-drop JSON file uploader with real-time validation
- **Unified Area Statement Format:** Supports only the new, comprehensive area statement JSON structure
- **Data Validation:** Comprehensive validation for the unified data structure
- **Enhanced Data Preview:** Multi-tab analysis dashboard with overview, block details, analytics, and compliance sections
- **Export Functionality:** Export processed data as JSON or CSV with metadata options
- **OpenAI Schedule Generation:** Generate a professional construction schedule using OpenAI, with dynamic prompt based on uploaded data
- **Professional UI:** Premium, open, and accessible design system with consistent spacing and modern SaaS aesthetics
- **Accessibility:** Full ARIA compliance and keyboard navigation support

### Data Formats Supported
- **Unified Area Statement Format:** See `src/data/area-statement.json` for the current structure

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 7.0.3
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **File Handling**: React Dropzone
- **Linting**: ESLint with TypeScript support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd construction-planning-scheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── FileUploader.tsx
│   ├── EnhancedDataPreview.tsx
│   └── tabs/           # Dashboard tab components
│       ├── OverviewTab.tsx
│       ├── BlocksTab.tsx
│       ├── AnalyticsTab.tsx
│       └── ComplianceTab.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   ├── formatDetection.ts
│   ├── analytics.ts
│   └── export.ts
├── data/               # Sample data files
│   ├── simple-sample.json
│   └── complex-sample.json
└── styles/             # CSS and styling
    └── index.css
```

## 📊 Data Formats

### Simple Format
```json
{
  "blocks": [
    {
      "name": "Block A",
      "floors": [
        {
          "name": "Ground Floor",
          "level": 0,
          "area": 2500
        }
      ]
    }
  ]
}
```

### Complex Format
```json
{
  "siteDetails": {
    "name": "Project Name",
    "location": "Location",
    "totalArea": 10000,
    "projectType": "Commercial",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "blocks": [
    {
      "name": "Block A",
      "type": "Office",
      "floors": [
        {
          "name": "Ground Floor",
          "level": 0,
          "area": 2500,
          "usage": "Office Space",
          "occupancy": 100,
          "regulations": [
            {
              "name": "Fire Safety",
              "code": "FS-001",
              "description": "Fire exit requirements",
              "complianceStatus": "compliant"
            }
          ]
        }
      ],
      "totalArea": 2500,
      "constructionStatus": "in-progress"
    }
  ],
  "regulations": [...],
  "compliance": {
    "overall": 85.5,
    "details": {...}
  }
}
```

## 🎯 Usage

### Uploading Files
1. Drag and drop a JSON file onto the upload area, or click to browse
2. The application will automatically validate the file format and content
3. Format detection will determine if it's simple or complex data
4. Complex data will be automatically converted to simple format for analysis

### Analyzing Data
The dashboard provides four main tabs:

1. **Overview**: Key statistics, project information, and format details
2. **Blocks**: Detailed view of all blocks and floors with expandable sections
3. **Analytics**: Charts and tables showing area distribution, floor levels, and usage patterns
4. **Compliance**: Detailed compliance analysis (complex format only)

### Exporting Data
1. Click the "Export" button in the dashboard header
2. Choose export format (JSON or CSV)
3. Set filename and metadata options
4. Download the processed data

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)

### Typography
- **Font Family**: Inter
- **Weights**: 400, 500, 600, 700

### Spacing
- **Base Unit**: 8px system
- **Components**: Consistent padding and margins

### Animations
- **Duration**: 200-300ms
- **Easing**: cubic-bezier for smooth transitions

## ♿ Accessibility

- Full ARIA compliance with proper labels and roles
- Keyboard navigation support for all interactive elements
- Screen reader friendly with semantic HTML
- High contrast color schemes
- Focus indicators for all interactive elements

## 🧪 Testing

The application includes sample data files for testing:

- `src/data/simple-sample.json`: Basic block structure
- `src/data/complex-sample.json`: Full project with compliance data

## 📝 Development Guidelines

### Adding New Features
1. Follow the existing component structure
2. Maintain accessibility patterns
3. Use TypeScript for type safety
4. Add comprehensive validation for new data structures

### Styling
- Use Tailwind CSS classes
- Follow the 8px spacing system
- Maintain consistent color scheme
- Add hover states and focus rings

### Error Handling
- Provide clear error messages
- Include recovery options
- Validate all user inputs
- Handle edge cases gracefully

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the sample data files for format examples
- Review the validation error messages for troubleshooting
- Ensure your JSON file follows the supported formats

## 🔮 Future Enhancements

- Real-time collaboration features
- Advanced charting and visualization
- Integration with construction management systems
- Mobile-responsive design improvements
- Advanced filtering and search capabilities
- PDF export functionality
- Data import from Excel/CSV files 