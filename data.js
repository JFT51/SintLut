// data.js

const schoolHolidays = [ // Belgian school holidays (example, needs to be accurate for a real app)
    // 2023-2024 example
    { name: "Herfstvakantie", start: "2023-10-30", end: "2023-11-05" },
    { name: "Wapenstilstand", start: "2023-11-11", end: "2023-11-11" },
    { name: "Kerstvakantie", start: "2023-12-25", end: "2024-01-07" },
    { name: "Krokusvakantie", start: "2024-02-12", end: "2024-02-18" },
    { name: "Paasvakantie", start: "2024-04-01", end: "2024-04-14" },
    { name: "Dag van de Arbeid", start: "2024-05-01", end: "2024-05-01" },
    { name: "Hemelvaart", start: "2024-05-09", end: "2024-05-10" }, // Includes bridge day
    { name: "Pinkstermaandag", start: "2024-05-20", end: "2024-05-20" },
    { name: "Zomervakantie", start: "2024-07-01", end: "2024-08-31" },
];

const teachers = [
    { id: "t1", name: "Mevr. An Peeters", subject: "Klasleerkracht", email: "an.peeters@school.be", phone: "0477123456", assignedClasses: ["k1a"] },
    { id: "t2", name: "Dhr. Bart De Pauw", subject: "Klasleerkracht", email: "bart.depauw@school.be", phone: "0477654321", assignedClasses: ["l2b"] },
    { id: "t3", name: "Mevr. Carine Mertens", subject: "Zorgleerkracht", email: "carine.mertens@school.be", phone: "0477112233", assignedClasses: [] },
    { id: "t4", name: "Dhr. Dirk Verhoeven", subject: "Turnleerkracht", email: "dirk.verhoeven@school.be", phone: "0477445566", assignedClasses: ["k1a", "k2a", "l1a", "l2b"] },
    { id: "t5", name: "Mevr. Els Claes", subject: "Klasleerkracht", email: "els.claes@school.be", phone: "0477778899", assignedClasses: ["k2a"] },
    { id: "t6", name: "Dhr. Frank Wouters", subject: "Klasleerkracht", email: "frank.wouters@school.be", phone: "0477001122", assignedClasses: ["l1a"] },
];

const classes = [
    { id: "k1a", name: "Zonnetjes", level: "1ste Kleuterklas", section: "Kleuteronderwijs", teacherId: "t1", students: 15 },
    { id: "k2a", name: "Muisjes", level: "2de Kleuterklas", section: "Kleuteronderwijs", teacherId: "t5", students: 18 },
    { id: "k3a", name: "Vosjes", level: "3de Kleuterklas", section: "Kleuteronderwijs", teacherId: null, students: 20 },
    { id: "l1a", name: "Uiltjes", level: "1ste Leerjaar", section: "Lagere School", teacherId: "t6", students: 22 },
    { id: "l2b", name: "Adelaars", level: "2de Leerjaar", section: "Lagere School", teacherId: "t2", students: 21 },
    { id: "l3c", name: "Berenklas", level: "3de Leerjaar", section: "Lagere School", teacherId: null, students: 19 },
];

let studentsData = [ // Renamed to avoid conflict if script.js also declares 'students'
    // Kleuteronderwijs - 1ste Kleuterklas (Zonnetjes)
    { id: "s001", name: "Lars Peeters", classId: "k1a", birthDate: "2021-03-15" },
    { id: "s002", name: "Sofie Janssens", classId: "k1a", birthDate: "2021-05-20" },
    // ... 13 more for k1a

    // Kleuteronderwijs - 2de Kleuterklas (Muisjes)
    { id: "s016", name: "Emma De Smet", classId: "k2a", birthDate: "2020-02-10" },
    { id: "s017", name: "Noah Mertens", classId: "k2a", birthDate: "2020-04-25" },
    // ... 16 more for k2a

    // Lagere School - 1ste Leerjaar (Uiltjes)
    { id: "s034", name: "Liam Verhoeven", classId: "l1a", birthDate: "2018-07-01" },
    { id: "s035", name: "Olivia Claes", classId: "l1a", birthDate: "2018-09-12" },
    // ... 20 more for l1a

    // Lagere School - 2de Leerjaar (Adelaars)
    { id: "s056", name: "Finn Wouters", classId: "l2b", birthDate: "2017-06-05" },
    { id: "s057", name: "Nora De Cock", classId: "l2b", birthDate: "2017-08-18" },
    // ... 19 more for l2b
];


