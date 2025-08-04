import React, { useState, useMemo } from 'react';

// Helper to generate Tailwind classes, makes code cleaner
const classNames = (...classes) => classes.filter(Boolean).join(' ');

// --- ICONS (SVG Components for Tab Bar) ---
const CalculatorIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="16" y1="10" x2="16" y2="14"></line>
    <line x1="12" y1="10" x2="12" y2="18"></line>
    <line x1="8" y1="10" x2="8" y2="16"></line>
  </svg>
);

const FlowchartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L12 8"></path>
    <path d="M12 16L12 22"></path>
    <path d="M18 5L6 5C4.89543 5 4 5.89543 4 7L4 17C4 18.1046 4.89543 19 6 19L18 19C19.1046 19 20 18.1046 20 17L20 7C20 5.89543 19.1046 5 18 5Z"></path>
    <path d="M12 8L16 12L12 16L8 12L12 8Z"></path>
  </svg>
);

const ClipboardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <line x1="9" y1="12" x2="15" y2="12"></line>
    <line x1="9" y1="16" x2="15" y2="16"></line>
  </svg>
);

const VentilatorIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="M8 12h.01"></path>
        <path d="M12 12h.01"></path>
        <path d="M16 12h.01"></path>
        <path d="M10 16H8"></path>
        <path d="M16 16h-4"></path>
        <path d="M12 8v4"></path>
    </svg>
);

const AboutIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);


const ArrowLeftIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

// --- Reusable Component ---
const InfoCard = ({ title, data, isDisclaimer = false }) => (
    <div className={classNames("bg-white rounded-xl shadow-sm mb-4", isDisclaimer ? "border-l-4 border-red-500" : "")}>
      <h3 className={classNames("text-lg font-semibold px-4 pt-3 pb-2", isDisclaimer ? "text-red-800" : "text-gray-800")}>{title}</h3>
      <div className="border-t border-gray-100">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center px-4 py-3 text-sm border-b border-gray-100 last:border-b-0">
            <span className="text-gray-600">{item.name}</span>
            {item.link ? (
                 <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 bg-blue-50 rounded-md px-2 py-1 text-right hover:bg-blue-100 transition-colors">{item.value}</a>
            ) : (
                <span className="font-semibold text-blue-600 bg-blue-50 rounded-md px-2 py-1 text-right">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
);


// --- CALCULATOR SUB-COMPONENTS ---

const AdultCalculator = () => {
    const [weight, setWeight] = useState('70');
    const calculations = useMemo(() => {
        const w = parseFloat(weight) || 0;
        return {
          induction: [
            { name: 'Propofol (1-2 mg/kg)', value: `${(w * 1).toFixed(0)} - ${(w * 2).toFixed(0)} mg` },
            { name: 'Etomidate (0.3 mg/kg)', value: `${(w * 0.3).toFixed(1)} mg` },
            { name: 'Ketamine (1-2 mg/kg)', value: `${(w * 1).toFixed(0)} - ${(w * 2).toFixed(0)} mg` },
            { name: 'Midazolam (0.1-0.3 mg/kg)', value: `${(w * 0.1).toFixed(1)} - ${(w * 0.3).toFixed(1)} mg` },
            { name: 'Fentanyl (1-2 mcg/kg)', value: `${(w * 1).toFixed(0)} - ${(w * 2).toFixed(0)} mcg` },
          ],
          paralytics: [
            { name: 'Rocuronium (1.2 mg/kg)', value: `${(w * 1.2).toFixed(1)} mg` },
            { name: 'Succinylcholine (1.5 mg/kg)', value: `${(w * 1.5).toFixed(1)} mg` },
            { name: 'Atracurium (0.4-0.5 mg/kg)', value: `${(w * 0.4).toFixed(1)} - ${(w * 0.5).toFixed(1)} mg` },
          ],
          equipment: [
            { name: 'ETT (Pria)', value: '7.5 - 8.0 mm' },
            { name: 'ETT (Wanita)', value: '7.0 - 7.5 mm' },
            { name: 'Kedalaman ETT (Pria)', value: '~ 23 cm di bibir' },
            { name: 'Kedalaman ETT (Wanita)', value: '~ 21 cm di bibir' },
            { name: 'Bilah Laringoskop', value: 'Macintosh 3 atau 4' },
            { name: 'LMA', value: w >= 50 && w <= 70 ? 'Ukuran 4' : w > 70 ? 'Ukuran 5' : 'Ukuran 3' },
          ],
        };
    }, [weight]);

    return (
        <div>
            <div className="mb-6">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Berat Badan Pasien (kg)</label>
                <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Contoh: 70" />
            </div>
            <InfoCard title="Obat Induksi & Sedasi" data={calculations.induction} />
            <InfoCard title="Pelumpuh Otot" data={calculations.paralytics} />
            <InfoCard title="Ukuran Alat" data={calculations.equipment} />
        </div>
    );
};

const PediatricCalculator = () => {
    const [age, setAge] = useState('5');
    const [ageUnit, setAgeUnit] = useState('tahun');
    const [weight, setWeight] = useState('18');

    const calculations = useMemo(() => {
        const ageNum = parseFloat(age) || 0;
        const w = parseFloat(weight) || 0;
        const ageInYears = ageUnit === 'tahun' ? ageNum : ageNum / 12;

        let ettUncuffed, ettCuffed, ettDepth, blade;

        if (ageInYears < 1) { // Bayi
            ettUncuffed = ageInYears <= 0.5 ? 3.0 : 3.5;
            ettCuffed = ageInYears <= 0.5 ? 'N/A' : 3.0;
            ettDepth = (w / 2) + 8;
            blade = 'Miller 0-1';
        } else { // Anak
            ettUncuffed = (ageInYears / 4) + 4;
            ettCuffed = (ageInYears / 4) + 3.5;
            ettDepth = (ageInYears / 2) + 12;
            if (ageInYears < 2) blade = 'Miller 1 / Mac 1';
            else if (ageInYears < 6) blade = 'Miller 2 / Mac 2';
            else if (ageInYears < 12) blade = 'Mac 2-3';
            else blade = 'Mac 3';
        }

        return {
            equipment: [
                { name: 'ETT Tanpa Cuff', value: `${ettUncuffed.toFixed(1)} mm` },
                { name: 'ETT Dengan Cuff', value: typeof ettCuffed === 'string' ? ettCuffed : `${ettCuffed.toFixed(1)} mm` },
                { name: 'Kedalaman ETT (Oral)', value: `${ettDepth.toFixed(1)} cm` },
                { name: 'Bilah Laringoskop', value: blade },
            ],
            drugs: [
                { name: 'Propofol (2.5-3.5 mg/kg)', value: `${(w * 2.5).toFixed(1)} - ${(w * 3.5).toFixed(1)} mg` },
                { name: 'Ketamine (1-2 mg/kg)', value: `${(w * 1).toFixed(1)} - ${(w * 2).toFixed(1)} mg` },
                { name: 'Succinylcholine (1.5-2 mg/kg)', value: `${(w * 1.5).toFixed(1)} - ${(w * 2).toFixed(1)} mg` },
                { name: 'Rocuronium (0.6-1.2 mg/kg)', value: `${(w * 0.6).toFixed(1)} - ${(w * 1.2).toFixed(1)} mg` },
            ]
        };
    }, [age, ageUnit, weight]);
    
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Usia</label>
                    <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="5" />
                </div>
                <div>
                    <label htmlFor="ageUnit" className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                    <select id="ageUnit" value={ageUnit} onChange={(e) => setAgeUnit(e.target.value)} className="w-full p-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="tahun">Tahun</option>
                        <option value="bulan">Bulan</option>
                    </select>
                </div>
            </div>
             <div className="mb-6">
                <label htmlFor="weight_peds" className="block text-sm font-medium text-gray-700 mb-1">Berat Badan (kg)</label>
                <input id="weight_peds" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="18" />
            </div>
            <InfoCard title="Peralatan Pediatri" data={calculations.equipment} />
            <InfoCard title="Obat-obatan Pediatri" data={calculations.drugs} />
        </div>
    );
};

// --- SCREENS (Each main view of the app) ---

// 1. Calculator Screen
const CalculatorScreen = () => {
    const [patientType, setPatientType] = useState('Dewasa');

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kalkulator Cepat</h2>
            <div className="w-full bg-gray-200 rounded-lg p-1 flex mb-6">
                <button onClick={() => setPatientType('Dewasa')} className={classNames('w-1/2 py-2 rounded-md text-sm font-semibold transition-colors', patientType === 'Dewasa' ? 'bg-white shadow' : 'text-gray-600')}>Dewasa</button>
                <button onClick={() => setPatientType('Pediatri')} className={classNames('w-1/2 py-2 rounded-md text-sm font-semibold transition-colors', patientType === 'Pediatri' ? 'bg-white shadow' : 'text-gray-600')}>Pediatri</button>
            </div>
            {patientType === 'Dewasa' ? <AdultCalculator /> : <PediatricCalculator />}
        </div>
    );
};

