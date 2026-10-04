export interface DetailedFolio {
  id: string;
  plateNumber: string;
  title: string;
  arabicTitle: string;
  category: 'Automata & Horology' | 'Hydraulics & Water-Raising' | 'Precision Measurement' | 'Kinematics & Modern Lineage' | 'Modern Perspectives';
  imageUrl: string;
  imageAlt: string;
  isHistorical: boolean;
  historicalBadge: string;
  sourceCredit: string;
  summary?: string;
  heading: string;
  reasoning: string;
  history: string;
  working: string;
  keyInnovations: string[];
  dimensionsOrSpecs?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  arabicSubtitle?: string;
  description: string;
  iconName: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1136 CE',
    title: 'Birth in Jazirat ibn \'Umar',
    arabicSubtitle: 'المولد في الجزيرة الفراتية',
    description: 'Born in Upper Mesopotamia (modern-day Cizre, Turkey) into an artisan family. His father was a master court craftsman, giving young Ismail early mastery of metallurgy, casting, and carpentry.',
    iconName: 'Compass'
  },
  {
    year: '1174 CE',
    title: 'Enters Royal Court Service',
    arabicSubtitle: 'دخول بلاط بني أرتق',
    description: 'Enters the service of the Artuqid Dynasty at the royal citadel in Amid (modern Diyarbakır), beginning a distinguished tenure serving three successive sultans across 32 years.',
    iconName: 'Castle'
  },
  {
    year: 'c. 1180 CE',
    title: 'Appointed Chief Court Engineer',
    arabicSubtitle: 'رئيس المهندسين في ديار بكر',
    description: 'Promoted to Ra\'īs al-A\'māl (Chief of Works / Chief Engineer). Directs palace hydraulic works, state irrigation schemes, monumental ceremonial fountains, and palace security automata.',
    iconName: 'Crown'
  },
  {
    year: '1190–1200 CE',
    title: 'Invention of the Crank & Suction Pump',
    arabicSubtitle: 'ابتكار عمود الكرنك والمضخة المزدوجة',
    description: 'Develops the double-acting reciprocating piston suction pump and formalizes the crank-and-connecting-rod mechanism, converting circular motion into linear power for the first time.',
    iconName: 'Cog'
  },
  {
    year: '1206 CE',
    title: 'Completion of The Book of Knowledge',
    arabicSubtitle: 'إتمام كتاب الحيل الهندسية',
    description: 'At the request of Sultan Nasir al-Din Mahmud, finishes his monumental 50-chapter treatise "Kitāb fī ma\'rifat al-ḥiyal al-handasiyya", containing fifty intricate color blueprints and fabrication instructions.',
    iconName: 'BookOpen'
  },
  {
    year: '1206 CE',
    title: 'Death & Enduring World Legacy',
    arabicSubtitle: 'وفاته وبقاء أثره العلمي الخالد',
    description: 'Passes away shortly after presenting his manuscript. His designs spread across Islamic and European civilizations, establishing core principles of mechanical automation and robotics.',
    iconName: 'Award'
  }
];