const absences = [
    { id: "a1", entityId: "s001", entityType: "student", reason: "Ziekte", startDate: "2024-05-20", endDate: "2024-05-21", status: "Goedgekeurd" },
    { id: "a2", entityId: "t2", entityType: "teacher", reason: "Persoonlijk verlof", startDate: "2024-05-22", endDate: "2024-05-22", status: "In behandeling" },
    { id: "a3", entityId: "s016", entityType: "student", reason: "Doktersbezoek", startDate: "2024-05-23", endDate: "2024-05-23", status: "Goedgekeurd" },
    { id: "a4", entityId: "s002", entityType: "student", reason: "Ziekte", startDate: "2024-05-23", endDate: "2024-05-24", status: "Goedgekeurd" },
    { id: "a5", entityId: "t1", entityType: "teacher", reason: "Bijscholing", startDate: "2024-05-24", endDate: "2024-05-24", status: "Goedgekeurd" },
];

const subjects = [
    { id: "sub1", name: "Taal", color: "#FFDDC1" }, // Light Orange
    { id: "sub2", name: "Rekenen", color: "#C1FFD7" }, // Light Green
    { id: "sub3", name: "Wereldorientatie", color: "#C1D7FF" }, // Light Blue
    { id: "sub4", name: "Muzische Vorming", color: "#F9C1FF" }, // Light Purple
    { id: "sub5", name: "Godsdienst", color: "#FFC1C1" }, // Light Red
    { id: "sub6", name: "Lichamelijke Opvoeding", color: "#FFFFC1" }, // Light Yellow
    { id: "sub7", name: "Spel/Hoekenwerk", color: "#D1C1FF" }, // Light Lavender
    { id: "sub8", name: "Onthaal & Afsluit", color: "#E0E0E0"}, // Light Grey
    { id: "sub9", name: "Middagpauze", color: "#B0B0B0"}, // Grey
    { id: "sub10", name: "Speeltijd", color: "#CCCCCC"} // Lighter Grey
];

