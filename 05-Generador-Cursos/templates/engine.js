// ============================================
// MOTOR DE CURSOS - PLATAFORMA DE FORMACION DE ADULTOS ASC
// Este archivo es generado automaticamente por build-course.js
// Las variables COURSE_CONFIG y QUIZ_ANSWERS son inyectadas por el builder
// ============================================

// --- Variables globales ---
let currentModule = 0;
let moduleProgress = [];
let quizScores = [];
let startTime = new Date();
let studyTime = 0;
let sessionStartTime = null;
let reflections = {};
let photos = {};
let selfAssessments = {};
let personalPlans = {};
let practicesCatalogs = {};
let userProfile = {};

// --- Inicializacion ---
window.addEventListener('DOMContentLoaded', function () {
    moduleProgress = new Array(COURSE_CONFIG.totalModules).fill(false);
    sessionStartTime = new Date();
    shuffleQuizOptions();
    loadProgress();
    prefillFromGlobalProfile();
    updateElapsedTime();
    renderCatalogDisplays();
    renderBrujulaDisplays();
    renderBrujulaActions();
    renderCoursesSuggestions();
    renderGoalPlanners();
});

window.addEventListener('beforeunload', function () {
    saveProgress();
});

// --- Registro ---
function handleRegistration(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    userProfile = {
        fullName: formData.get('fullName'),
        age: formData.get('age'),
        group: formData.get('group'),
        region: formData.get('region'),
        email: formData.get('email'),
        motivation: formData.get('motivation'),
        registrationDate: new Date().toISOString()
    };
    if (!userProfile.fullName || userProfile.fullName.trim() === '') {
        showNotification('⚠️ El nombre es requerido', 'warning');
        return;
    }
    saveProgress();
    saveGlobalUserProfile(userProfile);
    sendToGoogleSheets({ action: 'register', ...userProfile });
    showModule(1);
    var firstName = userProfile.fullName.split(' ')[0];
    var welcomeEl = document.getElementById('welcomeName');
    if (welcomeEl) welcomeEl.textContent = firstName;
    showNotification('¡Bienvenido/a ' + firstName + '! 🎉');
}