export const DETAILED_PLATES: DetailedFolio[] = [
  {
    id: 'portrait-bio',
    plateNumber: 'Folio 1r',
    title: 'Portrait & Biography of Ismail al-Jazari',
    arabicTitle: 'سِيرَةُ وَصُورَةُ بَدِيعِ الزَّمَانِ الجَزَرِي',
    category: 'Kinematics & Modern Lineage',
    imageUrl: '/images/portrait.jpg',
    imageAlt: 'Modern artist impression portrait of Ismail al-Jazari with turban and beard',
    isHistorical: false,
    historicalBadge: 'Modern Artist’s Impression (No Lifetime Portrait Survives)',
    sourceCredit: 'Contemporary visual tribute to Badīʿ al-Zamān Abū al-ʿIzz Ismāʿīl ibn al-Razzāz al-Jazarī (1136–1206 CE).',
    heading: 'The Master Artisan and Chief Court Engineer of Amid',
    reasoning: 'Al-Jazari recognized that theoretical mechanics from antiquity (Hero of Alexandria, Philon of Byzantium, Banu Musa) lacked practical assembly rigor, reproducible tolerances, and reliable feedback controls. He set out to bridge high theoretical science with hands-on workshop mastery.',
    history: 'Born circa 1136 CE in Jazīrat ibn ʿUmar (modern Cizre, southeastern Turkey) into an artisan family. Around 1174 CE, he entered royal service at the Artuqid citadel in Diyarbakır (Amid) and was appointed Raʾīs al-Aʿmāl (Chief Engineer) circa 1180 CE. He served three successive sultans across 32 years, completing his monumental 50-chapter compendium in 1206 CE.',
    working: 'Combines metal casting, precision lathe turning, water level float feedback, cam-driven sequencing, and gear trains. Al-Jazari personally fabricated wooden models, calibrated copper flow orifices in lamp oil, and documented step-by-step assembly instructions for every component.',
    keyInnovations: [
      'Empirical fabrication standards with calibrated tolerances',
      'Integration of aesthetics, ritual performance, and industrial utility',
      'First comprehensive mechanical engineering textbook with 50 color blueprints',
      'Systematic use of modular sub-assemblies for rapid repair'
    ],
    dimensionsOrSpecs: 'Chief Engineer of the Artuqid Dynasty (1180–1206 CE).'
  },
  {
    id: 'peacock-basin',
    plateNumber: 'Plate I',
    title: 'The Peacock Hand-Washing Automaton',
    arabicTitle: 'طاووس غسل اليدين والوضوء الآلي',
    category: 'Automata & Horology',
    imageUrl: '/images/peacock_basin.jpg',
    imageAlt: 'Original manuscript miniature of the peacock hand washing basin with servant automaton',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Folio (Süleymaniye / Topkapi MS)',
    sourceCredit: 'Kitāb fī ma\'rifat al-ḥiyal al-handasiyya (1206 CE), Category II on Automated Vessels.',
    heading: 'Automated Ritual Ablution & Service Robotics',
    reasoning: 'In medieval court etiquette, royal guests washed their hands before dining and prayer. Al-Jazari engineered a self-metering ceremonial automaton that provided fresh water, offered fragrant soap, and dispensed a clean towel without requiring human servants to linger over the guests.',
    history: 'Constructed for Sultan Sukman II at the Diyarbakır Palace in Upper Mesopotamia. It represents one of the earliest documented functional service robots in world history.',
    working: 'When water is poured into the upper reservoir, a hidden tipping bucket gradually fills. Upon reaching its center of gravity, it pivots and discharges a measured volume through the peacock\'s curved beak. Simultaneously, the falling water drops into a lower sump float. The rising float pulls a linked cord over pulleys, opening a miniature door and advancing a mechanical servant figure along an inclined track holding soap in one hand and a towel in the other.',
    keyInnovations: [
      'Self-metering tipping vessel escapement',
      'Float-actuated door latch and figure carriage rail',
      'Timed multi-stage event sequence (Water Flow → Servant Emerges → Cloth Offered)',
      'Gravity-powered reset cycle upon basin drainage'
    ],
    dimensionsOrSpecs: 'Height ~1.2 meters, hammered brass, tin solder, enamel embellishment.'
  },
  {
    id: 'musical-boat',
    plateNumber: 'Plate II',
    title: 'The Flotilla of Robotic Musicians',
    arabicTitle: 'زورق الموسيقيين والفرقة الآلية العائمة',
    category: 'Automata & Horology',
    imageUrl: '/images/musical_boat.jpg',
    imageAlt: 'Authentic miniature of royal boat with sultan and four robotic musicians',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Manuscript Miniature (MFA Boston / Topkapi MS)',
    sourceCredit: 'Chapter on Floating Automata & Banquet Entertainment Devices, 1206 CE.',
    summary: 'A floating pleasure vessel carrying automated musicians who played synchronized polyrhythms.',
    heading: 'The World’s First Programmable Drum Machine',
    reasoning: 'Palace banquets and royal barge outings upon the Tigris River required musical entertainment that could play unattended for extended periods while maintaining steady rhythm and festive spectacle.',
    history: 'Constructed in the 1190s for the royal lake at Diyarbakır Citadel. Computer historians and roboticists recognize this device as the direct conceptual ancestor of programmable audio synthesis and automated musical boxes.',
    working: 'Water stored in an upper tank drains through a calibrated orifice onto a concealed waterwheel inside the boat\'s hull. As the waterwheel turns, its horizontal axle functions as a rotating camshaft studded with protruding pegs. As these pegs rotate, they trip levers connected to the mechanical drummers\' articulated arms, striking drums with varying cadences. Water displacement also forces air through tuned whistle chambers to produce acoustic flute notes.',
    keyInnovations: [
      'Interchangeable peg camshaft allowing reprogrammable musical rhythms',
      'Articulated mannequin joints producing lifelike performance motion',
      'Pneumatic acoustic flute synthesis via liquid displacement chambers',
      'Buoyant self-leveling hull operating seamlessly on open palace waterways'
    ],
    dimensionsOrSpecs: 'Hull length ~1.5 meters, cedar wood, cast brass cams, copper whistle tubes.'
  },
  {
    id: 'castle-clock',
    plateNumber: 'Plate III',
    title: 'The Monumental Castle Astronomical Clock',
    arabicTitle: 'ساعة القلعة الفلكية العظيمة',
    category: 'Automata & Horology',
    imageUrl: '/images/castle_clock.jpg',
    imageAlt: 'Authentic 1206 manuscript miniature of the Castle Clock with celestial dial and robotic orchestra',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Folio Illustration (Süleymaniye Library, MS 3472)',
    sourceCredit: 'Category I (Monumental Clocks), Kitāb fī ma\'rifat al-ḥiyal al-handasiyya.',
    heading: 'The First Programmable Analog Astronomical Computer',
    reasoning: 'Medieval Islamic astronomy required tracking temporal hours (which varied in length between summer and winter) while simultaneously presenting planetary positions, zodiacal constellations, and acoustic alarms for the five daily prayer calls.',
    history: 'Standing over 11 feet (3.3 meters) tall, this colossal water clock was erected in the main hall of Diyarbakır Citadel. It is recognized as the world’s first programmable analog computer with daily reprogrammable temporal rates.',
    working: 'A main cylindrical water reservoir empties through a float valve into a calibrated flow regulator. As the water level descends at a constant rate, an attached heavy float turns the celestial zodiac disc overhead. Every hour, a door opens revealing a mechanical figurine, two brass falcons tilt forward and drop bronze spheres from their beaks onto sounding cymbals, and a camshaft driven by wastewater turns five robotic musicians who sound drums, cymbals, and trumpets.',
    keyInnovations: [
      'Reprogrammable flow regulator adjusting hour duration to seasonal solar variations',
      'Geared astronomical dial tracking celestial zodiac positions',
      'Acoustic strike escapement dropping bronze spheres onto tuned vases',
      'Automated camshaft orchestrating multi-instrument robotic fanfare'
    ],
    dimensionsOrSpecs: 'Height: 3.3 meters (11 feet), width: 2.2 meters, gilded wood and brass.'
  },
  {
    id: 'scale-device',
    plateNumber: 'Plate IV',
    title: 'The Precision Water Balance & Siphon Measuring Vessel',
    arabicTitle: 'ميزان المياه وأداة قياس السوائل الدقيقة',
    category: 'Precision Measurement',
    imageUrl: '/images/scale_device.jpg',
    imageAlt: 'Manuscript folio depicting graduated balance beam and siphon vessels',
    isHistorical: true,
    historicalBadge: 'Authentic Folio Miniature (Aga Khan Museum / David Collection MS)',
    sourceCredit: 'Section on Graduated Vessels, Laboratory Siphons, and Fluid Balances.',
    heading: 'Hydrostatic Balance, Annular Siphons & Calibrated Flow',
    reasoning: 'Scientific alchemy, medicine, and phlebotomy (bloodletting measurement) demanded standardized vessels that could accurately meter fluid volume independently of human error or changing hydraulic pressure.',
    history: 'Developed during Al-Jazari\'s tenure as Chief of Works in Diyarbakır, formalizing hydrostatic principles and annular siphon designs that were later adopted across European scientific laboratories.',
    working: 'Features two balanced fluid vessels linked across a central rocker fulcrum. Liquid enters a central reception bowl and is channeled through twin concentric annular siphons. When the liquid level inside one vessel reaches the apex of the siphon, a self-priming siphon action empties it instantly, tipping the balance beam and advancing a graduated mechanical pointer on a calibrated scale.',
    keyInnovations: [
      'Self-priming concentric annular siphons',
      'Closed-loop hydrostatic pressure balancing',
      'Mechanical pointer integration with linear volumetric scales',
      'Constant-rate hydraulic transfer independent of reservoir level'
    ],
    dimensionsOrSpecs: 'Polished brass balance beam, blown glass level columns, copper siphons.'
  },
  {
    id: 'saqiya-pump',
    plateNumber: 'Plate V',
    title: 'The Automated Donkey Saqiya Chain-Pump',
    arabicTitle: 'الساقية الدوارة ذات الحيوان الآلي',
    category: 'Hydraulics & Water-Raising',
    imageUrl: '/images/saqiya_pump.jpg',
    imageAlt: 'Manuscript folio of Al-Jazari showing wooden animal automaton turning vertical axle driving bucket chain',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Folio Illustration (MS Ahmet III 3472)',
    sourceCredit: 'Category V: Machines for Raising Water from Wells and Deep Rivers.',
    heading: 'Continuous Irrigation & Right-Angle Gear Trains',
    reasoning: 'Traditional well-lifting required exhausting manual labor. Al-Jazari engineered an automated continuous-duty chain-pump capable of lifting deep groundwater to high-elevation irrigation channels with maximum mechanical efficiency.',
    history: 'Deployed extensively across the fertile valleys of Upper Mesopotamia, transforming agricultural output around Diyarbakır, Mardin, and Cizre.',
    working: 'An animal walks in a circle on an elevated platform, turning a heavy vertical driveshaft. This shaft drives a right-angle lantern gear that rotates an overhead horizontal axle. The axle turns a slotted pulley carrying an endless chain of earthen scoops (*pot-chain* / *noria*). The pots plunge into the deep water table, ascend filled, and invert at the top, discharging into an elevated stone aqueduct. A wooden automaton animal revolves in sync above.',
    keyInnovations: [
      'Low-friction right-angle lantern-and-pin gear geometry',
      'Continuous endless pot-chain (sinor) with self-clearing return links',
      'Automaton animal linkage providing visual telemetry of rotation speed',
      'Gravity-fed aqueduct flume with sediment settling traps'
    ],
    dimensionsOrSpecs: 'Lift capacity up to 12 meters with 300 liters/minute continuous output.'
  },
  {
    id: 'four-bucket',
    plateNumber: 'Plate VI',
    title: 'The Four-Bucket Camshaft Water-Raising Engine',
    arabicTitle: 'رافعة المياه ذات الدلاء الأربعة وعمود الكامات',
    category: 'Hydraulics & Water-Raising',
    imageUrl: '/images/four_bucket.jpg',
    imageAlt: 'Manuscript folio illustrating four-chamber vertical balance pump with stepped cam discs',
    isHistorical: true,
    historicalBadge: 'Authentic Manuscript Illustration (Topkapi Palace Collection)',
    sourceCredit: 'Chapter V, Machine 3: High-Capacity Reciprocating Water Engines.',
    heading: 'The Earliest Multi-Phase Camshaft Engine',
    reasoning: 'Single-bucket lifts suffered from dead-cycles while the bucket was lowered and refilled. Al-Jazari sought an uninterrupted continuous flow machine using a single rotating power source.',
    history: 'Created in the late 12th century, this machine introduced the mechanical principle of staggered multi-cam phasing centuries before the invention of multi-cylinder reciprocating engines.',
    working: 'A central vertical shaft is fitted with four stepped radial cam lobes, each offset by 90 degrees. As the central axle turns, each cam lobe sequentially depresses the short arm of a see-saw balance beam, dipping its bucket into the water channel. When the cam lobe rotates past, lead counterweights lift the full bucket to the top discharge flume. Because the four cams are staggered, one bucket is always discharging while another is filling, ensuring unbroken water flow.',
    keyInnovations: [
      'Four-phase staggered camshaft timing eliminating hydraulic dead-time',
      'Counterweighted rocker beams reducing draft animal exertion',
      'Modular wooden framework with easily replaceable bronze journal bearings',
      'Torque multiplication through high-reduction bevel gearing'
    ],
    dimensionsOrSpecs: 'Four synchronized beams, continuous discharge rate up to 400 L/min.'
  },
  {
    id: 'segmental-gear',
    plateNumber: 'Plate VII',
    title: 'The Segmental Intermittent Gear Waterwheel',
    arabicTitle: 'عجلة التروس القطاعية لرفع المياه',
    category: 'Hydraulics & Water-Raising',
    imageUrl: '/images/segmental_gear.jpg',
    imageAlt: 'Original manuscript diagram of scoop-wheel with segmental gear wheel mechanism',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Folio Illustration (MS Greaves 27)',
    sourceCredit: 'Category V: Hydro-powered Mechanical Water Lifters.',
    heading: 'The Origin of Segmental & Intermittent Gearing',
    reasoning: 'Lifting water directly from swift river currents required converting steady, continuous hydraulic flow into rhythmic intermittent strokes that allowed buckets time to fill before being hoisted.',
    history: 'Al-Jazari is credited in the history of mechanics with the invention of the segmental gear—a concept that later proved essential for mechanical clocks, industrial textile looms, and automated assembly machinery.',
    working: 'Flowing river water turns a large spoon-bladed waterwheel. On its main shaft is mounted a gearwheel with teeth covering only one quadrant (a segmental gear). As it revolves, the toothed segment meshes with a vertical gear rack, lifting a heavy balance scoop filled with water to an upper channel. When the smooth, toothless section comes around, the gear disengages, and gravity gently drops the empty scoop back into the river to refill.',
    keyInnovations: [
      'Invention of the segmental (partially-toothed) gear mechanism',
      'Spoon-blade hydraulic impeller geometry maximizing hydrodynamic torque',
      'Automatic gravity-assisted disengagement and return stroke',
      'Self-aligning bronze axle bushings immersed in oiled wood blocks'
    ],
    dimensionsOrSpecs: 'Impeller diameter 2.4 meters, constructed in oak, iron fasteners, and cast brass.'
  },
  {
    id: 'animal-piston',
    plateNumber: 'Plate VIII',
    title: 'The Animal-Powered Reciprocating Piston Pump Frame',
    arabicTitle: 'مضخة الكباسات الحيوانية ذات الأسطوانتين',
    category: 'Hydraulics & Water-Raising',
    imageUrl: '/images/animal_piston.jpg',
    imageAlt: 'Manuscript folio of animal-powered piston pump lifter with overhead framework',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Manuscript Folio (Ahmet III MS 3472)',
    sourceCredit: 'Category V, Machine 5: Positive Displacement Piston Pumps.',
    heading: 'Twin-Cylinder Reciprocating Positive Displacement',
    reasoning: 'Bucket elevators lost water due to spillage and evaporation at high lift heights. Al-Jazari designed an enclosed positive-displacement pump that could generate true vacuum suction and high pressure delivery through sealed pipes.',
    history: 'Documented in 1206, this machine marked the transition from open gravity buckets to enclosed fluid pressure hydraulics.',
    working: 'An animal walking in a circle turns an overhead horizontal drive arm. Through vertical step-down gearing and an eccentric crank arm, this rotary motion is converted into alternating reciprocating strokes of two horizontal piston rods. Each piston travels inside a close-fitting copper cylinder equipped with non-return suction valves in the sump and non-return delivery valves leading to an overhead discharge pipe.',
    keyInnovations: [
      'Twin opposed cylinders operating in alternating push-pull suction and delivery',
      'Precision-lathed copper cylinder liners with close-fitting piston seals',
      'Automatic non-return clack valves sealing on fluid backpressure',
      'Enclosed pipe pressurized water delivery overcoming open spillage'
    ],
    dimensionsOrSpecs: 'Twin 15cm diameter copper cylinders, lift capacity over 14 meters.'
  },
  {
    id: 'crank-engine',
    plateNumber: 'Plate IX',
    title: 'The Crank-Connecting Rod & The Modern Engine',
    arabicTitle: 'عَمُودُ الكَرَنْكِ وَالمُحَرِّكُ الحَدِيثْ',
    category: 'Kinematics & Modern Lineage',
    imageUrl: '/images/crank_pump.jpg',
    imageAlt: 'Authentic manuscript folio of double-acting suction pump with crank mechanism (1206 CE)',
    isHistorical: true,
    historicalBadge: 'Authentic 1206 Manuscript Folio (Ahmet III 3472)',
    sourceCredit: 'The Book of Knowledge of Ingenious Mechanical Devices (1206), Category V, Machine 4.',
    heading: 'The Foundational Kinematics of the Industrial Era',
    reasoning: 'Prior to Al-Jazari, rotary power (waterwheels, windmills, animal sweeps) could not be reliably transformed into continuous straight-line reciprocating push-pull force. His crank-and-connecting-rod mechanism solved this universal kinematic challenge.',
    history: 'Historians of technology (including Donald Hill, Lynn White Jr., and Joseph Needham) identify Al-Jazari’s 1206 suction pump as the first true crank-connecting rod mechanism in recorded history. This exact kinematic linkage later became the foundation of Thomas Newcomen’s and James Watt’s steam engines, Nikolaus Otto’s internal combustion engine, and modern automotive powertrains.',
    working: 'A central paddle waterwheel rotates a driveshaft fitted with an eccentric crankpin. Attached to the crankpin is an articulated connecting rod whose opposite end is pinned to a sliding piston crosshead. As the crankwheel rotates 360 degrees, the connecting rod pushes the piston forward (generating high pressure discharge) and pulls it backward (generating a vacuum that sucks water through an intake pipe). Two opposed cylinders operate in anti-phase for smooth, unbroken pumping.',
    keyInnovations: [
      'Conversion of continuous circular rotation into linear reciprocating motion',
      'First documented double-acting reciprocating piston pump',
      'Twin-cylinder opposed balanced architecture',
      'Direct mechanical ancestor of steam engines, diesel engines, and automotive drivetrains'
    ],
    dimensionsOrSpecs: 'Waterwheel driven, twin double-acting cylinders with suction lift.'
  },
  {
    id: 'elephant-replica',
    plateNumber: 'Plate X',
    title: 'The Elephant Clock: Modern Working Reconstruction',
    arabicTitle: 'نموذج ساعة الفيل المعاصر — دبي',
    category: 'Modern Perspectives',
    imageUrl: '/images/elephant_replica.jpg',
    imageAlt: 'Modern full-scale working reconstruction of Al-Jazari Elephant Clock at Ibn Battuta Mall, Dubai',
    isHistorical: false,
    historicalBadge: 'Modern Working Commercial Reconstruction (Ibn Battuta Mall, Dubai)',
    sourceCredit: 'Full-scale operational tribute built in 2005 based precisely on Al-Jazari\'s 1206 blueprints.',
    heading: 'The Multi-Cultural Marvel of Medieval Horology',
    reasoning: 'Al-Jazari designed the Elephant Clock as a grand tribute to universal human civilization, deliberately synthesizing five distinct cultural traditions: the Indian elephant, Chinese dragons, Egyptian phoenix, Arabian turbaned riders, and Persian carpets.',
    history: 'A full-scale, 21-foot (6.5m) tall working reconstruction was erected in Dubai’s Ibn Battuta Mall in 2005, verifying the exact mechanical feasibility and timing precision of Al-Jazari’s original 1206 manuscripts.',
    working: 'Inside the elephant’s belly sits a hidden water reservoir with a calibrated floating bowl (clepsydra) that has a precision hole in its base. As water slowly enters the bowl over exactly 30 minutes, the bowl sinks. A cord tied to the bowl pulls a gear train that rotates the turbaned scribe on top. When the bowl sinks completely, it triggers a release lever: a bronze sphere drops from the dome onto a Chinese dragon’s mouth. The dragon pivots downward under the ball’s weight, dropping it into a vase where it trips an elephant driver hammer to strike a cymbal. The dragon’s descent pulls a pulley cord that lifts the water bowl back to the surface, resetting the 30-minute cycle automatically.',
    keyInnovations: [
      'Self-resetting 30-minute clepsydra water cycle',
      'Multi-stage mechanical cascade with dragon counterpoise and falcon dropper',
      'Harmonious synthesis of Indian, Chinese, Egyptian, Arabian, and Persian cultural motifs',
      'Acoustic and visual time signaling with zero electrical or electronic components'
    ],
    dimensionsOrSpecs: 'Modern replica height: 6.5 meters (21 ft), water reservoir capacity ~200 liters.'
  },
  {
    id: 'elephant-3d',
    plateNumber: 'Plate XI',
    title: 'Elephant Clock: Modern 3D Technical Cutaway Schematic',
    arabicTitle: 'المخطط الهندسي ثلاثي الأبعاد لساعة الفيل',
    category: 'Modern Perspectives',
    imageUrl: '/images/elephant_3d_cutaway.jpg',
    imageAlt: '3D computer-generated technical cutaway of the Elephant Clock mechanism with callouts',
    isHistorical: false,
    historicalBadge: 'Modern 3D Technical CAD Schematic (Explanatory Diagram)',
    sourceCredit: 'Contemporary computer kinematic model illustrating the internal mechanical linkages.',
    heading: 'Internal Kinematic Architecture & Sub-System Anatomy',
    reasoning: 'Because the original clock mechanism was entirely concealed inside the elephant’s body and castle tower, modern 3D cutaways allow engineers to study how the hydrodynamic, gravitational, and acoustic sub-systems interlock in real time.',
    history: 'Modern CAD models developed by historians of science to demonstrate how Al-Jazari utilized gravity, buoyancy, and counterpoise mechanics in closed feedback loops.',
    working: 'The schematic breaks down five primary sub-systems: (1) Sinking clepsydra reservoir in elephant body; (2) Dial rotation pulley advancing the scribe pointer; (3) Upper falcon ball-release magazine; (4) Hinged Chinese dragon lever pivoting on a central axis; and (5) Bottom strike hammer sounding the bronze cymbal while rewinding the clepsydra retrieval line.',
    keyInnovations: [
      'Automated energy recovery via gravity counterpoise',
      'Interconnected sub-system triggering through mechanical trip-levers',
      'Enclosed water tank minimizing evaporation losses',
      'Precise 30-minute timing intervals maintained through constant fluid orifice flow'
    ],
    dimensionsOrSpecs: 'Digital CAD kinematic analysis with animated stroke simulation.'
  },
  {
    id: 'study-infographic',
    plateNumber: 'Plate XII',
    title: 'Study No. 010: Systems Architecture & Cybernetic Automata',
    arabicTitle: 'دراسة معمارية النظم والتحكم السيبراني',
    category: 'Modern Perspectives',
    imageUrl: '/images/study_infographic.jpg',
    imageAlt: 'Modern analytical study poster Study No 010 Al-Jazari Book of Ingenious Devices',
    isHistorical: false,
    historicalBadge: 'Modern Analytical Study Poster (Study No. 010)',
    sourceCredit: 'Contemporary retrospective study examining Al-Jazari\'s engineering as a proto-cybernetic system.',
    heading: 'Proto-Cybernetics, Feedback Control & Co-Cognition',
    reasoning: 'Modern robotics scholars analyze Al-Jazari not merely as a clockmaker, but as a systems architect who integrated sensory feedback, programmable cam sequencing, and human-machine interaction into unified functional ecosystems.',
    history: 'Part of modern academic inquiries into the Islamic Golden Age showing how medieval engineering fused technological functionality with public wonder, ritual, and philosophical inquiry before specialization separated science from craft.',
    working: 'Maps Al-Jazari\'s three foundational control paradigms: (1) Water Level Float Feedback (closed-loop regulation); (2) Cam Sequence Event Driving (stored program execution); and (3) Kinetic Translation (rotary-to-linear conversion and intermittent gear timing).',
    keyInnovations: [
      'Closed-loop feedback control systems predating James Watt by 600 years',
      'Cam-based stored state execution (ancestor of computer punch-cards)',
      'Integration of ritual, public spectacle, and mechanical engineering',
      'Holistic systems design where technical function is inseparable from aesthetic harmony'
    ],
    dimensionsOrSpecs: 'Modern academic systems analysis and cybernetics reference.'
  }
];
