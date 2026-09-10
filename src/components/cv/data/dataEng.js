// resumeEng.js
import {general} from './general'
import {
    css,
    docker,
    emel,
    emeld,
    emelx,
    flyway,
    git,
    gitLab,
    gradle,
    grafana,
    html5,
    java,
    javascript,
    jira,
    junit5,
    jwt,
    kafka,
    kotlin,
    maven,
    minio,
    mockito,
    postgresql,
    prometheus,
    restApi,
    sass,
    sonarLint,
    springBoot,
    springCloud,
    springDataJpa,
    springFramework,
    springSecurity,
    sql,
    vue3,
    vuetify,
    windows,
} from './techCatalog.js'

export const resumeEng = {
    ...general,
    firstName: 'Dmitry',
    surname: 'Evgenievich',
    lastName: 'Rogozhnikov',
    profession: 'Software Team Lead',

    labels: {
        personal: 'PERSONAL',
        contact: 'CONTACT',
        skills: 'SKILLS',
        software: 'CORE STACK',
        technologies: 'TECHNOLOGIES',
        hobbies: 'HOBBIES',

        about: 'ABOUT ME',
        coverLetter: 'COVER LETTER',
        experience: 'WORK EXPERIENCE',
        responsibilities: 'Responsibilities',
        achievements: 'Achievements',
        projects: 'Related projects and technologies',

        education: 'EDUCATION',
        faculty: 'Faculty',
        department: 'Department',
        speciality: 'Major',
        desiredPositionTitle: 'DESIRED POSITION AND SALARY',
        months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        present: 'Present',
        presentShort: 'Present',
        yearForms: ['year', 'years', 'years'],
        monthForms: ['month', 'months', 'months'],
        labelsDesired: {
            salarySuffix: 'BYN net',
            specializations: 'Specializations',
            employment: 'Employment',
            schedule: 'Work schedule',
            travelTime: 'Preferred commute time'
        },
    },

    desiredPosition: {
        title: 'Lead Software Engineer',
        salary: 9900,
        specializations: ['Team management', 'Software architecture', 'Full-stack development'],
        employment: 'Full-time',
        schedule: ['Remote', 'Flexible hours', 'Hybrid'],
        travelTime: 'Remote / Up to 30 minutes'
    },

    coverLetter: [
        {
            text: 'Experienced developer and team lead. I design architecture, support existing products, build scalable applications, and manage engineering teams.',
            subtext: [
                'Proven experience launching projects from scratch.',
                'Focus on clean code, performance, and scalability.',
                'Used to owning a product end to end: from idea and architecture to production support.',
                'Comfortable switching between coding, design, and working with people.'
            ]
        },
        {
            text: 'Worked with WMS, warehouse processes, and integrations with ERP, hardware, and external systems.',
            subtext: [
                'Drawn to systems with many integrations and real users.',
                'Used to balancing delivery speed with a stable, maintainable solution.'
            ]
        },
        {
            text: 'Separately — experience in software architecture, customs declarations, and system administration.',
            subtext: [
                'Architecture: designing services, integrations, and the overall product shape.',
                'Customs declarations: evolving filing platforms to match legal requirements.',
                'System administration: networks, servers, commissioning new capacity, and L3 support.'
            ]
        },
        {
            text: 'In my free time I follow new technologies and learn them on my own.',
            subtext: [
                'I look things up, try interesting tools in personal tests and small experiments.',
                'I learn ahead of time so I can offer the company up-to-date ways to solve problems.'
            ]
        },
        {
            text: 'Interested in complex product and integration problems, clean architecture, and ownership of the result.',
            subtext: []
        }
    ],

    about: [
        {
            text: 'Outside of work I am into hardware and making things: 3D modeling, 3D printing and engraving on a homemade 3D printer and laser engraver, and microcontroller programming.',
            subtext: []
        },
        {
            text: 'I enjoy travel, mountain hiking, and cycling.',
            subtext: []
        },
        {
            text: 'In my free time I build pet projects — from the idea to a working product.',
            subtext: [
                {
                    text: 'Wedding invitation and a photo/video gallery — devcreative.by',
                    url: 'https://devcreative.by'
                },
                {
                    text: 'Online CV — a pet project on Vuetify 3, GitHub Pages, and GitHub Actions.',
                    url: 'https://drogozhnikov.github.io/'
                },
                'A time manager with notifications via a Telegram bot.',
                'An Android pharmacode scanner without ready-made libraries: data for the scanned code comes from an FTP server.',
                'Diploma project: a radio-signal emulator for teaching the basics of how an oscilloscope works.'
            ]
        }
    ],
    personal: [
        {label: 'Date of birth', value: '28 April 1995'},
        {label: 'Residence', value: 'Minsk'},
        {label: 'Citizenship / work permit', value: 'Belarus'},
        {label: 'Languages', value: 'Russian (native), English (B1)'}
    ],
    skills: [
        {name: 'Communication', level: 90},
        {name: 'Creativity', level: 85},
        {name: 'Teamwork', level: 95},
        {name: 'Innovation', level: 80}
    ],
    hobbies: [
        {name: 'Travel', icon: 'mdi-airplane'},
        {name: 'Hiking', icon: 'mdi-hiking'},
        {name: 'Cycling', icon: 'mdi-bike'},
        {name: '3D modeling', icon: 'mdi-cube-outline'},
        {name: '3D printing', icon: 'mdi-printer-3d'},
        {name: 'Engraving', icon: 'mdi-laser-pointer'},
        {name: 'Microcontrollers', icon: 'mdi-chip'},
        {name: 'Woodcarving', icon: 'mdi-saw-blade'}
    ],
    experience: [
        {
            startDate: '08.2024',
            endDate: null,
            role: 'Software Team Lead',
            company: 'TrioVist LLC, Minsk',
            icon: '/images/expirience/vek.png',
            url: 'https://www.21vek.by/',
            summary: 'Liaison between management and the development team; support for the electronic supplier registration system.',
            responsibilities: [
                'Team management: Mentoring, onboarding newcomers, conflict resolution, and motivation.',
                'Technical leadership: Code reviews and code quality control.',
                'Architecture and development: Designing the system architecture and developing key components.',
                'Planning and processes: Task allocation, estimates, daily stand-ups, and sprint planning.',
                'Hiring and growth: Interviewing and creating individual development plans for employees.'
            ],
            achievements: [
                'Full-stack development: Built a high-performance Kotlin/Spring Boot backend and adaptive Vuetify 3 UIs for warehouse operators and administrators.',
                'DevOps and containerization: Set up a Docker environment and automatic deployment of the electronic supplier registration system to the company’s own servers.',
                'Android app (.apk) build delivery tool for QA: Built a service for working with a Telegram bot that lets the QA team pick a GitLab branch, configure the build (Build Types and other settings), run CI/CD, track the stages, and receive a personal message with the file attached, thereby reducing how much time the development department spent on test builds.',
                'Process optimization: Led a large-scale effort to find weak or unoptimized components in the EME.MWS warehouse management system.',
                'Initiatives: Proposed more than 40 ideas to simplify the development team’s work and improve warehouse processes.',
                'Updates without downtime: Cut system update time by more than 15 minutes. Designed and proposed a scheme that would allow updates without stopping the warehouse.',
                'Architecture: Designed a scheme for a smooth transition from legacy code to a more reliable microservice architecture with a thin client.',
                'Refactoring: Started a global refactoring, migrating the system’s legacy communication to REST API.'
            ],
            projects: [
                {
                    name: 'Electronic supplier registration system',
                    url: 'https://21post.by/',
                    description: 'Full-stack solution for automating counterparty verification and application management. Backend and adaptive UIs for warehouse operators.',
                    stack: [
                        kotlin,
                        springFramework,
                        springBoot,
                        springCloud,
                        springDataJpa,
                        springSecurity,
                        flyway,
                        restApi,
                        jwt,
                        postgresql,
                        vue3,
                        vuetify,
                        javascript,
                        css,
                        sass,
                        docker,
                        git,
                        gradle,
                        grafana,
                    ]
                },
                {
                    name: 'Warehouse management system EME.WMS',
                    url: 'https://eme-wms.ru/',
                    description: 'Identifying weak or unoptimized warehouse management system components and refactoring them.',
                    stack: [emel, emeld, emelx, restApi, sql, git, gitLab, jira, sonarLint, grafana, windows]
                }
            ]
        },
        {
            startDate: '06.2023',
            endDate: '08.2024',
            role: 'Software Engineer',
            company: 'TrioVist LLC, Minsk',
            icon: '/images/expirience/vek.png',
            url: 'https://www.21vek.by/',
            summary: 'Development and evolution of EME.WMS and the electronic supplier registration system.',
            responsibilities: [
                'Project development: Shipping new features, business-driven enhancements, and support of existing modules.',
                'WMS module development: Key warehouse flows — receiving, putaway, replenishment, picking, and shipping.',
                'Hardware integration: Connecting the system with data collection terminals (handhelds), label printers, and weighing equipment.',
                'ERP and external system integration: Data exchange with 1C and the YMS system via REST API and integration buses.'
            ],
            achievements: [
                'Full-stack development: Designed and implemented a counterparty registration and verification system from scratch.',
                'Kotlin backend: Built business logic on Spring Boot with reliable data handling and secure application processing.',
                'Modern UI: Created an adaptive Vuetify 3 interface for a convenient supplier arrival registration flow.',
                'DevOps and containerization: Designed a Docker environment and a microservice architecture for electronic supplier registration.',
                'Process optimization: Automated supplier data collection, reducing inbound application processing time.',
                'As of September 2026, the system had around 850 active users.'
            ],
            projects: [
                {
                    name: 'Electronic supplier registration system',
                    url: 'https://21post.by/',
                    description: 'Development and evolution of a full-stack solution: counterparty verification, applications, and UIs for warehouse operators.',
                    stack: [
                        kotlin,
                        springFramework,
                        springBoot,
                        springCloud,
                        springDataJpa,
                        springSecurity,
                        flyway,
                        restApi,
                        jwt,
                        postgresql,
                        vue3,
                        vuetify,
                        javascript,
                        css,
                        sass,
                        docker,
                        git,
                        gradle,
                        grafana,
                    ]
                },
                {
                    name: 'Warehouse management system EME.WMS',
                    url: 'https://eme-wms.ru/',
                    description: 'Warehouse module development, integrations, and enhancements to existing processes.',
                    stack: [emel, emeld, emelx, restApi, sql, git, gitLab, jira, sonarLint, grafana, windows]
                }
            ]
        },
        {
            startDate: '06.2020',
            endDate: '06.2022',
            role: 'Software Engineer',
            company: 'RUE Beltamozhservice, Minsk',
            icon: '/images/expirience/bts.svg',
            url: 'https://declarant.by/ru/',
            summary: 'Development and evolution of the eDeclarant / WebDeclarant customs declaration platform, including legacy work.',
            responsibilities: [
                'Project development: New features, enhancements to existing modules, and production support of the platform.',
                'Legacy: Support, evolution, and optimization of existing code without breaking live filing flows.',
                'Legislation: Keeping the application structure and logic aligned with current requirements of the Republic of Belarus.',
                'Backend: Designing and developing the WebDeclarant server side on Spring Framework.',
                'User support: Handling client requests, answering questions, and resolving conflicts.'
            ],
            achievements: [
                'New functionality: Implemented new declaration types and related instructions.',
                'WebDeclarant: Designed and implemented the website backend on Spring Framework.',
                'Refactoring: Improved performance, speed, and UI usability.',
                'Legacy: Optimized and evolved existing modules while keeping current filing processes compatible.',
                'Maintenance: Kept the platform in line with changes in customs legislation.'
            ],
            projects: [
                {
                    name: 'eDeclarant / WebDeclarant',
                    url: 'https://declarant.by/ru/',
                    description: 'Customs declaration platform: feature development, backend, and ongoing support to match legal requirements.',
                    stack: [
                        java,
                        springFramework,
                        springBoot,
                        springCloud,
                        springDataJpa,
                        springSecurity,
                        flyway,
                        restApi,
                        sql,
                        html5,
                        javascript,
                        css,
                        sass,
                        kafka,
                        minio,
                        docker,
                        git,
                        maven,
                        junit5,
                        mockito,
                        sonarLint,
                        grafana,
                        prometheus,
                    ]
                }
            ]
        },
        {
            startDate: '02.2018',
            endDate: '08.2019',
            role: 'System Administrator',
            company: 'Elitrans LLC, Minsk',
            icon: '/images/expirience/elilink.svg',
            url: 'https://www.elilink.com/',
            summary: 'Infrastructure administration, user support, and commissioning of new server capacity.',
            responsibilities: [
                'Infrastructure: Network administration, server maintenance, and workstation support.',
                'L3 support: Handling complex employee issues and seeing tickets through to resolution.',
                'Accounts: Corporate accounts, access rights, and registration of new employees.',
                'Onboarding: Technical support and guidance for new hires — workstation, access, and corporate systems.',
                'Helpdesk: Organizing technical support and prioritizing incoming requests.',
                'Operations: Planned updates, keeping services healthy, and helping adjacent teams.'
            ],
            achievements: [
                'Server capacity: Configured and successfully commissioned the company’s new servers.',
                'Support: Set up a clear request flow — from an employee ticket to L3 resolution.',
                'Onboarding: Supported employees joining the company: workstation setup, access, and first steps in corporate systems.',
                'Stability: Regular infrastructure maintenance and timely incident resolution.'
            ],
            projects: []
        },
    ],
    education: [
        {
            period: '2012 - 2018',
            title: 'Belarusian State Academy of Aviation (BSAA)',
            type: 'Higher education',
            avatar: '/images/university/bgaa.svg',
            url: 'https://bgaa.by/',
            faculty: 'Civil Aviation',
            department: 'Radio-electronic Equipment',
            details: 'Engineer in technical operation of electronic equipment.'
        }
    ]
}
