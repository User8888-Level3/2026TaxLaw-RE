# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js-based HTML email generator for REALTY EXPERTS meeting notes. It generates professionally branded, responsive HTML emails from JSON data or interactive input.

## Core Commands

### Generate Email from JSON
```bash
node generate-meeting-email.js --json example-meeting.json
```

### Generate with Custom Output
```bash
node generate-meeting-email.js --json data.json --output filename.html
```

### Interactive Mode
```bash
node generate-meeting-email.js
```

### Help
```bash
node generate-meeting-email.js --help
```

## Architecture

### Single-File Design
The entire generator is in `generate-meeting-email.js` - a standalone Node.js script with no external dependencies (uses only built-in modules: `fs`, `path`, `readline`).

### Key Functions

**generateHTML(data)** - Main HTML generation function that:
- Processes input data structure
- Applies backward compatibility for old field names
- Generates complete HTML document with inline CSS
- Returns full HTML string

**generateSection(title, items, color)** - Creates individual content sections:
- Extracts emoji from title text using regex
- Separates emoji into `.emoji` span for sizing control
- Applies color-coded borders and titles
- Auto-converts URLs to clickable hyperlinks via `linkifyUrls()`

**linkifyUrls(text)** - Automatically detects and converts URLs in content to clickable links with proper styling

**escapeHtml(text)** - Sanitizes user input to prevent HTML injection

### Data Structure Evolution

The JSON schema uses **new field names** with backward compatibility:

**Current Schema:**
- `meeting_title` (string)
- `meeting_date` (string)
- `guest_speaker` (string) - replaces old `attendees`
- `overview` (array) - replaces old `agenda`
- `insights` (array) - replaces old `decisions`
- `media` (array) - replaces old `actions`
- `toolkit` (array) - replaces old `highlights`

**Backward Compatibility:** Script checks for new field names first, falls back to old names if not found, ensuring existing JSON files continue to work.

### Section Structure

Four color-coded sections (order matters):
1. 📊 **Executive Overview** (Blue: #2563eb) - Market landscape, key developments
2. 💡 **Core Insights & Teachings** (Green: #16a34a) - Detailed insights, tax changes, regulatory updates
3. 📚 **Media & Reference Library** (Orange: #ea580c) - Links to recordings, slides, resources
4. 🧰 **Digital Toolkit** (Purple: #9333ea) - Tools, templates, resources

### Brand Configuration

`BRAND` constant defines:
- `logoUrl` - Header logo (REALTY EXPERTS)
- `featureImageUrl` - Feature image displayed below meeting info, above content sections
- Color palette: `primaryColor`, `accentColor`, `lightAccent`

### HTML/CSS Design

**Modern, sophisticated styling:**
- Gradient backgrounds throughout
- Box shadows for depth (main container: `0 20px 60px`)
- Rounded corners (16px container, 12px sections, 10px items)
- Responsive grid layout (switches to single column on mobile)
- Hover effects on list items (translateX and shadow changes)
- Two-column meeting info on desktop, stacks on mobile

**Layout structure:**
1. Header - Logo + gradient background + meeting title
2. Meeting Info - Date and Guest Speaker(s) in grid
3. Feature Image - Full-width image with rounded corners
4. Content Sections - Four color-coded sections
5. Footer - Brand name and generation date

## Important Implementation Details

### URL Handling
All URLs in content are automatically converted to clickable hyperlinks. URLs are:
- Styled with brand blue color (#2563eb)
- Underlined for visibility
- Open in new tabs (`target="_blank"`)

### Emoji Handling
Emojis in section titles are extracted and wrapped in `.emoji` span for independent sizing (28px) separate from title text (24px).

### Image Positioning
Feature image appears **below** Date/Guest Speaker section and **above** Executive Overview. Not side-by-side with meeting info.

### File Outputs
Generated HTML files are self-contained with:
- Inline CSS (no external dependencies)
- Embedded images via URLs
- Subject line printed to console
- Summary statistics (item counts per section)

## Template Files

- `example-meeting.json` - Fully populated real-world example with actual real estate content
- `template-meeting.json` - Blank template for quick start

## Generated Files

Multiple `.html` files in root are output examples - safe to delete. Only keep the final version needed.
