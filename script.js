// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data (assuming data.js is loaded before this script) ---
    // const teachers = window.teachers;
    // const classes = window.classes;
    // const absences = window.absences;
    // const weeklySchedules = window.weeklySchedules;
    // const subjects = window.subjects;
    // const students = window.students;


    // --- DOM Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const classListContainer = document.getElementById('class-list-container');
    const teacherListContainer = document.getElementById('teacher-list-container');
    const absenceListContainer = document.getElementById('absence-list-container');
    const scheduleContainer = document.getElementById('schedule-container');

    // Modals & Forms
    const classModal = document.getElementById('class-modal');
    const teacherModal = document.getElementById('teacher-modal');
    const absenceModal = document.getElementById('absence-modal');
    const confirmModal = document.getElementById('confirm-modal');

    const addClassBtn = document.getElementById('add-class-btn');
    const addTeacherBtn = document.getElementById('add-teacher-btn');
    const addAbsenceBtn = document.getElementById('add-absence-btn');

    const classForm = document.getElementById('class-form');
    const teacherForm = document.getElementById('teacher-form');
    const absenceForm = document.getElementById('absence-form');

    const classTeacherSelect = document.getElementById('class-teacher');
    const absenceEntitySelect = document.getElementById('absence-entity-id');
    const absenceEntityTypeSelect = document.getElementById('absence-entity-type');
    const selectClassSchedule = document.getElementById('select-class-schedule');
    const draggableSubjectsContainer = document.getElementById('draggable-subjects-container');
    const draggableTeachersContainer = document.getElementById('draggable-teachers-container');


    // --- Initial Setup ---
    function init() {
        setupNavigation();
        setupModalControls();
        populateTeacherDropdown();
        populateClassScheduleDropdown();

        loadClasses(); // Initial load for classes section
        loadTeachers();
        loadAbsences();
        // loadDashboardData(); // Will be called when dashboard is active

        // Event Listeners for Add Buttons
        if (addClassBtn) {
            addClassBtn.addEventListener('click', () => openModal('class-modal', 'Nieuwe Klas Toevoegen'));
        }
        if (addTeacherBtn) {
            addTeacherBtn.addEventListener('click', () => openModal('teacher-modal', 'Nieuwe Leerkracht Toevoegen'));
        }
        if (addAbsenceBtn) {
            addAbsenceBtn.addEventListener('click', () => {
                populateAbsenceEntityDropdown(); // Populate before opening
                openModal('absence-modal', 'Nieuwe Absentie Melden');
            });
        }

        // Form Submissions (basic placeholders for now)
        if (classForm) classForm.addEventListener('submit', handleClassFormSubmit);
        if (teacherForm) teacherForm.addEventListener('submit', handleTeacherFormSubmit);
        if (absenceForm) absenceForm.addEventListener('submit', handleAbsenceFormSubmit);

        if (absenceEntityTypeSelect) absenceEntityTypeSelect.addEventListener('change', populateAbsenceEntityDropdown);
        if (selectClassSchedule) selectClassSchedule.addEventListener('change', displayWeeklySchedule);

        // Set default active section (Dashboard)
        navigateToSection('dashboard-section');
    }

    // --- Navigation ---
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                navigateToSection(sectionId);
            });
        });
    }

    function navigateToSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('data-section') === sectionId) {
                navLink.classList.add('active');
            }
        });

        // Load data for specific sections when they become active
        if (sectionId === 'dashboard-section') loadDashboardData();
        if (sectionId === 'klassen-section') loadClasses();
        if (sectionId === 'leerkrachten-section') loadTeachers();
        if (sectionId === 'absenties-section') loadAbsences();
        if (sectionId === 'weekplanning-section') {
            populateDraggableSubjects();
            populateDraggableTeachers();
            if(selectClassSchedule.value) displayWeeklySchedule();
            else if (scheduleContainer) scheduleContainer.innerHTML = `<p class="text-center">Selecteer een klas om het rooster te bekijken of te bewerken.</p>`;
        }
    }

    // --- Drag and Drop Global State ---
    let draggedItemData = null; // To store data of the item being dragged

    // --- Modal Handling ---
    function setupModalControls() {
        const closeButtons = document.querySelectorAll('.modal-close');
        const cancelButtons = document.querySelectorAll('.modal-cancel-btn');

        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(button.getAttribute('data-modal-id')));
        });
        cancelButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(button.getAttribute('data-modal-id')));
        });

        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                closeModal(event.target.id);
            }
        });
    }

    function openModal(modalId, title = null, entityId = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Reset forms
        if (modalId === 'class-modal') {
            classForm.reset();
            document.getElementById('class-id').value = '';
            populateTeacherDropdown(); // Ensure dropdown is fresh
        }
        if (modalId === 'teacher-modal') {
            teacherForm.reset();
            document.getElementById('teacher-id').value = '';
        }
        if (modalId === 'absence-modal') {
            absenceForm.reset();
            document.getElementById('absence-id').value = '';
            populateAbsenceEntityDropdown(); // Ensure correct entities are listed
        }

        const modalTitleEl = modal.querySelector('.modal-content h2');
        if (modalTitleEl && title) {
            modalTitleEl.textContent = title;
        }

        // If editing, entityId would be passed to pre-fill the form (later implementation)
        // For now, this is a basic open

        modal.style.display = 'flex'; // Changed to flex for centering
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // --- Data Loading and Display ---

    // Classes
    function loadClasses() {
        if (!classListContainer) return;
        classListContainer.innerHTML = ''; // Clear existing
        classes.forEach(cls => {
            const teacher = cls.teacherId ? getTeacherById(cls.teacherId) : null;
            const card = document.createElement('div');
            card.className = 'card';
            card.classList.add(cls.section === "Kleuteronderwijs" ? 'kleuter' : 'lagere-school');
            card.innerHTML = `
                <h3>${cls.name} <span style="font-size:0.8em; color: #777;">(${cls.id})</span></h3>
                <p><strong>Niveau:</strong> ${cls.level}</p>
                <p><strong>Sectie:</strong> ${cls.section}</p>
                <p><strong>Leerkracht:</strong> ${teacher ? teacher.name : 'Niet toegewezen'}</p>
                <p><strong>Aantal Leerlingen:</strong> ${cls.students}</p>
                <div class="actions">
                    <button class="button secondary edit-class-btn" data-id="${cls.id}"><i class="fas fa-edit icon"></i>Bewerken</button>
                    <button class="button danger delete-class-btn" data-id="${cls.id}"><i class="fas fa-trash icon"></i>Verwijderen</button>
                </div>
            `;
            classListContainer.appendChild(card);
        });
        // Add event listeners for new buttons
        document.querySelectorAll('.edit-class-btn').forEach(btn => btn.addEventListener('click', (e) => handleEditClass(e.currentTarget.dataset.id)));
        document.querySelectorAll('.delete-class-btn').forEach(btn => btn.addEventListener('click', (e) => handleDeleteClass(e.currentTarget.dataset.id)));
    }

    // Teachers
    function loadTeachers() {
        if (!teacherListContainer) return;
        teacherListContainer.innerHTML = '';
        teachers.forEach(teacher => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${teacher.name} <span style="font-size:0.8em; color: #777;">(${teacher.id})</span></h3>
                <p><strong>Rol:</strong> ${teacher.subject}</p>
                <p><strong>Email:</strong> ${teacher.email || 'N.v.t.'}</p>
                <p><strong>Telefoon:</strong> ${teacher.phone || 'N.v.t.'}</p>
                <p><strong>Toegewezen klassen:</strong> ${teacher.assignedClasses.length > 0 ? teacher.assignedClasses.join(', ') : 'Geen'}</p>
                 <div class="actions">
                    <button class="button secondary edit-teacher-btn" data-id="${teacher.id}"><i class="fas fa-user-edit icon"></i>Bewerken</button>
                    <button class="button danger delete-teacher-btn" data-id="${teacher.id}"><i class="fas fa-user-minus icon"></i>Verwijderen</button>
                </div>
            `;
            teacherListContainer.appendChild(card);
        });
        document.querySelectorAll('.edit-teacher-btn').forEach(btn => btn.addEventListener('click', (e) => handleEditTeacher(e.currentTarget.dataset.id)));
        document.querySelectorAll('.delete-teacher-btn').forEach(btn => btn.addEventListener('click', (e) => handleDeleteTeacher(e.currentTarget.dataset.id)));
    }

    // Absences
    function loadAbsences() {
        if (!absenceListContainer) return;
        absenceListContainer.innerHTML = '';
        absences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // Sort by most recent
        absences.forEach(absence => {
            let entityName = '';
            if (absence.entityType === 'student') {
                const student = getStudentById(absence.entityId);
                entityName = student ? student.name : 'Onbekende Leerling';
            } else if (absence.entityType === 'teacher') {
                const teacher = getTeacherById(absence.entityId);
                entityName = teacher ? teacher.name : 'Onbekende Leerkracht';
            }

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${entityName} (${absence.entityType === 'student' ? 'Leerling' : 'Leerkracht'})</h3>
                <p><strong>Reden:</strong> ${absence.reason}</p>
                <p><strong>Startdatum:</strong> ${new Date(absence.startDate).toLocaleDateString('nl-BE')}</p>
                <p><strong>Einddatum:</strong> ${absence.endDate ? new Date(absence.endDate).toLocaleDateString('nl-BE') : 'N.v.t.'}</p>
                <p><strong>Status:</strong> <span class="status-${absence.status.toLowerCase().replace(' ', '-')}">${absence.status}</span></p>
                <div class="actions">
                    <button class="button secondary edit-absence-btn" data-id="${absence.id}"><i class="fas fa-edit icon"></i>Bewerken</button>
                    <button class="button danger delete-absence-btn" data-id="${absence.id}"><i class="fas fa-trash icon"></i>Verwijderen</button>
                </div>
            `;
            absenceListContainer.appendChild(card);
        });
        document.querySelectorAll('.edit-absence-btn').forEach(btn => btn.addEventListener('click', (e) => handleEditAbsence(e.currentTarget.dataset.id)));
        document.querySelectorAll('.delete-absence-btn').forEach(btn => btn.addEventListener('click', (e) => handleDeleteAbsence(e.currentTarget.dataset.id)));
    }

    // Dashboard Data
    function loadDashboardData() {
        const kpiTotalClasses = document.getElementById('kpi-total-classes')?.querySelector('.kpi-value');
        const kpiTotalTeachers = document.getElementById('kpi-total-teachers')?.querySelector('.kpi-value');
        const kpiAbsencesToday = document.getElementById('kpi-absences-today')?.querySelector('.kpi-value');
        const kpiScheduleConflicts = document.getElementById('kpi-schedule-conflicts')?.querySelector('.kpi-value');

        if (kpiTotalClasses) kpiTotalClasses.textContent = classes.length;
        if (kpiTotalTeachers) kpiTotalTeachers.textContent = teachers.length;

        const today = new Date().toISOString().split('T')[0];
        const absencesTodayCount = absences.filter(abs => {
            const startDate = new Date(abs.startDate).toISOString().split('T')[0];
            const endDate = abs.endDate ? new Date(abs.endDate).toISOString().split('T')[0] : startDate;
            return today >= startDate && today <= endDate;
        }).length;
        if (kpiAbsencesToday) kpiAbsencesToday.textContent = absencesTodayCount;

        // Placeholder for schedule conflicts
        if (kpiScheduleConflicts) kpiScheduleConflicts.textContent = '0'; // Implement conflict detection later
    }


    // --- Dropdown Population ---
    function populateTeacherDropdown() {
        if (!classTeacherSelect) return;
        classTeacherSelect.innerHTML = '<option value="">Geen Leerkracht Toegewezen</option>';
        teachers.forEach(teacher => {
            if (teacher.subject.toLowerCase().includes('klasleerkracht') || teacher.subject.toLowerCase().includes('zorgleerkracht')) { // Basic filter
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                classTeacherSelect.appendChild(option);
            }
        });
    }

    function populateAbsenceEntityDropdown() {
        if (!absenceEntitySelect || !absenceEntityTypeSelect) return;
        const type = absenceEntityTypeSelect.value;
        absenceEntitySelect.innerHTML = '<option value="">Selecteer...</option>';

        if (type === 'student') {
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = `${student.name} (${getClassById(student.classId)?.name || 'Klasloos'})`;
                absenceEntitySelect.appendChild(option);
            });
        } else if (type === 'teacher') {
            teachers.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                absenceEntitySelect.appendChild(option);
            });
        }
    }

    function populateClassScheduleDropdown() {
        if (!selectClassSchedule) return;
        selectClassSchedule.innerHTML = '<option value="">Selecteer een klas...</option>';
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = `${cls.name} (${cls.level})`;
            selectClassSchedule.appendChild(option);
        });
    }


    // --- Form Handlers (Placeholders for full CRUD) ---
    function handleClassFormSubmit(event) {
        event.preventDefault();
        const classId = document.getElementById('class-id').value;
        const newClass = {
            id: classId || `c${Date.now()}`, // Generate new ID if not editing
            name: document.getElementById('class-name').value,
            level: document.getElementById('class-level').value,
            section: document.getElementById('class-section').value,
            teacherId: document.getElementById('class-teacher').value || null,
            students: parseInt(document.getElementById('class-students').value) || 0,
        };

        if (classId) { // Editing existing
            const index = classes.findIndex(c => c.id === classId);
            if (index > -1) classes[index] = newClass;
        } else { // Adding new
            classes.push(newClass);
        }
        loadClasses();
        populateClassScheduleDropdown(); // Update schedule dropdown
        closeModal('class-modal');
        // TODO: Update teacher's assignedClasses if teacherId changed
    }

    function handleTeacherFormSubmit(event) {
        event.preventDefault();
        const teacherId = document.getElementById('teacher-id').value;
        const newTeacher = {
            id: teacherId || `t${Date.now()}`,
            name: document.getElementById('teacher-name').value,
            subject: document.getElementById('teacher-subject').value,
            email: document.getElementById('teacher-email').value,
            phone: document.getElementById('teacher-phone').value,
            assignedClasses: teacherId ? getTeacherById(teacherId).assignedClasses : [] // Preserve assigned classes if editing
        };
        if (teacherId) {
            const index = teachers.findIndex(t => t.id === teacherId);
            if (index > -1) teachers[index] = newTeacher;
        } else {
            teachers.push(newTeacher);
        }
        loadTeachers();
        populateTeacherDropdown(); // Update dropdowns where teachers are listed
        closeModal('teacher-modal');
    }

    function handleAbsenceFormSubmit(event) {
        event.preventDefault();
        const absenceId = document.getElementById('absence-id').value;
        const newAbsence = {
            id: absenceId || `a${Date.now()}`,
            entityType: document.getElementById('absence-entity-type').value,
            entityId: document.getElementById('absence-entity-id').value,
            reason: document.getElementById('absence-reason').value,
            startDate: document.getElementById('absence-start-date').value,
            endDate: document.getElementById('absence-end-date').value || null,
            status: document.getElementById('absence-status').value,
        };
        if (absenceId) {
            const index = absences.findIndex(a => a.id === absenceId);
            if (index > -1) absences[index] = newAbsence;
        } else {
            absences.push(newAbsence);
        }
        loadAbsences();
        closeModal('absence-modal');
    }

    // --- Edit/Delete Handlers (Placeholders) ---
    function handleEditClass(id) {
        const cls = getClassById(id);
        if (!cls) return;
        document.getElementById('class-id').value = cls.id;
        document.getElementById('class-name').value = cls.name;
        document.getElementById('class-level').value = cls.level;
        document.getElementById('class-section').value = cls.section;
        document.getElementById('class-teacher').value = cls.teacherId || "";
        document.getElementById('class-students').value = cls.students || 0;
        openModal('class-modal', `Klas Bewerken: ${cls.name}`);
    }

    function handleDeleteClass(id) {
        openConfirmModal(`Bent u zeker dat u klas ${getClassById(id)?.name} wilt verwijderen?`, () => {
            const index = classes.findIndex(c => c.id === id);
            if (index > -1) {
                // Also remove from teacher assignments
                teachers.forEach(t => {
                    t.assignedClasses = t.assignedClasses.filter(classId => classId !== id);
                });
                classes.splice(index, 1);
                loadClasses();
                loadTeachers(); // Refresh teacher view for updated assignments
                populateClassScheduleDropdown();
            }
            closeModal('confirm-modal');
        });
    }

    function handleEditTeacher(id) {
        const teacher = getTeacherById(id);
        if (!teacher) return;
        document.getElementById('teacher-id').value = teacher.id;
        document.getElementById('teacher-name').value = teacher.name;
        document.getElementById('teacher-subject').value = teacher.subject;
        document.getElementById('teacher-email').value = teacher.email || "";
        document.getElementById('teacher-phone').value = teacher.phone || "";
        openModal('teacher-modal', `Leerkracht Bewerken: ${teacher.name}`);
    }

    function handleDeleteTeacher(id) {
         openConfirmModal(`Bent u zeker dat u leerkracht ${getTeacherById(id)?.name} wilt verwijderen?`, () => {
            const index = teachers.findIndex(t => t.id === id);
            if (index > -1) {
                // Unassign from classes
                classes.forEach(c => {
                    if (c.teacherId === id) c.teacherId = null;
                });
                teachers.splice(index, 1);
                loadTeachers();
                loadClasses(); // Refresh class view for updated teacher assignments
                populateTeacherDropdown();
            }
            closeModal('confirm-modal');
        });
    }

    function handleEditAbsence(id) {
        const absence = getAbsenceById(id);
        if (!absence) return;
        document.getElementById('absence-id').value = absence.id;
        document.getElementById('absence-entity-type').value = absence.entityType;
        populateAbsenceEntityDropdown(); // Populate based on type first
        document.getElementById('absence-entity-id').value = absence.entityId;
        document.getElementById('absence-reason').value = absence.reason;
        document.getElementById('absence-start-date').value = absence.startDate;
        document.getElementById('absence-end-date').value = absence.endDate || "";
        document.getElementById('absence-status').value = absence.status;
        openModal('absence-modal', `Absentie Bewerken`);
    }

    function handleDeleteAbsence(id) {
        openConfirmModal(`Bent u zeker dat u deze absentie wilt verwijderen?`, () => {
            const index = absences.findIndex(a => a.id === id);
            if (index > -1) {
                absences.splice(index, 1);
                loadAbsences();
            }
            closeModal('confirm-modal');
        });
    }

    function openConfirmModal(message, onConfirm) {
        const confirmMessageEl = document.getElementById('confirm-modal-message');
        const confirmBtn = document.getElementById('confirm-modal-confirm-btn');
        const cancelBtn = document.getElementById('confirm-modal-cancel-btn');

        if (confirmMessageEl) confirmMessageEl.textContent = message;

        // Clone and replace to remove old event listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        newConfirmBtn.addEventListener('click', onConfirm);

        openModal('confirm-modal');
    }


    // --- Weekly Schedule Display (Basic Placeholder) ---
    function displayWeeklySchedule() {
        if (!scheduleContainer || !selectClassSchedule.value) {
            if (scheduleContainer) scheduleContainer.innerHTML = `<p class="text-center">Selecteer een klas om het rooster te bekijken of te bewerken.</p>`;
            return;
        }
        const classId = selectClassSchedule.value;
        const scheduleData = weeklySchedules[classId];
        const selectedClass = getClassById(classId);

        if (!scheduleData || !selectedClass) {
            scheduleContainer.innerHTML = `<p class="text-center">Geen rooster gevonden voor ${selectedClass?.name || 'deze klas'}.</p>`;
            return;
        }

        scheduleContainer.innerHTML = `<h2>Rooster voor ${selectedClass.name}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'schedule-grid';

        const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
        // Headers: Empty + Days
        grid.innerHTML += `<div class="schedule-header">Tijd</div>`;
        days.forEach(day => grid.innerHTML += `<div class="schedule-header">${day}</div>`);

        // Determine unique time slots from the schedule data for this class
        const timeSlots = [];
        Object.values(scheduleData).forEach(daySchedule => {
            daySchedule.forEach(item => {
                if (!timeSlots.includes(item.timeSlot)) {
                    timeSlots.push(item.timeSlot);
                }
            });
        });
        timeSlots.sort((a,b) => { // Sort time slots chronologically
            const timeA = parseInt(a.split(':')[0]) * 60 + parseInt(a.split(':')[1].split('-')[0]);
            const timeB = parseInt(b.split(':')[0]) * 60 + parseInt(b.split(':')[1].split('-')[0]);
            return timeA - timeB;
        });


        timeSlots.forEach(slot => {
            const timeSlotCell = document.createElement('div');
            timeSlotCell.className = 'time-slot';
            timeSlotCell.textContent = slot;
            grid.appendChild(timeSlotCell);

            days.forEach(day => {
                const cell = document.createElement('div');
                cell.className = 'schedule-cell';
                cell.dataset.day = day;
                cell.dataset.timeslot = slot;

                // Add D&D listeners to the cell
                cell.addEventListener('dragover', handleDragOver);
                cell.addEventListener('dragenter', handleDragEnter);
                cell.addEventListener('dragleave', handleDragLeave);
                cell.addEventListener('drop', handleDrop);

                const itemsInSlot = scheduleData[day]?.filter(item => item.timeSlot === slot) || [];
                let cellContentHTML = '';
                itemsInSlot.forEach(item => {
                    const subject = getSubjectById(item.subjectId);
                    const teacher = getTeacherById(item.teacherId);
                    const isConflict = checkForTeacherConflict(classId, day, slot, item.teacherId);

                    let conflictClass = '';
                    let conflictTooltip = '';
                    if (isConflict) {
                        conflictClass = 'conflict-warning';
                        conflictTooltip = 'Deze leerkracht heeft een conflict op dit tijdstip! ';
                    }

                    cellContentHTML += `
                        <div class="schedule-item ${conflictClass}" style="background-color: ${subject?.color || '#cccccc'};"
                             data-tooltip="${conflictTooltip}${item.activity || subject?.name} - ${teacher?.name || 'Geen leerkracht'}">
                            <div class="item-content">
                                <span class="subject">${subject?.name || 'N/A'}</span>
                                <span class="teacher">${(teacher?.name ? teacher.name.split(' ')[1] : '') || ''} ${isConflict ? '<i class="fas fa-exclamation-triangle"></i>' : ''}</span>
                            </div>
                            <span class="remove-schedule-item" title="Verwijder item"
                                  data-class-id="${classId}"
                                  data-day="${day}"
                                  data-timeslot="${slot}"
                                  data-subject-id="${item.subjectId}"
                                  data-teacher-id="${item.teacherId}">&times;</span>
                        </div>`;
                });
                cell.innerHTML = cellContentHTML || '&nbsp;'; // Set content

                // Add event listeners for remove buttons if content was added
                if (cellContentHTML) {
                    cell.querySelectorAll('.remove-schedule-item').forEach(btn => {
                        btn.addEventListener('click', handleRemoveScheduleItem);
                    });
                }
                grid.appendChild(cell);
            });
        });

        scheduleContainer.appendChild(grid);
        // setupDragAndDropListeners(); // Listeners are now added directly to cells
        updateScheduleConflictKPI(); // Update KPI after schedule display
    }

    function checkForTeacherConflict(currentClassId, day, timeSlot, teacherId) {
        if (!teacherId) return false; // No teacher, no conflict

        for (const classId in weeklySchedules) {
            if (classId === currentClassId) continue; // Don't check against the same class item

            if (weeklySchedules[classId][day]) {
                const conflictingItem = weeklySchedules[classId][day].find(item =>
                    item.timeSlot === timeSlot && item.teacherId === teacherId
                );
                if (conflictingItem) {
                    return true; // Found a conflict
                }
            }
        }
        return false; // No conflict found
    }

    function countAllConflicts() {
        let conflictCount = 0;
        const checkedSlots = {}; // To avoid double counting from the perspective of different items in the same slot

        for (const classId in weeklySchedules) {
            for (const day in weeklySchedules[classId]) {
                weeklySchedules[classId][day].forEach(item => {
                    if (item.teacherId) {
                        // Create a unique key for teacher, day, timeslot to check if already counted
                        const slotKey = `${item.teacherId}-${day}-${item.timeSlot}`;
                        if (checkedSlots[slotKey]) return; // Already processed this potential conflict group

                        let occurrences = 0;
                        for (const otherClassId in weeklySchedules) {
                            if (weeklySchedules[otherClassId][day]) {
                                weeklySchedules[otherClassId][day].forEach(otherItem => {
                                    if (otherItem.timeSlot === item.timeSlot && otherItem.teacherId === item.teacherId) {
                                        occurrences++;
                                    }
                                });
                            }
                        }
                        if (occurrences > 1) {
                            conflictCount += occurrences; // Count all items involved in this specific conflict
                            checkedSlots[slotKey] = true;
                        }
                    }
                });
            }
        }
        // The above counts each instance. If KPI should show "number of conflict groups", logic changes.
        // For now, it counts total items that are in a conflicting state.
        // A simpler KPI might be "number of slots with conflicts".
        // Let's refine to count "slots with conflicts"
        let distinctConflictSlots = 0;
        const distinctCheckedSlots = {};
         for (const classIdOuter in weeklySchedules) {
            for (const dayOuter in weeklySchedules[classIdOuter]) {
                for (const itemOuter of weeklySchedules[classIdOuter][dayOuter]) {
                    if (!itemOuter.teacherId) continue;

                    const key = `${itemOuter.day}-${itemOuter.timeSlot}-${itemOuter.teacherId}`;
                    if (distinctCheckedSlots[key]) continue; // Already processed this teacher+slot

                    let countForThisSlotAndTeacher = 0;
                    for (const classIdInner in weeklySchedules) {
                        if (weeklySchedules[classIdInner][dayOuter]) {
                            for (const itemInner of weeklySchedules[classIdInner][dayOuter]) {
                                if (itemInner.timeSlot === itemOuter.timeSlot && itemInner.teacherId === itemOuter.teacherId) {
                                    countForThisSlotAndTeacher++;
                                }
                            }
                        }
                    }
                    if (countForThisSlotAndTeacher > 1) {
                        distinctConflictSlots++;
                    }
                    distinctCheckedSlots[key] = true;
                }
            }
        }
        return distinctConflictSlots;
    }


    function updateScheduleConflictKPI() {
        const conflictCount = countAllConflicts();
        const kpiScheduleConflicts = document.getElementById('kpi-schedule-conflicts')?.querySelector('.kpi-value');
        if (kpiScheduleConflicts) {
            kpiScheduleConflicts.textContent = conflictCount;
            if (conflictCount > 0) {
                kpiScheduleConflicts.parentElement.classList.add('conflict'); // Add styling to KPI card
            } else {
                kpiScheduleConflicts.parentElement.classList.remove('conflict');
            }
        }
    }


    function handleRemoveScheduleItem(event) {
        const targetButton = event.currentTarget;
        const classId = targetButton.dataset.classId;
        const day = targetButton.dataset.day;
        const timeSlot = targetButton.dataset.timeslot;
        // const subjectId = targetButton.dataset.subjectId; // Not strictly needed for removal by slot
        // const teacherId = targetButton.dataset.teacherId; // Not strictly needed for removal by slot

        if (weeklySchedules[classId] && weeklySchedules[classId][day]) {
            const itemIndex = weeklySchedules[classId][day].findIndex(item => item.timeSlot === timeSlot);

            if (itemIndex > -1) {
                weeklySchedules[classId][day].splice(itemIndex, 1);
                if (weeklySchedules[classId][day].length === 0) {
                    delete weeklySchedules[classId][day];
                }
                if (Object.keys(weeklySchedules[classId]).length === 0) {
                    delete weeklySchedules[classId];
                }
                displayWeeklySchedule();
                updateScheduleConflictKPI(); // Update KPI after removal
            } else {
                console.warn("Could not find item to remove in schedule data:", classId, day, timeSlot);
            }
        }
    }

    // Removed setupDragAndDropListeners as listeners are added dynamically

    function handleDragStart(event, type, id, name) {
        // event.dataTransfer.setData("text/plain", JSON.stringify({ type, id, name }));
        // Using a global variable for simplicity in this context, as dataTransfer can be tricky with complex objects or across different parts of the script if not handled carefully.
        draggedItemData = { type, id, name, target: event.target };
        event.target.classList.add('dragging');
        event.dataTransfer.effectAllowed = "copyMove";
        // Setting a simple text data for firefox compatibility if needed.
        event.dataTransfer.setData("text", id);
    }

    function handleDragEnd(event) {
        if (draggedItemData && draggedItemData.target) {
            draggedItemData.target.classList.remove('dragging');
        }
        draggedItemData = null;
        document.querySelectorAll('.schedule-cell.drag-over-active').forEach(cell => {
            cell.classList.remove('drag-over-active');
        });
    }

    function handleDragOver(event) {
        event.preventDefault(); // Necessary to allow dropping
        event.dataTransfer.dropEffect = "copy"; // or "move"
    }

    function handleDragEnter(event) {
        if (event.target.classList.contains('schedule-cell')) {
            event.target.classList.add('drag-over-active');
        }
    }

    function handleDragLeave(event) {
        if (event.target.classList.contains('schedule-cell')) {
            event.target.classList.remove('drag-over-active');
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const targetCell = event.target.closest('.schedule-cell'); // Ensure we get the cell
        if (!targetCell || !draggedItemData) {
            if(draggedItemData) console.warn("Drop target is not a valid cell or no dragged item data.");
            if (draggedItemData) draggedItemData.target.classList.remove('dragging'); // Clean up if draggedItemData exists
            draggedItemData = null;
            return;
        }

        targetCell.classList.remove('drag-over-active');
        const classId = selectClassSchedule.value;
        const day = targetCell.dataset.day;
        const timeSlot = targetCell.dataset.timeslot;

        if (!classId || !day || !timeSlot) {
            console.error("Missing data for drop: classId, day, or timeSlot");
            draggedItemData = null;
            return;
        }

        const { type, id: itemId, name: itemName } = draggedItemData; // Destructure from global

        // Update the schedule data
        if (!weeklySchedules[classId]) weeklySchedules[classId] = {};
        if (!weeklySchedules[classId][day]) weeklySchedules[classId][day] = [];

        let scheduleEntry = weeklySchedules[classId][day].find(entry => entry.timeSlot === timeSlot);

        if (type === 'subject') {
            const currentClass = getClassById(classId);
            let teacherForSubject = currentClass?.teacherId || null; // Default to class teacher

            // If a specific teacher was also part of draggedItemData (future enhancement)
            // teacherForSubject = draggedItemData.teacherId || teacherForSubject;

            if (scheduleEntry) { // Cell is not empty
                scheduleEntry.subjectId = itemId;
                scheduleEntry.activity = itemName; // Update activity with subject name
                // If the existing teacher was null or not set by D&D, assign class teacher
                if (!scheduleEntry.teacherId && teacherForSubject) {
                    scheduleEntry.teacherId = teacherForSubject;
                }
                // Otherwise, keep the existing teacher unless a teacher is specifically dragged later
            } else { // Cell is empty
                weeklySchedules[classId][day].push({
                    timeSlot: timeSlot,
                    subjectId: itemId,
                    teacherId: teacherForSubject,
                    activity: itemName
                });
            }
        } else if (type === 'teacher') {
            const droppedTeacher = getTeacherById(itemId);
            if (scheduleEntry) { // Cell has an existing item
                scheduleEntry.teacherId = itemId; // Assign new teacher
            } else { // Cell is empty, create new entry with this teacher
                // Find a default/placeholder subject or use teacher's main subject
                let placeholderSubjectId = subjects.find(s => s.name.toLowerCase().includes("nader te bepalen") || s.name.toLowerCase().includes("studie"))?.id;
                if (!placeholderSubjectId && subjects.length > 0) placeholderSubjectId = subjects[0].id; // fallback

                weeklySchedules[classId][day].push({
                    timeSlot: timeSlot,
                    subjectId: placeholderSubjectId, // Assign a placeholder subject
                    teacherId: itemId,
                    activity: droppedTeacher?.subject || "Overleg" // Use teacher's role or default
                });
            }
        }

        draggedItemData = null; // Clear after drop
        displayWeeklySchedule(); // Refresh the schedule display
        updateScheduleConflictKPI(); // Update KPI after drop
    }

    function populateDraggableSubjects() {
        if (!draggableSubjectsContainer) return;
        draggableSubjectsContainer.innerHTML = '<h4>Vakken</h4>'; // Reset and add title back

        const placeholder = draggableSubjectsContainer.querySelector('.placeholder-text');
        if (placeholder) placeholder.remove();

        subjects.forEach(subject => {
            const item = document.createElement('div');
            item.className = 'draggable-item';
            item.draggable = true;
            item.textContent = subject.name;
            item.dataset.subjectId = subject.id;
            item.dataset.type = "subject"; // To identify item type

            item.addEventListener('dragstart', (event) => handleDragStart(event, 'subject', subject.id, subject.name));
            item.addEventListener('dragend', handleDragEnd);
            draggableSubjectsContainer.appendChild(item);
        });
    }

    // Placeholder for when we add draggable teachers
    function populateDraggableTeachers() {
        if (!draggableTeachersContainer) return;
        draggableTeachersContainer.innerHTML = '<h4>Leerkrachten</h4>'; // Reset and add title back

        const placeholder = draggableTeachersContainer.querySelector('.placeholder-text');
        if (placeholder) placeholder.remove();

        teachers.forEach(teacher => {
            const item = document.createElement('div');
            item.className = 'draggable-item teacher-item'; // Added teacher-item for specific styling if needed
            item.draggable = true;
            item.textContent = teacher.name;
            // Could add tooltip for teacher's main subject: item.dataset.tooltip = teacher.subject;

            item.addEventListener('dragstart', (event) => handleDragStart(event, 'teacher', teacher.id, teacher.name));
            item.addEventListener('dragend', handleDragEnd);
            draggableTeachersContainer.appendChild(item);
        });
    }


    // --- Initialize ---
    init();
});
