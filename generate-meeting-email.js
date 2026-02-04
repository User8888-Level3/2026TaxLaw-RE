#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * REALTY EXPERTS Meeting Notes Email Generator
 * Generates branded HTML email for meeting notes
 */

const COLORS = {
  overview: '#2563eb',      // blue
  insights: '#16a34a',      // green
  media: '#ea580c',         // orange
  toolkit: '#9333ea'        // purple
};

const BRAND = {
  name: 'REALTY EXPERTS',
  primaryColor: '#1e3a8a',
  accentColor: '#2563eb',
  lightAccent: '#3b82f6',
  logoUrl: 'https://harvinder.dscloud.me/blog/wp-content/uploads/2024/02/cropped-2022_Logo_WhiteBox-Realtor-1.jpg',
  featureImageUrl: 'https://harvinder.dscloud.me/blog/wp-content/uploads/2026/02/2026_real_estate_market_update_tax_law_and_lending_trends.jpg'
};

/**
 * Generate HTML email from meeting data
 */
function generateHTML(data) {
  const sections = [];

  // Executive Overview section
  if (data.overview && data.overview.length > 0) {
    sections.push(generateSection('📊 Executive Overview', data.overview, COLORS.overview));
  } else if (data.agenda && data.agenda.length > 0) {
    // Backward compatibility
    sections.push(generateSection('📊 Executive Overview', data.agenda, COLORS.overview));
  }

  // Core Insights & Teachings section
  if (data.insights && data.insights.length > 0) {
    sections.push(generateSection('💡 Core Insights & Teachings', data.insights, COLORS.insights));
  } else if (data.decisions && data.decisions.length > 0) {
    // Backward compatibility
    sections.push(generateSection('💡 Core Insights & Teachings', data.decisions, COLORS.insights));
  }

  // Media & Reference Library section
  if (data.media && data.media.length > 0) {
    sections.push(generateSection('📚 Media & Reference Library', data.media, COLORS.media));
  } else if (data.actions && data.actions.length > 0) {
    // Backward compatibility
    sections.push(generateSection('📚 Media & Reference Library', data.actions, COLORS.media));
  }

  // Digital Toolkit section
  if (data.toolkit && data.toolkit.length > 0) {
    sections.push(generateSection('🧰 Digital Toolkit', data.toolkit, COLORS.toolkit));
  } else if (data.highlights && data.highlights.length > 0) {
    // Backward compatibility
    sections.push(generateSection('🧰 Digital Toolkit', data.highlights, COLORS.toolkit));
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.meeting_title)} - Executive Recap</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.7;
      color: #1e293b;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, ${BRAND.primaryColor} 0%, ${BRAND.accentColor} 50%, ${BRAND.lightAccent} 100%);
      padding: 50px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      pointer-events: none;
    }
    .logo {
      max-width: 280px;
      height: auto;
      display: block;
      margin: 0 auto 30px;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
      position: relative;
      z-index: 1;
    }
    .header h1 {
      margin: 0;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: white;
      text-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
      z-index: 1;
    }
    .content {
      padding: 50px 40px;
    }
    .meeting-info {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      padding: 24px 28px;
      margin-bottom: 24px;
      border: 1px solid #e2e8f0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .feature-image-container {
      margin-bottom: 40px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    .feature-image {
      width: 100%;
      height: auto;
      display: block;
    }
    .meeting-info p {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
    }
    .meeting-info strong {
      color: ${BRAND.primaryColor};
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 6px;
    }
    .meeting-info span {
      color: #1e293b;
      font-size: 15px;
      font-weight: 500;
    }
    .section {
      margin-bottom: 45px;
    }
    .section-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 3px solid;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title .emoji {
      font-size: 28px;
    }
    .section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .section li {
      padding: 18px 22px;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border-left: 4px solid;
      border-radius: 10px;
      font-size: 15px;
      color: #334155;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: all 0.2s ease;
      line-height: 1.7;
    }
    .section li:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .video-embed-container {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border-left: 4px solid;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .video-embed-title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin-bottom: 12px;
    }
    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .video-fullscreen-link {
      text-align: center;
      font-size: 13px;
      color: #64748b;
      margin-top: 8px;
    }
    .video-fullscreen-link a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .video-fullscreen-link a:hover {
      color: #1e40af;
      text-decoration: underline;
    }
    .video-fullscreen-link .icon {
      display: inline-block;
      margin-left: 4px;
      font-size: 14px;
    }
    .footer {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      padding: 32px 40px;
      text-align: center;
      color: #64748b;
      font-size: 13px;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 6px 0;
    }
    .footer .brand {
      font-weight: 600;
      color: ${BRAND.accentColor};
    }
    @media (max-width: 600px) {
      body {
        padding: 20px 10px;
      }
      .header {
        padding: 40px 24px;
      }
      .content {
        padding: 30px 24px;
      }
      .header h1 {
        font-size: 26px;
      }
      .logo {
        max-width: 200px;
      }
      .section-title {
        font-size: 20px;
      }
      .meeting-info {
        grid-template-columns: 1fr;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="${BRAND.logoUrl}" alt="${BRAND.name} Logo" class="logo">
      <h1>${escapeHtml(data.meeting_title)}</h1>
    </div>

    <div class="content">
      <div class="meeting-info">
        <p><strong>Date</strong><span>${escapeHtml(data.meeting_date)}</span></p>
        <p><strong>Guest Speaker</strong><span>${escapeHtml(data.guest_speaker || data.attendees)}</span></p>
      </div>

      <div class="feature-image-container">
        <a href="${BRAND.featureImageUrl}" target="_blank" style="display:block;">
          <img src="${BRAND.featureImageUrl}" alt="2026 Real Estate Market Update" class="feature-image">
        </a>
      </div>

      ${sections.join('\n\n')}
    </div>

    <div class="footer">
      <p class="brand">${BRAND.name}</p>
      <p>Executive Meeting Notes · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate video embed HTML
 */
function generateVideoEmbed(item, color) {
  // Extract emoji, title, and URL from item
  const embedMatch = item.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])?\s*(.+?)\s*\[EMBED\]:\s*(https?:\/\/[^\s]+)/u);

  if (!embedMatch) return null;

  const emoji = embedMatch[1] || '🎬';
  const videoTitle = embedMatch[2].trim();
  const videoUrl = embedMatch[3].trim();

  // Extract video ID from ScreenPal URL (e.g., cOnfbQn3J4A from https://go.screenpal.com/watch/cOnfbQn3J4A)
  const videoIdMatch = videoUrl.match(/\/watch\/([^/?]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  return `        <div class="video-embed-container" style="border-left-color: ${color};">
          <div class="video-embed-title">
            <span style="font-size: 20px;">${emoji}</span>
            <span>${escapeHtml(videoTitle)}</span>
          </div>
          <div class="sp-embed-player" data-id="${videoId}" data-aspect-ratio="1.777778" data-padding-top="56.250000%" style="position:relative;width:100%;padding-top:56.250000%;height:0;">
            <script src="https://go.screenpal.com/consumption/player_appearance/${videoId}/1.777778"></script>
            <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" scrolling="no" src="https://go.screenpal.com/player/${videoId}?ff=1&ahc=1&dcc=1&bg=transparent&share=1&download=1&embed=1&cl=1" allowfullscreen="true"></iframe>
          </div>
          <div class="video-fullscreen-link">
            <a href="${videoUrl}" target="_blank">🎯 Open in full screen for the best viewing experience <span class="icon">↗</span></a>
          </div>
        </div>`;
}

/**
 * Generate a section with items
 */
function generateSection(title, items, color) {
  const itemsHtml = items
    .map(item => {
      // Check if item is a video embed
      if (item.includes('[EMBED]')) {
        return generateVideoEmbed(item, color);
      }
      // Regular list item
      return `        <li style="border-left-color: ${color};">${linkifyUrls(escapeHtml(item))}</li>`;
    })
    .join('\n');

  // Extract emoji from title
  const emojiMatch = title.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*/u);
  const emoji = emojiMatch ? emojiMatch[0].trim() : '';
  const titleText = emoji ? title.substring(emojiMatch[0].length) : title;

  return `      <div class="section">
        <h2 class="section-title" style="border-bottom-color: ${color};">
          ${emoji ? `<span class="emoji">${emoji}</span>` : ''}
          <span style="color: ${color};">${titleText}</span>
        </h2>
        <ul>
${itemsHtml}
        </ul>
      </div>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Convert URLs to clickable links
 */
function linkifyUrls(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlPattern, '<a href="$1" style="color: #2563eb; text-decoration: underline;" target="_blank">$1</a>');
}

/**
 * Generate subject line
 */
function generateSubject(data) {
  return `Meeting Notes: ${data.meeting_title} - ${data.meeting_date}`;
}

/**
 * Read JSON file
 */
function readJSONFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Interactive prompt for meeting data
 */
async function promptForData() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log('\n=== REALTY EXPERTS Meeting Notes Generator ===\n');

  const data = {
    meeting_title: await question('Meeting Title: '),
    meeting_date: await question('Meeting Date (e.g., January 15, 2024): '),
    guest_speaker: await question('Guest Speaker: '),
    overview: [],
    insights: [],
    media: [],
    toolkit: []
  };

  console.log('\nEnter executive overview items (one per line, empty line to finish):');
  data.overview = await getMultilineInput(rl);

  console.log('\nEnter core insights & teachings (one per line, empty line to finish):');
  data.insights = await getMultilineInput(rl);

  console.log('\nEnter media & reference library items (one per line, empty line to finish):');
  data.media = await getMultilineInput(rl);

  console.log('\nEnter digital toolkit items (one per line, empty line to finish):');
  data.toolkit = await getMultilineInput(rl);

  rl.close();
  return data;
}

/**
 * Get multiline input
 */
async function getMultilineInput(rl) {
  const items = [];
  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  while (true) {
    const line = await question('> ');
    if (!line.trim()) break;
    items.push(line.trim());
  }

  return items;
}

/**
 * Save HTML to file
 */
function saveHTML(html, filename) {
  fs.writeFileSync(filename, html, 'utf8');
}

/**
 * Print summary
 */
function printSummary(data, outputFile, subject) {
  console.log('\n' + '='.repeat(60));
  console.log('✅ Meeting Notes Email Generated Successfully!');
  console.log('='.repeat(60));
  console.log(`\n📧 Subject: ${subject}`);
  console.log(`\n📄 Output File: ${outputFile}`);
  console.log('\n📊 Summary:');
  console.log(`   - Executive Overview: ${(data.overview || data.agenda)?.length || 0}`);
  console.log(`   - Core Insights & Teachings: ${(data.insights || data.decisions)?.length || 0}`);
  console.log(`   - Media & Reference Library: ${(data.media || data.actions)?.length || 0}`);
  console.log(`   - Digital Toolkit: ${(data.toolkit || data.highlights)?.length || 0}`);
  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Display usage information
 */
function displayUsage() {
  console.log(`
Usage: node generate-meeting-email.js [options]

Options:
  --json <file>        Load meeting data from JSON file
  --output <file>      Output filename (default: meeting-notes-TIMESTAMP.html)
  --help              Display this help message

Input Methods:
  1. JSON file:        node generate-meeting-email.js --json meeting-data.json
  2. Interactive:      node generate-meeting-email.js (no arguments)

JSON File Format:
  {
    "meeting_title": "Executive Recap & Resources",
    "meeting_date": "February 3, 2026",
    "guest_speaker": "John Doe, Jane Smith",
    "overview": ["Review Q1 goals", "Discuss new listings"],
    "insights": ["Key learning points and teachings"],
    "media": ["Link to recording", "Presentation slides"],
    "toolkit": ["Resource links", "Tools and templates"]
  }

Examples:
  node generate-meeting-email.js --json example-meeting.json
  node generate-meeting-email.js --json data.json --output team-sync.html
  node generate-meeting-email.js
`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help') || args.includes('-h')) {
    displayUsage();
    process.exit(0);
  }

  let meetingData;
  let outputFile;

  // Parse arguments
  const jsonIndex = args.indexOf('--json');
  const outputIndex = args.indexOf('--output');

  if (jsonIndex !== -1 && args[jsonIndex + 1]) {
    // Load from JSON file
    const jsonFile = args[jsonIndex + 1];
    meetingData = readJSONFile(jsonFile);
  } else {
    // Interactive mode
    meetingData = await promptForData();
  }

  // Validate required fields
  if (!meetingData.meeting_title || !meetingData.meeting_date || (!meetingData.guest_speaker && !meetingData.attendees)) {
    console.error('Error: meeting_title, meeting_date, and guest_speaker are required fields.');
    process.exit(1);
  }

  // Determine output filename
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputFile = args[outputIndex + 1];
  } else {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const sanitized = meetingData.meeting_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .substring(0, 30);
    outputFile = `meeting-notes-${sanitized}-${timestamp}.html`;
  }

  // Generate HTML and subject
  const html = generateHTML(meetingData);
  const subject = generateSubject(meetingData);

  // Save file
  saveHTML(html, outputFile);

  // Print summary
  printSummary(meetingData, outputFile, subject);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { generateHTML, generateSubject };