// 2. Algorithm Screen
const AlgorithmScreen = () => {
    const algorithmData = {
        start: { id: 'start', question: 'Mulai evaluasi jalan napas. Apakah ada tanda-tanda kesulitan jalan napas?', options: { yes: 'difficult_airway', no: 'standard_rsi' } },
        difficult_airway: { id: 'difficult_airway', question: 'Jalan napas sulit diantisipasi. Pertimbangkan intubasi sadar (awake intubation). Apakah memungkinkan?', options: { yes: 'awake_intubation_plan', no: 'call_for_help' } },
        standard_rsi: { id: 'standard_rsi', question: 'Lanjutkan dengan Rapid Sequence Intubation (RSI) standar. Apakah laringoskopi pertama berhasil?', options: { yes: 'intubation_success', no: 'failed_attempt_1' } },
        call_for_help: { id: 'call_for_help', question: 'Panggil bantuan ahli. Optimalkan posisi & coba laringoskopi lagi. Apakah berhasil?', options: { yes: 'intubation_success', no: 'failed_attempt_2' } },
        awake_intubation_plan: { id: 'awake_intubation_plan', question: 'Lakukan persiapan untuk intubasi sadar. Prosedur berhasil.', options: {} },
        intubation_success: { id: 'intubation_success', question: 'Intubasi berhasil. Konfirmasi penempatan ETT dan lanjutkan ventilasi.', options: {} },
        failed_attempt_1: { id: 'failed_attempt_1', question: 'Gagal upaya pertama. Pastikan ventilasi dengan sungkup wajah (mask ventilation) adekuat. Apakah ventilasi adekuat?', options: { yes: 'call_for_help', no: 'cannot_intubate_ventilate' } },
        failed_attempt_2: { id: 'failed_attempt_2', question: 'Gagal upaya kedua. Masukkan LMA (Laryngeal Mask Airway).', options: {} },
        cannot_intubate_ventilate: { id: 'cannot_intubate_ventilate', question: 'Skenario CICO (Cannot Intubate, Cannot Oxygenate). Segera lakukan akses jalan napas bedah (cricothyrotomy).', options: {} }
    };
    const [currentStepId, setCurrentStepId] = useState('start');
    const currentStep = algorithmData[currentStepId];
    const handleOption = (nextStepId) => { if (nextStepId) { setCurrentStepId(nextStepId); } };
    const handleReset = () => { setCurrentStepId('start'); }

    const LemonCriteria = () => (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm">
            <h4 className="font-bold text-blue-800 mb-2">Kriteria Evaluasi LEMON:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><span className="font-semibold">L (Look):</span> Ciri anatomis tidak biasa (trauma wajah, jenggot tebal, lidah besar).</li>
                <li><span className="font-semibold">E (Evaluate 3-3-2):</span> Keterbatasan bukaan mulut atau jarak tiromental.</li>
                <li><span className="font-semibold">M (Mallampati):</span> Skor Mallampati ≥ 3.</li>
                <li><span className="font-semibold">O (Obstruction/Obesity):</span> Adanya obstruksi jalan napas atau obesitas.</li>
                <li><span className="font-semibold">N (Neck Mobility):</span> Pergerakan leher terbatas.</li>
            </ul>
        </div>
    );

    return (
        <div className="p-4 flex flex-col justify-between h-full">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Algoritma Interaktif</h2>
                <p className="text-sm text-gray-500 mb-6">Jawab pertanyaan untuk menavigasi alur.</p>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center justify-center min-h-[150px]">
                    <p className="text-lg font-medium text-gray-800">{currentStep.question}</p>
                </div>
                {currentStep.id === 'start' && <LemonCriteria />}
            </div>
            <div className="mt-6">
                {Object.keys(currentStep.options).length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleOption(currentStep.options.no)} className="w-full bg-red-500 text-white font-bold py-4 rounded-lg shadow-md hover:bg-red-600 transition-colors">TIDAK</button>
                        <button onClick={() => handleOption(currentStep.options.yes)} className="w-full bg-green-500 text-white font-bold py-4 rounded-lg shadow-md hover:bg-green-600 transition-colors">YA</button>
                    </div>
                ) : ( <button onClick={handleReset} className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">Mulai Ulang Algoritma</button> )}
            </div>
        </div>
    );
};

