/*
 * Editable site content for Smyan Reddy's research portfolio.
 * Edit text values in SITE_CONTENT below to update both the home page (/)
 * and the PENTA(mer) project brief (/penta-mer/) without touching HTML markup.
 *
 * Content rules:
 * - Keep PENTA(mer) text copied verbatim from the written proposal.
 * - Do not add phone numbers, street addresses, or reference contact details.
 * - Avoid em dashes and exclamation marks in copy.
 */

window.SITE_CONTENT = {
  person: {
    name: "Smyan Reddy",
    descriptor: "Tenth-grade researcher, Lambert High School (Class of 2029), Suwanee, Georgia",
    focus: "computational structural biology, genomics, modeling, and software for biotechnology",
    email: "mathlete.world@gmail.com",
    orcid: "0009-0001-6068-7540",
    orcidUrl: "https://orcid.org/0009-0001-6068-7540",
    githubUrl: "https://github.com/math12345678",
    linkedinUrl: "https://www.linkedin.com/in/smyan-reddy/",
    academiaUrl: "https://independent.academia.edu/SmyanReddy",
    instagramUrl: "https://www.instagram.com/smyan.reddy/",
    // TODO: Upload a public CV PDF at smyan-reddy-cv.pdf with phone number and reference contacts removed.
    cvPath: "smyan-reddy-cv.pdf",
    locationAndUpdated: "Smyan Reddy, Suwanee, Georgia. Last updated November 2026."
  },

  hero: {
    headline: "Computational biology, built to be used.",
    description:
      "Tenth-grade researcher working in structural biology, genomics, and modeling. I build software and simulations that answer real questions about proteins, viruses, and the human genome.",
    primaryLinkLabel: "Read the PENTA(mer) proposal",
    secondaryLinkLabel: "Contact",
    facts: [
      {
        label: "Education",
        value: "Lambert High School, Class of 2029"
      },
      {
        label: "Academics",
        value: "GPA 4.3 | ACT 35/36"
      },
      {
        label: "Appointments",
        value: "Researcher at four institutions",
        detail: "UCT, Rhodes University RUBi, Queen Mary University of London, L1 Therapeutics"
      },
      {
        label: "Identifier",
        value: "ORCID 0009-0001-6068-7540",
        href: "https://orcid.org/0009-0001-6068-7540"
      }
    ]
  },

  /* Verbatim lines from Smyan Reddy's Lambert High School iGEM Proposal */
  pentamer: {
    title: "PENTA(mer): A Wash-Free Saliva Assay for Congenital Cytomegalovirus Screening",
    statusTag: "Lambert High School iGEM Proposal",
    abstractProblem:
      "Congenital cytomegalovirus (cCMV) affects about 1 in 200 newborns in the United States, establishing itself as the primary non-genetic cause of sensorineural hearing loss. Most infected infants are asymptomatic at birth, causing standard screening to often miss children whose hearing loss appears later (Lutz et al., 2025; Fowler et al., 1997).",
    abstractAssay:
      "To help close this critical diagnostic gap, PENTA(mer) offers a wash-free saliva assay designed to spot the assembled human cytomegalovirus pentameric complex. This system consists of two single-chain variable fragments (scFvs) to bind epitopes on the complex, linking each arm to one half of a split TEM-1 \u03b2-lactamase enzyme. When both fragments bind to the target, they reconstitute the enzyme to cleave nitrocefin, producing a rapid, visible color change.",
    abstractReaderAndGoal:
      "Furthermore, this system will measure color changes using a low-cost, open-source reader. Its software will incorporate signal processing, along with four computational models to predict binding kinetics, calibrate reader optics, test clinical feasibility, and verify binding geometry. Ultimately, PENTA(mer)\u2019s goal is to bridge the gap between diagnostic technology and direct implementation, providing a low-cost screening tool to detect cCMV in infants.",
    modelsHeading: "Computational models",
    modelsIntro:
      "Assay engineering and validation will be driven by four integrated computational models:",
    models: [
      {
        num: "1",
        text: "A kinetic sensor model that predicts signal output, optimal scFv working concentrations, and background tolerance based on binding kinetics"
      },
      {
        num: "2",
        text: "A photometric calibration model utilizing four-parameter logistic (4PL) curve fitting to define the exact limit of detection and detect potential high-dose hook effects"
      },
      {
        num: "3",
        text: "A clinical feasibility model mapping expected newborn saliva viral loads to target pentamer concentration thresholds"
      },
      {
        num: "4",
        text: "A structural molecular dynamics model (built from PDB entries 5VOB, 7T4S, and 7M22) evaluating co-binding geometry, split-enzyme orientation, and flexible dynamics on the pentamer framework"
      }
    ],
    modelsFramework:
      "The modeling framework provides testable predictions across three core areas: scFv working concentration, dose-response curve shape, and limit of detection. Models will be iteratively refined against experimental bench data. The feasibility model independently evaluates the assay by comparing expected viral loads against quantified limits of detection, while other molecular dynamics simulations evaluate structural feasibility. All code will be fully open-source.",
    modelsValidation:
      "All computational models will be validated against experimental benchmark data. Complete hardware designs will be open-sourced, and all software code will be available on the iGEM GitLab repository.",
    modelsDepthHeading: "Computational modeling architecture",
    modelsDepthLead:
      "The four models form a coupled computational pipeline linking atomic-level construct geometry, mass-action reaction kinetics, microcontroller signal recovery, and clinical viral-load thresholds prior to wet-lab validation.",
    modelsDeep: [
      {
        code: "MODEL 01",
        title: "Kinetic sensor and ternary complementation model",
        tag: "Mass-action ODEs + Michaelis-Menten turnover",
        equation:
          "P + A <-> PA,  P + B <-> PB,  PA + B <-> PAB\nv0 = kcat ([PAB] + [AB_bg]) [S] / (KM + [S])",
        summary:
          "Formulates coupled ordinary differential equations for bivalent binding of 8I21-scFv (A) and 13H11-scFv (B) fusion arms to non-overlapping epitopes on assembled HCMV pentamer (P = gH/gL/UL128/UL130/UL131A). Productive ternary assembly (PAB) reconstitutes TEM-1 \u03b2-lactamase split between residues 196 and 198 to hydrolyze nitrocefin at 486 nm, competing against concentration-dependent spontaneous fragment reassembly (A + B <-> AB_bg) and residual oral bacterial \u03b2-lactamase activity.",
        inputs:
          "Inputs: scFv-pentamer association and dissociation constants (kon, koff), split TEM-1 complementation rates, nitrocefin catalytic constants (kcat, KM), and single-arm baseline rates.",
        outputs:
          "Outputs: optimal [8I21-scFv] and [13H11-scFv] working concentrations maximizing the target 10-fold signal-to-background ratio, predicted absorbance velocity curves, and quantitative criteria for retaining the 196/198 split site versus switching to the lower-background 63/64 split site.",
        validation:
          "Bench coupling: parameterized against mock-virion Experiment 1 (single-arm baseline without antigen) and Experiment 2 (dual-scFv complementation on pentamer-coated beads in synthetic saliva)."
      },
      {
        code: "MODEL 02",
        title: "Digital lock-in demodulation and 4PL calibration model",
        tag: "Synchronous ESP32 signal recovery + 4PL regression",
        equation:
          "R = sqrt(LPF{V(t) sin(2 pi f0 t)}^2 + LPF{V(t) cos(2 pi f0 t)}^2)\ny(x) = d + (a - d) / (1 + (x / c)^b)",
        summary:
          "Models the optical signal chain on the ESP32 LED-photodiode reader alongside dose-response calibration. Synchronous digital lock-in detection multiplies the raw photodiode signal V(t) at carrier frequency f0 by in-phase and quadrature references to reject ambient room light and low-frequency sensor drift, followed by dual-chamber rate subtraction to remove endogenous bacterial \u03b2-lactamase turnover. Background-corrected velocities across antigen dilutions are fit with a four-parameter logistic (4PL) function while comparing initial kinetic slopes against endpoint absorbance to flag high-dose prozone (hook) effects where excess pentamer partitions scFv arms onto separate complexes (PA and PB).",
        inputs:
          "Inputs: modulated photodiode time-series V(t), reference-chamber bacterial background trace, and serial mock-virion titration standards.",
        outputs:
          "Outputs: drift-corrected 486 nm reaction rates, 4PL parameter estimates (baseline a, Hill slope b, EC50 c, upper asymptote d), formal analytical limit of detection (blank mean plus 3 SD inverted through the 4PL curve), and automated high-dose hook-effect flags.",
        validation:
          "Bench coupling: calibrated against mock-virion Experiment 5 (serial titration protocols defining analytical LOD) and Experiment 6 (filtered versus unfiltered saliva bacterial \u03b2-lactamase comparison)."
      },
      {
        code: "MODEL 03",
        title: "Clinical saliva viral-load feasibility model",
        tag: "Stoichiometric conversion + Monte Carlo sensitivity",
        equation:
          "[P]_saliva = (C_viral * eta_virion * n_pentamer * alpha_conc) / (N_A * 10^-3)\nP_detect = Pr([P]_saliva >= LOD_tier)",
        summary:
          "Bridges bench analytical sensitivity and neonatal clinical screening by mapping published newborn cCMV saliva viral-load distributions (copies/mL) into molar concentrations of intact pentamer ([P]_saliva). Propagates parameter uncertainty via Monte Carlo sampling across virion-to-genome particle ratios (eta_virion), surface pentamer copy number per virion envelope (n_pentamer), and sample pre-treatment or disposable-cartridge virion concentration factors (alpha_conc).",
        inputs:
          "Inputs: neonatal saliva viral-load distributions, virion envelope stoichiometry priors, filtration recovery factors, and quantified LOD values from Model 2.",
        outputs:
          "Outputs: predicted fraction of cCMV-positive newborn saliva specimens detectable across each reader tier (smartphone dark box, ESP32 lock-in photodiode unit, and filtered-LED fluorescence reader), establishing explicit decision thresholds for switching from colorimetric nitrocefin to fluorogenic CCF2.",
        validation:
          "Bench coupling: independently evaluates whether the experimentally measured mock-virion LOD is sufficient for newborn saliva screening before clinical workflow integration."
      },
      {
        code: "MODEL 04",
        title: "Structural co-binding and all-atom molecular dynamics model",
        tag: "PDB 5VOB, 7T4S, 7M22 + explicit-solvent MD",
        equation:
          "Align(5VOB, 7T4S, 7M22) -> scFv(8I21, 13H11) + (GGGGS)3 + TEM-1(196/198)\nMD readouts -> RMSD, RMSF, d_split, theta",
        summary:
          "Constructs three-dimensional atomic models of the ternary sensor complex by superimposing experimental HCMV pentamer structures: crystal structure 5VOB (Chandramouli et al., 2017), neutralizing antibody cryo-EM structure 7T4S defining non-overlapping 8I21 and 13H11 epitopes (Kschonsak et al., 2022), and neuropilin-2 receptor complex 7M22 (Wrapp et al., 2022). Models flexible glycine-serine linkers connecting the 8I21 and 13H11 scFv termini to split TEM-1 \u03b2-lactamase fragments (196/198) and runs explicit-solvent all-atom molecular dynamics simulations to evaluate conformational reach and steric compatibility on the assembled pentamer.",
        inputs:
          "Inputs: atomic coordinates from PDB entries 5VOB, 7T4S, and 7M22, 8I21 and 13H11 scFv sequences, glycine-serine linker lengths, and TEM-1 split-fragment coordinates.",
        outputs:
          "Outputs: inter-epitope span and steric clash diagnostics against gH/gL/UL128/UL130/UL131A subunits, linker end-to-end distance distributions, split-interface proximity (d_split) and orientation (theta) ensembles, and minimum linker-length requirements for productive enzyme reconstitution.",
        validation:
          "Bench coupling: tested alongside mock-virion Experiment 3 (specificity against gH/gL dimers and gH/gL/gO trimers) and Experiment 4 (soluble NRP2 receptor binding competition)."
      }
    ],
    modelsPipelineNote:
      "Integrated parameter flow: Structural MD (Model 4) constrains linker geometry and confirms physical co-binding feasibility -> Kinetic ODEs (Model 1) set scFv working concentrations and split-site background bounds -> Lock-in and 4PL software (Model 2) converts raw ESP32 optical traces into calibrated concentrations, LODs, and hook-effect flags -> Clinical feasibility mapping (Model 3) tests calibrated LODs against newborn saliva viral-load thresholds.",
    pdbStructures: [
      { id: "5VOB", url: "https://www.rcsb.org/structure/5VOB" },
      { id: "7T4S", url: "https://www.rcsb.org/structure/7T4S" },
      { id: "7M22", url: "https://www.rcsb.org/structure/7M22" }
    ],
    problemFull1:
      "Congenital Cytomegalovirus (cCMV) is the most common infectious cause of birth defects, affecting approximately 1 in 200 newborns, and the leading non-genetic cause of sensorineural hearing loss in the United States. The disease presents an unequal burden, with prevalence nearly doubling among infants of Black and Native American mothers, and highest in Southern states, which include Georgia (Lutz et al., 2025).",
    problemFull2:
      "A major challenge in controlling cCMV is that most infected infants appear completely asymptomatic at birth. Yet, some subsequently develop progressive sensorineural hearing loss. For example, in a cohort of 307 asymptomatic children, 22 developed sensorineural hearing loss, with half experiencing continuous deterioration throughout early childhood. Delayed onset occurred in 18.2% of these cases, at a median detection age of 27 months (Fowler et al., 1997). Current state policy mandates cCMV testing only for infants who fail their final newborn hearing screen (Georgia Department of Public Health, 2024). As a result, asymptomatic infants and those with late-onset hearing loss pass preliminary screening and return entirely undiagnosed.",
    problemFull3:
      "Prevention options remain severely limited. The leading universal vaccine candidate, mRNA-1647, which targets the pentameric complex, failed its pivotal Phase 3 primary efficacy endpoint in October 2025, demonstrating an efficacy of only 6% to 23% (Moderna, 2025). Therefore, early detection paired with targeted antiviral intervention represents a viable clinical strategy to combat hearing loss. While oral valganciclovir is recommended for symptomatic cCMV, it carries significant clinical risks, causing severe neutropenia in approximately 20% of treated infants due to bone marrow suppression (Kimberlin et al., 2015). A precise, rapid, and timely diagnosis is thus critical to ensure therapeutic benefits across rural, diverse populations.",
    solutionFull1:
      "PENTA(mer) directly addresses this diagnostic gap by targeting the HCMV pentameric complex (gH/gL/UL128/UL130/UL131A), which allows for viral entry into human epithelial and endothelial cells and demonstrates a powerful neutralizing response. The assay uses two antibodies, 8I21 and 13H11, which bind to non-overlapping epitopes on the complex (Kschonsak et al., 2022). Each antibody will be engineered as a single-chain variable fragment (scFv) fused to one half of TEM-1 \u03b2-lactamase split between residues 196 and 198 (Marsh & Owen, 2025). Neither fragment contains enzymatic activity individually. However, when both scFv bind to the same assembled pentamer, the two halves are held together and the enzyme reforms. The restored enzyme cleaves nitrocefin, generating a color transition from yellow to red at 486 nm.",
    solutionFull2:
      "Rapid saliva tests already exist for cCMV. One notable one uses LAMP, which amplifies DNA (99.8% agreement with PCR), so it reports viral DNA from any source (Gantt et al., 2020). However, PENTA(mer) detects the antigen, which means that a direct signal requires an assembled pentamer, and amplification is not needed.",
    hardwareFull:
      "To enable direct measurement without complex data collection, this project will design three hardware products, stratified based on price and LOD. The baseline model would consist of a 3D-printed dark box containing a phone camera and color reference card. The mid-tier unit would utilize an ESP32 microcontroller paired with an LED source and photodiode detector. This microcontroller would switch the LED on and off quickly and read the signal at that same rate, which negates room light and sensor drift when determining sensitivity. The advanced tier would incorporate a filtered LED to enable high-sensitivity fluorescence detection, integrated into a disposable cartridge designed to filter oral bacteria, concentrate virions, and hold a secondary reaction chamber, which corrects for background bacterial \u03b2-lactamase activity. A handheld luminometer that uses mechanical shutters achieves high sensitivity but costs about $700 in materials, so developing an effective reader at a reduced cost threshold would substantially improve accessibility in underserved areas (Lebel et al., 2024).",
    humanPracticesFull1:
      "PENTA(mer) directly addresses a critical gap in Georgia\u2019s neonatal screening framework. Under state policy enacted in 2024 within the Early Hearing Detection and Intervention (EHDI) program, facilities are required to test infants who fail their newborn hearing test. PENTA(mer) is designed to undergo clinical validation to support its adoption alongside existing diagnostic methods, such as PCR and saliva-based LAMP assays. Because EHDI is under the Georgia Department of Public Health, this includes it as the first stakeholder.",
    humanPracticesFull2:
      "This project will also involve the consultation of a pediatric audiologist, a clinician, and a parent of a child with cCMV. These individuals will be asked questions regarding testing methods used in neonatal care, certain guidelines and legislation denoting infant hearing tests, how to word results and tests properly to not strike fear in parents, and what price a clinic would accept. The audiologist and clinician will also be asked how a positive antigen result could connect to PCR and other methods used in testing.",
    humanPracticesFull3:
      "This campaign aims to inform legislation to expand statewide newborn hearing screening for cCMV. Additionally, this project will result in the development of a comprehensive guide for families going through a new diagnosis, alongside protocols to advise clinicians in underserved rural areas."
  },

  work: [
    {
      id: "rubi",
      role: "Computational Structural Biology Researcher",
      org: "Research Unit in Bioinformatics (RUBi), Rhodes University, Makhanda, South Africa (remote)",
      dates: "07/2026 to present",
      bullets: [
        "Lead computational analyst on a structural bioinformatics study of clinically relevant protein variants; first author on the resulting manuscript, in preparation.",
        "Designed the study\u2019s statistical robustness framework and ran large-scale all-atom molecular dynamics campaigns on a national high-performance computing cluster.",
        "Integrated multiple independent structural and network readouts into a single comparative analysis pipeline, and diagnosed and corrected errors in the inherited codebase."
      ],
      figures: [
        "Simulation of CYP2B6 variants over 500 nanoseconds and variations in Root Mean Square Deviation (RMSD) of the enzyme.",
        "Heatmap of various metrics using the z-score pipeline to compare the variants to the wild type.",
        "R140Q pocket location."
      ]
    },
    {
      id: "l1",
      role: "Computational Biologist and AI Researcher",
      org: "L1 Therapeutics, San Francisco, California (remote)",
      dates: "07/2026 to present",
      repoUrl: "https://github.com/L1-Therapeutics/retrotransposon-miner",
      orgUrl: "https://l1tx.com/",
      bullets: [
        "Co-developed retrotransposon-miner, open-source software that detects LINE-1 retrotransposon insertions from whole-genome sequencing, built from scratch because existing academic tools are unmaintained or restrictively licensed.",
        "Benchmarked against the 1000 Genomes Project reference callset and exceeded it on both precision and recall using Illumina short reads alone, where the consortium used both Illumina and Oxford Nanopore.",
        "Reduced runtime to approximately two hours per genome on genomes exceeding 100 GB, faster than published state-of-the-art academic tools.",
        "Performed manual IGV adjudication of candidate insertions to separate true from false calls, and compared short-read against long-read detection sensitivity."
      ],
      figures: [
        "L1 Therapeutics retrotransposon work."
      ]
    },
    {
      id: "uct-immuno",
      role: "Biomedical Researcher",
      org: "University of Cape Town, Department of Immunology and Institute of Infectious Disease, Rondebosch, South Africa",
      dates: "02/2026 to present",
      bullets: [
        "Molecular dynamics work in cancer immunotherapy, studying how engineered mutations alter the behavior of a therapeutic protein.",
        "Computational immunology project, applying modeling and data analysis to adaptive immune system research."
      ],
      figures: [
        "Granzyme B project RMSD.",
        "Donor sharing of heavy chain junctions in B-cell repertoires."
      ]
    },
    {
      id: "uct-virology",
      role: "Virology Researcher",
      org: "University of Cape Town, Research and Innovation",
      dates: "02/2026 to present",
      bullets: [
        "Reproducing conserved coronavirus recombination analyses using RDP5 and OpenRDP, including debugging the open-source toolchain against modern NumPy.",
        "Analyzing viral sequence data to test how recombination constrains or promotes viral fitness."
      ],
      figures: [
        "Recombination of SARS-CoV-2 genomes.",
        "AI model prediction of breakpoint locations."
      ]
    },
    {
      id: "qmul",
      role: "Statistical Genetics Researcher",
      org: "Queen Mary University of London, London, England (remote)",
      dates: "10/2026 to present",
      bullets: [
        "Running genome-wide association analysis of anthropometric traits on Million Veteran Program summary statistics.",
        "Responsible for GWAS quality control, post-GWAS analysis, and Genomic Structural Equation Modeling across traits."
      ],
      figures: [
        "Histogram of per-individual genotype missingness in GWAS sample quality control (0.010 exclusion threshold)."
      ]
    },
    {
      id: "genoxus",
      role: "Genomic Bioinformatics Intern",
      org: "Genoxus, San Diego, California (remote)",
      dates: "10/2026 to present",
      orgUrl: "https://genoxuslabs.com/",
      summary:
        "Converting raw sequencing data into structured, clinically relevant genomic reports as part of a clinical genomics workflow."
    },
    {
      id: "breaksight",
      role: "Research Intern",
      org: "BreakSight, Inc., Allentown, Pennsylvania",
      dates: "10/2026 to present",
      orgUrl: "https://www.breaksightdna.com/",
      summary:
        "Contributing to the design, development, testing, and evaluation of genetic software under the guidance of company engineers."
    }
  ],

  projects: [
    {
      id: "hantavirus",
      title: "Stochastic modeling of hantavirus transmission",
      dates: "05/2026 to present",
      // TODO: Link coming for hantavirus modeling repository.
      description:
        "Regional outbreak probability and mortality burden modeling using ANOVA with Tukey HSD, Poisson generalized linear models, and bootstrap confidence intervals. Identified viral strain as the dominant predictor of case fatality rate (F = 78.2, p < 0.0001), with the Pacific region highest at 44.0%. Produced forest plots and choropleth risk maps."
    },
    {
      id: "trialtwin",
      title: "TrialTwin",
      dates: "05/2026 to present",
      // TODO: Link coming for TrialTwin repository and demo.
      description:
        "Clinical trial pre-recruitment simulator running 10,000 Monte Carlo simulations to project enrollment across 43 countries and 20 diseases, flagging representation gaps via the Representation Quotient and Representation Equity Score and recommending sites to correct enrollment bias. FastAPI and NumPy backend with a Next.js frontend; rules-based and CPU-bound with no LLM in the critical path, streaming results in 5 to 15 seconds; static JSON priors and vectorized compute hold infrastructure cost near $0.02 per run. Won the WaveHack hackathon (05/2026), sponsored by Hack Club and Major League Hacking.",
      figureCaption: "Representation of races in NCCN Kidney Cancer Guidelines."
    },
    {
      id: "microtract",
      title: "MicroTract",
      dates: "08/2025 to 12/2025",
      description:
        "Tested five biodegradable oral capsule formulations varying chitosan, lecithin and citric acid ratios for microplastic fiber capture in a simulated digestive system. A balanced 33% ternary mixture achieved the highest removal efficiency at 23.04%, indicating synergy between chitosan binding, lecithin emulsification and citric acid pH modulation."
    },
    {
      id: "nanosilver",
      title: "NanoSilver",
      dates: "08/2024 to 01/2025",
      description:
        "Tested whether gelatin films embedded with silver nanoparticles suppress Phytophthora infection in potatoes. Reported a negative result: experimental samples developed more mold than controls, attributed to excess coating moisture overwhelming sparse nanoparticle distribution, with derived design implications for nanoparticle concentration, delivery and moisture control."
    }
  ],

  skills: [
    {
      category: "Molecular dynamics and structural biology",
      items:
        "GROMACS, AmberTools and cpptraj, AMBER ff14SB and ff99SB-ILDN force fields, TIP3P and SPC/E solvent models, MODELLER homology modeling, MD-TASK dynamic residue networks, MDAnalysis, MDpocket, CAVER 3.0, DSSP, PCA and dynamic cross-correlation, RMSD and RMSF analysis, HPC cluster workflows (CHPC Lengau)."
    },
    {
      category: "Genomics and bioinformatics",
      items:
        "Whole-genome sequencing analysis, retrotransposon insertion detection, Illumina short-read against Oxford Nanopore long-read comparison, IGV manual validation, BLAST and BLASTN, CLUSTAL, ViennaRNA, RefSeq, GWAS and GWAS quality control, post-GWAS analysis, Genomic Structural Equation Modeling, recombination detection with RDP5 and OpenRDP."
    },
    {
      category: "Synthetic biology",
      items:
        "Plasmid and construct design, quorum-sensing circuits, reporter systems, toxin-antitoxin kill switches, siRNA and dsRNA design."
    },
    {
      category: "Programming and statistics",
      items:
        "Python (NumPy, Pandas, SciPy, FastAPI, OpenCV), R, SQL, JavaScript and TypeScript with Next.js, Git and GitHub, AWS; ANOVA with Tukey HSD, Poisson generalized linear models, bootstrap confidence intervals, Monte Carlo simulation, meta-analysis and heterogeneity assessment, systematic review design, PICO framework, PubMed boolean search strategy, forest plots and choropleth mapping."
    }
  ],

  writing: [
    {
      id: "biotreks-ns5",
      title: "Degradation of viral NS5 polymerase mRNA from mosquito-borne diseases with engineered RNAi",
      venue: "BioTreks",
      date: "10/2026",
      url: "https://biotreks.org/e202633/",
      summary:
        "We aim to engineer a Wolbachia-compatible plasmid that produces dsRNA targeting a conserved NS5 region shared by Zika, dengue, and yellow fever viruses. After validating expression and RNA binding in Saccharomyces cerevisiae, the system could be transferred to an RNAi-capable host to evaluate viral suppression as a sustainable alternative to insecticides."
    },
    {
      id: "zenodo-sindbis",
      title: "Seed-Region-Focused Validation of a Sindbis Virus-Specific siRNA: Insights into Off-Target Minimization and Host-Specific RNAi Constraints",
      venue: "Zenodo",
      date: "10/2026",
      url: "https://zenodo.org/records/23548457",
      summary:
        "A 21-nucleotide siRNA targeting Sindbis virus was computationally validated as highly specific with minimal human off-target risk. However, experimental results showed limited antiviral activity, highlighting the weakness of classical RNAi in most mammalian cells and the importance of cell type and host context.",
      figureCaption: "Sindbis virus protein (UCSF ChimeraX)."
    },
    {
      id: "zenodo-retro",
      title: "Gene-relative distribution of polymorphic retrotransposon insertions in ten human genomes",
      venue: "Zenodo",
      date: "10/2026",
      url: "https://zenodo.org/records/23520972",
      pageUrl: "https://math12345678.github.io/retrotransposon-gene-distribution/",
      summary:
        "Retrotransposon insertions are depleted in exons and show strand-specific patterns near exon boundaries. Although Alu elements often avoid the sense orientation, transcript attenuation alone cannot explain this pattern, highlighting the need to consider both distance and orientation when annotating their effects."
    },
    {
      id: "rubi-md",
      title: "",
      descriptor: "First-author molecular dynamics manuscript (RUBi, Rhodes University)",
      venue: "In preparation",
      date: "In preparation",
      summary: ""
    }
  ],

  leadership: [
    {
      org: "National Student Research Institution (NSRI)",
      role: "Chief Operating Officer",
      dates: "01/2026 to present",
      url: "https://nsri.world/",
      description:
        "Promoted from Associate to COO in five months at a student research network of 16,000+ researchers and 20,000+ followers. Directs operations across partnerships, programming and content, including the Research Weekly newsletter and the Global Research Challenge. Brought 18 partner organizations into NSRI. Built a 22-lecture introductory research methodology course teaching beginners to design and conduct research."
    },
    {
      org: "Caterva",
      role: "Chief Executive Officer",
      dates: "07/2026 to present",
      url: "https://github.com/math12345678/caterva",
      description:
        "Building infrastructure for scientific simulation, aimed at labs without supercomputing access."
    },
    {
      org: "Sustain",
      role: "Founder",
      dates: "07/2026 to present",
      url: "https://9pxqxqxe.mule.page/",
      description:
        "Multi-platform initiative on global health equity and equitable access to biotechnology in the Global South, spanning a podcast, a book and a masterclass."
    },
    {
      org: "AI in STEM",
      role: "AI in Healthcare Curriculum Lead",
      dates: "08/2025 to 03/2026",
      url: "https://ai-in-stem.org/",
      description:
        "Authored curriculum modules including AI in Biotechnology, AI Applications in Python and AI in the Workforce, covering diagnostics, drug discovery and medical data analysis. Gold Volunteering Award."
    }
  ],

  leadershipNote:
    "Also founded Concerto, a student-run program delivering free live music to older adults (175 student volunteers, 15 chapters across four countries).",
  concertoUrl: "https://concerto-website.vercel.app/",

  recognition: [
    {
      title: "Best Research Award 2026",
      org: "International Journal of Science and Innovation",
      date: "04/2026"
    },
    {
      title: "Outstanding Young Researcher Award",
      org: "International Research Symposium",
      date: "07/2026"
    },
    {
      title: "1st Place, Atlanta Hackathon, Divergent Teams; qualified for international competition in Seattle",
      org: "",
      date: "05/2026"
    },
    {
      title: "1st Place, WaveHack Hackathon",
      org: "",
      date: "05/2026"
    }
  ],

  training: [
    "Introduction to Bioinformatics Skills, University at Albany (July 2026)",
    "2026 RNA Institute High School Bioinformatics Summer Camp, University at Albany (August 2026)",
    "Certified Entry-Level Python Programmer (PCEP-30-02), Python Institute (February 2023)",
    "Introduction to Machine Learning, Kaggle (July 2025)",
    "Member, Lambert High School iGEM Seminar Team"
  ],

  trainingFigureCaption:
    "Poster used at the RNA Day Conference 2026 at University at Albany. All plots made using R and ggplot2.",

  researchInterests:
    "Structural and computational immunology. Molecular dynamics of therapeutic and drug-metabolizing proteins, allosteric mechanism in protein variants, retrotransposon and viral genome analysis, statistical genetics, and representation bias in clinical evidence.",

  mrsaFigureCaption: "Binding site in MRSA project.",

  contact: {
    heading: "Contact",
    sentence: "For iGEM, research collaboration, or questions about PENTA(mer), email me."
  }
};