// --- Perfil global cross-course (autollenado) ---
function saveGlobalUserProfile(profile) {
    try {
        // Persist only the reusable fields (no per-course state)
        var reusable = {
            fullName: profile.fullName, age: profile.age, group: profile.group,
            region: profile.region, email: profile.email, motivation: profile.motivation,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('globalUserProfile', JSON.stringify(reusable));
    } catch (e) { /* ignore */ }
}

function prefillFromGlobalProfile() {
    // Skip if user already registered for this specific course
    if (userProfile && userProfile.fullName) return;
    var raw;
    try { raw = localStorage.getItem('globalUserProfile'); } catch (e) { return; }
    if (!raw) return;
    var profile;
    try { profile = JSON.parse(raw); } catch (e) { return; }
    if (!profile || !profile.fullName) return;
    var fields = ['fullName', 'age', 'group', 'region', 'email', 'motivation'];
    var filled = 0;
    fields.forEach(function (id) {
        var input = document.getElementById(id);
        if (input && profile[id]) {
            input.value = profile[id];
            filled++;
        }
    });
    if (filled === 0) return;
    // Insert banner above the form
    var form = document.querySelector('#module-0 form');
    if (form && !document.getElementById('prefill-banner')) {
        var firstName = (profile.fullName || '').split(' ')[0] || 'Adulto';
        var banner = document.createElement('div');
        banner.id = 'prefill-banner';
        banner.className = 'prefill-banner';
        banner.innerHTML =
            '<div class="prefill-banner-content">' +
                '<span class="prefill-banner-icon">✨</span>' +
                '<div>' +
                    '<strong>Hola ' + escapePrefillHtml(firstName) + '. Tus datos están pre-cargados</strong> de un curso anterior.<br>' +
                    '<span class="prefill-banner-hint">Edita lo que haya cambiado o continúa directo.</span>' +
                '</div>' +
                '<button type="button" class="prefill-banner-clear" onclick="clearPrefill()" title="Limpiar y empezar de cero">Limpiar</button>' +
            '</div>';
        form.parentNode.insertBefore(banner, form);
    }
}

function clearPrefill() {
    var fields = ['fullName', 'age', 'group', 'region', 'email', 'motivation'];
    fields.forEach(function (id) {
        var input = document.getElementById(id);
        if (input) input.value = '';
    });
    var banner = document.getElementById('prefill-banner');
    if (banner) banner.remove();
    var fn = document.getElementById('fullName');
    if (fn) fn.focus();
}

function escapePrefillHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

// --- Navegacion de modulos ---
function showModule(moduleIndex) {
    moduleIndex = parseInt(moduleIndex);
    if (moduleIndex > 0 && (!userProfile || !userProfile.fullName)) {
        showNotification('⚠️ Debes completar el registro primero', 'warning');
        return;
    }
    // Pause and unload videos in the previously active module to free memory
    document.querySelectorAll('.module.active video[data-src]').forEach(function (v) {
        try { v.pause(); } catch (e) {}
        if (v.src) { v.removeAttribute('src'); v.load(); }
    });
    document.querySelectorAll('.module').forEach(function (m) { m.classList.remove('active'); });
    var target = document.getElementById('module-' + moduleIndex);
    if (target) {
        target.classList.add('active');
        // Lazy-load videos in the now-active module: copy data-src to src
        target.querySelectorAll('video[data-src]').forEach(function (v) {
            if (!v.src) { v.src = v.getAttribute('data-src'); }
        });
    }

    document.querySelectorAll('.nav-btn').forEach(function (btn, index) {
        btn.classList.remove('active');
        if (index === moduleIndex) btn.classList.add('active');
    });

    var mobileSelect = document.querySelector('.mobile-nav select');
    if (mobileSelect) mobileSelect.value = moduleIndex;

    currentModule = moduleIndex;

    if (moduleIndex === COURSE_CONFIG.totalModules - 1) {
        generateCertificate();
    }
    updateProgress();
    saveProgress();
    window.scrollTo(0, 0);
}

// --- Sistema de evaluaciones ---
function selectOption(element, optionIndex) {
    var question = element.closest('.question');
    // Limpiar marcas previas (selected, correct, incorrect) de TODAS las opciones de la pregunta:
    // permite reintentar sin que queden colores fantasma de un intento anterior.
    question.querySelectorAll('.option').forEach(function (opt) {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    element.classList.add('selected');
    element.setAttribute('data-selected-index', optionIndex);
    // Si el boton "Verificar" estaba oculto tras un fallo, lo restauramos en cuanto el usuario cambia de opcion.
    var quizContainer = element.closest('.quiz-container');
    if (quizContainer) {
        var checkBtn = quizContainer.querySelector('[id^="checkBtn-"]');
        if (checkBtn) checkBtn.style.display = '';
    }
}

// Baraja las opciones de cada pregunta una vez por sesion (Fisher-Yates).
// Como cada <label class="option"> conserva su onclick="selectOption(this, oi)" con su indice original,
// QUIZ_ANSWERS sigue siendo valido sin tocar build-course.js.
function shuffleQuizOptions() {
    document.querySelectorAll('.quiz-container .question').forEach(function (question) {
        var options = Array.prototype.slice.call(question.querySelectorAll('.option'));
        if (options.length < 2) return;
        for (var i = options.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = options[i]; options[i] = options[j]; options[j] = tmp;
        }
        options.forEach(function (opt) { question.appendChild(opt); });
    });
}

function checkQuiz(moduleNum) {
    var quizData = QUIZ_ANSWERS[moduleNum];
    if (!quizData) return;

    var questions = document.querySelectorAll('#module-' + moduleNum + ' .question');
    var correctAnswers = 0;
    var totalQuestions = quizData.length;

    questions.forEach(function (question, qIndex) {
        var selectedOption = question.querySelector('.option.selected');
        if (selectedOption) {
            var selectedIdx = parseInt(selectedOption.getAttribute('data-selected-index'));
            if (selectedIdx === quizData[qIndex]) {
                selectedOption.classList.add('correct');
                correctAnswers++;
            } else {
                selectedOption.classList.add('incorrect');
                // Mostrar la correcta
                var options = question.querySelectorAll('.option');
                if (options[quizData[qIndex]]) options[quizData[qIndex]].classList.add('correct');
            }
        }
    });

    var score = Math.round((correctAnswers / totalQuestions) * 100);
    quizScores[moduleNum] = score;

    var checkBtn = document.getElementById('checkBtn-' + moduleNum);
    if (checkBtn) checkBtn.style.display = 'none';

    if (score >= 70) {
        var nextBtn = document.getElementById('nextBtn-' + moduleNum);
        if (nextBtn) nextBtn.classList.remove('hidden');

        // Desbloquear logros
        COURSE_CONFIG.achievements.forEach(function (ach) {
            if (ach.unlockOnModule === moduleNum) unlockAchievement(ach.id);
        });

        showNotification('¡Excelente! Obtuviste ' + score + '% ✅');
        sendToGoogleSheets({
            action: 'quiz', name: userProfile.fullName, email: userProfile.email,
            module: moduleNum, score: score, course: COURSE_CONFIG.courseId
        });
    } else {
        showNotification('Puntuación: ' + score + '%. Necesitas 70% para continuar. Revisa el contenido y vuelve a intentarlo.', 'warning');
        // No auto-reset: en cuanto el usuario hace clic en una opcion, selectOption() limpia las marcas
        // de esa pregunta y vuelve a mostrar el boton "Verificar". Esto evita que un reset por tiempo
        // borrara la nueva seleccion del usuario antes de que pulsara verificar.
    }
    saveProgress();
}

function completeModule(moduleNum) {
    moduleProgress[moduleNum] = true;
    sendToGoogleSheets({
        action: 'progress', name: userProfile.fullName, email: userProfile.email,
        moduleCompleted: moduleNum, course: COURSE_CONFIG.courseId
    });
    var navBtns = document.querySelectorAll('.nav-btn');
    if (navBtns[moduleNum]) navBtns[moduleNum].classList.add('completed');
    showModule(moduleNum + 1);
    saveProgress();
    updateProgress();
    updateStats();
}

// --- Progreso ---
function updateProgress() {
    var completed = moduleProgress.filter(Boolean).length;
    var total = COURSE_CONFIG.contentModules;
    var pct = Math.round((completed / total) * 100);
    var bar = document.getElementById('progressBar');
    var text = document.getElementById('progressText');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';

    updateElapsedTime();
}

function updateElapsedTime() {
    var timeEl = document.getElementById('elapsedTime');
    if (!timeEl || !sessionStartTime) return;
    var totalMinutes = studyTime;
    if (totalMinutes < 60) {
        timeEl.textContent = totalMinutes + ' min';
    } else {
        var hours = Math.floor(totalMinutes / 60);
        var mins = totalMinutes % 60;
        timeEl.textContent = hours + 'h ' + (mins < 10 ? '0' : '') + mins + 'min';
    }
}

function updateStats() {
    var completed = moduleProgress.filter(Boolean).length;
    var quizzes = quizScores.filter(function (s) { return s >= 70; }).length;
    var el1 = document.getElementById('modulesCompleted');
    var el2 = document.getElementById('quizzesCompleted');
    var el3 = document.getElementById('studyTime');
    if (el1) el1.textContent = completed;
    if (el2) el2.textContent = quizzes;
    if (el3) el3.textContent = studyTime;
}

// --- Persistencia ---
function saveProgress() {
    var key = 'courseProgress_' + COURSE_CONFIG.courseId;
    var progress = {
        userProfile: userProfile, moduleProgress: moduleProgress,
        quizScores: quizScores, studyTime: studyTime, reflections: reflections, photos: photos, selfAssessments: selfAssessments, personalPlans: personalPlans, practicesCatalogs: practicesCatalogs,
        currentModule: currentModule, startTime: startTime.toISOString(),
        lastSaved: new Date().toISOString(), version: '3.0'
    };
    localStorage.setItem(key, JSON.stringify(progress));
    var indicator = document.getElementById('saveIndicator');
    if (indicator) { indicator.classList.add('show'); setTimeout(function () { indicator.classList.remove('show'); }, 2000); }
}

function loadProgress() {
    var key = 'courseProgress_' + COURSE_CONFIG.courseId;
    var saved = localStorage.getItem(key);
    if (saved) {
        var p = JSON.parse(saved);
        userProfile = p.userProfile || {};
        moduleProgress = p.moduleProgress || new Array(COURSE_CONFIG.totalModules).fill(false);
        quizScores = p.quizScores || [];
        studyTime = p.studyTime || 0;
        reflections = p.reflections || {};
        photos = p.photos || {};
        selfAssessments = p.selfAssessments || {};
        personalPlans = p.personalPlans || {};
        practicesCatalogs = p.practicesCatalogs || {};
        currentModule = p.currentModule || 0;
        startTime = new Date(p.startTime || new Date());
        if (userProfile.fullName) {
            showModule(currentModule);
            var welcomeEl = document.getElementById('welcomeName');
            if (welcomeEl) welcomeEl.textContent = userProfile.fullName.split(' ')[0];
            showNotification('¡Bienvenido de vuelta, ' + userProfile.fullName.split(' ')[0] + '! 👋');
        }
        Object.keys(reflections).forEach(function (k) {
            var ta = document.getElementById('reflection-' + k);
            if (ta) ta.value = reflections[k];
        });
        Object.keys(photos).forEach(function (k) {
            var preview = document.getElementById('photo-preview-' + k);
            var actions = document.getElementById('photo-actions-' + k);
            if (preview && photos[k] && photos[k].dataUrl) {
                preview.innerHTML = '<img src="' + photos[k].dataUrl + '" alt="Imagen guardada">';
                if (actions) actions.classList.remove('hidden');
            }
        });
        if (typeof restoreAssessmentSelections === 'function') restoreAssessmentSelections();
        if (typeof restorePlanState === 'function') restorePlanState();
        if (typeof restorePracticesCatalogs === 'function') restorePracticesCatalogs();
        updateStats();
        updateProgress();
    }
}

// --- Logros ---
function unlockAchievement(achievementId) {
    var el = document.getElementById(achievementId);
    if (el && !el.classList.contains('earned')) {
        el.classList.add('earned');
        showNotification('¡Logro desbloqueado: ' + el.textContent + '! 🏆');
    }
}

// --- Notificaciones ---
function showNotification(message, type) {
    var n = document.createElement('div');
    n.className = 'notification';
    if (type === 'warning') n.style.background = '#FF9800';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(function () {
        n.style.animation = 'slideOut 0.3s';
        setTimeout(function () { n.remove(); }, 300);
    }, 3000);
}

// --- Reflexiones ---
function saveReflection(moduleNum, text) {
    reflections[moduleNum] = text;
    saveProgress();
    // Sincronizacion en segundo plano al backend (fire-and-forget)
    if (userProfile && userProfile.email && typeof sendToGoogleSheets === 'function') {
        sendToGoogleSheets({
            action: 'reflection',
            email: userProfile.email,
            name: userProfile.fullName,
            course: COURSE_CONFIG.courseId,
            moduleId: String(moduleNum),
            texto: text || ''
        });
    }
}

function saveCommitment(text) {
    localStorage.setItem('commitment_' + COURSE_CONFIG.courseId, text);
}

// --- Foto-upload (resize + persist + descargar) ---
function handlePhotoUpload(input, photoId) {
    var file = input.files && input.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showNotification('⚠️ Solo se aceptan imágenes (JPG, PNG, etc.)', 'warning');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        showNotification('⚠️ La imagen pesa más de 10 MB. Intenta con una más pequeña.', 'warning');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
            var MAX = 1200;
            var ratio = Math.min(1, MAX / Math.max(img.width, img.height));
            var w = Math.round(img.width * ratio);
            var h = Math.round(img.height * ratio);
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            var preview = document.getElementById('photo-preview-' + photoId);
            var actions = document.getElementById('photo-actions-' + photoId);
            if (preview) preview.innerHTML = '<img src="' + dataUrl + '" alt="Tu imagen">';
            if (actions) actions.classList.remove('hidden');
            photos[photoId] = {
                dataUrl: dataUrl,
                fileName: (file.name || 'imagen') + '.jpg',
                savedAt: new Date().toISOString()
            };
            try {
                saveProgress();
                showNotification('✅ Imagen guardada en tu progreso');
            } catch (err) {
                showNotification('⚠️ La imagen es muy pesada para guardar localmente. Descárgala para no perderla.', 'warning');
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadPhoto(photoId) {
    var photo = photos[photoId];
    if (!photo || !photo.dataUrl) {
        showNotification('⚠️ No hay imagen guardada para descargar', 'warning');
        return;
    }
    var a = document.createElement('a');
    a.href = photo.dataUrl;
    a.download = photo.fileName || 'imagen.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function clearPhoto(photoId) {
    if (!confirm('¿Seguro que quieres quitar esta imagen? Se borrará de tu progreso guardado.')) return;
    delete photos[photoId];
    saveProgress();
    var preview = document.getElementById('photo-preview-' + photoId);
    var actions = document.getElementById('photo-actions-' + photoId);
    var input = document.getElementById('photo-input-' + photoId);
    if (preview) preview.innerHTML = '';
    if (actions) actions.classList.add('hidden');
    if (input) input.value = '';
    showNotification('Imagen quitada');
}

// --- Autodiagnóstico de competencias (self-assessment) ---
function recordAssessmentGrade(assessmentId, competenceId, level) {
    if (!selfAssessments[assessmentId]) selfAssessments[assessmentId] = { grades: {} };
    selfAssessments[assessmentId].grades[competenceId] = level;
    selfAssessments[assessmentId].updatedAt = new Date().toISOString();
}

function calculateAssessment(assessmentId) {
    var data = selfAssessments[assessmentId];
    var container = document.getElementById('sa-' + assessmentId);
    if (!container) return;
    var blocks = container.querySelectorAll('.competence-block');
    if (!data || !data.grades || Object.keys(data.grades).length < blocks.length) {
        showNotification('⚠️ Te falta marcar el grado en alguna competencia. Revisa que las hayas calificado todas.', 'warning');
        return;
    }
    // Build entries with name + grade for ranking
    var entries = [];
    blocks.forEach(function (b) {
        var compId = b.getAttribute('data-competence');
        var compName = b.querySelector('.competence-name')?.textContent.trim() || compId;
        var grade = data.grades[compId];
        entries.push({ id: compId, name: compName, grade: grade });
    });
    entries.sort(function (a, b) { return b.grade - a.grade; });
    var topN = Math.min(3, entries.length);
    var bottomN = Math.min(3, entries.length);
    var strengths = entries.slice(0, topN);
    var opportunities = entries.slice(-bottomN).reverse();
    // Save final result
    data.strengths = strengths.map(function (e) { return e.id; });
    data.opportunities = opportunities.map(function (e) { return e.id; });
    data.completedAt = new Date().toISOString();
    saveProgress();
    // Save to global key for cross-course consumption
    try {
        localStorage.setItem('competencyProfile', JSON.stringify({
            grades: data.grades,
            strengths: data.strengths,
            opportunities: data.opportunities,
            completedAt: data.completedAt,
            sourceCourse: COURSE_CONFIG.courseId
        }));
    } catch (e) { /* ignore */ }
    // Sincronizacion en segundo plano al backend (persistencia hibrida)
    if (userProfile && userProfile.email && typeof sendToGoogleSheets === 'function') {
        sendToGoogleSheets({
            action: 'assessment',
            email: userProfile.email,
            name: userProfile.fullName,
            course: COURSE_CONFIG.courseId,
            assessmentId: assessmentId,
            grades: data.grades
        });
    }
    // Render result
    var avgGrade = (entries.reduce(function (s, e) { return s + e.grade; }, 0) / entries.length).toFixed(1);
    var resultEl = document.getElementById('sa-result-' + assessmentId);
    if (resultEl) {
        resultEl.innerHTML =
            '<h3>📊 Tu perfil de competencias</h3>' +
            '<p style="text-align:center;color:#555;margin-bottom:8px;">Grado promedio: <strong style="color:#622599;font-size:1.2em;">' + avgGrade + ' / 4</strong></p>' +
            '<div class="profile-summary">' +
                '<div class="profile-strengths"><h4>💪 Tus fortalezas</h4><ul>' +
                    strengths.map(function (e) { return '<li><strong>' + e.name + '</strong> — Grado ' + e.grade + '</li>'; }).join('') +
                '</ul></div>' +
                '<div class="profile-opportunities"><h4>🌱 Tus áreas de oportunidad</h4><ul>' +
                    opportunities.map(function (e) { return '<li><strong>' + e.name + '</strong> — Grado ' + e.grade + '</li>'; }).join('') +
                '</ul></div>' +
            '</div>' +
            '<div class="profile-recommendation">' +
                '<strong>💡 Recomendación:</strong> tus áreas de oportunidad son las que conviene priorizar en tu <em>Plan Personal de Desarrollo</em>. Cuando tomes el <strong>Curso 4 — Tu Plan Personal</strong>, este perfil quedará pre-cargado para sugerirte por dónde empezar.' +
            '</div>';
        resultEl.classList.remove('hidden');
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showNotification('✅ Perfil calculado y guardado');
}

// Restore selection state if user has saved assessment grades
function restoreAssessmentSelections() {
    Object.keys(selfAssessments).forEach(function (aid) {
        var grades = (selfAssessments[aid] && selfAssessments[aid].grades) || {};
        Object.keys(grades).forEach(function (compId) {
            var radio = document.querySelector('input[name="sa-' + aid + '-' + compId + '"][value="' + grades[compId] + '"]');
            if (radio) radio.checked = true;
        });
    });
}

// --- Plan Personal Builder ---
function getCompetencyProfile() {
    try {
        var raw = localStorage.getItem('competencyProfile');
        return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
}

function loadProfileIntoPlan(builderId) {
    var profile = getCompetencyProfile();
    var banner = document.getElementById('pb-profile-' + builderId);
    if (!profile || !profile.opportunities) {
        if (banner) {
            banner.classList.add('no-profile');
            banner.innerHTML = '<strong>ℹ️ No encontramos tu perfil del Curso 4.</strong><br>Si todavía no has hecho el autodiagnóstico, te recomendamos hacerlo primero — pero puedes construir tu plan igual marcando manualmente las competencias que quieres trabajar.';
        }
        return;
    }
    if (banner) {
        banner.classList.remove('no-profile');
        banner.innerHTML = '<strong>✅ Tu perfil del Curso 4 está cargado.</strong><br>Tus 3 áreas de oportunidad ya vienen pre-seleccionadas. Puedes cambiarlas si quieres.';
    }
    // Pre-check the 3 opportunities and show their grade
    var grades = profile.grades || {};
    profile.opportunities.forEach(function (compId) {
        var checkbox = document.querySelector('.pb-comp-check[data-competence="' + compId + '"]');
        if (checkbox) {
            checkbox.checked = true;
            togglePlanCompetence(builderId, compId);
        }
    });
    Object.keys(grades).forEach(function (compId) {
        var gradeEl = document.getElementById('pb-grade-' + compId);
        if (gradeEl) {
            gradeEl.textContent = 'Grado ' + grades[compId];
            if (profile.opportunities.indexOf(compId) >= 0) gradeEl.classList.add('priority');
        }
    });
    showNotification('✅ Perfil del Curso 3 cargado');
}

function togglePlanCompetence(builderId, compId) {
    var fields = document.getElementById('pb-fields-' + compId);
    var checkbox = document.querySelector('.pb-comp-check[data-competence="' + compId + '"]');
    if (!fields) return;
    if (checkbox && checkbox.checked) {
        fields.classList.remove('hidden');
        if (!personalPlans[builderId]) personalPlans[builderId] = { competences: {}, commitment: '' };
        if (!personalPlans[builderId].competences[compId]) {
            personalPlans[builderId].competences[compId] = { meta: '', plazo: '', recursos: '' };
        }
    } else {
        fields.classList.add('hidden');
        if (personalPlans[builderId] && personalPlans[builderId].competences) {
            delete personalPlans[builderId].competences[compId];
        }
    }
    saveProgress();
}

function savePlanField(builderId, compId, field, value) {
    if (!personalPlans[builderId]) personalPlans[builderId] = { competences: {}, commitment: '' };
    if (!personalPlans[builderId].competences[compId]) personalPlans[builderId].competences[compId] = {};
    personalPlans[builderId].competences[compId][field] = value;
    saveProgress();
}

function savePlanCommitment(builderId, value) {
    if (!personalPlans[builderId]) personalPlans[builderId] = { competences: {}, commitment: '' };
    personalPlans[builderId].commitment = value;
    saveProgress();
}

function restorePlanState() {
    Object.keys(personalPlans).forEach(function (bid) {
        var plan = personalPlans[bid];
        if (!plan) return;
        // Commitment
        var ta = document.getElementById('pb-commitment-' + bid);
        if (ta && plan.commitment) ta.value = plan.commitment;
        // Competences
        Object.keys(plan.competences || {}).forEach(function (compId) {
            var checkbox = document.querySelector('.pb-comp-check[data-competence="' + compId + '"]');
            if (checkbox) {
                checkbox.checked = true;
                togglePlanCompetence(bid, compId);
                var data = plan.competences[compId];
                ['meta', 'plazo', 'recursos'].forEach(function (f) {
                    var input = document.querySelector('.pb-field-' + f + '[data-competence="' + compId + '"]');
                    if (input && data[f]) input.value = data[f];
                });
            }
        });
    });
}

function generatePlan(builderId) {
    var plan = personalPlans[builderId];
    if (!plan || !plan.competences || Object.keys(plan.competences).length === 0) {
        showNotification('⚠️ Selecciona al menos 1 competencia y completa sus campos antes de generar el plan.', 'warning');
        return;
    }
    // Validate fields
    var entries = Object.keys(plan.competences);
    var incomplete = entries.filter(function (compId) {
        var d = plan.competences[compId];
        return !d.meta || !d.meta.trim() || !d.plazo || !d.plazo.trim() || !d.recursos || !d.recursos.trim();
    });
    if (incomplete.length > 0) {
        showNotification('⚠️ Hay campos vacíos. Completa meta, plazo y recursos en todas las competencias seleccionadas.', 'warning');
        return;
    }
    // Get competence names from checkboxes
    var nameByCompId = {};
    document.querySelectorAll('.pb-comp-check').forEach(function (cb) {
        nameByCompId[cb.getAttribute('data-competence')] = cb.getAttribute('data-name');
    });
    var profile = getCompetencyProfile();
    var grades = (profile && profile.grades) || {};
    var fullName = (userProfile && userProfile.fullName) || 'Adulto del Movimiento';
    var groupName = (userProfile && userProfile.group) || '—';
    var dateStr = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    var prioritiesHtml = entries.map(function (compId, idx) {
        var d = plan.competences[compId];
        var name = nameByCompId[compId] || compId;
        var grade = grades[compId] ? ' (Grado actual: ' + grades[compId] + ')' : '';
        return '<div class="pb-priority"><h3>' + (idx + 1) + '. ' + name + grade + '</h3>' +
            '<dt>🎯 Meta concreta</dt><dd>' + escapeHtml(d.meta) + '</dd>' +
            '<dt>⏰ Plazo</dt><dd>' + escapeHtml(d.plazo) + '</dd>' +
            '<dt>📚 Recursos</dt><dd>' + escapeHtml(d.recursos) + '</dd></div>';
    }).join('');
    var commitmentHtml = (plan.commitment || '').trim() ?
        '<div class="pb-final-commitment"><h3>💚 Mi compromiso</h3><p style="margin:0;white-space:pre-wrap;">' + escapeHtml(plan.commitment) + '</p></div>' : '';
    var output = document.getElementById('pb-output-' + builderId);
    if (output) {
        output.innerHTML =
            '<h2>📋 Plan Personal de Desarrollo</h2>' +
            '<p class="pb-output-meta"><strong>' + escapeHtml(fullName) + '</strong> · Grupo ' + escapeHtml(groupName) + ' · ' + dateStr + '</p>' +
            '<h3 style="margin-top:24px;color:#622599;">Mis prioridades de desarrollo</h3>' +
            prioritiesHtml +
            commitmentHtml +
            '<button class="pb-print-btn" onclick="printPlan()">🖨️ Imprimir / Guardar como PDF</button>' +
            '<p style="text-align:center;color:#666;font-size:0.85em;margin:14px 0 0 0;font-style:italic;">Imprime este plan, fírmalo con tu Asesor Personal y súbelo a Talento 360.</p>';
        output.classList.remove('hidden');
        output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showNotification('✅ Plan generado. Puedes imprimirlo.');
    // Sincronizacion en segundo plano al backend (persistencia hibrida)
    if (userProfile && userProfile.email && typeof sendToGoogleSheets === 'function') {
        sendToGoogleSheets({
            action: 'plan',
            email: userProfile.email,
            name: userProfile.fullName,
            course: COURSE_CONFIG.courseId,
            planId: builderId,
            planType: 'plan-builder-v1',
            contenido: plan
        });
    }
}

function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function printPlan() {
    document.body.classList.add('printing-plan');
    var afterPrint = function () {
        document.body.classList.remove('printing-plan');
        window.removeEventListener('afterprint', afterPrint);
    };
    window.addEventListener('afterprint', afterPrint);
    setTimeout(function () { window.print(); }, 50);
    // Safety: remove class after 30s in case afterprint doesn't fire
    setTimeout(function () { document.body.classList.remove('printing-plan'); }, 30000);
}

// --- Certificado ---
function generateCertificate() {
    var date = new Date();
    var code = 'ASC-' + date.getFullYear() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    var el = function (id) { return document.getElementById(id); };
    if (el('studentName')) el('studentName').textContent = userProfile.fullName || 'Adulto Scout';
    if (el('certDate')) el('certDate').textContent = date.toLocaleDateString('es-CO');
    if (el('totalTime')) el('totalTime').textContent = studyTime;
    if (el('certGroup')) el('certGroup').textContent = userProfile.group || 'N/A';
    if (el('certRegion')) el('certRegion').textContent = userProfile.region || 'Colombia';
    if (el('certCode')) el('certCode').textContent = code;

    var avg = quizScores.length > 0 ? Math.round(quizScores.reduce(function (a, b) { return a + b; }, 0) / quizScores.length) : 100;
    if (el('finalScore')) el('finalScore').textContent = avg;

    sendToGoogleSheets({
        action: 'certificate', name: userProfile.fullName, email: userProfile.email,
        group: userProfile.group, region: userProfile.region, certificateCode: code,
        completionDate: date.toISOString(), score: avg, studyTime: studyTime,
        course: COURSE_CONFIG.courseId
    });

    unlockAchievement('achievement-5');
    var bar = document.getElementById('progressBar');
    var text = document.getElementById('progressText');
    if (bar) bar.style.width = '100%';
    if (text) text.textContent = '100%';

    localStorage.setItem('certificate_' + code, JSON.stringify({
        name: userProfile.fullName, code: code, date: date.toISOString(),
        score: avg, course: COURSE_CONFIG.courseId
    }));
}

// --- Descargar certificado como PDF ---
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (window.innerWidth <= 768);
}

// --- Utilidades internas para el PDF ---
function _txt(id, fallback) {
    var el = document.getElementById(id);
    return el ? (el.textContent || '').trim() : (fallback || '');
}

function _imgToDataURL(imgEl) {
    return new Promise(function(resolve) {
        if (!imgEl) { resolve(null); return; }
        try {
            var canvas = document.createElement('canvas');
            var w = imgEl.naturalWidth || imgEl.width || 200;
            var h = imgEl.naturalHeight || imgEl.height || 200;
            canvas.width = w; canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(imgEl, 0, 0, w, h);
            resolve({ data: canvas.toDataURL('image/png'), w: w, h: h });
        } catch (e) { resolve(null); }
    });
}

function _wrapText(pdf, text, maxWidth) {
    return pdf.splitTextToSize(text || '', maxWidth);
}

function downloadCertificatePDF() {
    var certModule = document.getElementById('module-' + (COURSE_CONFIG.totalModules - 1));
    var cert = certModule ? certModule.querySelector('.certificate') : null;
    if (!cert) {
        showNotification('El certificado aún no está disponible.');
        return;
    }

    // Localizar jsPDF (viene incluido en el bundle de html2pdf)
    var JsPDF = (window.jspdf && window.jspdf.jsPDF) || (typeof jsPDF !== 'undefined' ? jsPDF : null);
    if (!JsPDF) {
        showNotification('La librería de PDF no cargó. Verifica tu conexión.');
        if (confirm('¿Deseas usar la opción de Imprimir en su lugar?')) { window.print(); }
        return;
    }

    var code = _txt('certCode', 'certificado');
    var filename = 'Certificado-' + code + '.pdf';
    var mobile = isMobileDevice();
    showNotification('Generando PDF...');

    // Datos del certificado
    var student = _txt('studentName', 'Estudiante');
    var date = _txt('certDate', '');
    var score = _txt('finalScore', '');
    var group = _txt('certGroup', '');
    var region = _txt('certRegion', '');
    var totalTime = _txt('totalTime', '');
    var courseName = (COURSE_CONFIG.certificateCourseName || COURSE_CONFIG.title || '').toUpperCase();
    var courseDescription = COURSE_CONFIG.certificateDescription ||
        'ha completado exitosamente el curso de formación de la Plataforma de Formación de Adultos ASC';

    // Cargar logos
    var ascImg = cert.querySelector('img[src*="logo-asc"]');
    var valleImg = cert.querySelector('img[src*="logo-vallescout"]');

    Promise.all([_imgToDataURL(ascImg), _imgToDataURL(valleImg)]).then(function(logos) {
        var logoASC = logos[0], logoValle = logos[1];

        // A4 portrait: 210 x 297 mm
        var pdf = new JsPDF('p', 'mm', 'a4');
        var pageW = 210, pageH = 297;

        // --- Marco morado exterior ---
        pdf.setDrawColor(98, 37, 153);
        pdf.setLineWidth(1.2);
        pdf.rect(8, 8, pageW - 16, pageH - 16);

        // --- Esquinas decorativas amarillas ---
        pdf.setDrawColor(255, 230, 117);
        pdf.setLineWidth(2);
        var cs = 20; // corner size
        // Top-left
        pdf.line(8, 8, 8 + cs, 8);
        pdf.line(8, 8, 8, 8 + cs);
        // Top-right
        pdf.line(pageW - 8, 8, pageW - 8 - cs, 8);
        pdf.line(pageW - 8, 8, pageW - 8, 8 + cs);
        // Bottom-left
        pdf.line(8, pageH - 8, 8 + cs, pageH - 8);
        pdf.line(8, pageH - 8, 8, pageH - 8 - cs);
        // Bottom-right
        pdf.line(pageW - 8, pageH - 8, pageW - 8 - cs, pageH - 8);
        pdf.line(pageW - 8, pageH - 8, pageW - 8, pageH - 8 - cs);

        var y = 30; // cursor vertical

        // --- Logos ---
        var logoH = 18;
        var logoGap = 8;
        var logoASCw = logoASC ? logoH * (logoASC.w / logoASC.h) : 0;
        var logoValleW = logoValle ? logoH * (logoValle.w / logoValle.h) : 0;
        var totalLogosW = logoASCw + logoGap + logoValleW;
        var logosX = (pageW - totalLogosW) / 2;
        if (logoASC) pdf.addImage(logoASC.data, 'PNG', logosX, y, logoASCw, logoH);
        if (logoValle) pdf.addImage(logoValle.data, 'PNG', logosX + logoASCw + logoGap, y, logoValleW, logoH);
        y += logoH + 6;

        // --- Encabezado institucional ---
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(98, 37, 153);
        pdf.text('ASOCIACIÓN SCOUTS DE COLOMBIA', pageW / 2, y, { align: 'center' });
        y += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text('Formación de Adultos en el Movimiento', pageW / 2, y, { align: 'center' });
        y += 5;

        // --- Línea divisoria morada ---
        pdf.setDrawColor(98, 37, 153);
        pdf.setLineWidth(0.6);
        pdf.line(40, y, pageW - 40, y);
        y += 10;

        // --- Título "CERTIFICADO DE APROBACIÓN" ---
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(98, 37, 153);
        pdf.text('CERTIFICADO DE APROBACIÓN', pageW / 2, y, { align: 'center' });
        y += 12;

        // --- Banner morado con nombre del curso ---
        pdf.setFillColor(98, 37, 153);
        pdf.rect(20, y, pageW - 40, 14, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.setTextColor(255, 255, 255);
        var courseLines = _wrapText(pdf, courseName, pageW - 50);
        if (courseLines.length > 1) {
            pdf.setFontSize(11);
        }
        pdf.text(courseLines[0], pageW / 2, y + 9, { align: 'center' });
        y += 20;

        // --- "Se otorga a" ---
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(99, 99, 99);
        pdf.text('Se otorga el presente certificado a', pageW / 2, y, { align: 'center' });
        y += 10;

        // --- Nombre del estudiante ---
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.setTextColor(98, 37, 153);
        pdf.text(student, pageW / 2, y, { align: 'center' });
        // Subrayado amarillo bajo el nombre
        var nameW = pdf.getTextWidth(student);
        pdf.setDrawColor(255, 230, 117);
        pdf.setLineWidth(1.5);
        pdf.line((pageW - nameW) / 2 - 5, y + 2, (pageW + nameW) / 2 + 5, y + 2);
        y += 12;

        // --- Descripción ---
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(99, 99, 99);
        var descLines = _wrapText(pdf, courseDescription, pageW - 60);
        for (var i = 0; i < descLines.length && i < 3; i++) {
            pdf.text(descLines[i], pageW / 2, y, { align: 'center' });
            y += 5;
        }
        y += 5;

        // --- Tarjeta de detalles ---
        var detX = 25, detW = pageW - 50, detH = 38;
        pdf.setFillColor(249, 247, 252);
        pdf.rect(detX, y, detW, detH, 'F');
        pdf.setFillColor(98, 37, 153);
        pdf.rect(detX, y, 2, detH, 'F'); // borde izquierdo morado

        var colX1 = detX + 8;
        var colX2 = detX + detW / 2 + 5;
        var rowY = y + 8;
        var rowGap = 7;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(60, 60, 60);

        function _detail(label, value, x, yy) {
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(98, 37, 153);
            pdf.text(label, x, yy);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(60, 60, 60);
            pdf.text(String(value || '-'), x + pdf.getTextWidth(label) + 2, yy);
        }

        _detail('Fecha: ', date, colX1, rowY);
        _detail('Puntuación: ', score + '%', colX2, rowY);
        _detail('Grupo Scout: ', group, colX1, rowY + rowGap);
        _detail('Región: ', region, colX2, rowY + rowGap);
        _detail('Tiempo: ', totalTime + ' min', colX1, rowY + rowGap * 2);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(98, 37, 153);
        pdf.text('Estado: ', colX2, rowY + rowGap * 2);
        pdf.setTextColor(46, 125, 50);
        pdf.text('APROBADO', colX2 + pdf.getTextWidth('Estado: ') + 2, rowY + rowGap * 2);

        y += detH + 8;

        // --- Código de verificación ---
        var codeBoxH = 14;
        pdf.setDrawColor(98, 37, 153);
        pdf.setLineWidth(0.4);
        pdf.setLineDashPattern([1.5, 1.5], 0);
        pdf.setFillColor(250, 248, 253);
        pdf.rect(50, y, pageW - 100, codeBoxH, 'FD');
        pdf.setLineDashPattern([], 0);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.setTextColor(140, 140, 140);
        pdf.text('CÓDIGO DE VERIFICACIÓN', pageW / 2, y + 5, { align: 'center' });
        pdf.setFont('courier', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(98, 37, 153);
        pdf.text(code, pageW / 2, y + 11, { align: 'center' });
        y += codeBoxH + 6;

        // --- Footer ---
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.setTextColor(150, 150, 150);
        pdf.text('Plataforma de Formación de Adultos ASC', pageW / 2, pageH - 16, { align: 'center' });
        pdf.setFontSize(6);
        pdf.text('Verifica este certificado ingresando el código en la plataforma web', pageW / 2, pageH - 12, { align: 'center' });

        // --- Guardar ---
        if (mobile) {
            var blob = pdf.output('blob');
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url; link.download = filename; link.target = '_blank';
            document.body.appendChild(link); link.click();
            setTimeout(function() { document.body.removeChild(link); URL.revokeObjectURL(url); }, 5000);
        } else {
            pdf.save(filename);
        }
        showNotification('PDF descargado: ' + filename + ' 📥');
    }).catch(function(err) {
        if (typeof console !== 'undefined') console.error('Error PDF:', err);
        showNotification('Error al generar PDF. Intenta con Imprimir.', 'warning');
        if (confirm('¿Deseas usar la opción de Imprimir?')) { window.print(); }
    });
}

// --- Compartir ---
function shareResults() {
    var text = '¡He completado el curso ' + COURSE_CONFIG.title + '! 🏕️\n\n' +
        'Certificado: ' + document.getElementById('certCode').textContent + '\n' +
        'Puntuación: ' + document.getElementById('finalScore').textContent + '%\n\n' +
        '#ScoutsSiempreListos #AdultosEnElMovimiento #ASC';
    if (navigator.share) {
        navigator.share({ title: COURSE_CONFIG.title + ' Completado', text: text });
    } else {
        navigator.clipboard.writeText(text);
        showNotification('¡Texto copiado al portapapeles! 📋');
    }
}

function restartCourse() {
    if (confirm('¿Estás seguro de que quieres reiniciar el curso? Se perderá todo el progreso.')) {
        localStorage.removeItem('courseProgress_' + COURSE_CONFIG.courseId);
        localStorage.removeItem('commitment_' + COURSE_CONFIG.courseId);
        location.reload();
    }
}

// --- Registration mode toggle ---
function toggleRegistrationMode(mode) {
    var newRegBtn = document.getElementById('toggleNewReg');
    var recoverBtn = document.getElementById('toggleRecover');
    var recoverySection = document.getElementById('recoverySection');
    var registrationForm = document.getElementById('registrationForm');

    if (mode === 'recover') {
        newRegBtn.classList.remove('active');
        recoverBtn.classList.add('active');
        recoverySection.classList.remove('hidden');
        registrationForm.style.display = 'none';
    } else {
        newRegBtn.classList.add('active');
        recoverBtn.classList.remove('active');
        recoverySection.classList.add('hidden');
        registrationForm.style.display = '';
    }
}

// --- Recovery from server ---
function recoverProgress() {
    var emailInput = document.getElementById('recoveryEmail');
    var email = emailInput.value.trim();
    var msgDiv = document.getElementById('recoveryMessage');

    if (!email) {
        showNotification('⚠️ Ingresa tu correo electronico', 'warning');
        return;
    }

    msgDiv.style.display = 'block';
    msgDiv.innerHTML = '<p style="color: #622599; font-weight: 600;">🔄 Buscando tu avance...</p>';

    var url = COURSE_CONFIG.googleScriptUrl +
        '?action=recover&email=' + encodeURIComponent(email) +
        '&course=' + encodeURIComponent(COURSE_CONFIG.courseId) +
        '&token=ADULTOS_ASC_2026';

    fetch(url, { redirect: 'follow' })
        .then(function(response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then(function(data) {

            // El Apps Script devuelve: { success: true, data: { registration, modules, quizzes, certificates } }
            var isFound = (data && data.found) || (data && data.success && data.data);

            if (isFound) {
                var serverData = data.data || data;
                var reg = serverData.registration || data.userProfile || {};
                var mods = serverData.modules || [];
                var quizzes = serverData.quizzes || [];

                // Reconstruir userProfile desde registration
                if (reg.fullName || reg.name) {
                    userProfile = {
                        fullName: reg.fullName || reg.name || '',
                        age: reg.age || '',
                        group: reg.group || '',
                        region: reg.region || '',
                        email: reg.email || email,
                        motivation: reg.motivation || '',
                        registrationDate: reg.registrationDate || reg.timestamp || ''
                    };
                } else if (data.userProfile) {
                    userProfile = data.userProfile;
                }

                // Reconstruir moduleProgress desde modules array
                if (mods.length > 0) {
                    moduleProgress = new Array(COURSE_CONFIG.totalModules).fill(false);
                    mods.forEach(function(m) {
                        var modNum = m.moduleCompleted || m.module;
                        if (modNum !== undefined && modNum < moduleProgress.length) {
                            moduleProgress[modNum] = true;
                        }
                    });
                } else if (data.moduleProgress) {
                    moduleProgress = data.moduleProgress;
                }

                // Reconstruir quizScores desde quizzes array
                if (quizzes.length > 0) {
                    quizScores = [];
                    quizzes.forEach(function(q) {
                        var modNum = q.module;
                        var score = q.score;
                        if (modNum !== undefined && score !== undefined) {
                            quizScores[modNum] = parseInt(score);
                        }
                    });
                } else if (data.quizScores) {
                    quizScores = data.quizScores;
                }

                // StudyTime y reflections (si vienen directamente)
                if (data.studyTime) studyTime = data.studyTime;
                if (data.reflections) {
                    reflections = data.reflections;
                    Object.keys(reflections).forEach(function(k) {
                        var ta = document.getElementById('reflection-' + k);
                        if (ta) ta.value = reflections[k];
                    });
                }

                // Catálogos de buenas prácticas (Curso 5 — Línea DI): clave por catalogId
                if (serverData.catalogs && typeof serverData.catalogs === 'object') {
                    Object.keys(serverData.catalogs).forEach(function (cid) {
                        practicesCatalogs[cid] = serverData.catalogs[cid];
                        // Espejo en localStorage global para que otros cursos puedan leerlo cross-device
                        try { localStorage.setItem(cid, JSON.stringify(serverData.catalogs[cid])); } catch (e) {}
                    });
                    if (typeof restorePracticesCatalogs === 'function') restorePracticesCatalogs();
                    if (typeof renderCatalogDisplays === 'function') renderCatalogDisplays();
                }

                // Reflexiones por curso: hidratar el localStorage de cada curso para lectura cross-curso
                if (serverData.reflectionsByCourse && typeof serverData.reflectionsByCourse === 'object') {
                    Object.keys(serverData.reflectionsByCourse).forEach(function (cid) {
                        var courseReflections = serverData.reflectionsByCourse[cid] || {};
                        if (cid === COURSE_CONFIG.courseId) {
                            // Curso actual: aplicar al estado en memoria y a los textareas visibles
                            reflections = courseReflections;
                            Object.keys(reflections).forEach(function (k) {
                                var ta = document.getElementById('reflection-' + k);
                                if (ta) ta.value = reflections[k];
                            });
                        } else {
                            // Otros cursos: refrescar su propio courseProgress_<courseId> en localStorage
                            try {
                                var key = 'courseProgress_' + cid;
                                var raw = localStorage.getItem(key);
                                var existing = raw ? JSON.parse(raw) : {};
                                existing.reflections = courseReflections;
                                existing.lastSaved = new Date().toISOString();
                                localStorage.setItem(key, JSON.stringify(existing));
                            } catch (e) { /* ignore */ }
                        }
                    });
                }

                // Autodiagnósticos: restaurar grados de self-assessments del usuario
                if (serverData.assessments && typeof serverData.assessments === 'object') {
                    Object.keys(serverData.assessments).forEach(function (aid) {
                        var saved = serverData.assessments[aid] || {};
                        if (!selfAssessments[aid]) selfAssessments[aid] = { grades: {} };
                        if (saved.grades) selfAssessments[aid].grades = saved.grades;
                    });
                    if (typeof restoreAssessmentSelections === 'function') restoreAssessmentSelections();
                }

                // Planes personales: restaurar el plan-builder y goal-planner (Curso 6 DI)
                if (serverData.plans && typeof serverData.plans === 'object') {
                    Object.keys(serverData.plans).forEach(function (pid) {
                        var savedPlan = serverData.plans[pid] || {};
                        var contenido = savedPlan.contenido;
                        if (contenido && typeof contenido === 'object') {
                            personalPlans[pid] = contenido;
                        }
                    });
                    if (typeof restorePlanState === 'function') restorePlanState();
                    if (typeof renderGoalPlanners === 'function') renderGoalPlanners();
                }

                // Refrescar componentes del Curso 6 que dependen de datos cross-curso
                if (typeof renderBrujulaDisplays === 'function') renderBrujulaDisplays();
                if (typeof renderBrujulaActions === 'function') renderBrujulaActions();
                if (typeof renderCoursesSuggestions === 'function') renderCoursesSuggestions();

                saveProgress();
                updateStats();
                updateProgress();

                // Determinar último módulo completado
                var lastModule = data.currentModule || 0;
                if (!lastModule && moduleProgress.length > 0) {
                    for (var i = moduleProgress.length - 1; i >= 0; i--) {
                        if (moduleProgress[i]) { lastModule = i + 1; break; }
                    }
                }

                var firstName = userProfile.fullName ? userProfile.fullName.split(' ')[0] : 'Scout';
                var welcomeEl = document.getElementById('welcomeName');
                if (welcomeEl) welcomeEl.textContent = firstName;

                var completedCount = moduleProgress.filter(Boolean).length;
                showNotification('¡Avance recuperado, ' + firstName + '! ' + completedCount + ' módulos completados 🎉');
                showModule(lastModule > 0 ? lastModule : 1);
            } else {
                var reason = (data && data.message) ? data.message : 'No se encontro avance asociado a este correo.';
                msgDiv.innerHTML = '<p style="color: #FF9800; font-weight: 600;">⚠️ ' + escapeHtml(reason) + '</p>' +
                    '<p style="color: #636363; margin-top: 10px;">Puedes registrarte como nuevo usuario.</p>' +
                    '<button class="btn" style="margin-top: 10px;" onclick="toggleRegistrationMode(\'new\')">🆕 Registrarme</button>';
            }
        })
        .catch(function(err) {
            if (typeof console !== 'undefined') console.error('[Recovery] Error:', err);
            msgDiv.innerHTML = '<p style="color: #f44336; font-weight: 600;">❌ Error al conectar con el servidor.</p>' +
                '<p style="color: #636363; margin-top: 10px;">Error: ' + escapeHtml(err && err.message ? err.message : String(err)) + '</p>' +
                '<p style="color: #636363; margin-top: 5px;">Verifica tu conexion a internet e intenta de nuevo.</p>';
        });
}

// --- Google Sheets ---
function sendToGoogleSheets(data) {
    if (!COURSE_CONFIG.googleScriptUrl) return;
    try {
        var indicator = document.getElementById('syncIndicator');
        if (indicator) indicator.classList.add('show');
        var payload = Object.assign({}, data, {
            token: 'ADULTOS_ASC_2026',
            timestamp: new Date().toISOString(),
            url: window.location.href
        });

        // Try CORS first, fall back to no-cors
        fetch(COURSE_CONFIG.googleScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (response) {
            if (indicator) {
                indicator.textContent = '☁️ Guardado en la nube';
                indicator.classList.add('show');
                setTimeout(function () { indicator.classList.remove('show'); }, 2000);
            }
            return response.json().catch(function() { return {}; });
        }).catch(function () {
            // Fallback to no-cors mode for older Apps Script deployments
            fetch(COURSE_CONFIG.googleScriptUrl, {
                method: 'POST', mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(function () {
                if (indicator) {
                    indicator.textContent = '☁️ Sincronizado con Google Sheets';
                    indicator.classList.add('show');
                    setTimeout(function () { indicator.classList.remove('show'); }, 2000);
                }
            }).catch(function () {
                if (indicator) {
                    indicator.textContent = '💾 Guardado localmente';
                    indicator.classList.add('show');
                    setTimeout(function () { indicator.classList.remove('show'); }, 2000);
                }
                // Datos guardados localmente (fallback silencioso)
            });
        });
    } catch (e) {
        // Google Sheets no disponible, progreso guardado localmente
        var indicator = document.getElementById('syncIndicator');
        if (indicator) {
            indicator.textContent = '💾 Guardado localmente';
            indicator.classList.add('show');
            setTimeout(function () { indicator.classList.remove('show'); }, 2000);
        }
    }
}

// --- Catálogo de buenas prácticas (Curso 5) ---
function recordPracticeState(catalogId, ambitoId, field, value) {
    if (!practicesCatalogs[catalogId]) practicesCatalogs[catalogId] = {};
    if (!practicesCatalogs[catalogId][ambitoId]) practicesCatalogs[catalogId][ambitoId] = { attributes: [] };
    practicesCatalogs[catalogId][ambitoId][field] = value;
    saveProgress();
}

function recordPracticeAttribute(catalogId, ambitoId, attrId, isChecked) {
    if (!practicesCatalogs[catalogId]) practicesCatalogs[catalogId] = {};
    if (!practicesCatalogs[catalogId][ambitoId]) practicesCatalogs[catalogId][ambitoId] = { attributes: [] };
    if (!practicesCatalogs[catalogId][ambitoId].attributes) practicesCatalogs[catalogId][ambitoId].attributes = [];
    var arr = practicesCatalogs[catalogId][ambitoId].attributes;
    var idx = arr.indexOf(attrId);
    if (isChecked && idx === -1) arr.push(attrId);
    else if (!isChecked && idx !== -1) arr.splice(idx, 1);
    saveProgress();
}

function savePracticesCatalog(catalogId) {
    var data = practicesCatalogs[catalogId] || {};
    // 1. Persistencia inmediata en localStorage (cross-curso, offline-safe)
    try { localStorage.setItem(catalogId, JSON.stringify(data)); } catch (e) {}
    saveProgress();
    // 2. Feedback inmediato al usuario (sin esperar al backend)
    var statusEl = document.getElementById('pbc-status-' + catalogId);
    if (statusEl) {
        var ambitosMarked = Object.keys(data).filter(function (k) { return data[k].state; }).length;
        statusEl.classList.remove('hidden');
        statusEl.innerHTML = '<strong>✅ Tu catálogo se guardó.</strong> ' + ambitosMarked + ' de 8 ámbitos marcados. Puedes modificarlo y volver a guardar.';
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showNotification('✅ Catálogo guardado');
    // 3. Sincronización en segundo plano al backend (fire-and-forget; si falla, localStorage queda como fuente).
    if (userProfile && userProfile.email) {
        var items = Object.keys(data).map(function (ambitoId) {
            var it = data[ambitoId] || {};
            return {
                ambitoId: ambitoId,
                state: it.state || '',
                description: it.description || '',
                attributes: it.attributes || []
            };
        });
        sendToGoogleSheets({
            action: 'catalog',
            name: userProfile.fullName,
            email: userProfile.email,
            course: COURSE_CONFIG.courseId,
            catalogId: catalogId,
            items: items
        });
    }
}

function restorePracticesCatalogs() {
    Object.keys(practicesCatalogs).forEach(function (catalogId) {
        var data = practicesCatalogs[catalogId];
        Object.keys(data).forEach(function (ambitoId) {
            var item = data[ambitoId];
            if (item.state) {
                var radio = document.querySelector('input[name="state-' + catalogId + '-' + ambitoId + '"][value="' + item.state + '"]');
                if (radio) radio.checked = true;
            }
            if (item.description) {
                var ta = document.querySelector('.practice-row[data-ambito="' + ambitoId + '"] .practice-desc');
                if (ta) ta.value = item.description;
            }
            (item.attributes || []).forEach(function (attrId) {
                var cb = document.querySelector('.practice-row[data-ambito="' + ambitoId + '"] input[data-attr="' + attrId + '"]');
                if (cb) cb.checked = true;
            });
        });
    });
}

// --- Catalog display (lee localStorage, opera cross-curso) ---
function getCatalogData(catalogId) {
    if (practicesCatalogs[catalogId] && Object.keys(practicesCatalogs[catalogId]).length > 0) {
        return practicesCatalogs[catalogId];
    }
    try {
        var raw = localStorage.getItem(catalogId);
        return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
}

function getAmbitoDisplayName(ambitoId) {
    var names = {
        'gobernanza': '🏛️ Gobernanza',
        'administracion': '🗂️ Administración',
        'recursos-economicos': '💰 Recursos Económicos',
        'comunicaciones': '📣 Comunicaciones',
        'relaciones-internacionales': '🌐 Relaciones Internacionales',
        'crecimiento': '📈 Crecimiento',
        'gestion-del-riesgo': '🛡️ Gestión del Riesgo',
        'control-y-reconocimiento': '🏅 Control y Reconocimiento'
    };
    return names[ambitoId] || ambitoId;
}

function renderCatalogDisplays() {
    document.querySelectorAll('.catalog-display').forEach(function (el) {
        var catalogId = el.getAttribute('data-catalog-id');
        var mode = el.getAttribute('data-mode') || 'full';
        var data = getCatalogData(catalogId);
        if (!data || Object.keys(data).length === 0) {
            el.innerHTML = '<div class="catalog-display-empty">⚠️ <strong>Aún no tienes catálogo guardado.</strong><br>Para que este componente se llene, primero completá el <strong>Curso 5 — Buenas Prácticas en Tu Grupo</strong> y guardá tu catálogo.</div>';
            return;
        }
        var stateLabels = { si: '🟢 Sí', parcial: '🟡 Parcial', no: '🔴 No', 'no-se': '⚪ No sé' };
        var summary = { si: [], parcial: [], no: [], 'no-se': [] };
        Object.keys(data).forEach(function (aid) {
            var it = data[aid];
            if (it.state && summary[it.state]) summary[it.state].push({ id: aid, item: it });
        });
        var html = '<div class="catalog-display-content">';
        html += '<div class="catalog-summary">' +
            '<span class="catalog-summary-pill green">🟢 Sí: <strong>' + summary.si.length + '</strong></span>' +
            '<span class="catalog-summary-pill yellow">🟡 Parcial: <strong>' + summary.parcial.length + '</strong></span>' +
            '<span class="catalog-summary-pill red">🔴 No: <strong>' + summary.no.length + '</strong></span>' +
            '<span class="catalog-summary-pill gray">⚪ No sé: <strong>' + summary['no-se'].length + '</strong></span>' +
            '</div>';
        if (mode === 'full') {
            html += '<div class="catalog-detail">';
            ['si', 'parcial', 'no', 'no-se'].forEach(function (st) {
                summary[st].forEach(function (row) {
                    var attrs = (row.item.attributes || []).map(function (a) { return '<span class="attr-pill">' + a + '</span>'; }).join(' ');
                    var nAttrs = (row.item.attributes || []).length;
                    var desc = row.item.description ? '<p class="catalog-desc">"' + escapeHtml(row.item.description) + '"</p>' : '';
                    html += '<div class="catalog-item catalog-item-' + st + '">' +
                        '<h4>' + getAmbitoDisplayName(row.id) + ' — ' + stateLabels[st] + '</h4>' +
                        desc +
                        (attrs ? '<div class="catalog-attrs"><strong>Atributos cumplidos (' + nAttrs + '/5):</strong> ' + attrs + '</div>' : '') +
                        '</div>';
                });
            });
            html += '</div>';
        }
        html += '</div>';
        el.innerHTML = html;
    });
}

// ============================================================
// CURSO 6 DI — Mi Aporte al DI
// Catalogo de 24 metas-tipo (8 ambitos x 3 tipologias) + plan-builder
// ============================================================

var META_TIPO_CATALOG = [
    { id: 'G-doc', tipologia: 'doc', ambito: 'Gobernanza', plazo: 6, label: '🟢 G-doc · Escribir la práctica de gobernanza del grupo y compartirla con la región (6 meses)' },
    { id: 'G-fort', tipologia: 'fort', ambito: 'Gobernanza', plazo: 3, label: '🟡 G-fort · Implementar firma de acta al cierre + convocar al control financiero al consejo (3 meses)' },
    { id: 'G-crear', tipologia: 'crear', ambito: 'Gobernanza', plazo: 3, label: '🔴 G-crear · Establecer ritual de reunión del consejo: agenda, acta, decisiones registradas (3 meses)' },
    { id: 'A-doc', tipologia: 'doc', ambito: 'Administración', plazo: 6, label: '🟢 A-doc · Escribir el procedimiento administrativo del grupo (6 meses)' },
    { id: 'A-fort', tipologia: 'fort', ambito: 'Administración', plazo: 6, label: '🟡 A-fort · Inventario completo de activos + voluntariado formalizado (6 meses)' },
    { id: 'A-crear', tipologia: 'crear', ambito: 'Administración', plazo: 3, label: '🔴 A-crear · Lista nominal del equipo y los bienes del grupo (3 meses)' },
    { id: 'RE-doc', tipologia: 'doc', ambito: 'Recursos Económicos', plazo: 6, label: '🟢 RE-doc · Escribir el plan financiero del grupo (6 fuentes, margen ≥17%) (6 meses)' },
    { id: 'RE-fort', tipologia: 'fort', ambito: 'Recursos Económicos', plazo: 6, label: '🟡 RE-fort · Libro contable básico + diversificar al menos 2 fuentes adicionales (6 meses)' },
    { id: 'RE-crear', tipologia: 'crear', ambito: 'Recursos Económicos', plazo: 3, label: '🔴 RE-crear · Abrir cuenta bancaria del grupo si no existe (3 meses)' },
    { id: 'C-doc', tipologia: 'doc', ambito: 'Comunicaciones', plazo: 6, label: '🟢 C-doc · Escribir el manual de comunicaciones del grupo (6 meses)' },
    { id: 'C-fort', tipologia: 'fort', ambito: 'Comunicaciones', plazo: 6, label: '🟡 C-fort · Comunicación mensual con familias + protocolo de crisis (6 meses)' },
    { id: 'C-crear', tipologia: 'crear', ambito: 'Comunicaciones', plazo: 3, label: '🔴 C-crear · Crear el canal mínimo de comunicación con las familias (3 meses)' },
    { id: 'RI-doc', tipologia: 'doc', ambito: 'Relaciones Internacionales', plazo: 12, label: '🟢 RI-doc · Sistematizar la experiencia internacional del grupo (12 meses)' },
    { id: 'RI-fort', tipologia: 'fort', ambito: 'Relaciones Internacionales', plazo: 12, label: '🟡 RI-fort · Postular el grupo a un proyecto mundial de OMMS (12 meses)' },
    { id: 'RI-crear', tipologia: 'crear', ambito: 'Relaciones Internacionales', plazo: 12, label: '🔴 RI-crear · Conectar el grupo con al menos un programa mundial (12 meses)' },
    { id: 'CR-doc', tipologia: 'doc', ambito: 'Crecimiento', plazo: 6, label: '🟢 CR-doc · Escribir el método de crecimiento del grupo (6 meses)' },
    { id: 'CR-fort', tipologia: 'fort', ambito: 'Crecimiento', plazo: 6, label: '🟡 CR-fort · Plan de Captación anual + SiScout al día + crecimiento ≥2% (6 meses)' },
    { id: 'CR-crear', tipologia: 'crear', ambito: 'Crecimiento', plazo: 3, label: '🔴 CR-crear · Registro mensual de ingresos y salidas de membresía (3 meses)' },
    { id: 'GR-doc', tipologia: 'doc', ambito: 'Gestión del Riesgo', plazo: 6, label: '🟢 GR-doc · Escribir el manual de gestión del riesgo del grupo (6 meses)' },
    { id: 'GR-fort', tipologia: 'fort', ambito: 'Gestión del Riesgo', plazo: 6, label: '🟡 GR-fort · 100 % del equipo con A Salvo del Peligro + Protocolo de Transporte (6 meses)' },
    { id: 'GR-crear', tipologia: 'crear', ambito: 'Gestión del Riesgo', plazo: 3, label: '🔴 GR-crear · Protocolo mínimo en TODAS las salidas (3 meses)' },
    { id: 'CT-doc', tipologia: 'doc', ambito: 'Control y Reconocimiento', plazo: 12, label: '🟢 CT-doc · Escribir el sistema de control y reconocimientos del grupo (12 meses)' },
    { id: 'CT-fort', tipologia: 'fort', ambito: 'Control y Reconocimiento', plazo: 6, label: '🟡 CT-fort · Asamblea Anual según Reglamento + reconocimiento anual de dirigentes (6 meses)' },
    { id: 'CT-crear', tipologia: 'crear', ambito: 'Control y Reconocimiento', plazo: 3, label: '🔴 CT-crear · Verificar y poner al día la documentación legal del grupo (3 meses)' }
];

// --- Brujula display (lee reflexion del Curso 2 L6 desde localStorage cross-curso) ---
function getBrujulaText(sourceCourseId, sourceModule) {
    try {
        var raw = localStorage.getItem('courseProgress_' + sourceCourseId);
        if (!raw) return null;
        var p = JSON.parse(raw);
        if (!p || !p.reflections) return null;
        var modKey = String(sourceModule || '6');
        return p.reflections[modKey] || p.reflections[parseInt(modKey, 10)] || null;
    } catch (e) { return null; }
}

function renderBrujulaDisplays() {
    document.querySelectorAll('.brujula-display').forEach(function (el) {
        var srcCourse = el.getAttribute('data-source-course') || 'pndi-marco-y-principios';
        var srcModule = el.getAttribute('data-source-module') || '6';
        var txt = getBrujulaText(srcCourse, srcModule);
        if (!txt || !txt.trim()) {
            el.innerHTML = '<div class="brujula-display-empty">ℹ️ <strong>Aún no registramos tu brújula personal.</strong><br>Para que este componente se llene, definí tu brújula como reflexión en el <strong>Curso 2 — La Política PNDI: Marco y Principios — Lección 6</strong>. Si ya lo hiciste en otro dispositivo, pulsá "Recuperar mi avance" en la pantalla de inicio.</div>';
            return;
        }
        el.innerHTML = '<div class="brujula-display-content">' +
            '<div class="brujula-display-label">🧭 Tu brújula personal del Curso 2:</div>' +
            '<blockquote class="brujula-display-text">' + escapeHtml(txt) + '</blockquote>' +
        '</div>';
    });
}

// --- Brujula action (detecta el principio elegido y sugiere accion contextual) ---
function detectarPrincipioEnBrujula(txt) {
    if (!txt) return null;
    var low = txt.toLowerCase();
    var principios = [
        { keys: ['participación juvenil', 'participacion juvenil'], name: 'Participación Juvenil', advice: 'Priorizá metas que involucren a los chicos en las decisiones. Por ejemplo: en <strong>CR-fort</strong> (Plan de Captación) involucrá al clan; en <strong>C-fort</strong> (comunicación con familias) usá un boletín hecho con los rovers.' },
        { keys: ['normatividad'], name: 'Normatividad', advice: 'Cuidá el cumplimiento del marco legal y reglamentario. <strong>CT-crear</strong> (documentación legal) y <strong>GR-crear/GR-fort</strong> (protocolos de riesgo) saltan al primer lugar de tu lista.' },
        { keys: ['coherencia'], name: 'Coherencia', advice: 'Que lo que prometemos lo cumplamos. <strong>C-fort</strong> (comunicación mensual con familias) y <strong>CT-fort</strong> (Asamblea según Reglamento) van al frente.' },
        { keys: ['colectividad', 'consenso'], name: 'Colectividad y Consenso', advice: 'Las decisiones se toman con todos los actores. <strong>G-crear/G-fort</strong> (gobernanza con actas y control colegiado) suben en prioridad.' },
        { keys: ['aspiracional', 'transformacional'], name: 'Aspiracional y Transformacional', advice: 'Empujá metas que muevan al grupo hacia adelante. <strong>RI-fort/RI-crear</strong> (proyectos mundiales OMMS) y <strong>CR-fort</strong> (crecimiento ≥2 %) primero.' },
        { keys: ['prospectiva'], name: 'Prospectiva', advice: 'Decidí pensando en 5-10 años. <strong>RE-doc</strong> (plan financiero) y <strong>CT-doc</strong> (sistema de control) priman.' },
        { keys: ['dinamismo', 'flexibilidad'], name: 'Dinamismo y Flexibilidad', advice: 'Adaptarse al entorno cambiante. <strong>A-fort</strong> (inventario actualizado) y <strong>C-fort</strong> (canales de comunicación modernos) primero.' }
    ];
    for (var i = 0; i < principios.length; i++) {
        for (var j = 0; j < principios[i].keys.length; j++) {
            if (low.indexOf(principios[i].keys[j]) !== -1) return principios[i];
        }
    }
    return null;
}

function renderBrujulaActions() {
    document.querySelectorAll('.brujula-action').forEach(function (el) {
        var srcCourse = el.getAttribute('data-source-course') || 'pndi-marco-y-principios';
        var srcModule = el.getAttribute('data-source-module') || '6';
        var txt = getBrujulaText(srcCourse, srcModule);
        var matched = detectarPrincipioEnBrujula(txt);
        if (!matched) {
            el.innerHTML = '<div class="brujula-action-empty">ℹ️ Definí tu brújula en el <strong>Curso 2 — Lección 6</strong> (con uno de los 7 principios) y volvé a esta lección para ver tu sugerencia personalizada.</div>';
            return;
        }
        el.innerHTML = '<div class="brujula-action-content">' +
            '<div class="brujula-action-label">🧭 Tu brújula es <strong>' + matched.name + '</strong>. Esto te sugiere:</div>' +
            '<p class="brujula-action-advice">' + matched.advice + '</p>' +
        '</div>';
    });
}

// --- Courses suggestion (lee catalogo y propone cursos N2 segun brechas) ---
function renderCoursesSuggestions() {
    document.querySelectorAll('.courses-suggestion').forEach(function (el) {
        var catId = el.getAttribute('data-catalog-id') || 'catalogo-buenas-practicas-grupo';
        var data = getCatalogData(catId);
        if (!data || Object.keys(data).length === 0) {
            el.innerHTML = '<div class="courses-suggestion-empty">ℹ️ Para ver sugerencias personalizadas, completá tu catálogo en el <strong>Curso 5 — Buenas Prácticas en Tu Grupo</strong>.</div>';
            return;
        }
        var coursesByAmbito = {
            'gobernanza': '🏛️ Curso 7 — Gobernanza Práctica',
            'administracion': '🗂️ Curso 9 — Administración del Grupo',
            'recursos-economicos': '💰 Curso 10 — Finanzas Sanas: Presupuesto y Tesorería',
            'comunicaciones': '📣 Curso 12 — Comunicaciones y Relaciones Interinstitucionales',
            'crecimiento': '📈 Curso 13 — Crecimiento y Sistema de Información',
            'gestion-del-riesgo': '🛡️ Curso 14 — Gestión del Riesgo',
            'control-y-reconocimiento': '🏅 Curso 20 — Órganos de control y disciplina (Nivel 3)'
        };
        var suggestions = [];
        Object.keys(data).forEach(function (aid) {
            var state = (data[aid].state || '').toLowerCase();
            var course = coursesByAmbito[aid];
            if (course && (state === 'no' || state === 'parcial')) {
                suggestions.push({ ambito: aid, course: course, priority: state === 'no' ? 0 : 1, state: state });
            }
        });
        suggestions.sort(function (a, b) { return a.priority - b.priority; });
        var top3 = suggestions.slice(0, 3);
        if (top3.length === 0) {
            el.innerHTML = '<div class="courses-suggestion-content courses-suggestion-strong">' +
                '<p>🌟 <strong>Tu grupo es referencia.</strong> Tu catálogo no muestra ámbitos en NO o PARCIAL — considerá tomar el <strong>Curso 22 (Buenas Prácticas Institucionales)</strong> del Nivel 4 para documentar y compartir tus prácticas con la región.</p>' +
            '</div>';
            return;
        }
        var html = '<div class="courses-suggestion-content"><p><strong>Cursos del Nivel 2 sugeridos según tu catálogo:</strong></p><ul class="courses-suggestion-list">';
        top3.forEach(function (s) {
            var stLabel = s.state === 'no' ? '🔴 NO' : '🟡 PARCIAL';
            html += '<li><strong>' + s.course + '</strong> <em>(tu ámbito está en ' + stLabel + ')</em></li>';
        });
        html += '</ul><p class="courses-suggestion-disclaimer">📅 Los Cursos 7-14 del Nivel 2 están en construcción; esta sugerencia te orienta para cuando estén disponibles.</p></div>';
        el.innerHTML = html;
    });
}

// --- Goal-planner (Curso 6 L4) ---
function renderGoalPlanners() {
    document.querySelectorAll('.goal-planner').forEach(function (el) {
        var planId = el.getAttribute('data-plan-id');
        var maxAdopted = parseInt(el.getAttribute('data-max-adopted') || '5', 10);
        var slotsEl = document.getElementById('gp-slots-' + planId);
        if (!slotsEl) return;
        var html = '';
        for (var i = 0; i < maxAdopted; i++) {
            html += renderGoalSlot(planId, i);
        }
        slotsEl.innerHTML = html;
        restoreGoalPlannerState(planId);
    });
}

function renderGoalSlot(planId, idx) {
    var options = '<option value="">— Elegí una meta-tipo —</option>';
    var currentAmbito = '';
    META_TIPO_CATALOG.forEach(function (m) {
        if (m.ambito !== currentAmbito) {
            if (currentAmbito) options += '</optgroup>';
            options += '<optgroup label="' + escapeHtml(m.ambito) + '">';
            currentAmbito = m.ambito;
        }
        options += '<option value="' + m.id + '">' + escapeHtml(m.label) + '</option>';
    });
    if (currentAmbito) options += '</optgroup>';
    options += '<option value="custom">✏️ Una meta propia (no de las 24)</option>';
    return '<div class="goal-slot" data-slot-idx="' + idx + '">' +
        '<h4 class="goal-slot-title">Meta ' + (idx + 1) + '</h4>' +
        '<label class="goal-field-label">Elegí una meta-tipo o creá una propia:</label>' +
        '<select class="goal-meta-select" data-slot-idx="' + idx + '" onchange="onGoalMetaChange(\'' + planId + '\', ' + idx + ', this.value)">' + options + '</select>' +
        '<div class="goal-fields hidden" id="gf-' + planId + '-' + idx + '">' +
            '<div class="goal-custom-desc hidden">' +
                '<label class="goal-field-label">📝 Tu meta propia (descripción):</label>' +
                '<textarea class="goal-custom-textarea" placeholder="Describí tu meta en una frase…" onchange="saveGoalField(\'' + planId + '\', ' + idx + ', \'customDescription\', this.value)"></textarea>' +
            '</div>' +
            '<label class="goal-field-label">⏰ Plazo:</label>' +
            '<select class="goal-plazo-select" onchange="saveGoalField(\'' + planId + '\', ' + idx + ', \'plazo\', this.value)">' +
                '<option value="3">3 meses</option>' +
                '<option value="6" selected>6 meses</option>' +
                '<option value="12">12 meses</option>' +
            '</select>' +
            '<label class="goal-field-label">▶️ Primer paso (esta semana):</label>' +
            '<textarea class="goal-textarea goal-primer-paso" placeholder="Qué vas a hacer concretamente esta semana…" onchange="saveGoalField(\'' + planId + '\', ' + idx + ', \'primerPaso\', this.value)"></textarea>' +
            '<label class="goal-field-label">🤝 Persona con quien hablar primero:</label>' +
            '<input class="goal-input goal-persona" type="text" placeholder="Ej: Presidente del Consejo, Tesorero…" onchange="saveGoalField(\'' + planId + '\', ' + idx + ', \'persona\', this.value)">' +
            '<label class="goal-field-label">✅ Señal de cumplimiento:</label>' +
            '<textarea class="goal-textarea goal-senal" placeholder="Cómo sabrás que se cumplió esta meta…" onchange="saveGoalField(\'' + planId + '\', ' + idx + ', \'senal\', this.value)"></textarea>' +
        '</div>' +
    '</div>';
}

function onGoalMetaChange(planId, idx, value) {
    if (!personalPlans[planId]) personalPlans[planId] = { goals: [] };
    if (!personalPlans[planId].goals[idx]) personalPlans[planId].goals[idx] = {};
    personalPlans[planId].goals[idx].metaId = value;
    var fieldsEl = document.getElementById('gf-' + planId + '-' + idx);
    if (!fieldsEl) { saveProgress(); return; }
    var customDescEl = fieldsEl.querySelector('.goal-custom-desc');
    if (value) {
        fieldsEl.classList.remove('hidden');
        if (value === 'custom') {
            if (customDescEl) customDescEl.classList.remove('hidden');
        } else {
            if (customDescEl) customDescEl.classList.add('hidden');
            // Auto-preselect plazo from META_TIPO_CATALOG
            var meta = META_TIPO_CATALOG.filter(function (m) { return m.id === value; })[0];
            if (meta) {
                var plazoSel = fieldsEl.querySelector('.goal-plazo-select');
                if (plazoSel) {
                    plazoSel.value = String(meta.plazo);
                    personalPlans[planId].goals[idx].plazo = String(meta.plazo);
                }
            }
        }
    } else {
        fieldsEl.classList.add('hidden');
    }
    saveProgress();
}

function saveGoalField(planId, idx, field, value) {
    if (!personalPlans[planId]) personalPlans[planId] = { goals: [] };
    if (!personalPlans[planId].goals[idx]) personalPlans[planId].goals[idx] = {};
    personalPlans[planId].goals[idx][field] = value;
    saveProgress();
}

function restoreGoalPlannerState(planId) {
    var plan = personalPlans[planId];
    if (!plan || !plan.goals) return;
    plan.goals.forEach(function (goal, idx) {
        if (!goal) return;
        var slot = document.querySelector('#gp-slots-' + planId + ' .goal-slot[data-slot-idx="' + idx + '"]');
        if (!slot) return;
        var metaSel = slot.querySelector('.goal-meta-select');
        if (metaSel && goal.metaId) {
            metaSel.value = goal.metaId;
            // Disparar onGoalMetaChange para mostrar los campos correctos
            var fieldsEl = document.getElementById('gf-' + planId + '-' + idx);
            if (fieldsEl) {
                fieldsEl.classList.remove('hidden');
                var customDescEl = fieldsEl.querySelector('.goal-custom-desc');
                if (goal.metaId === 'custom') {
                    if (customDescEl) customDescEl.classList.remove('hidden');
                } else if (customDescEl) {
                    customDescEl.classList.add('hidden');
                }
            }
        }
        if (goal.plazo) {
            var plazoSel = slot.querySelector('.goal-plazo-select');
            if (plazoSel) plazoSel.value = String(goal.plazo);
        }
        if (goal.primerPaso) {
            var taPaso = slot.querySelector('.goal-primer-paso');
            if (taPaso) taPaso.value = goal.primerPaso;
        }
        if (goal.persona) {
            var pers = slot.querySelector('.goal-persona');
            if (pers) pers.value = goal.persona;
        }
        if (goal.senal) {
            var taSenal = slot.querySelector('.goal-senal');
            if (taSenal) taSenal.value = goal.senal;
        }
        if (goal.customDescription) {
            var taCustom = slot.querySelector('.goal-custom-textarea');
            if (taCustom) taCustom.value = goal.customDescription;
        }
    });
}

function saveGoalPlanner(planId) {
    var plan = personalPlans[planId] || { goals: [] };
    var adopted = (plan.goals || []).filter(function (g) { return g && g.metaId; });
    plan.goals = adopted;
    personalPlans[planId] = plan;
    saveProgress();
    if (userProfile && userProfile.email && typeof sendToGoogleSheets === 'function') {
        sendToGoogleSheets({
            action: 'plan',
            email: userProfile.email,
            name: userProfile.fullName,
            course: COURSE_CONFIG.courseId,
            planId: planId,
            planType: 'goal-planner-di',
            contenido: plan
        });
    }
    var statusEl = document.getElementById('gp-status-' + planId);
    if (statusEl) {
        statusEl.classList.remove('hidden');
        statusEl.innerHTML = '<strong>✅ Tu plan se guardó.</strong> Tenés <strong>' + adopted.length + '</strong> meta' + (adopted.length === 1 ? '' : 's') + ' adoptada' + (adopted.length === 1 ? '' : 's') + '. Podés modificarlo y volver a guardar cuando quieras.';
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showNotification('✅ Plan guardado');
}

// --- PDF generator del plan personal (Curso 6 L6) ---
function generatePlanPDF(planId) {
    var content = buildPlanPrintableHTML(planId);
    var win = window.open('', '_blank');
    if (!win) {
        showNotification('⚠️ El navegador bloqueó la ventana. Permití pop-ups y volvé a intentar.', 'warning');
        return;
    }
    win.document.open();
    win.document.write(content);
    win.document.close();
    setTimeout(function () {
        try { win.focus(); win.print(); } catch (e) { /* ignore */ }
    }, 600);
}

function buildPlanPrintableHTML(planId) {
    var fullName = (userProfile && userProfile.fullName) || 'Adulto del Movimiento';
    var grupo = (userProfile && userProfile.group) || '—';
    var region = (userProfile && userProfile.region) || '—';
    var dateStr = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    var catalog = getCatalogData('catalogo-buenas-practicas-grupo') || {};
    var brujula = getBrujulaText('pndi-marco-y-principios', '6') || '';
    var plan = personalPlans[planId] || { goals: [] };
    var adopted = (plan.goals || []).filter(function (g) { return g && g.metaId; });

    var stateLabels = { si: '🟢 Sí', parcial: '🟡 Parcial', no: '🔴 No', 'no-se': '⚪ No sé' };
    var summary = { si: 0, parcial: 0, no: 0, 'no-se': 0 };
    Object.keys(catalog).forEach(function (k) {
        var st = catalog[k].state;
        if (st && summary[st] !== undefined) summary[st]++;
    });

    var catalogHTML = '';
    Object.keys(catalog).forEach(function (aid) {
        var it = catalog[aid] || {};
        var stLabel = stateLabels[it.state] || '—';
        var aName = getAmbitoDisplayName(aid);
        var attrs = (it.attributes || []).join(', ');
        var desc = it.description || '';
        catalogHTML += '<div class="pp-cat-item"><h4>' + aName + ' — ' + stLabel + '</h4>' +
            (desc ? '<p>"' + escapeHtml(desc) + '"</p>' : '') +
            (attrs ? '<p class="pp-cat-attrs"><em>Atributos:</em> ' + escapeHtml(attrs) + '</p>' : '') +
            '</div>';
    });
    if (!catalogHTML) catalogHTML = '<p><em>Sin catálogo registrado todavía. Completá el Curso 5.</em></p>';

    var goalsHTML = '';
    adopted.forEach(function (g, idx) {
        var meta = META_TIPO_CATALOG.filter(function (m) { return m.id === g.metaId; })[0];
        var title = meta ? meta.label : (g.metaId === 'custom' ? '✏️ Meta propia' : g.metaId);
        var customDesc = (g.metaId === 'custom' && g.customDescription) ? '<p class="pp-goal-custom">' + escapeHtml(g.customDescription) + '</p>' : '';
        goalsHTML += '<div class="pp-goal">' +
            '<h4>' + (idx + 1) + '. ' + escapeHtml(title) + '</h4>' +
            customDesc +
            '<dl>' +
                '<dt>⏰ Plazo:</dt><dd>' + escapeHtml(String(g.plazo || '—')) + ' meses</dd>' +
                '<dt>▶️ Primer paso (esta semana):</dt><dd>' + escapeHtml(g.primerPaso || '—') + '</dd>' +
                '<dt>🤝 Persona con quien hablar primero:</dt><dd>' + escapeHtml(g.persona || '—') + '</dd>' +
                '<dt>✅ Señal de cumplimiento:</dt><dd>' + escapeHtml(g.senal || '—') + '</dd>' +
            '</dl>' +
        '</div>';
    });
    if (!goalsHTML) goalsHTML = '<p><em>Sin metas adoptadas. Volvé al plan-builder y elegí al menos una meta antes de generar el PDF.</em></p>';

    // Suggested N2 courses
    var coursesByAmbito = {
        'gobernanza': '🏛️ Curso 7 — Gobernanza Práctica',
        'administracion': '🗂️ Curso 9 — Administración del Grupo',
        'recursos-economicos': '💰 Curso 10 — Finanzas Sanas',
        'comunicaciones': '📣 Curso 12 — Comunicaciones',
        'crecimiento': '📈 Curso 13 — Crecimiento',
        'gestion-del-riesgo': '🛡️ Curso 14 — Gestión del Riesgo',
        'control-y-reconocimiento': '🏅 Curso 20 — Órganos de control y disciplina'
    };
    var sugg = [];
    Object.keys(catalog).forEach(function (aid) {
        var state = (catalog[aid].state || '').toLowerCase();
        if (coursesByAmbito[aid] && (state === 'no' || state === 'parcial')) {
            sugg.push({ course: coursesByAmbito[aid], priority: state === 'no' ? 0 : 1 });
        }
    });
    sugg.sort(function (a, b) { return a.priority - b.priority; });
    var top3 = sugg.slice(0, 3);
    var coursesHTML = top3.length ? '<ul>' + top3.map(function (s) { return '<li>' + s.course + '</li>'; }).join('') + '</ul>' :
        '<p><em>Tu grupo está sólido — considerá el Curso 22 (Buenas Prácticas Institucionales) del Nivel 4 para documentar y compartir tus prácticas.</em></p>';

    return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
        '<title>Mi Aporte al DI — ' + escapeHtml(fullName) + '</title>' +
        '<style>' +
            'body{font-family:Arial,sans-serif;max-width:800px;margin:24px auto;padding:0 24px;color:#222;line-height:1.55;}' +
            'h1{color:#622599;text-align:center;margin:0 0 4px 0;}' +
            'h2{color:#622599;border-bottom:2px solid #622599;padding-bottom:4px;margin:24px 0 12px 0;}' +
            'h3{color:#4a1c75;margin:18px 0 6px 0;}' +
            'h4{color:#333;margin:10px 0 4px 0;}' +
            '.pp-meta{text-align:center;color:#666;font-style:italic;margin-bottom:18px;}' +
            '.pp-summary{display:flex;gap:10px;padding:10px;background:#f8f5fc;border-radius:6px;margin:10px 0;flex-wrap:wrap;justify-content:center;}' +
            '.pp-summary span{padding:5px 12px;background:#fff;border-radius:14px;font-size:0.92em;}' +
            '.pp-cat-item{padding:10px 14px;background:#fff;border-left:3px solid #622599;margin:8px 0;border-radius:4px;page-break-inside:avoid;}' +
            '.pp-cat-item p{margin:4px 0;}' +
            '.pp-cat-attrs{font-size:0.88em;color:#555;}' +
            '.pp-goal{background:#f8f5fc;border-left:4px solid #622599;padding:14px 18px;margin:12px 0;border-radius:6px;page-break-inside:avoid;}' +
            '.pp-goal-custom{font-style:italic;color:#555;margin:6px 0;}' +
            '.pp-goal dl{margin:6px 0;}' +
            '.pp-goal dt{font-weight:600;margin-top:6px;color:#444;}' +
            '.pp-goal dd{margin-left:20px;margin-bottom:6px;}' +
            '.pp-brujula{background:#fff8e1;padding:14px 18px;border-left:4px solid #ffa000;border-radius:6px;font-style:italic;margin:10px 0;}' +
            '.pp-signatures{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:60px;}' +
            '.pp-sigblock{border-top:1px solid #333;padding-top:6px;text-align:center;font-size:0.9em;}' +
            '.pp-footer{text-align:center;margin-top:40px;padding-top:10px;border-top:1px solid #eee;font-size:0.85em;color:#999;}' +
            '@media print{body{margin:0;}h1,h2{page-break-after:avoid;}}' +
        '</style></head><body>' +
        '<h1>📋 Mi Aporte al Desarrollo Institucional</h1>' +
        '<p class="pp-meta"><strong>' + escapeHtml(fullName) + '</strong> · Grupo ' + escapeHtml(grupo) + ' · Región ' + escapeHtml(region) + ' · ' + dateStr + '</p>' +
        '<h2>1. Mi catálogo de buenas prácticas (Curso 5)</h2>' +
        '<div class="pp-summary">' +
            '<span>🟢 Sí: <strong>' + summary.si + '</strong></span>' +
            '<span>🟡 Parcial: <strong>' + summary.parcial + '</strong></span>' +
            '<span>🔴 No: <strong>' + summary.no + '</strong></span>' +
            '<span>⚪ No sé: <strong>' + summary['no-se'] + '</strong></span>' +
        '</div>' +
        catalogHTML +
        '<h2>2. Mi brújula personal (Curso 2)</h2>' +
        (brujula ? '<div class="pp-brujula">"' + escapeHtml(brujula) + '"</div>' : '<p><em>Sin brújula registrada todavía. Completá el Curso 2 — Lección 6.</em></p>') +
        '<h2>3. Mis metas adoptadas (' + adopted.length + ')</h2>' +
        goalsHTML +
        '<h2>4. Cursos del Nivel 2 sugeridos</h2>' +
        coursesHTML +
        '<h2>5. Compromiso de firma</h2>' +
        '<div class="pp-signatures">' +
            '<div class="pp-sigblock">Firma personal<br><strong>' + escapeHtml(fullName) + '</strong></div>' +
            '<div class="pp-sigblock">Firma del Presidente del Consejo<br><em>(testigo opcional)</em></div>' +
        '</div>' +
        '<p class="pp-footer">Plataforma de Formación de Adultos — Asociación Scouts de Colombia · Línea Desarrollo Institucional · Curso 6 (cierre del Nivel 1)</p>' +
        '</body></html>';
}

// --- Timers ---
// Incrementar studyTime cada minuto y guardar progreso (solo si esta en un modulo de contenido)
setInterval(function () {
    if (currentModule > 0) {
        studyTime += 1;
        updateStats();
        updateElapsedTime();
    }
    saveProgress();
}, 60000);