const weeklySchedules = {
    "k1a": {
        "Maandag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t1", activity: "Onthaal" },
            { timeSlot: "09:00-10:00", subjectId: "sub7", teacherId: "t1", activity: "Hoekenwerk" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub7", teacherId: "t1", activity: "Geleide activiteit" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t1", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub7", teacherId: "t1", activity: "Rust / Voorlezen" },
            { timeSlot: "13:30-14:30", subjectId: "sub4", teacherId: "t1", activity: "Knutselen" },
            { timeSlot: "14:30-15:00", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "15:00-15:30", subjectId: "sub8", teacherId: "t1", activity: "Afsluit" }
        ],
        "Dinsdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t1", activity: "Onthaal" },
            { timeSlot: "09:00-10:00", subjectId: "sub7", teacherId: "t1", activity: "Buiten spelen" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub6", teacherId: "t4", activity: "Turnen" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t1", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub7", teacherId: "t1", activity: "Hoekenwerk" },
            { timeSlot: "13:30-14:30", subjectId: "sub4", teacherId: "t1", activity: "Muziek" },
            { timeSlot: "14:30-15:00", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "15:00-15:30", subjectId: "sub8", teacherId: "t1", activity: "Afsluit" }
        ],
        "Woensdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t1", activity: "Onthaal" },
            { timeSlot: "09:00-10:00", subjectId: "sub7", teacherId: "t1", activity: "Poppenkast" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "10:30-11:15", subjectId: "sub4", teacherId: "t1", activity: "Verhaal & Liedjes" },
            { timeSlot: "11:15-12:00", subjectId: "sub8", teacherId: "t1", activity: "Afsluit & Opruimen" }
        ],
        "Donderdag": [
             { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t1", activity: "Onthaal" },
            { timeSlot: "09:00-10:00", subjectId: "sub7", teacherId: "t1", activity: "Constructiespel" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub6", teacherId: "t4", activity: "Turnen" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t1", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub7", teacherId: "t1", activity: "Puzzels & Spelletjes" },
            { timeSlot: "13:30-14:30", subjectId: "sub4", teacherId: "t1", activity: "Tekenen" },
            { timeSlot: "14:30-15:00", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "15:00-15:30", subjectId: "sub8", teacherId: "t1", activity: "Afsluit" }
        ],
        "Vrijdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t1", activity: "Onthaal" },
            { timeSlot: "09:00-10:00", subjectId: "sub7", teacherId: "t1", activity: "Thema-activiteit" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub7", teacherId: "t1", activity: "Vrij spel" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t1", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub7", teacherId: "t1", activity: "Bewegingsspel" },
            { timeSlot: "13:30-14:30", subjectId: "sub4", teacherId: "t1", activity: "Boetseren" },
            { timeSlot: "14:30-15:00", subjectId: "sub10", teacherId: "t1", activity: "Speeltijd" },
            { timeSlot: "15:00-15:30", subjectId: "sub8", teacherId: "t1", activity: "Weekafsluiting" }
        ]
    },
    "l2b": {
        "Maandag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t2", activity: "Onthaal & Agenda" },
            { timeSlot: "09:00-10:00", subjectId: "sub1", teacherId: "t2", activity: "Taal: Lezen" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t2", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub2", teacherId: "t2", activity: "Rekenen: Getallen" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t2", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub3", teacherId: "t2", activity: "WO: Thema Lente" },
            { timeSlot: "13:30-14:30", subjectId: "sub4", teacherId: "t2", activity: "Muzische: Zingen" },
            { timeSlot: "14:30-15:30", subjectId: "sub5", teacherId: "t2", activity: "Godsdienst" }
        ],
        "Dinsdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t2", activity: "Onthaal & Agenda" },
            { timeSlot: "09:00-10:00", subjectId: "sub2", teacherId: "t2", activity: "Rekenen: Meten" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t2", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub1", teacherId: "t2", activity: "Taal: Schrijven" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t2", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub6", teacherId: "t4", activity: "L.O." },
            { timeSlot: "13:30-14:30", subjectId: "sub3", teacherId: "t2", activity: "WO: Verkeer" },
            { timeSlot: "14:30-15:30", subjectId: "sub4", teacherId: "t2", activity: "Muzische: Drama" }
        ],
        "Woensdag": [ // Halve dag
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t2", activity: "Onthaal & Agenda" },
            { timeSlot: "09:00-10:00", subjectId: "sub1", teacherId: "t2", activity: "Taal: Spelling" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t2", activity: "Speeltijd" },
            { timeSlot: "10:30-11:15", subjectId: "sub2", teacherId: "t2", activity: "Rekenen: Hoofdrekenen" },
            { timeSlot: "11:15-12:00", subjectId: "sub8", teacherId: "t2", activity: "Afsluit & Opruimen" }
        ],
        "Donderdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t2", activity: "Onthaal & Agenda" },
            { timeSlot: "09:00-10:00", subjectId: "sub2", teacherId: "t2", activity: "Rekenen: Problemen" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t2", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub1", teacherId: "t2", activity: "Taal: Spreken & Luisteren" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t2", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub6", teacherId: "t4", activity: "L.O." },
            { timeSlot: "13:30-14:30", subjectId: "sub3", teacherId: "t2", activity: "WO: Natuur" },
            { timeSlot: "14:30-15:30", subjectId: "sub4", teacherId: "t2", activity: "Muzische: Beeld" }
        ],
        "Vrijdag": [
            { timeSlot: "08:30-09:00", subjectId: "sub8", teacherId: "t2", activity: "Onthaal & Agenda" },
            { timeSlot: "09:00-10:00", subjectId: "sub1", teacherId: "t2", activity: "Taal: Herhaling" },
            { timeSlot: "10:00-10:30", subjectId: "sub10", teacherId: "t2", activity: "Speeltijd" },
            { timeSlot: "10:30-11:30", subjectId: "sub2", teacherId: "t2", activity: "Rekenen: Herhaling" },
            { timeSlot: "11:30-12:30", subjectId: "sub9", teacherId: "t2", activity: "Middageten & Spelen" },
            { timeSlot: "12:30-13:30", subjectId: "sub4", teacherId: "t2", activity: "Muzische: Media" },
            { timeSlot: "13:30-14:30", subjectId: "sub5", teacherId: "t2", activity: "Godsdienst" },
            { timeSlot: "14:30-15:30", subjectId: "sub8", teacherId: "t2", activity: "Weekafsluiting" }
        ]
    }
};