// 3. Procedure Screen
const ProcedureScreen = ({ showDetailScreen }) => {
    const [activeSegment, setActiveSegment] = useState('Panduan');
    const procedures = [
        'Panduan Intubasi Sulit (DAS 2015)', // New Item
        'Manajemen Jalan Napas Sulit (Flowchart)',
        'Rapid Sequence Intubation (RSI)',
        'Pemasangan LMA',
        'Intubasi Sadar (Awake Intubation)',
        'Cricothyrotomy',
        'Ventilasi Sungkup Wajah (Mask Ventilation)'
    ];
    const checklists = [ 'Checklist Pra-Intubasi (SOAP ME)', 'Checklist Jalan Napas Sulit', 'Checklist Transfer Pasien Terintubasi' ];
    const currentList = activeSegment === 'Panduan' ? procedures : checklists;

    const handleItemClick = (item) => {
        if (item === 'Panduan Intubasi Sulit (DAS 2015)') showDetailScreen('DASGuideline');
        else if (item === 'Manajemen Jalan Napas Sulit (Flowchart)') showDetailScreen('DifficultAirway');
        else if (item === 'Rapid Sequence Intubation (RSI)') showDetailScreen('RSI');
        else if (item === 'Pemasangan LMA') showDetailScreen('LMA');
        else if (item === 'Intubasi Sadar (Awake Intubation)') showDetailScreen('AwakeIntubation');
        else if (item === 'Cricothyrotomy') showDetailScreen('Cricothyrotomy');
        else if (item === 'Ventilasi Sungkup Wajah (Mask Ventilation)') showDetailScreen('MaskVentilation');
        else if (item === 'Checklist Pra-Intubasi (SOAP ME)') showDetailScreen('SOAPME');
        else if (item === 'Checklist Jalan Napas Sulit') showDetailScreen('DifficultAirwayChecklist');
        else if (item === 'Checklist Transfer Pasien Terintubasi') showDetailScreen('TransferChecklist');
        else alert(`Membuka detail untuk: ${item}`);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prosedur & Checklist</h2>
                <div className="w-full bg-gray-200 rounded-lg p-1 flex mb-4">
                    <button onClick={() => setActiveSegment('Panduan')} className={classNames('w-1/2 py-2 rounded-md text-sm font-semibold transition-colors', activeSegment === 'Panduan' ? 'bg-white shadow' : 'text-gray-600')}>Panduan</button>
                    <button onClick={() => setActiveSegment('Checklist')} className={classNames('w-1/2 py-2 rounded-md text-sm font-semibold transition-colors', activeSegment === 'Checklist' ? 'bg-white shadow' : 'text-gray-600')}>Checklist</button>
                </div>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    <input className="w-full p-2 pl-10 border-gray-300 rounded-lg shadow-sm" placeholder={`Cari ${activeSegment}...`} />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto px-2">
                <ul className="divide-y divide-gray-200">
                    {currentList.map(item => (
                        <li key={item} onClick={() => handleItemClick(item)} className="p-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer">
                            <span className="text-gray-800">{item}</span>
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// 4. Ventilator Screen
const VentilatorScreen = () => {
    const [height, setHeight] = useState('170');
    const [gender, setGender] = useState('Pria');
    const [condition, setCondition] = useState('Paru Normal');

    const calculations = useMemo(() => {
        const h = parseFloat(height) || 0;
        if (h === 0) return null;

        // Devine formula for Ideal Body Weight (IBW)
        const heightInInches = h / 2.54;
        let ibw;
        if (gender === 'Pria') {
            ibw = 50 + 2.3 * (heightInInches - 60);
        } else {
            ibw = 45.5 + 2.3 * (heightInInches - 60);
        }
        
        if (ibw < 0) ibw = 0;

        let settings;
        switch (condition) {
            case 'ARDS':
                settings = [
                    { name: 'Mode Sugesti', value: 'VC-AC atau PC-AC (Proteksi Paru)' },
                    { name: 'Volume Tidal (Vt)', value: `${(ibw * 4).toFixed(0)} - ${(ibw * 6).toFixed(0)} mL (4-6 ml/kg IBW)` },
                    { name: 'Respiratory Rate (RR)', value: '16 - 24 x/menit' },
                    { name: 'PEEP', value: '8 - 15 cmH₂O (sesuai tabel ARDSNet)' },
                    { name: 'FiO₂', value: 'Target SpO₂ 88-95%' },
                    { name: 'Tekanan Plateau (Pplat)', value: '< 30 cmH₂O' },
                ];
                break;
            case 'Edema Paru':
                 settings = [
                    { name: 'Mode Sugesti', value: 'PC-AC atau BiLevel/APRV' },
                    { name: 'Volume Tidal (Vt)', value: `Target 4-6 ml/kg IBW` },
                    { name: 'Target Tekanan Inspirasi (Pi)', value: 'Jaga Pplat < 30 cmH₂O' },
                    { name: 'Respiratory Rate (RR)', value: '14 - 20 x/menit' },
                    { name: 'PEEP', value: '10 - 15 cmH₂O' },
                    { name: 'FiO₂', value: 'Target SpO₂ >92%, turunkan segera jika >60%' },
                ];
                break;
            case 'PPOK / Asma':
                 settings = [
                    { name: 'Mode Sugesti', value: 'VC-AC' },
                    { name: 'Volume Tidal (Vt)', value: `${(ibw * 6).toFixed(0)} - ${(ibw * 8).toFixed(0)} mL (6-8 ml/kg IBW)` },
                    { name: 'Respiratory Rate (RR)', value: '10 - 12 x/menit (Rendah!)' },
                    { name: 'Rasio I:E', value: '1:3 hingga 1:4 (Ekspirasi panjang)' },
                    { name: 'PEEP', value: '0 - 5 cmH₂O (atau 80% auto-PEEP)' },
                    { name: 'FiO₂', value: 'Target SpO₂ 88-92%' },
                ];
                break;
            case 'Cedera Kepala':
                 settings = [
                    { name: 'Mode Sugesti', value: 'VC-AC' },
                    { name: 'Volume Tidal (Vt)', value: `${(ibw * 6).toFixed(0)} - ${(ibw * 8).toFixed(0)} mL (6-8 ml/kg IBW)` },
                    { name: 'Respiratory Rate (RR)', value: '14 - 18 x/menit (Target PaCO₂ 35-40 mmHg)' },
                    { name: 'PEEP', value: '5 cmH₂O (Hindari PEEP tinggi)' },
                    { name: 'FiO₂', value: 'Target SpO₂ >95% (Hindari hipoksia)' },
                    { name: 'Catatan', value: 'Jaga Tekanan Perfusi Serebral >60 mmHg' },
                ];
                break;
            case 'Paru Normal':
            default:
                settings = [
                    { name: 'Mode Sugesti', value: 'Volume Control (VC-AC)' },
                    { name: 'Volume Tidal (Vt)', value: `${(ibw * 6).toFixed(0)} - ${(ibw * 8).toFixed(0)} mL (6-8 ml/kg IBW)` },
                    { name: 'Respiratory Rate (RR)', value: '12 - 16 x/menit' },
                    { name: 'Rasio I:E', value: '1:2' },
                    { name: 'PEEP', value: '5 cmH₂O' },
                    { name: 'FiO₂', value: 'Mulai 100%, turunkan ke target SpO₂ >94%' },
                ];
        }

        return {
            ibw: ibw.toFixed(1),
            settings: settings,
        };

    }, [height, gender, condition]);

    const conditions = ['Paru Normal', 'ARDS', 'Edema Paru', 'PPOK / Asma', 'Cedera Kepala'];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inisiasi Setting Ventilator</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Pasien</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Tinggi Badan (cm)</label>
                        <input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="170" />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </select>
                    </div>
                </div>
                {calculations && (
                     <div className="mt-4 text-center bg-blue-50 p-2 rounded-lg">
                        <span className="text-sm text-blue-700">Berat Badan Ideal (IBW): </span>
                        <span className="font-bold text-blue-800">{calculations.ibw} kg</span>
                    </div>
                )}
            </div>
            
            <div className="mb-6">
                <label htmlFor="condition" className="block text-lg font-semibold text-gray-800 mb-3">Pilih Kondisi Klinis</label>
                <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full p-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {calculations ? (
                <InfoCard title={`Rekomendasi Setting Awal (${condition})`} data={calculations.settings} />
            ) : (
                <div className="text-center p-4 text-gray-500">Masukkan tinggi badan untuk melihat rekomendasi.</div>
            )}

            <div className="mt-4 text-xs text-gray-500 p-3 bg-gray-100 rounded-lg">
                <strong>Disclaimer:</strong> Rekomendasi ini adalah titik awal. Semua pengaturan ventilator harus disesuaikan berdasarkan kondisi klinis pasien, gas darah arteri, dan pemantauan hemodinamik. Selalu ikuti protokol institusi Anda.
            </div>
        </div>
    );
};

// 5. About Screen
const AboutScreen = () => {
    const developerInfo = [
        { name: 'Pengembang', value: 'tigaorangmajus' },
        { name: 'WhatsApp', value: '+62 822-4751-5290', link: 'https://wa.me/6282247515290' },
        { name: 'Email', value: 'dredwin@gmx.com', link: 'mailto:dredwin@gmx.com' }
    ];

    const disclaimerContent = [
        { name: 'Tujuan', value: 'Aplikasi ini adalah alat bantu edukasi dan referensi cepat, bukan pengganti penilaian klinis profesional.' },
        { name: 'Akurasi', value: 'Semua dosis obat, perhitungan, dan panduan harus diverifikasi secara independen sebelum aplikasi klinis.'},
        { name: 'Tanggung Jawab', value: 'Pengembang tidak bertanggung jawab atas hasil klinis atau kesalahan yang timbul dari penggunaan aplikasi ini.'}
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Aplikasi</h2>
            <p className="text-gray-600 mb-6">
                Aplikasi ini dirancang sebagai pendamping saku untuk para profesional anestesi, menyediakan kalkulator cepat, alur kerja interaktif, dan panduan prosedur penting.
            </p>
            <InfoCard title="Informasi Pengembang" data={developerInfo} />
            <InfoCard title="Disclaimer Medis" data={disclaimerContent} isDisclaimer={true} />
        </div>
    );
};


// --- DETAIL SCREENS (For Procedures) ---
const DetailScreenContainer = ({ title, backToMain, children }) => (
    <div className="h-full flex flex-col">
        <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
            <button onClick={backToMain} className="flex items-center text-blue-600 mb-2">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Kembali ke Prosedur
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="p-4 bg-gray-50 flex-grow overflow-y-auto">
            {children}
        </div>
    </div>
);

// NEW: DAS Guideline Screen
const DASGuidelineScreen = ({ backToMain }) => {
    const PlanCard = ({ plan, title, color, children }) => {
        const colorClasses = {
            blue: 'border-blue-500 bg-blue-50 text-blue-800',
            yellow: 'border-yellow-500 bg-yellow-50 text-yellow-800',
            orange: 'border-orange-500 bg-orange-50 text-orange-800',
            red: 'border-red-500 bg-red-50 text-red-800',
        };
        return (
            <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}>
                <h3 className={`text-lg font-bold ${colorClasses[color]} mb-2`}>Plan {plan}: {title}</h3>
                <div className="text-sm text-gray-700 space-y-2">{children}</div>
            </div>
        );
    };
    
    // The raw link to the PDF on GitHub
    const pdfUrl = 'https://github.com/tigaorangmajus/tigaorangmajus/raw/main/das2015intubation_guidelines%20(1).pdf';

    return (
        <DetailScreenContainer title="Panduan Intubasi Sulit (DAS 2015)" backToMain={backToMain}>
            <div className="text-center p-3 mb-4 bg-red-600 text-white font-bold rounded-lg shadow">
                JIKA KESULITAN, SEGERA PANGGIL BANTUAN!
            </div>
            
            <div className="mb-4">
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-md hover:shadow-lg"
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Buka File PDF Panduan Asli
                </a>
            </div>
            
            <PlanCard plan="A" title="Ventilasi Sungkup Muka & Intubasi" color="blue">
                <ul className="list-disc list-inside space-y-1">
                    <li>Optimalkan posisi kepala & leher</li>
                    <li>Lakukan pre-oksigenasi</li>
                    <li>Pastikan blokade neuromuskular adekuat</li>
                    <li>Lakukan Laringoskopi Langsung / Video (maksimum 3+1 percobaan)</li>
                    <li>Gunakan manipulasi laring eksternal</li>
                    <li>Gunakan Bougie</li>
                    <li>Jaga oksigenasi dan anestesi</li>
                </ul>
                <div className="mt-3 p-2 bg-blue-100 rounded-md">
                    <strong>Hasil:</strong> Jika berhasil, konfirmasi dengan kapnografi. Jika gagal, nyatakan "Gagal Intubasi" dan lanjutkan ke Plan B.
                </div>
            </PlanCard>

            <PlanCard plan="B" title="Menjaga Oksigenasi: Pemasangan SAD" color="yellow">
                 <ul className="list-disc list-inside space-y-1">
                    <li>Gunakan Supraglottic Airway Device (SAD) generasi ke-2</li>
                    <li>Ganti ukuran atau jenis SAD jika perlu (maksimum 3 percobaan)</li>
                    <li>Lakukan oksigenasi dan ventilasi melalui SAD</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                    <h4 className="font-bold text-yellow-900">BERHENTI DAN BERPIKIR</h4>
                    <p className="text-xs mt-1">Jika ventilasi dengan SAD berhasil, pertimbangkan risiko & manfaat dari opsi berikut:</p>
                    <ul className="list-decimal list-inside pl-4 mt-2 text-xs">
                        <li>Bangunkan pasien</li>
                        <li>Lakukan intubasi melalui SAD</li>
                        <li>Lanjutkan prosedur tanpa intubasi (menggunakan SAD)</li>
                        <li>Lakukan trakeostomi atau krikotiroidotomi</li>
                    </ul>
                </div>
                 <div className="mt-3 p-2 bg-yellow-100 rounded-md">
                    <strong>Hasil:</strong> Jika ventilasi dengan SAD gagal, nyatakan "Gagal Ventilasi SAD" dan lanjutkan ke Plan C.
                </div>
            </PlanCard>
            
            <PlanCard plan="C" title="Ventilasi Sungkup Muka" color="orange">
                <ul className="list-disc list-inside space-y-1">
                    <li>Jika ventilasi sungkup tidak memungkinkan, berikan pelumpuh otot</li>
                    <li>Lakukan percobaan terakhir ventilasi sungkup muka</li>
                    <li>Gunakan teknik 2 orang dan alat bantu (adjuncts)</li>
                </ul>
                <div className="mt-3 p-2 bg-orange-100 rounded-md">
                    <strong>Hasil:</strong> Jika berhasil, bangunkan pasien. Jika gagal, nyatakan "CICO" (Cannot Intubate, Cannot Oxygenate) dan lanjutkan ke Plan D.
                </div>
            </PlanCard>

            <PlanCard plan="D" title="Akses Darurat Leher Depan (CICO)" color="red">
                <p className="font-bold">Ini adalah skenario GAGAL INTUBASI, GAGAL OKSIGENASI.</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Lanjutkan pemberian oksigen 100% via jalan napas atas</li>
                    <li>Pastikan blokade neuromuskular</li>
                    <li>Posisikan pasien untuk ekstensi leher</li>
                    <li className="font-bold">SEGERA LAKUKAN KRIKOTIROIDOTOMI DENGAN SCALPEL</li>
                </ul>
                 <div className="mt-3 p-2 bg-red-100 rounded-md text-xs">
                    <p><strong>Peralatan:</strong> Scalpel (No. 10), Bougie, Tube ETT (cuffed 6.0mm ID).</p>
                    <p className="mt-1"><strong>Teknik:</strong> "Laryngeal handshake" untuk identifikasi membran, insisi transversal, putar pisau 90°, masukkan bougie, masukkan tube, kembangkan cuff, konfirmasi dengan kapnografi, dan amankan.</p>
                </div>
            </PlanCard>
        </DetailScreenContainer>
    );
};

const DifficultAirwayScreen = ({ backToMain }) => {
    const FlowCard = ({ title, children, color = 'blue' }) => {
        const colorClasses = { blue: 'border-blue-500 bg-blue-50', green: 'border-green-500 bg-green-50', red: 'border-red-500 bg-red-50', gray: 'border-gray-400 bg-gray-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-${color}-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Manajemen Jalan Napas Sulit" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Bagian 1: Perencanaan</h3> <FlowCard title="Evaluasi Awal" color="blue"><p>1. Curiga laringoskopi / intubasi sulit?</p><p>2. Curiga ventilasi sulit (sungkup/SGA)?</p><p>3. Peningkatan risiko aspirasi?</p><p>4. Peningkatan risiko desaturasi cepat?</p><p className="mt-2 p-2 bg-blue-100 rounded-lg">Jika ada jawaban 'YA', pertimbangkan manajemen jalan napas sadar (Bagian 2). Jika tidak, lanjutkan ke manajemen dengan anestesi (Bagian 3).</p></FlowCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Bagian 2: Manajemen Jalan Napas Sadar</h3> <FlowCard title="Strategi Sadar" color="green"><p>1. Tinjau ulang strategi & siapkan alat.</p><p>2. Lakukan teknik intubasi sadar.</p><p><strong>BERHASIL:</strong> Konfirmasi ventilasi adekuat.</p><p><strong>GAGAL:</strong> Lanjut ke jalur darurat/non-darurat sadar.</p></FlowCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Bagian 3: Manajemen Dengan Anestesi</h3> <FlowCard title="Strategi Dengan Anestesi" color="gray"><p>1. Tinjau ulang strategi.</p><p>2. Lakukan pre-oksigenasi dan induksi anestesi.</p><p>3. Coba intubasi. Jika gagal, cek ventilasi.</p></FlowCard> <FlowCard title="Jalur Non-Darurat (Ventilasi Adekuat)" color="green"><p>1. <strong>Panggil Bantuan.</strong></p><p>2. Optimalkan oksigenasi.</p><p>3. Coba ventilasi dengan SGA, laringoskopi lain, atau bangunkan pasien.</p></FlowCard> <FlowCard title="Jalur Darurat (Ventilasi TIDAK Adekuat)" color="red"><p>1. <strong>PANGGIL BANTUAN SEGERA.</strong></p><p>2. Skenario CICO (Cannot Intubate, Cannot Oxygenate).</p><p>3. Lakukan akses jalan napas invasif darurat (cricothyrotomy).</p><p>4. Pertimbangkan Bronkoskopi Rigid atau ECMO jika tersedia.</p></FlowCard> </DetailScreenContainer> );
};

const RSIScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'indigo' }) => {
        const colorClasses = { indigo: 'border-indigo-500 bg-indigo-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-indigo-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Rapid Sequence Intubation (RSI)" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Persiapan Alat (STATICS)</h3> <StepCard title="S - Scope (Laringoskop)"><p>Pastikan laringoskop (Macintosh/Miller) berfungsi baik, lampu menyala terang. Siapkan cadangan.</p></StepCard> <StepCard title="T - Tubes (ETT)"><p>Siapkan 3 ukuran ETT: ukuran perkiraan, 0.5mm lebih kecil, dan 0.5mm lebih besar. Cek balon (cuff).</p></StepCard> <StepCard title="A - Airway (Alat Jln Napas Alternatif)"><p>Siapkan LMA (Laryngeal Mask Airway) atau alat supraglotik lain sebagai cadangan jika intubasi gagal.</p></StepCard> <StepCard title="T - Tape/Ties (Fiksasi)"><p>Siapkan plester atau tali untuk fiksasi ETT setelah intubasi berhasil.</p></StepCard> <StepCard title="I - Introducer (Stilet/Bougie)"><p>Masukkan stilet atau siapkan bougie untuk membantu mengarahkan ETT jika diperlukan.</p></StepCard> <StepCard title="C - Connector (Konektor)"><p>Pastikan konektor ETT sesuai dengan sirkuit ventilator atau bag-valve mask.</p></StepCard> <StepCard title="S - Suction (Penghisap Lendir)"><p>Siapkan alat suction yang menyala dan berfungsi baik dengan kateter Yankauer.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Prosedur (7 P RSI)</h3> <StepCard title="1. Preparation"><p>Lakukan 10 menit sebelum induksi. Evaluasi jalan napas (LEMON), siapkan alat (STATICS), dan obat-obatan.</p></StepCard> <StepCard title="2. Preoxygenation"><p>Berikan oksigen 100% selama 3-5 menit melalui sungkup muka untuk denitrogenasi paru.</p></StepCard> <StepCard title="3. Pretreatment"><p>Pertimbangkan pemberian obat (misal: Fentanyl, Lidokain) 3 menit sebelum induksi untuk menumpulkan respons fisiologis terhadap intubasi.</p></StepCard> <StepCard title="4. Paralysis with Induction"><p>Berikan obat induksi (sedatif) diikuti segera dengan obat pelumpuh otot untuk mencapai relaksasi optimal.</p><p className="mt-2 italic text-gray-600">Selama fase ini, pertimbangkan <span className="font-semibold">Tekanan Krikoid</span> (Cricoid Pressure) untuk mencegah aspirasi isi lambung.</p></StepCard> <StepCard title="5. Positioning"><p>Posisikan kepala pasien dalam "sniffing position" untuk menyelaraskan aksis oral, faringeal, dan laringeal.</p></StepCard> <StepCard title="6. Placement of Tube"><p>Setelah 45-60 detik pasca-pelumpuh otot, lakukan laringoskopi dan masukkan ETT. Konfirmasi penempatan dengan auskultasi dan kapnografi.</p></StepCard> <StepCard title="7. Post-intubation Management"><p>Fiksasi ETT, mulai ventilasi mekanik, dan berikan sedasi/analgesia lanjutan. Dapatkan foto X-ray dada untuk konfirmasi akhir.</p></StepCard> </DetailScreenContainer> );
};

const LMAScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'teal' }) => {
        const colorClasses = { teal: 'border-teal-500 bg-teal-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-teal-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Pemasangan LMA" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Persiapan Alat & Pasien</h3> <StepCard title="1. Pilih Ukuran LMA yang Tepat"><p>Pilih ukuran berdasarkan berat badan pasien (lihat tab Kalkulator). Siapkan juga ukuran satu tingkat lebih kecil dan lebih besar.</p></StepCard> <StepCard title="2. Inspeksi & Lubrikasi"><p>Keluarkan LMA dari kemasan, kembangkan dan kempiskan balon (cuff) untuk memeriksa kebocoran. Kempiskan sepenuhnya dan berikan pelumas berbasis air di bagian belakang sungkup.</p></StepCard> <StepCard title="3. Posisi Pasien"><p>Posisikan pasien dalam "sniffing position" seperti pada intubasi untuk membuka jalan napas.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Langkah-langkah Pemasangan</h3> <StepCard title="1. Pegang LMA seperti Pena"><p>Pegang LMA di bagian tabung, dengan jari telunjuk ditempatkan di persimpangan antara tabung dan sungkup.</p></StepCard> <StepCard title="2. Masukkan ke dalam Mulut"><p>Dengan lembut tekan ujung sungkup ke langit-langit keras (palatum durum). Geser LMA ke bagian belakang tenggorokan, mengikuti lengkungan palatum.</p></StepCard> <StepCard title="3. Majukan hingga Terasa Tahanan"><p>Lanjutkan mendorong hingga Anda merasakan tahanan yang khas saat ujung LMA mencapai hipofaring bawah.</p></StepCard> <StepCard title="4. Kembangkan Balon (Cuff)"><p>Tanpa menahan tabung, kembangkan balon dengan volume udara yang direkomendasikan. Anda mungkin akan melihat LMA sedikit terdorong keluar saat balon mengembang dan menempati posisinya.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Konfirmasi Penempatan</h3> <StepCard title="1. Hubungkan ke Sirkuit"><p>Hubungkan LMA ke sirkuit ventilasi (bag-valve mask) dan berikan ventilasi tekanan positif.</p></StepCard> <StepCard title="2. Observasi & Auskultasi"><p>Perhatikan pengembangan dada yang simetris, auskultasi suara napas di kedua paru, dan tidak adanya suara di lambung.</p></StepCard> <StepCard title="3. Kapnografi"><p>Gunakan kapnografi untuk mengonfirmasi ventilasi yang efektif (deteksi CO2 pada akhir ekspirasi).</p></StepCard> <StepCard title="4. Fiksasi"><p>Setelah penempatan dikonfirmasi, fiksasi LMA dengan plester atau alat fiksasi khusus.</p></StepCard> </DetailScreenContainer> );
};

const AwakeIntubationScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'purple' }) => {
        const colorClasses = { purple: 'border-purple-500 bg-purple-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-purple-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Intubasi Sadar" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Indikasi</h3> <StepCard title="Kapan Melakukan Intubasi Sadar?"><p>Diindikasikan pada pasien dengan prediksi jalan napas sulit (skor LEMON tinggi, riwayat sulit intubasi, anatomi abnormal) di mana ventilasi spontan pasien harus dipertahankan.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Persiapan Kunci</h3> <StepCard title="1. Persetujuan & Komunikasi"><p>Jelaskan prosedur kepada pasien untuk mendapatkan kerja sama. Komunikasi yang baik adalah kunci.</p></StepCard> <StepCard title="2. Anestesi Topikal (Wajib)"><p>Ini adalah langkah paling krusial. Anestesi jalan napas secara adekuat untuk menumpulkan refleks muntah dan batuk.</p><ul className="list-disc list-inside pl-4 mt-2 text-xs"><li><strong>Hidung:</strong> Semprotan Oxymetazoline (dekongestan) diikuti Lidokain.</li><li><strong>Orofaring:</strong> Semprotan/gel Lidokain.</li><li><strong>Laring/Trakea:</strong> Blok saraf (misal: Saraf Laringeal Superior) atau teknik "spray-as-you-go" dengan Lidokain melalui bronkoskop.</li></ul></StepCard> <StepCard title="3. Sedasi Minimal (Judicious Sedation)"><p>Berikan sedasi ringan (misal: Midazolam, Fentanyl, atau Dexmedetomidine dosis rendah) untuk kenyamanan pasien, namun HINDARI henti napas.</p></StepCard> <StepCard title="4. Peralatan"><p>Siapkan semua peralatan intubasi standar (STATICS) ditambah alat khusus seperti bronkoskop fleksibel.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Langkah-langkah Prosedur</h3> <StepCard title="1. Oksigenasi"><p>Pastikan pasien menerima oksigen aliran tinggi selama prosedur melalui kanula nasal.</p></StepCard> <StepCard title="2. Lakukan Laringoskopi"><p>Gunakan laringoskop video atau bronkoskop fleksibel untuk visualisasi pita suara. Lakukan dengan perlahan dan hati-hati.</p></StepCard> <StepCard title="3. Masukkan ETT"><p>Setelah pita suara terlihat, masukkan ETT. Jika menggunakan bronkoskop, masukkan ETT melalui bronkoskop yang sudah berada di trakea.</p></StepCard> <StepCard title="4. Konfirmasi & Induksi"><p>Konfirmasi penempatan ETT dengan kapnografi selagi pasien masih bernapas spontan. Setelah yakin, baru berikan obat induksi dan pelumpuh otot jika diperlukan, lalu fiksasi ETT.</p></StepCard> </DetailScreenContainer> );
};

const CricothyrotomyScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'red' }) => {
        const colorClasses = { red: 'border-red-500 bg-red-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-red-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Cricothyrotomy" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Indikasi Darurat</h3> <StepCard title="Cannot Intubate, Cannot Oxygenate (CICO)"><p>Ini adalah prosedur penyelamatan jiwa yang dilakukan ketika semua metode lain untuk mengamankan jalan napas (intubasi, LMA, ventilasi sungkup) telah gagal dan pasien tidak dapat dioksigenasi.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Persiapan Alat</h3> <StepCard title="Kit Krikotiroidotomi"><ul className="list-disc list-inside space-y-1"><li>Scalpel (pisau bedah), biasanya No. 11.</li><li>Bougie atau Trousseau dilator.</li><li>Pipa trakeostomi atau ETT ukuran kecil (misal: 6.0 mm dengan cuff).</li><li>Sarung tangan steril, antiseptik, dan kasa.</li></ul></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Langkah-langkah Prosedur (Teknik Scalpel-Bougie)</h3> <StepCard title="1. Identifikasi Landmark"><p>Stabilkan laring dengan tangan non-dominan. Palpasi (raba) takik tiroid (Adam's apple), geser jari ke bawah hingga menemukan celah lunak dari membran krikotiroid di antara kartilago tiroid dan krikoid.</p></StepCard> <StepCard title="2. Insisi Horizontal"><p>Buat insisi horizontal yang menembus kulit dan membran krikotiroid sekaligus.</p></StepCard> <StepCard title="3. Masukkan Bougie"><p>Masukkan bougie melalui insisi ke dalam trakea, arahkan ke kaudal (ke arah paru-paru). Anda akan merasakan "klik" saat melewati cincin trakea.</p></StepCard> <StepCard title="4. Masukkan Pipa"><p>Geser pipa ETT atau trakeostomi di atas bougie hingga masuk ke dalam trakea. Hati-hati jangan sampai bougie ikut terdorong.</p></StepCard> <StepCard title="5. Konfirmasi & Fiksasi"><p>Lepaskan bougie, kembangkan balon (cuff), hubungkan ke sirkuit ventilasi, dan konfirmasi penempatan dengan kapnografi. Fiksasi pipa dengan aman.</p></StepCard> </DetailScreenContainer> );
};

const MaskVentilationScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'cyan' }) => {
        const colorClasses = { cyan: 'border-cyan-500 bg-cyan-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-cyan-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Ventilasi Sungkup Wajah" backToMain={backToMain}> <h3 className="font-bold text-lg mb-3 text-gray-800">Tujuan</h3> <StepCard title="Keterampilan Fundamental"><p>Ventilasi sungkup wajah (Bag-Valve-Mask/BVM) adalah keterampilan dasar untuk memberikan oksigenasi dan ventilasi kepada pasien yang tidak bernapas secara adekuat.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Langkah-langkah Prosedur</h3> <StepCard title="1. Pilih Ukuran Sungkup"><p>Pilih sungkup yang menutupi hidung dan mulut pasien tanpa menekan mata atau melewati dagu.</p></StepCard> <StepCard title="2. Posisikan Pasien"><p>Posisikan pasien dalam "sniffing position" untuk membuka jalan napas.</p></StepCard> <StepCard title="3. Teknik Memegang Sungkup (C-E Grip)"><p>Gunakan satu tangan. Bentuk huruf 'C' dengan ibu jari dan jari telunjuk untuk menekan sungkup ke wajah. Gunakan tiga jari lainnya untuk membentuk huruf 'E' yang menarik rahang (mandibula) ke atas, ke arah sungkup.</p></StepCard> <StepCard title="4. Berikan Ventilasi"><p>Dengan tangan yang lain, remas kantung (bag) secara perlahan selama 1 detik, cukup untuk membuat dada mengembang. Hindari ventilasi yang berlebihan.</p></StepCard> <StepCard title="5. Evaluasi"><p>Perhatikan pengembangan dada yang adekuat, dengarkan suara napas, dan periksa kapnografi jika tersedia.</p></StepCard> <h3 className="font-bold text-lg mb-3 mt-6 text-gray-800">Tips Mengatasi Kesulitan</h3> <StepCard title="RODS - Penyebab Ventilasi Sulit"><ul className="list-disc list-inside space-y-1"><li><strong>R (Restriction):</strong> Penyakit paru restriktif.</li><li><strong>O (Obesity/Obstruction):</strong> Obesitas atau obstruksi jalan napas atas.</li><li><strong>D (Disruption/Leak):</strong> Kebocoran di sekitar sungkup (misal: karena jenggot).</li><li><strong>S (Stiffness):</strong> Kekakuan paru (misal: ARDS, asma).</li></ul></StepCard> </DetailScreenContainer> );
};

const SOAPMEScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'green' }) => {
        const colorClasses = { green: 'border-green-500 bg-green-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-green-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Checklist Pra-Intubasi (SOAP ME)" backToMain={backToMain}> <StepCard title="S - Suction (Penghisap Lendir)"><p>Pastikan alat suction menyala, terpasang dengan kateter Yankauer, dan berada dalam jangkauan.</p></StepCard> <StepCard title="O - Oxygen (Oksigen)"><p>Pastikan sumber oksigen berfungsi. Siapkan sungkup muka (BVM) dan kanula nasal untuk pre-oksigenasi.</p></StepCard> <StepCard title="A - Airway (Peralatan Jalan Napas)"><p>Siapkan laringoskop, ETT dalam berbagai ukuran, stilet/bougie, dan alat jalan napas alternatif seperti LMA.</p></StepCard> <StepCard title="P - Pharmacy (Obat-obatan)"><p>Siapkan dan beri label semua obat untuk induksi, pelumpuh otot, dan obat darurat (misal: vasopressor).</p></StepCard> <StepCard title="M - Monitoring (Monitor)"><p>Pastikan monitor pasien menyala dan menampilkan EKG, tekanan darah, saturasi oksigen (SpO2), dan kapnografi (EtCO2).</p></StepCard> <StepCard title="E - Equipment (Peralatan Tambahan)"><p>Pastikan peralatan lain seperti akses IV yang berfungsi baik, defibrilator, dan peralatan resusitasi lainnya tersedia.</p></StepCard> </DetailScreenContainer> );
};

const DifficultAirwayChecklistScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'orange' }) => {
        const colorClasses = { orange: 'border-orange-500 bg-orange-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-orange-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Checklist Jalan Napas Sulit" backToMain={backToMain}> <StepCard title="Panggil Bantuan"><p>Segera informasikan kepada anggota tim yang lebih senior atau ahli jalan napas.</p></StepCard> <StepCard title="Siapkan Alat Khusus"><p>Pastikan laringoskop video, bronkoskop fleksibel, dan kit krikotiroidotomi tersedia di samping tempat tidur.</p></StepCard> <StepCard title="Rencanakan & Komunikasikan"><p>Buat rencana utama (Plan A), rencana cadangan (Plan B, C), dan rencana darurat (Plan D). Komunikasikan rencana ini dengan seluruh tim.</p></StepCard> <StepCard title="Pertahankan Oksigenasi"><p>Prioritaskan oksigenasi. Pertimbangkan intubasi sadar untuk menjaga ventilasi spontan pasien.</p></StepCard> </DetailScreenContainer> );
};

const TransferChecklistScreen = ({ backToMain }) => {
    const StepCard = ({ title, children, color = 'sky' }) => {
        const colorClasses = { sky: 'border-sky-500 bg-sky-50' };
        return ( <div className={`border-l-4 ${colorClasses[color]} p-4 rounded-r-lg mb-4 shadow-sm`}> <h3 className={`text-md font-bold text-sky-800 mb-2`}>{title}</h3> <div className="text-sm text-gray-700 space-y-2">{children}</div> </div> );
    };
    return ( <DetailScreenContainer title="Checklist Transfer Pasien Terintubasi" backToMain={backToMain}> <StepCard title="A - Airway (Jalan Napas)"><p>Pastikan ETT terfiksasi dengan baik dan catat kedalamannya. Konfirmasi suara napas bilateral.</p></StepCard> <StepCard title="B - Breathing (Pernapasan)"><p>Pastikan pasien terhubung dengan ventilator transport atau BVM. Cek pengaturan ventilator dan pastikan dada mengembang.</p></StepCard> <StepCard title="C - Circulation (Sirkulasi)"><p>Pastikan akses IV paten dan aman. Bawa obat-obatan darurat dan pastikan tekanan darah stabil.</p></StepCard> <StepCard title="D - Drugs (Obat-obatan)"><p>Pastikan obat sedasi dan pelumpuh otot (jika digunakan) berjalan lancar melalui pompa infus.</p></StepCard> <StepCard title="E - Equipment (Peralatan)"><p>Pastikan monitor transport berfungsi dengan baterai penuh. Pastikan tabung oksigen transport memiliki tekanan yang cukup.</p></StepCard> </DetailScreenContainer> );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('Kalkulator');
  const [currentScreen, setCurrentScreen] = useState('main'); 
  
  const showDetailScreen = (screenName) => { setCurrentScreen(screenName); };
  const backToMain = () => { setCurrentScreen('main'); };

  const renderContent = () => {
    const screens = {
        'DASGuideline': <DASGuidelineScreen backToMain={backToMain} />,
        'DifficultAirway': <DifficultAirwayScreen backToMain={backToMain} />,
        'RSI': <RSIScreen backToMain={backToMain} />,
        'LMA': <LMAScreen backToMain={backToMain} />,
        'AwakeIntubation': <AwakeIntubationScreen backToMain={backToMain} />,
        'Cricothyrotomy': <CricothyrotomyScreen backToMain={backToMain} />,
        'MaskVentilation': <MaskVentilationScreen backToMain={backToMain} />,
        'SOAPME': <SOAPMEScreen backToMain={backToMain} />,
        'DifficultAirwayChecklist': <DifficultAirwayChecklistScreen backToMain={backToMain} />,
        'TransferChecklist': <TransferChecklistScreen backToMain={backToMain} />,
    };

    if (screens[currentScreen]) {
        return screens[currentScreen];
    }

    // Main Tabbed View
    return (
      <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto bg-gray-50">
            {activeTab === 'Kalkulator' && <CalculatorScreen />}
            {activeTab === 'Algoritma' && <AlgorithmScreen />}
            {activeTab === 'Prosedur' && <ProcedureScreen showDetailScreen={showDetailScreen} />}
            {activeTab === 'Ventilator' && <VentilatorScreen />}
            {activeTab === 'Tentang' && <AboutScreen />}
          </div>
           <div className="w-full bg-white border-t border-gray-200 flex justify-around">
                <TabBarButton label="Kalkulator" icon={CalculatorIcon} isActive={activeTab === 'Kalkulator'} onClick={() => { setActiveTab('Kalkulator'); backToMain(); }} />
                <TabBarButton label="Algoritma" icon={FlowchartIcon} isActive={activeTab === 'Algoritma'} onClick={() => { setActiveTab('Algoritma'); backToMain(); }} />
                <TabBarButton label="Prosedur" icon={ClipboardIcon} isActive={activeTab === 'Prosedur'} onClick={() => { setActiveTab('Prosedur'); backToMain(); }} />
                <TabBarButton label="Ventilator" icon={VentilatorIcon} isActive={activeTab === 'Ventilator'} onClick={() => { setActiveTab('Ventilator'); backToMain(); }} />
                <TabBarButton label="Tentang" icon={AboutIcon} isActive={activeTab === 'Tentang'} onClick={() => { setActiveTab('Tentang'); backToMain(); }} />
            </div>
      </div>
    );
  };
  
  const TabBarButton = ({ label, icon, isActive, onClick }) => {
    const IconComponent = icon;
    return (
      <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 py-2 focus:outline-none">
        <IconComponent className={classNames("w-6 h-6 mb-1 transition-colors", isActive ? 'text-blue-600' : 'text-gray-400')} />
        <span className={classNames("text-xs font-medium transition-colors", isActive ? 'text-blue-600' : 'text-gray-500')}>{label}</span>
      </button>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto h-[750px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-black font-sans">
      {renderContent()}
    </div>
  );
}

