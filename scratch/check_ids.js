const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const ids = [
  'auth-name','auth-email','auth-password','auth-student-id','auth-major',
  'auth-submit-btn','auth-btn-text','auth-toggle-link','student-only-fields',
  'auth-name-group','auth-form-title','auth-form','header-avatar',
  'header-username','header-userrole','notif-badge','notif-list',
  'logout-btn','dashboard-loader','dashboard-main-content',
  'video-lightbox','lightbox-video','digital-clock','lang-toggle-btn',
  'dash-checklist','confetti-canvas'
];
ids.forEach(id => {
  const found = html.includes(`id="${id}"`);
  console.log(`${found ? '✅' : '❌'} ${id}`);
});