// --- Helper Functions (global scope for data.js) ---
function getTeacherById(id) {
    return teachers.find(teacher => teacher.id === id);
}

function getClassById(id) {
    return classes.find(cls => cls.id === id);
}

function getStudentById(id) {
    return studentsData.find(student => student.id === id); // Use studentsData
}

function getSubjectById(id) {
    return subjects.find(sub => sub.id === id);
}

function getAbsenceById(id) {
    return absences.find(abs => abs.id === id);
}

function isSchoolHoliday(dateString) {
    const checkDate = new Date(dateString);
    checkDate.setHours(0, 0, 0, 0);

    for (const holiday of schoolHolidays) {
        const startDate = new Date(holiday.start);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(holiday.end);
        endDate.setHours(0, 0, 0, 0);

        if (checkDate >= startDate && checkDate <= endDate) {
            return true;
        }
    }
    return false;
}

// --- Data Generation for Students (to fill up the numbers) ---
function generateStudents() {
    let studentIdCounter = studentsData.length + 1;
    classes.forEach(cls => {
        const existingStudents = studentsData.filter(s => s.classId === cls.id).length;
        const studentsToGenerate = cls.students - existingStudents;
        const classType = cls.section === "Kleuteronderwijs" ? "K" : "L";

        let baseYear;
        if (cls.section === "Kleuteronderwijs") {
            // Assuming current year is 2024 for calculation
            // 1ste Kleuter: born 2021 (2.5-3 years old)
            // 2de Kleuter: born 2020 (3.5-4 years old)
            // 3de Kleuter: born 2019 (4.5-5 years old)
            baseYear = 2024 - (2 + parseInt(cls.level.charAt(0)));
        } else { // Lagere School
            // 1ste Leerjaar: born 2018 (6 years old)
            // 2de Leerjaar: born 2017 (7 years old)
            // ...
            baseYear = 2024 - (5 + parseInt(cls.level.charAt(0)));
        }


        for (let i = 0; i < studentsToGenerate; i++) {
            const birthMonth = Math.floor(Math.random() * 12) + 1;
            const birthDay = Math.floor(Math.random() * 28) + 1; // Keep it simple
            studentsData.push({ // Add to studentsData
                id: `s${String(studentIdCounter).padStart(3, '0')}`,
                name: `Leerling ${classType}${cls.level.charAt(0)} ${String.fromCharCode(65 + i)}${i+1}`,
                classId: cls.id,
                birthDate: `${baseYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`
            });
            studentIdCounter++;
        }
    });
}

generateStudents(); // Call to fill student data based on class student counts

// Expose studentsData to global scope if script.js needs it as 'students'
// This is a common pattern if data.js is meant to solely provide data.
// However, script.js currently re-declares 'students' from window.
// For clarity, I've used 'studentsData' internally in this file and script.js should use window.studentsData
// Or, ensure script.js uses the global 'students' from data.js correctly.
// For this setup, script.js will use the globally available `studentsData` as `students`.
const students = studentsData; // Make it available as 'students' for script.js if it expects that exact name.Tool output for `overwrite_file_with_block`:
