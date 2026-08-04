// ============================================
// engine.linea.js — EXTENSIÓN de la línea Desarrollo Institucional
// Se concatena ANTES de engine.core.js (aquí viven las variables globales).
//
// Qué va aquí: lo que NO es idéntico en las 3 líneas — textos propios (el número
// del curso al que se remite, el pie del PDF) y componentes exclusivos de la línea.
// Lo demás está en el núcleo compartido; si tocas algo que también usan las otras
// líneas, va en _MOTOR/engine.core.js del repo raíz, no aquí.
// ============================================

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

// Version de la escala de grados de dominio del autodiagnostico de competencias.
// Subir este numero cuando cambien los criterios de los grados: invalida los perfiles
// ya guardados, que quedarian describiendo peldanos distintos a los que el adulto eligio.
// v2 (02-ago-2026): correccion doctrinal de los grados en 4 de las 7 competencias
// (DECISIONES.md raiz ADR-023, Fase 2). Ver ESTADO-AUDITORIA.md.
const COMPETENCY_SCALE_VERSION = 2;

// --- Escritura segura en localStorage ---
// saveProgress() no manejaba el fallo en absoluto y mostraba el indicador de "guardado"
// sin comprobar que la escritura hubiera funcionado. Si localStorage falla (cuota llena,
// modo privado de Safari, almacenamiento bloqueado por politica del navegador), el
// estudiante veia el visto verde y perdia su trabajo sin enterarse. Ahora se entera.
var _avisoAlmacenamiento = false;



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

// --- Persistencia ---
function saveProgress() {
    var key = 'courseProgress_' + COURSE_CONFIG.courseId;
    var progress = {
        userProfile: userProfile, moduleProgress: moduleProgress,
        quizScores: quizScores, studyTime: studyTime, reflections: reflections, photos: photos, selfAssessments: selfAssessments, personalPlans: personalPlans, practicesCatalogs: practicesCatalogs,
        currentModule: currentModule, startTime: startTime.toISOString(),
        lastSaved: new Date().toISOString(), version: '3.0'
    };
    // Solo confirmar visualmente si la escritura funciono de verdad.
    if (!guardarLocal(key, JSON.stringify(progress))) return;
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
        if (typeof initPlanBuilders === 'function') initPlanBuilders();
        if (typeof restorePracticesCatalogs === 'function') restorePracticesCatalogs();
        updateStats();
        updateProgress();
    }
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
    // Por guardarLocal, no en un catch vacio (AUDITORIA.md check E-bis): si el
    // almacenamiento falla, el alumno pierde su trabajo sin ningun aviso.
    guardarLocal('competencyProfile', JSON.stringify({
            grades: data.grades,
            strengths: data.strengths,
            opportunities: data.opportunities,
            completedAt: data.completedAt,
            sourceCourse: COURSE_CONFIG.courseId,
            scaleVersion: COMPETENCY_SCALE_VERSION
        }));
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
    if (isProfileStale(profile)) {
        if (banner) {
            banner.classList.add('no-profile');
            banner.innerHTML = '<strong>🔄 Actualizamos el autodiagnóstico.</strong><br>Corregimos los grados de varias competencias para que coincidan con el diccionario oficial, así que tu perfil anterior ya no describe los mismos peldaños. <strong>Vuelve a hacer el autodiagnóstico</strong> — son pocos minutos y tu plan quedará bien calibrado. Mientras tanto puedes marcar las competencias a mano.';
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
                        guardarLocal(cid, JSON.stringify(serverData.catalogs[cid]));
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
                                guardarLocal(key, JSON.stringify(existing));
                            } catch (e) { /* el aviso lo da guardarLocal */ }
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
    guardarLocal(catalogId, JSON.stringify(data));
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
            'recursos-economicos': '💰 Curso 11 — Captación de Fondos y Ciclo de Proyectos',
            'comunicaciones': '📣 Curso 12 — Comunicaciones y Relaciones Interinstitucionales',
            'relaciones-internacionales': '📣 Curso 12 — Comunicaciones y Relaciones Interinstitucionales',
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
        '<select class="goal-meta-select" aria-label="Meta-tipo para la prioridad ' + (idx + 1) + '" data-slot-idx="' + idx + '" onchange="onGoalMetaChange(\'' + planId + '\', ' + idx + ', this.value)">' + options + '</select>' +
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
        'recursos-economicos': '💰 Curso 11 — Captación de Fondos y Ciclo de Proyectos',
        'comunicaciones': '📣 Curso 12 — Comunicaciones',
        'relaciones-internacionales': '📣 Curso 12 — Comunicaciones',
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
