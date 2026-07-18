# EduSphere (سفينة المستقبل التعليمية)

EduSphere is an all-in-one digital eco-system designed for tech students to organize teams, track progress milestones, test logic inside a debugging terminal, and present their engineering achievements to evaluators. It features a Cyberpunk-inspired dark tech theme, fluid dual-language switches (English LTR and Arabic RTL), performance-optimized 3D card tilt transformations, and a secure grading panel with confetti achievements.

## Key Features

1. **Dual-Language Layout (Arabic RTL & English LTR)**
   - Header switcher toggles document direction (`dir="rtl"` / `dir="ltr"`), alignments, margins, and active fonts (Outfit for English, Tajawal for Arabic) dynamically.

2. **Performance Optimized 3D Hover Tilts**
   - Interactive elements employ optimized JavaScript tracking coupled with `requestAnimationFrame` and `will-change` hardware acceleration properties to sustain 60 FPS scroll updates.

3. **Secure Evaluator Access**
   - The grading portal features role verification checking (`x-user-role` headers) to restrict unauthorized commits. Slider scores (1-10) display active color gradients (Red -> Yellow -> Green).

4. **Thread-Safe local JSON Fallback**
   - To make it portable out-of-the-box, the backend server implements an asynchronous promise queue for file operations, preventing simultaneous race write condition corruption.

5. **Breathtaking Achievements**
   - Committing a grade triggers an immersive, CPU-optimized canvas particle explosion representing academic success.

6. **Embedded Static Debugger**
   - Students can scan code blocks to diagnose logical memory leaks, scope misalignments, or syntax elements with diagnostic feedback.

---

## Tech Stack & Architecture

- **Front-End**: Semantic HTML5, Vanilla CSS3 (Variables, Flexbox, Custom Grid, Keyframe animations), Vanilla JS (ES6+ Modules, HTML5 Canvas API).
- **Back-End**: Node.js + Express.js REST API.
- **Database**: Mongoose schemas configured for production deployment alongside local thread-safe JSON storage fallback for instant local evaluation.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)

### Installation

1. Navigate to the project root directory:
   ```bash
   cd edusphere
   ```

2. Install Express and Mongoose dependencies:
   ```bash
   npm install
   ```

### Execution

1. Start the local server:
   ```bash
   npm start
   ```

2. Open your web browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

---

## Mock Access Credentials

For testing and demonstration, use the following preset accounts:

### 1. Student Mode
- **Email**: `anas@edusphere.edu`
- **Password**: `password123`

### 2. Evaluator Mode
- **Email**: `tariq@edusphere.edu`
- **Password**: `evaluator123`
