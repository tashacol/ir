<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تربیت مربی نوجوان</title>
  <!-- لینک فونت مدرن -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <!-- کتابخانه XLSX برای خواندن فایل اکسل -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <style>
    :root {
      --primary-color: #ecf0f1;          /* رنگ متن اصلی */
      --secondary-color: #bdc3c7;        /* رنگ ثانویه */
      --accent-color: #1abc9c;           /* رنگ تاکید (فیروزه‌ای) */
      --bg-gradient: linear-gradient(135deg, #34495e, #2c3e50);
      --header-bg: linear-gradient(135deg, #2980b9, #2c3e50);
      --button-gradient: linear-gradient(135deg, #2c3e50, #2980b9);
      --modal-bg: #ecf0f1;               /* پس‌زمینه مدال (روشن) */
      --bg-color: #2c3e50;               /* رنگ پس‌زمینه اصلی */
      --input-border: #7f8c8d;
      --shadow-color: rgba(0, 0, 0, 0.3);
      --transition-speed: 0.3s;
      --border-radius: 12px;
    }
    /* Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Roboto', sans-serif;
      background: var(--bg-color);
      color: var(--primary-color);
      direction: rtl;
      text-align: right;
      line-height: 1.6;
      overflow-x: hidden;
      min-height: 100vh;
      padding-bottom: 40px;
    }
    /* هدر مدرن و سه‌بعدی */
    header {
      background: var(--header-bg);
      padding: 40px 20px;
      text-align: center;
      box-shadow: 0 10px 20px var(--shadow-color);
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      margin-bottom: 20px;
    }
    header h1 {
      font-size: 3em;
      color: var(--primary-color);
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
    }
    header p {
      font-size: 1.2em;
      color: var(--secondary-color);
    }
    /* ناوبری مدرن با فاصله مناسب */
    nav {
      background: var(--bg-gradient);
      margin: 0 auto 20px auto;
      border-radius: var(--border-radius);
      box-shadow: 0 8px 16px var(--shadow-color);
      max-width: 1000px;
      overflow: hidden;
      padding: 15px 30px;
      transition: box-shadow var(--transition-speed);
    }
    nav:hover {
      box-shadow: 0 10px 20px var(--shadow-color);
    }
    nav ul {
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    nav ul li {
      margin: 15px 25px;
    }
    nav ul li a {
      text-decoration: none;
      color: var(--primary-color);
      font-size: 1.1em;
      padding: 12px 20px;
      border-radius: var(--border-radius);
      background: var(--button-gradient);
      transition: background var(--transition-speed), transform var(--transition-speed);
      box-shadow: 0 4px 8px var(--shadow-color);
    }
    nav ul li a:hover {
      background: var(--accent-color);
      transform: translateY(-4px);
    }
    /* بخش ترم‌ها با کارت‌های سه‌بعدی؛ پس‌زمینه کارت‌ها کمی متفاوت است */
    #termSection {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
      margin: 30px auto;
      max-width: 1200px;
      padding: 0 15px;
    }
    .term-card {
      background: #34495e;
      border-radius: var(--border-radius);
      box-shadow: 0 8px 16px var(--shadow-color);
      width: 300px;
      padding: 20px;
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
      position: relative;
      perspective: 1000px;
    }
    .term-card:hover {
      transform: translateY(-10px) rotateY(5deg);
      box-shadow: 0 12px 24px var(--shadow-color);
    }
    .term-card h3 {
      color: var(--accent-color);
      margin-bottom: 15px;
      text-align: center;
      font-size: 1.8em;
    }
    .term-card p {
      text-align: center;
      margin-bottom: 15px;
      color: var(--primary-color);
    }
    .term-actions {
      display: flex;
      justify-content: space-around;
      margin-bottom: 15px;
    }
    .term-actions button {
      background: var(--button-gradient);
      border: none;
      padding: 10px 15px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
      color: var(--primary-color);
      font-weight: bold;
      box-shadow: 0 4px 8px var(--shadow-color);
    }
    .term-actions button:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px var(--shadow-color);
    }
    .summary-btn {
      background: linear-gradient(135deg, var(--accent-color), #16a085);
      border: none;
      color: var(--primary-color);
      padding: 12px 15px;
      border-radius: var(--border-radius);
      cursor: pointer;
      width: 100%;
      margin-top: 10px;
      font-size: 1em;
      transition: background var(--transition-speed), transform var(--transition-speed);
      box-shadow: 0 4px 8px var(--shadow-color);
    }
    .summary-btn:hover {
      background: linear-gradient(135deg, #16a085, var(--accent-color));
      transform: translateY(-4px);
    }
    /* مدال‌ها و پاپ‌آپ‌ها */
    .modal {
      display: none;
      position: fixed;
      z-index: 10000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      animation: modalFadeIn var(--transition-speed) ease-out;
      overflow-y: auto;
      padding: 20px;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal-content {
      background: var(--modal-bg);
      margin: 5% auto;
      padding: 30px;
      width: 90%;
      max-width: 500px;
      border-radius: calc(var(--border-radius) * 1.2);
      position: relative;
      animation: slideIn var(--transition-speed) ease-out;
      box-shadow: 0 8px 16px var(--shadow-color);
    }
    @keyframes slideIn {
      from { transform: translateY(-40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .modal-content h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 2em;
      color: #2c3e50;
    }
    .modal-content p {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .modal-content input {
      width: 100%;
      padding: 14px;
      margin: 15px 0;
      border: 1px solid var(--input-border);
      border-radius: var(--border-radius);
      font-size: 1em;
      background: #fff;
      color: #2c3e50;
      transition: border-color var(--transition-speed);
    }
    .modal-content input:focus {
      border-color: var(--accent-color);
      outline: none;
    }
    .modal-content button {
      width: 100%;
      padding: 14px;
      background: var(--button-gradient);
      border: none;
      color: var(--primary-color);
      font-size: 1.1em;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background var(--transition-speed), transform var(--transition-speed);
      box-shadow: 0 4px 8px var(--shadow-color);
    }
    .modal-content button:hover {
      background: var(--accent-color);
      transform: translateY(-3px);
    }
    /* دکمه بستن مدال (دایره قرمز سه‌بعدی با ضربدر سفید) */
    .close, .alert-close {
      position: absolute;
      top: 15px;
      width: 40px;
      height: 40px;
      background: #e74c3c;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      transition: transform 0.3s;
      z-index: 1000;
    }
    /* قرارگیری دکمه بستن در مدال‌های ویدئو و PDF در گوشه سمت راست */
    .video-modal-content .close, .pdf-modal-content .close {
      right: 15px;
      left: auto;
    }
    .close:hover, .alert-close:hover {
      transform: scale(1.1);
    }
    /* استایل مدال پاپ‌آپ Alert */
    .alert-modal-content {
      max-width: 400px;
      text-align: center;
    }
    .alert-modal-content button {
      background: var(--button-gradient);
      border: none;
      color: var(--primary-color);
      padding: 10px 20px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: transform var(--transition-speed);
      box-shadow: 0 4px 8px var(--shadow-color);
      margin-top: 15px;
    }
    .alert-modal-content button:hover {
      transform: translateY(-3px);
    }
    /* نوار زمان باقی مانده درخواست گواهی */
    #certificateCountdown {
      background: var(--accent-color);
      color: var(--primary-color);
      padding: 12px 20px;
      border-radius: var(--border-radius);
      max-width: 600px;
      margin: 20px auto;
      box-shadow: 0 4px 8px var(--shadow-color);
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
    }
    /* رسپانسیو */
    @media (max-width: 600px) {
      nav ul li {
        margin: 8px 10px;
      }
      .term-card {
        width: 90%;
      }
      header h1 {
        font-size: 2.2em;
      }
      nav, #termSection {
        padding: 0 15px;
      }
    }
    /* تنظیم فاصله بیشتر برای چیدمان چک‌باکس "از سیستم خارج نشوید" */
    .remember-container {
      margin: 15px 0;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 8px;
    }
  </style>
</head>
<body>
  <!-- مدال ورود (صفحه ورود به سیستم) -->
  <div id="loginModal" class="modal" style="display: block;">
    <div class="modal-content">
      <h2>ورود به سیستم</h2>
      <p>کدملی</p>
      <input type="text" id="nationalCodeInput" placeholder="کد ملی" />
      <div class="remember-container">
        <input type="checkbox" id="rememberMe" style="transform: scale(1.3);" />
        <label for="rememberMe" style="font-size: 1em; color: #2c3e50;">از سیستم خارج نشوید</label>
      </div>
      <button id="verifyButton">ورود</button>
    </div>
  </div>

  <!-- داشبورد (صفحه اصلی دوره) -->
  <div id="dashboard" style="display: none;">
    <header>
      <div class="header-content">
        <h1 id="courseName">نام دوره</h1>
        <p id="courseId">شناسه دوره: ...</p>
        <p id="courseDates">تاریخ شروع: ... | تاریخ پایان: ...</p>
        <p id="certificatePeriod">درخواست گواهی: از ... تا ...</p>
        <h2 id="welcomeMessage"></h2>
        <p id="registrationMessage" style="color: #f1c40f; font-weight: bold;"></p>
      </div>
    </header>
    <nav>
      <ul>
        <li id="navTerms"><a href="#termSection">ترم‌ها</a></li>
        <li id="navSummary"><a href="send_summary.html">ارسال خلاصه</a></li>
        <li><a id="certificateRequestBtn" href="#" style="display: none;">درخواست گواهی</a></li>
      </ul>
    </nav>
    <!-- نوار زمان باقی مانده درخواست گواهی -->
    <div id="certificateCountdown"></div>
    <section id="termSection"></section>
  </div>

  <!-- مدال ویدئو -->
  <div id="videoModal" class="modal">
    <div class="modal-content video-modal-content">
      <span class="close" id="closeVideoModal">&times;</span>
      <video controls id="termVideo" style="width: 100%; border-radius: var(--border-radius);">
        <source src="" type="video/mp4">
        مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
      </video>
    </div>
  </div>

  <!-- مدال PDF (جزوه) -->
  <div id="pdfModal" class="modal">
    <div class="modal-content pdf-modal-content">
      <span class="close" id="closePdfModal">&times;</span>
      <iframe id="pdfViewer" src="" width="100%" height="500px" style="border: none; border-radius: var(--border-radius);"></iframe>
    </div>
  </div>

  <!-- مدال پاپ‌آپ Alert برای نمایش پیام‌ها -->
  <div id="alertModal" class="modal">
    <div class="modal-content alert-modal-content">
      <span class="alert-close" id="closeAlertModal">&times;</span>
      <p id="alertMessage" style="font-size: 1.2em; color: #2c3e50;"></p>
      <button id="alertOkBtn">باشه</button>
    </div>
  </div>

  <script>
    /***************** تنظیمات اولیه و متغیرهای سراسری *****************/
    let registeredUsers = []; // اطلاعات ثبت‌نام شده از اکسل
    let currentUser = null;   // اطلاعات کاربر وارد شده

    // اطلاعات دوره (که از اکسل گرفته می‌شود)
    let courseName = "";
    let courseId = "";
    let courseStartDateStr = ""; // رشته تاریخ شروع به صورت شمسی (مثلاً "1403/01/19")
    let courseStartDate;         // تاریخ شروع به عنوان شی Date (پس از تبدیل)
    let courseEndDate;           // پایان دوره: 56 روز پس از شروع
    let certificateDeadline;     // مهلت درخواست گواهی: 15 روز پس از پایان دوره

    /***************** توابع تبدیل تاریخ *****************/
    function jalaliToGregorian(jy, jm, jd) {
      let gy;
      if(jy > 979){
          gy = 1600;
          jy -= 979;
      } else {
          gy = 621;
      }
      let days = (365 * jy) + Math.floor(jy/33)*8 + Math.floor((jy % 33 + 3) / 4) + 78 + jd + ((jm < 7) ? ((jm - 1) * 31) : (((jm - 7) * 30) + 186));
      gy += 400 * Math.floor(days / 146097);
      days %= 146097;
      if(days > 36524){
          gy += 100 * Math.floor((--days) / 36524);
          days %= 36524;
          if(days >= 365) days++;
      }
      gy += Math.floor(days / 365);
      days %= 365;
      let leap = ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0));
      let sal_a = [0, 31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let gm;
      for(gm = 0; gm < 13; gm++){
          if(days < sal_a[gm]) break;
          days -= sal_a[gm];
      }
      let gd = days + 1;
      return [gy, gm, gd];
    }
    
    // تبدیل تاریخ شمسی به میلادی
    function parseJalaliDate(jalaliStr) {
      let parts = jalaliStr.split("/");
      if(parts.length !== 3) return null;
      let jy = parseInt(parts[0]);
      let jm = parseInt(parts[1]);
      let jd = parseInt(parts[2]);
      let g = jalaliToGregorian(jy, jm, jd);
      return new Date(g[0], g[1] - 1, g[2]);
    }
    
    // فرمت خروجی تاریخ به صورت شمسی
    function formatDatePersian(date) {
      return date.toLocaleDateString("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" });
    }
    
    /***************** درج اطلاعات دوره در هدر *****************/
    function populateCourseHeader() {
      document.getElementById("courseName").innerText = courseName;
      document.getElementById("courseId").innerText = "شناسه دوره: " + courseId;
      document.getElementById("courseDates").innerText = "تاریخ شروع: " + formatDatePersian(courseStartDate) + " | تاریخ پایان: " + formatDatePersian(courseEndDate);
      document.getElementById("certificatePeriod").innerText = "درخواست گواهی: از " + formatDatePersian(courseEndDate) + " تا " + formatDatePersian(certificateDeadline);
    }
    
    /***************** ایجاد کارت‌های ترم (8 ترم) *****************/
    function generateTermCards() {
      const termSection = document.getElementById("termSection");
      termSection.innerHTML = "";
      const now = new Date();
      
      // اگر دوره در حال برگزاری باشد (بین تاریخ شروع و پایان)
      if(now >= courseStartDate && now <= courseEndDate) {
        for(let i = 0; i < 8; i++){
          let termNumber = i + 1;
          let termStart = new Date(courseStartDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
          
          let card = document.createElement("div");
          card.className = "term-card";
          
          let title = document.createElement("h3");
          title.innerText = "ترم " + termNumber;
          // اگر ترم هنوز فعال نباشد، آیکون قفل اضافه شود
          if(now < termStart) {
            let lockIcon = document.createElement("span");
            lockIcon.innerText = " 🔒";
            title.appendChild(lockIcon);
          }
          card.appendChild(title);
          
          let termDateInfo = document.createElement("p");
          termDateInfo.innerText = "شروع: " + formatDatePersian(termStart);
          card.appendChild(termDateInfo);
          
          // بررسی فعال بودن ترم (زمان فعلی >= تاریخ شروع ترم)
          let isTermActive = now >= termStart;
          
          // دکمه‌های مشاهده ویدئو و جزوه
          let actionsDiv = document.createElement("div");
          actionsDiv.className = "term-actions";
          
          let videoBtn = document.createElement("button");
          videoBtn.innerText = "مشاهده ویدئو";
          videoBtn.disabled = !isTermActive;
          videoBtn.addEventListener("click", function() {
            openVideoModal(termNumber);
          });
          actionsDiv.appendChild(videoBtn);
          
          let pdfBtn = document.createElement("button");
          pdfBtn.innerText = "مشاهده جزوه";
          pdfBtn.disabled = !isTermActive;
          pdfBtn.addEventListener("click", function() {
            openPdfModal(termNumber);
          });
          actionsDiv.appendChild(pdfBtn);
          
          card.appendChild(actionsDiv);
          
          // دکمه ارسال خلاصه داخل کارت ترم
          let summaryBtn = document.createElement("button");
          summaryBtn.className = "summary-btn";
          summaryBtn.innerText = "ارسال خلاصه";
          summaryBtn.disabled = !isTermActive;
          summaryBtn.addEventListener("click", function() {
            window.location.href = "send_summary.html?term=" + termNumber;
          });
          card.appendChild(summaryBtn);
          
          termSection.appendChild(card);
        }
      }
      // اگر زمان کمتر از تاریخ شروع دوره (ترم‌ها قفل هستند)
      else if(now < courseStartDate) {
        let msg = document.createElement("p");
        msg.style.textAlign = "center";
        msg.style.fontSize = "1.2em";
        msg.style.color = "#ecf0f1";
        msg.innerText = "تمامی ترم‌ها در حال حاضر قفل هستند.";
        termSection.appendChild(msg);
        for(let i = 0; i < 8; i++){
          let termNumber = i + 1;
          let card = document.createElement("div");
          card.className = "term-card";
          let title = document.createElement("h3");
          title.innerText = "ترم " + termNumber + " 🔒";
          card.appendChild(title);
          termSection.appendChild(card);
        }
      }
    }
    
    /***************** بروزرسانی دکمه درخواست گواهی و نوار ناوبری *****************/
    function updateCertificateButton() {
      const now = new Date();
      const certBtn = document.getElementById("certificateRequestBtn");
      const navTerms = document.getElementById("navTerms");
      const navSummary = document.getElementById("navSummary");
      const certificateCountdown = document.getElementById("certificateCountdown");
      
      // در زمان درخواست گواهی (بعد از پایان دوره و قبل از مهلت درخواست گواهی)
      if(now > courseEndDate && now <= certificateDeadline) {
        certBtn.style.display = "inline-block";
        navTerms.style.display = "none";
        navSummary.style.display = "none";
        certBtn.addEventListener("click", function(e) {
          e.preventDefault();
          showAlert("درخواست گواهی ارسال شد!");
        });
        // محاسبه زمان باقی مانده (به روز)
        let remainingTime = certificateDeadline - now;
        let remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
        certificateCountdown.style.display = "block";
        certificateCountdown.innerText = "لطفا درخواست گواهی را ثبت کنید، درخواست گواهی فقط تا " + remainingDays + " روز دیگر ممکن است...";
      } else {
        certBtn.style.display = "none";
        navTerms.style.display = "inline-block";
        certificateCountdown.style.display = "none";
        if(now < courseStartDate) {
          navSummary.style.display = "none";
        } else {
          navSummary.style.display = "inline-block";
        }
      }
      
      // پس از مهلت درخواست گواهی (زمان > certificateDeadline)
      if(now > certificateDeadline) {
        const termSection = document.getElementById("termSection");
        termSection.innerHTML = "";
        let msg = document.createElement("p");
        msg.style.textAlign = "center";
        msg.style.fontSize = "1.2em";
        msg.style.color = "#ecf0f1";
        msg.innerText = "دوره به طور کامل در تاریخ " + formatDatePersian(certificateDeadline) + " به پایان رسیده است.";
        termSection.appendChild(msg);
      }
    }
    
    /***************** مدال‌های ویدئو و PDF *****************/
    function openVideoModal(termNumber) {
      const videoSrc = "sample_video_term" + termNumber + ".mp4";
      const videoElement = document.getElementById("termVideo");
      videoElement.querySelector("source").src = videoSrc;
      videoElement.load();
      document.getElementById("videoModal").style.display = "block";
    }
    
    function openPdfModal(termNumber) {
      const pdfSrc = "sample_booklet_term" + termNumber + ".pdf";
      document.getElementById("pdfViewer").src = pdfSrc;
      document.getElementById("pdfModal").style.display = "block";
    }
    
    document.getElementById("closeVideoModal").addEventListener("click", function() {
      document.getElementById("videoModal").style.display = "none";
    });
    document.getElementById("closePdfModal").addEventListener("click", function() {
      document.getElementById("pdfModal").style.display = "none";
    });
    document.getElementById("closeAlertModal").addEventListener("click", function() {
      document.getElementById("alertModal").style.display = "none";
    });
    document.getElementById("alertOkBtn").addEventListener("click", function() {
      document.getElementById("alertModal").style.display = "none";
    });
    window.addEventListener("click", function(event) {
      if(event.target == document.getElementById("videoModal")){
        document.getElementById("videoModal").style.display = "none";
      }
      if(event.target == document.getElementById("pdfModal")){
        document.getElementById("pdfModal").style.display = "none";
      }
      if(event.target == document.getElementById("alertModal")){
        document.getElementById("alertModal").style.display = "none";
      }
    });
    
    /***************** تابع نمایش پیام به صورت پاپ‌آپ Alert *****************/
    function showAlert(message) {
      document.getElementById("alertMessage").innerText = message;
      document.getElementById("alertModal").style.display = "block";
    }
    
    /***************** بارگذاری اطلاعات ثبت‌نام شده از اکسل *****************/
    function loadRegisteredUsers() {
      fetch("https://docs.google.com/spreadsheets/d/1QSRAGajWtCWHJHsU-u4dRW85nq2hCGySKqtZQL0iTjY/export?format=xlsx")
      .then(response => response.arrayBuffer())
      .then(data => {
        let workbook = XLSX.read(data, { type: "array" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if(jsonData.length > 0) {
          // اطلاعات دوره از ردیف دوم (در صورت موجود بودن) گرفته می‌شود
          let dataRow = jsonData[1] ? jsonData[1] : jsonData[0];
          courseName = dataRow[2] || "نام دوره";
          courseId = dataRow[3] || "";
          courseStartDateStr = dataRow[4] || "";
          
          if(courseId === "" || courseId === null) {
            showAlert("دوره‌ای در حال برگزاری نیست.");
            return;
          }
          
          // تبدیل رشته تاریخ شروع (شمسی) به شی Date میلادی
          courseStartDate = parseJalaliDate(courseStartDateStr);
          // محاسبه پایان دوره (56 روز پس از شروع)
          courseEndDate = new Date(courseStartDate.getTime() + 56 * 24 * 60 * 60 * 1000);
          // مهلت درخواست گواهی: 15 روز پس از پایان دوره
          certificateDeadline = new Date(courseEndDate.getTime() + 15 * 24 * 60 * 60 * 1000);
          
          jsonData.shift();
          registeredUsers = jsonData;
          console.log("Registered Users:", registeredUsers);
          // بررسی ورود خودکار در صورت فعال بودن گزینه "از سیستم خارج نشوید"
          checkRememberMe();
        }
      })
      .catch(error => {
        console.error("Error loading registered users:", error);
        showAlert("خطا در بارگذاری اطلاعات ثبت‌نام شده.");
      });
    }
    
    /***************** اعتبارسنجی کد ملی کاربر *****************/
    document.getElementById("verifyButton").addEventListener("click", function() {
      const inputCode = document.getElementById("nationalCodeInput").value.trim();
      let found = false;
      for(let i = 0; i < registeredUsers.length; i++){
        if(registeredUsers[i][1] && registeredUsers[i][1].toString() === inputCode){
          currentUser = registeredUsers[i];
          found = true;
          break;
        }
      }
      if(!found) {
        showAlert("شما در دوره ثبت نام نکرده‌اید.");
        return;
      }
      
      let now = new Date();
      let registrationOpenDate = new Date(courseStartDate.getTime() - 5 * 24 * 60 * 60 * 1000);
      // اگر دوره هنوز در وضعیت ثبت‌نام باشد، پیام مناسب نمایش داده می‌شود
      if(now < registrationOpenDate) {
        showAlert("دوره در وضعیت ثبت‌نام می‌باشد. حساب فراگیران در تاریخ " + formatDatePersian(courseStartDate) + " فعال می‌شود.");
        return;
      }
      
      // در صورت تیک بودن گزینه "از سیستم خارج نشوید"، ورود در لوکال ذخیره می‌شود
      if(document.getElementById("rememberMe").checked){
        localStorage.setItem("rememberMe", JSON.stringify({
          timestamp: Date.now(),
          nationalCode: inputCode
        }));
      }
      
      document.getElementById("welcomeMessage").innerText = "خوش آمدید، " + currentUser[0];
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      populateCourseHeader();
      generateTermCards();
      updateCertificateButton();
    });
    
    /***************** بررسی ورود خودکار (در صورت تیک بودن گزینه "از سیستم خارج نشوید") *****************/
    function checkRememberMe() {
      const rememberData = localStorage.getItem("rememberMe");
      if (rememberData) {
        try {
          const data = JSON.parse(rememberData);
          if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            for (let i = 0; i < registeredUsers.length; i++) {
              if (registeredUsers[i][1] && registeredUsers[i][1].toString() === data.nationalCode) {
                currentUser = registeredUsers[i];
                document.getElementById("welcomeMessage").innerText = "خوش آمدید، " + currentUser[0];
                document.getElementById("loginModal").style.display = "none";
                document.getElementById("dashboard").style.display = "block";
                populateCourseHeader();
                generateTermCards();
                updateCertificateButton();
                break;
              }
            }
          } else {
            localStorage.removeItem("rememberMe");
          }
        } catch(e) {
          console.error("Error parsing rememberMe data:", e);
          localStorage.removeItem("rememberMe");
        }
      }
    }
    
    // فراخوانی اولیه برای بارگذاری اطلاعات ثبت‌نام شده
    loadRegisteredUsers();
  </script>
</body>
</html>
