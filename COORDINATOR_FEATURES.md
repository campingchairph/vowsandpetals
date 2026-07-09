# Vows & Petals — Coordinator Planner: Complete Feature Reference

> **Purpose of this document:** Full product detail for use in marketing copy, social media ads, feature announcements, and sales pitches. Everything in this file reflects the live application as of July 2026.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Authentication & Account](#2-authentication--account)
3. [Dashboard — Multi-Client Management](#3-dashboard--multi-client-management)
4. [Coordinator Profile](#4-coordinator-profile)
5. [Client Interview — 9-Step Discovery](#5-client-interview--9-step-discovery)
6. [Color Palette Studio](#6-color-palette-studio)
7. [Planning Workspace — 9 Tabs](#7-planning-workspace--9-tabs)
8. [Guest Management — Deep Dive](#8-guest-management--deep-dive)
9. [Floor Plan Canvas — Seating Layout](#9-floor-plan-canvas--seating-layout)
10. [Excel Guest Template Integration](#10-excel-guest-template-integration)
11. [Coordinator Journey Tracker](#11-coordinator-journey-tracker)
12. [Client Presentation Mode — 15 Slides](#12-client-presentation-mode--15-slides)
13. [Data Persistence & Cloud Sync](#13-data-persistence--cloud-sync)
14. [Filipino Wedding Specifics](#14-filipino-wedding-specifics)
15. [Quick Social Media Copy](#15-quick-social-media-copy)

---

## 1. Product Overview

**Vows & Petals Coordinator Planner** is a professional, web-based wedding coordination platform for Filipino wedding coordinators. It covers the full lifecycle of a client relationship — from the very first discovery call to presenting a full proposal, managing the guest list, laying out the floor plan, and tracking the coordinator's own tasks on wedding day.

**Key facts:**
- Works in any browser — desktop, tablet, mobile
- No app download required
- Saves automatically to cloud (Firebase Firestore) when signed in
- Also saves locally (localStorage) as offline fallback
- Up to 3 free plans; paid plans for more clients
- All currency in Philippine Peso (₱)
- Built specifically for Filipino wedding culture and entourage systems

---

## 2. Authentication & Account

- **Email + password sign-up/sign-in**
- **Google OAuth sign-in** (one-click sign-in with Google account)
- Accounts are individual per coordinator
- All plan data is tied to the coordinator's account — not shared between accounts
- Session is persistent (stays signed in across browser restarts)

---

## 3. Dashboard — Multi-Client Management

The dashboard is the landing screen after sign-in. It shows all active coordination plans as cards.

**Each plan card shows:**
- Couple names (Partner 1 & Partner 2)
- Wedding date
- Status tag (Interview / Planning / Ready to Present / Approved)
- Journey progress (e.g. "Journey 12/45" — coordinator's own tasks done vs. total)
- Quick-action buttons: **Interview**, **Plan**, **Present**
- Delete button (with confirmation)

**Dashboard actions:**
- **New Plan** button — creates a blank plan, opens interview immediately
- Search/filter by status (implicit via visual scan)
- Free tier: up to 3 plans; limit banner shows when reached

---

## 4. Coordinator Profile

Before creating plans, the coordinator sets up a profile. This profile appears on the closing slide of every presentation.

**Profile fields:**
- Full Name
- Business Name
- Phone Number (PH format: +63 prefix)
- Email Address
- Facebook page URL
- Instagram handle
- Website URL

Profile is saved to Firestore and localStorage. Editable at any time via the profile icon in the topbar.

---

## 5. Client Interview — 9-Step Discovery

The interview is a structured, step-by-step questionnaire completed together with the client or independently. All answers auto-populate the planning workspace and the presentation slides — no re-typing required.

Progress is shown in a step bar at the top with step dots. Each step is numbered and named. The coordinator can jump to any step at any time.

**Step labels:** Couple · Vision · Budget · Guests · Ceremony · Reception · Vendors · Inspiration · Special

---

### Step 1 — Meet the Couple

Section: **Partner 1**
- Full Name
- Phone Number (PH format: 🇵🇭 +63 prefix + local number input)

Section: **Partner 2**
- Full Name
- Phone Number (PH format: 🇵🇭 +63 prefix + local number input)

Section: **Wedding Details**
- Wedding Date (date picker)
- Preferred Dates if Flexible (free text, e.g. "March–May 2026")
- Engagement Date (date picker)
- Best Way to Reach Them (dropdown: WhatsApp / Email / Phone Call / In-Person / Viber)

---

### Step 2 — Wedding Vision

Section: **Style, Atmosphere & Colors**
- Wedding Style (free text, e.g. "Rustic, Bohemian, Modern Classic")
- Desired Atmosphere (free text, e.g. "Intimate, Grand, Romantic")
- **Color Palette** — full interactive palette picker (see Section 6 for detail)

Section: **Priorities & Preferences**
- Top 3 Priorities (textarea)
- Must-Haves (textarea — non-negotiables)
- Traditions to Include (text, e.g. "Cultural or religious elements")
- Things to Avoid (text, e.g. "Anything they don't want")

---

### Step 3 — Budget

Section: **Budget Range**
- Total Budget (₱, number)
- Ideal Budget (₱, number)
- Maximum Budget (₱, number)

Section: **Spending Priorities**
- Willing to Splurge On (text, e.g. "Photography, Flowers, Food")
- Happy to Save On (text, e.g. "Decorations, Cake, Transportation")

---

### Step 4 — Guest Information

Section: **Guest Headcount**
- Total Guests (number)
- Adults (number)
- Children (number)

Section: **Key People**
- Immediate Family Size (number)
- Wedding Party Size (number)
- VIP / Notable Guests (textarea — names, roles, special guests to note)

---

### Step 5 — Ceremony

Section: **Setup & Format**
- Ceremony Type (dropdown: Church / Religious / Civil / Garden / Beach / Chapel / Destination / Other)
- Indoor / Outdoor (dropdown: Indoor / Outdoor / Both)
- Ceremony Time (time picker)

Section: **Venue**
- Ceremony Venue Name or Address (free text, e.g. "San Agustin Church, Intramuros")

---

### Step 6 — Reception

Section: **Venue & Setting**
- Reception Venue (name or address)
- Overall Theme (free text, e.g. "Garden Romance, Modern Minimalist")
- Seating Style (dropdown: Banquet / Cocktail / Family-style / Mixed)

Section: **Experience**
- Entertainment (free text, e.g. "Live band, DJ, String quartet")
- Food & Catering (free text, e.g. "Filipino buffet, Plated 5-course, Cocktail stations")

---

### Step 7 — Vendor Requirements

Section: **Select All That Apply**
A checkbox grid of every vendor category. Checked categories are auto-added to the Vendor Recommendations tab in the planning workspace.

**All 16 vendor categories:**
Venue · Catering · Photographer · Videographer · Florist · Decorator · Host / MC · DJ or Band · Hair & Makeup · Wedding Gown · Suit · Transportation · Cake · Photo Booth · Invitation Designer · Souvenirs

---

### Step 8 — Inspiration & Mood

Section: **Digital References**
- Pinterest Board URL
- Instagram handle or hashtag
- Sample Weddings They Love (textarea — names, photos, or descriptions)

Section: **Florals**
- Floral Inspiration (textarea — types of flowers, arrangements, density, style)

Section: **Inspiration Images**
- Direct image URLs (one per line) — these render as a visual image grid on the Mood Board presentation slide
- Tip shown: "On Pinterest, right-click an image → Copy image address to get a direct URL"
- Up to 6 images displayed in the Mood Board

---

### Step 9 — Special Requests

Section: **Special Moments**
- Surprise Performance or Proposal (text)
- Cultural or Religious Traditions (text — specific rituals, customs, or ceremonies)

Section: **Guest Needs**
- Dietary Restrictions (text — e.g. "Vegan, Halal, nut-free, allergies")
- Accessibility Requirements (text — e.g. "Wheelchair access, sign language interpreter")
- Kids Area / Play Zone (checkbox)
- Pet Participation (checkbox)
- Anything Else to Note (textarea)

---

### Interview Auto-Fill

When the interview is completed and the coordinator opens the planning workspace, the system auto-fills:
- Budget categories based on the total budget using standard percentage splits
- Vendor cards for every checked category in Step 7

No manual transfer needed.

---

## 6. Color Palette Studio

The color palette picker is embedded in Step 2 (Vision) and is one of the most visually distinct features of the product.

### Curated Palettes

**28 hand-curated palettes organized into 7 categories:**

| Category | Palettes |
|----------|----------|
| Romantic & Floral | Blush & Gold · Garden Romance · Peony Dream · Rose Garden |
| Earth & Warm Tones | Terracotta Harvest · Bohemian Earth · Desert Bloom · Warm Mocha |
| Garden & Botanical | Sage & Gold · Eucalyptus Dream · Garden Party · Forest Romance |
| Classic & Timeless | Ivory & Gold · Black Tie · Navy Elegance · White Glove |
| Soft & Dreamy | Lavender Fields · Mauve Romance · Dusty Blue · Wisteria |
| Bold & Vibrant | Fuchsia Gala · Midnight Rose · Tropical Bloom · Royal Amethyst |
| Filipino & Tropical | Sunset Philippines · Taal Vista · Sampaguita · Archipelago |

Each palette contains exactly 4 colors with named swatches (e.g. "Blush, Rose, Champagne, Gold").

### How Selection Works

**Individual color toggle (mix & match):**
- Click any single color swatch within any palette card
- The color is added to the active palette — checkmark (✓) appears on that swatch
- Click it again to remove it
- Colors from completely different categories can be combined freely
- A swatch shows as selected (highlighted ring) across every palette card where that color appears

**Batch palette toggle (click card name):**
- Click the palette card's name label to add all 4 colors at once
- Click again to remove all 4 colors at once
- Cards show a partial gold border when some colors are selected, full gold border when all 4 are selected

**Visual feedback:**
- Selected colors appear as color chips below the palette grid with the color name
- A text input field shows the comma-separated color list and can be edited manually
- Typing custom color names (not in the library) is supported

**How palette flows into the presentation:**
- The selected colors appear on the Mood Board slide as a full-width color strip (coolors.co style)
- Each color label is printed below its swatch in the strip

---

## 7. Planning Workspace — 9 Tabs

After the interview, the planning workspace has 9 tabs across the top. A **▶ Present** button and **Dashboard** button are always visible in the tab bar.

---

### Tab 1 — Summary

A read-only overview of the full wedding plan pulled from the interview. Split into two columns:

**Left column:**
- The Couple (Partner 1, Partner 2, Wedding Date, Communication preference)
- Venues (Ceremony, Reception, Ceremony Time)
- Style & Vision (Wedding Style, Atmosphere, Color Palette as swatches, Theme)
- Priorities (text from interview)

**Right column:**
- Budget (Total, Ideal, Max — all in ₱)
- Guests (Total, Adults/Children, Wedding Party)
- Ceremony (Type, Indoor/Outdoor)
- Reception (Seating Style, Entertainment, Food)
- Vendors Needed (list of checked categories from Step 7)

---

### Tab 2 — Budget

**Live budget allocation interface.**

Displays all 11 budget categories with:
- Visual horizontal bar (fills proportionally to the interview total)
- Editable number input per category (in ₱)
- Live running total at the bottom

**Budget categories and default percentage splits:**

| Category | Default % |
|----------|-----------|
| Venue & Catering | 40% |
| Photography | 10% |
| Videography | 6% |
| Decorations & Flowers | 12% |
| Entertainment | 5% |
| Attire (Gown & Suit) | 7% |
| Transportation | 2% |
| Invitations & Stationery | 2% |
| Wedding Cake | 2% |
| Miscellaneous | 4% |
| Contingency Fund | 10% |

When the interview total budget is entered, all categories auto-populate using these percentages. The coordinator can override any value.

**Total Allocated** is shown at the bottom. Remaining budget (interview total minus allocated) appears in the presentation slide.

---

### Tab 3 — Vendors

**Vendor recommendation cards** — one card per vendor, fully editable.

Each vendor card contains:
- Category (dropdown — same 16 categories as Step 7)
- Vendor Name
- Cost (₱)
- Availability (text — e.g. "Confirmed", "TBC", "Available June 12")
- Portfolio / Contact (URL or phone number)
- Pros (strengths of this vendor)
- Cons (concerns or weaknesses)
- Notes (anything else)
- Remove button

Vendors checked in Step 7 are pre-added as blank cards. The coordinator fills in names and details as they research options.

All vendor names and costs appear on the Vendor Recommendations presentation slide.

---

### Tab 4 — Timeline

**Wedding day timeline editor.**

Default events pre-loaded:
1. 06:00 — Hair & Makeup *(Bridal preparation)*
2. 09:00 — Photographer Arrives
3. 10:00 — Ceremony
4. 11:00 — Cocktail Hour
5. 12:00 — Reception Entrance
6. 12:30 — Dinner
7. 13:30 — Speeches & Toasts
8. 14:00 — First Dance
9. 14:15 — Cake Cutting
10. 17:00 — Send-off

Each event row has:
- Time input (HH:MM)
- Event name
- Optional coordinator note
- Delete button

The coordinator can add unlimited events. The presentation shows 8 events per slide and auto-paginates.

---

### Tab 5 — Checklist

**Phase-based planning checklist.**

5 pre-set phases with default tasks:

**12 Months Before:**
Set overall budget · Book ceremony & reception venue · Hire wedding coordinator · Create initial guest list · Choose wedding date

**6 Months Before:**
Book photographer & videographer · Book caterer · Book hair & makeup · Book DJ or band · Book florist · Send save-the-dates

**3 Months Before:**
Send invitations · Finalize guest list · Order wedding cake · Confirm decoration theme · Schedule dress fittings

**1 Month Before:**
Finalize seating arrangement · Confirm all vendors · Final dress & suit fitting · Prepare all payments

**1 Week Before:**
Wedding rehearsal · Confirm timeline with all vendors · Prepare tips & final payments

Each phase shows done/total count (e.g. "3/5"). Each item has a checkbox. A **+ Add Item** button at the bottom of each phase lets the coordinator add custom tasks.

---

### Tab 6 — Guest List

Full guest management — see **Section 8** for complete detail.

---

### Tab 7 — Floor Plan

Canvas-based drag-and-drop seating layout — see **Section 9** for complete detail.

---

### Tab 8 — Risks

**Contingency planning for worst-case scenarios.**

5 pre-set risk categories with textarea inputs:

1. **Rain / Weather Backup** — alternate plan if outdoor venue affected
2. **Emergency Contacts** — hospital, police, barangay, vendor emergency lines
3. **Medical Kit Plan** — location of first aid, person responsible
4. **Backup Transportation** — plan if primary transport fails
5. **Vendor No-show Backup** — replacement vendors or workarounds

Plus: **Additional Notes** textarea for anything else.

All filled fields appear on the Contingency Plan slide in the presentation. If empty, the slide shows a prompt to fill in the risks tab.

---

### Tab 9 — Journey

**Coordinator's own task tracker** — not the wedding plan, but the coordinator's personal milestones for this engagement.

See **Section 11** for the full journey detail.

---

## 8. Guest Management — Deep Dive

### Stats Bar
At the top of the Guest tab, always visible:

| Stat | Color |
|------|-------|
| Total guests | White |
| Attending | Green |
| Declined | Red |
| Entourage | Purple |
| Seated (assigned to floor plan) | Blue |
| VIP | Gold |

### Add Guest Form

A two-row grid form above the table. All fields below are captured on add — no need to open an edit modal:

**Row 1:**
- Full Name * (required)
- Phone Number (tel input)
- Email (email input)
- Entourage Role (dropdown — 19 roles)

**Row 2:**
- Seating Priority (dropdown: VIP / Priority / General)
- Meal Preference (dropdown: Standard / Vegetarian / Vegan / Halal / Kosher / Gluten-Free / Kids Meal)
- Dietary Restrictions (text)
- Notes (text)

**+ Add Guest** button spans both rows on the right.

New guests are added with RSVP status defaulted to "pending".

### Guest Table

11 columns matching the Excel template exactly:

| Column | Type | Details |
|--------|------|---------|
| # | Row number | Auto-incremented |
| Full Name | Static text | Bold, primary identifier |
| Phone Number | Static text | Shows "—" if empty |
| Email | Static text | Shows "—" if empty |
| Entourage Role | Badge | Gold-outlined badge if set |
| Seat | Badge | 🪑 + table label + seat label from floor plan |
| Seating Priority | Colored text | VIP = gold, Priority = blue, General = grey |
| Meal Preference | Inline dropdown | Editable directly in the table |
| Dietary Restrictions | Static text | Highlighted red if filled |
| RSVP | Inline dropdown | Editable directly in the table (pending / attending / declined) |
| Notes | Truncated text | Shows full text on hover |

### Edit Guest Modal

Clicking the ✏️ button opens a modal with all fields:
- Full Name
- RSVP Status
- Phone Number (PH format)
- Email Address
- Entourage Role (dropdown)
- Seating Priority (dropdown)
- Meal Preference (dropdown)
- Dietary Restrictions / Allergies
- Special Notes / Requests (textarea)

### Entourage Roles — Full List (19 roles)

1. Best Man
2. Maid of Honor
3. Groomsman
4. Bridesmaid
5. Principal Sponsor (Ninong)
6. Principal Sponsor (Ninang)
7. Secondary Sponsor – Candle
8. Secondary Sponsor – Veil
9. Secondary Sponsor – Cord
10. Flower Girl
11. Ring Bearer
12. Bible Bearer
13. Coin Bearer
14. Reader
15. Usher
16. Usherette
17. Parent of the Couple
18. Emcee / Host

*(19th role: blank / none — default)*

---

## 9. Floor Plan Canvas — Seating Layout

A real-time drag-and-drop canvas editor for laying out the reception floor plan and assigning guests to seats.

### Toolbar Items

| Button | Action |
|--------|--------|
| ⭕ Round 8 | Add round table with 8 chairs |
| ⭕ Round 6 | Add round table with 6 chairs |
| ▬ Long 10 | Add long/rectangular table with 10 chairs |
| ▬ Long 6 | Add long/rectangular table with 6 chairs |
| ★ Chair | Add a standalone free chair |
| 🎤 Stage | Add a stage element |
| 🚪 Entrance | Add an entrance marker |
| ＋ Seat | Add a chair to the currently selected table |
| 🗑 | Delete the selected item |
| ＋ / － | Zoom in / zoom out |
| Fit | Fit all furniture to canvas |

### Canvas Controls

- **Pan:** Click and drag on empty canvas space
- **Select:** Click any furniture item
- **Move:** Click and drag a selected item
- **Zoom:** Zoom buttons or scroll wheel

### Properties Panel (when item selected)

When a table or chair is selected, a properties bar appears above the canvas:

- **Label display:** Shows selected item's name
- **W (width)** and **H (height)** inputs — resize the selected item
- **Apply** button — commits the size change
- **⟳ Rotate** — rotates the selected item 45° clockwise
- **✏️ Label** — prompts to rename the table (used in seat assignments and the Seat Plan slide)

### Seat Assignment Panel (right sidebar)

A list view beside the canvas showing all tables and their chairs. Each chair row shows:
- Seat label (table name + seat position, e.g. "Round Table 1 · Chair 3")
- A **dropdown** to assign any guest from the guest list
- Assigned guests' names appear in the seat list and the Seat column of the guest table

### How seat data flows

When a guest is assigned a seat:
1. The guest's **Seat** column in the Guest tab shows the seat label (e.g. 🪑 "Bridal Table · Chair 1")
2. The **Excel template** is pre-filled with those seat labels when downloaded
3. The **Seat Plan** presentation slide groups guests by table and lists them

---

## 10. Excel Guest Template Integration

### Download Template

Button: **⬇ Download Excel Template**

If no floor plan is set up yet, a popup explains:
> "Your clients will see the actual seat labels (e.g. 'Round Table 1 · Chair 3') once the floor plan is set up. You can still download now — seat numbers will need to be assigned manually."

The downloaded Excel file has two sheets:

**Sheet 1: "Guest List"**

10 columns, pre-filled with seat labels from the floor plan (or row numbers if no floor plan):

| Column | Detail |
|--------|--------|
| Seat # | Pre-filled seat label or row number |
| Full Name | Blank — client fills this in |
| Entourage Role | Blank |
| Seating Priority | Blank |
| Meal Preference | Blank |
| Phone Number | Blank |
| Email | Blank |
| Dietary Restrictions | Blank |
| RSVP | Pre-filled as "pending" |
| Notes | Blank |

Minimum 50 rows, or the number of chairs in the floor plan — whichever is greater.

**Sheet 2: "Instructions"**

Plain text guide for the client explaining how to fill in each column, valid RSVP values, valid meal preference values, and how to return the file.

### Import Excel

Button: **⬆ Import Excel** (file picker — accepts .xlsx, .xls, .csv)

The importer:
1. Detects the "Guest List" sheet by name (falls back to first sheet)
2. Reads column headers and finds matching columns by keyword (not exact name — robust to minor label differences)
3. Imports each row as a guest record
4. Skips rows with no name
5. Matches RSVP values to valid options
6. Adds all imported guests to the plan (does not clear existing guests)

---

## 11. Coordinator Journey Tracker

The Journey tab is the coordinator's own planning checklist — separate from the wedding checklist. It tracks the coordinator's tasks across the full engagement timeline.

### 8 Phases with Pre-Loaded Tasks

**Phase 1 — Initial Consultation (12+ Months)**
- Schedule & conduct first consultation meeting *(client)*
- Understand couple's vision, style & budget *(client)*
- Present coordination packages & pricing *(client)*
- Sign coordination agreement / contract *(client)*
- Collect retainer / deposit payment *(admin)*
- Create couple's folder & save contacts *(admin)*

**Phase 2 — Venue & Priority Vendors (9–12 Months)**
- 2nd meeting: confirm venue shortlist & date *(client)*
- Contact & tour shortlisted venues *(supplier)*
- Introduce 3 photographer options *(supplier)*
- Introduce videographer options *(supplier)*
- Prepare vendor comparison document *(admin)*
- Assist couple with venue booking & contract *(supplier)*

**Phase 3 — Vendor Sourcing (6–9 Months)**
- 3rd meeting: vendor updates & decisions *(client)*
- Catering — coordinate food tasting & contract *(supplier)*
- Florist — present design brief & mood board *(supplier)*
- Hair & Makeup — coordinate trial session *(supplier)*
- Entertainment — book DJ or band *(supplier)*
- Track all supplier deposit deadlines *(admin)*
- Confirm all priority vendors signed *(admin)*

**Phase 4 — Planning Deep Dive (3–6 Months)**
- 6-month check-in meeting *(client)*
- Confirm secondary vendors (cake, photo booth, etc.) *(supplier)*
- Assist with guest list finalization *(client)*
- Coordinate invitation design & printing *(supplier)*
- Send couple monthly planning update *(admin)*

**Phase 5 — Final Preparations (1–3 Months)**
- 3-month final details meeting *(client)*
- Send detailed brief to ALL vendors *(supplier)*
- Confirm vendor arrival times & logistics *(supplier)*
- Assist with final seating arrangement *(client)*
- Prepare day-of coordination pack *(admin)*
- Coordinate rehearsal *(client)*

**Phase 6 — Final Week**
- Final vendor call & reconfirmation *(supplier)*
- Venue final walkthrough & setup check *(supplier)*
- Final coordination call with couple *(client)*
- Prepare tips & final payment envelopes *(admin)*

**Phase 7 — Wedding Day**
- Oversee venue & vendor setup *(supplier)*
- Coordinate bridal party preparation *(client)*
- Manage ceremony flow *(client)*
- Vendor check-ins throughout the day *(supplier)*
- Manage reception program & flow *(client)*
- Vendor wrap-up & payment coordination *(supplier)*

**Phase 8 — Post-Wedding**
- Post-wedding thank you & debrief with couple *(client)*
- Collect feedback from all vendors *(supplier)*
- Request couple's testimonial / review *(admin)*
- Send thank-you notes to vendor team *(supplier)*
- Archive plan & close couple's folder *(admin)*

**Total: 45 default tasks across 8 phases.**

### Task Types

Each task is color-coded by type:
- 🔵 **client** — involves the couple directly
- 🟡 **supplier** — involves vendor communication
- ⚪ **admin** — internal coordinator administration

### UI Behavior

- Each phase is collapsible (click phase header)
- Each task has a checkbox + optional notes field
- Overall progress bar at the top (e.g. "12 / 45")
- Per-phase progress shown in the phase header (e.g. "4/6")
- The Coordinator Journey presentation slide shows all 8 phases with individual progress bars

---

## 12. Client Presentation Mode — 15 Slides

Activated by the **▶ Present** button. Opens full-screen dark mode, centered on screen, navigation arrows at the bottom.

- Slide counter shown top-right (e.g. "6 / 15")
- Navigation: ← Prev / Next → buttons + keyboard arrow keys
- ✕ Exit button returns to planning workspace
- Each slide auto-scrolls to top on navigation

### Full Slide List (in order)

---

**Slide 1 — Title**
- Couple names in large serif gold font ("Ana & Ben")
- Wedding date
- Venue name
- "Wedding Coordination Proposal" tagline

---

**Slide 2 — Wedding Overview**
Two-column grid layout:

Left column:
- Wedding Style
- Atmosphere
- Theme
- Ceremony Type (with Indoor/Outdoor note)
- Ceremony Venue
- Reception Venue
- Ceremony Time
- Priorities (italic)

Right column:
- Total Guests
- Adults / Children split
- VIP Guests
- Immediate Family
- Wedding Party Size
- Food
- Entertainment
- Seating Style
- Must-Haves (italic)

---

**Slide 3 — Mood Board**
*The visual centerpiece of the presentation.*

- Full-width color palette strip at the top (coolors.co style — each color fills an equal band with its name below)
- Horizontal divider
- Two-column info section:
  - Left: Must-Haves (gold callout box), Florals, Sample Wedding References
  - Right: Pinterest link, Instagram, additional style notes
- Inspiration image grid (up to 6 images from the URLs entered in Step 8)
- Images that fail to load show a graceful error placeholder

If nothing is filled in: a guide card explains which interview steps to complete.

---

**Slide 4 — Budget Review**
- Horizontal bar chart per budget category (proportional to max value)
- Each bar shows: category label, gold fill bar, ₱ amount
- Only categories with a budget > 0 are shown
- Summary row below the bars:
  - Ideal Budget (₱)
  - Max Budget (₱)
  - Total Allocated (₱)
  - Remaining (₱) — green if positive, red if over budget

---

**Slide 5 — Vendor Recommendations** *(paginates every 6 vendors)*
- Grid of vendor cards (up to 6 per slide)
- Each card: category label, vendor name, cost in ₱, availability, pros
- Page number shown if multiple vendor slides (e.g. "Vendor Recommendations (1/2)")

---

**Slide 6 — Planning Checklist**
- Two-column layout
- All planning phases shown
- Each phase has its tasks listed with ✅ (done) or ⬜ (pending)
- Phase headers in gold

---

**Slide 7 — Wedding Day Timeline** *(paginates every 8 events)*
- List of events with time (gold, bold), event name, and optional coordinator note
- Events separated by subtle divider lines
- Page number shown if multiple timeline slides

---

**Slide 8 — Wedding Entourage** *(only shown if any guest has an entourage role)*
- Card grid grouped by role
- Each card: role label in gold caps, list of names below
- Cards displayed in a responsive auto-fill grid

---

**Slide 9 — Guest Overview** *(only shown if any guests are in the list)*
- Large stat blocks:
  - Total Invited (white)
  - Attending (green)
  - Declined (red)
  - Pending (grey)
  - VIP (gold) — shown if any
  - Entourage (gold) — shown if any
  - Seated (white) — shown if any assigned

---

**Slide 10 — Seat Plan** *(only shown if any guest is assigned to a chair)*
- Card grid organized by table name
- Each card: table name in gold caps, numbered list of assigned guests
- Unassigned guests from freestanding chairs grouped under "Other Seats"

---

**Slide 11 — Floor Plan** *(only shown if any zone description is filled)*
- Zone cards grid:
  - Ceremony, Reception, Stage, Dance Floor, Buffet, Bar, Registration, Photo Booth
  - Only zones with text are shown
- Floor plan notes shown below the grid if filled in

---

**Slide 12 — Special Requirements** *(only shown if any field is filled)*
Two-column layout:
- Left: Traditions to Include, Traditions to Avoid, Cultural/Religious notes, Surprise Performance
- Right: Dietary Restrictions, Accessibility Needs, Other Requests

---

**Slide 13 — Contingency Plan** *(always shown)*
- Two-column grid of risk cards
- Each filled card: category label in red, contingency text
- If no risks are filled: placeholder text directs coordinator to the Risks tab

---

**Slide 14 — Coordinator Journey**
- Two-column grid of journey phase cards
- Each card: phase name (gold), progress bar (fill % based on done/total), "X / Y tasks complete"
- All 8 phases displayed

---

**Slide 15 — Q&A**
- Large "Q & A" heading
- "Questions, clarifications, or additional requests?" subtitle
- "We're here to make your perfect day a reality." line

---

**Slide 16 — Thank You / Closing**
- "Thank You" heading
- Coordinator name, business name, phone, email, Facebook, Instagram, website
- Pulled from the Coordinator Profile

---

## 13. Data Persistence & Cloud Sync

### Two-layer saving

**Layer 1 — localStorage (always)**
- Key: `at_coord_plans_{uid}` (or `at_coord_plans_guest` if not signed in)
- Saves on every change synchronously
- Survives browser close/refresh
- Works fully offline

**Layer 2 — Firestore (when signed in)**
- Debounced: saves 2.5 seconds after the last change (no spam writes)
- Document path: `users/{uid}/data/coordinator`
- If both localStorage and Firestore have data when a user signs in, a conflict resolution sheet appears and the user chooses which version to keep

### Plan limits

- Free tier: up to **3 plans**
- Limit banner shown when reached with upgrade prompt
- Limit constant: `FREE_LIMIT = 3`

---

## 14. Filipino Wedding Specifics

Every part of the product was designed with Filipino weddings in mind:

| Feature | Filipino Detail |
|---------|----------------|
| Currency | Philippine Peso (₱) throughout — budget, vendors, all amounts |
| Phone format | 🇵🇭 +63 prefix on all phone inputs |
| Entourage roles | All 19 Filipino entourage roles including Ninong, Ninang, and all secondary sponsors |
| Color palettes | Dedicated "Filipino & Tropical" category: Sampaguita, Sunset Philippines, Taal Vista, Archipelago |
| Ceremony types | Church / Religious is the default option in ceremony type dropdown |
| Venue structure | Ceremony venue and reception venue are always tracked separately |
| Date format | Philippine locale (`en-PH`) — dates display as "December 12, 2026" |
| Communication | Viber is a first-class option in the communication preference dropdown alongside WhatsApp |
| Food style | Filipino buffet mentioned as example in catering field |
| Sample venues | "San Agustin Church, Intramuros" used as placeholder in ceremony venue input |

---

## 15. Quick Social Media Copy

*Ready-to-use text for captions, carousel slides, reels, or ad copy. Copy any line directly.*

---

**Feature hooks:**
- "9-step client interview → auto-filled wedding plan. Zero double entry."
- "28 curated color palettes. Mix any color from any category. Build the perfect palette for your couple."
- "Drag-and-drop floor plan → Excel seat chart auto-generated. Your client fills in the names, you import one file."
- "From first consultation to wedding day send-off — one coordinator dashboard."
- "19 Filipino entourage roles built in. Ninong, Ninang, secondary sponsors — all covered."
- "Your clients get a 15-slide full-screen presentation. You get a professional edge."
- "Track vendors, budget, guests, floor plan, contingency, and your personal journey — all in one tab."
- "Built for Filipino coordinators. Philippine Peso. Filipino entourage. Filipino traditions."
- "Present like a pro. No PowerPoint. No prep. Just open the app."
- "45 pre-loaded coordinator tasks across 8 planning phases. From first consultation to post-wedding debrief."

---

**Pain point angles:**
- "Tired of spreadsheets scattered across Google Drive? One login. Every client. Everything."
- "Stop re-typing. Your client interview auto-populates the proposal, the presentation, and the Excel template."
- "No more forgetting who's Ninong and who's a secondary sponsor. Every role, every name, one screen."
- "What if your floor plan already knew which seat each guest was in? Now it does."
- "Your clients see a full-color presentation with their exact palette, their vendors, their seat plan. First meeting. Done."

---

**Stats for ads:**
- 9 interview steps
- 9 planning tabs
- 15 presentation slides
- 28 curated color palettes across 7 categories
- 19 Filipino entourage roles
- 16 vendor categories
- 45 coordinator journey tasks across 8 phases
- 11 guest fields (matching Excel)
- 4 table types (Round 8, Round 6, Long 10, Long 6)
- 5 contingency plan categories
- 0 app downloads required — works in any browser

---

**Call-to-action options:**
- "Sign up free — manage up to 3 clients at no cost."
- "Free to start. Professional from day one."
- "Try it for your next client. First 3 plans, free."

---

*Last updated: July 2026 — reflects the live coordinator.html application.*
