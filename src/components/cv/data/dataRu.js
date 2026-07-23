export const resumeRu = {
    firstName: 'Дмитрий',
    lastName: 'Рогожников',
    profession: 'Software Team Lead',
    avatar: '/profile.png',

    labels: {
        about: 'О СЕБЕ',
        experience: 'ОПЫТ РАБОТЫ',
        education: 'ОБРАЗОВАНИЕ',
        contact: 'КОНТАКТЫ',
        personal: 'ЛИЧНЫЕ ДАННЫЕ',
        skills: 'НАВЫКИ',
        software: 'ИНСТРУМЕНТЫ',
        hobbies: 'ХОББИ'
    },

    about: 'Опытнейший разработчик и тимлид. Занимаюсь проектированием архитектуры, разработкой масштабируемых приложений и управлением командами.',
    contacts: [
        { icon: 'mdi-phone', text: '+375 (29) 563-08-39', url: 'tel:+375295630839' },
        { icon: 'mdi-email', text: 'Gmail', url: 'mailto:DitarRogozhnikov@gmail.com' },
        { icon: 'mdi-github', text: 'GitHub', url: 'https://github.com/drogozhnikov/' },
        { icon: 'mdi-linkedin', text: 'LinkedIn', url: 'https://www.linkedin.com/in/дмитрий-рогожников-449245199/' },
        { icon: '$TelegramIcon', text: 'Telegram', url: 'https://t.me/drogozhnikov' },
    ],
    personal: [
        { label: 'Дата рождения:', value: '28 апреля 1995' },
        { label: 'Гражданство:', value: 'Беларусь / Минск' },
        { label: 'Языки:', value: 'Русский (родной), Английский (B1)' }
    ],
    skills: [
        { name: 'Коммуникация', level: 90 },
        { name: 'Креативность', level: 85 },
        { name: 'Работа в команде', level: 95 },
        { name: 'Инновационность', level: 80 }
    ],
    software: [
        { name: 'Kotlin', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'Vuetify', level: 90 },
        { name: 'Spring framework', level: 80 },
        { name: 'PostgreSQL', level: 70 }
    ],
    hobbies: [
        { name: 'Проектирование', icon: 'mdi-pencil-ruler' },
        { name: 'Разработка', icon: 'mdi-code-tags' },
        { name: 'Моделирование', icon: 'mdi-cube-outline' },
        { name: 'Резьба по дереву', icon: 'mdi-saw-blade' },
        { name: 'Велоспорт', icon: 'mdi-bike' },
        { name: 'Путешествия', icon: 'mdi-airplane' }
    ],
    experience: [
        {
            period: '2017 - 2018',
            role: 'Lead Web Designer',
            company: 'ART CREATIVE SOLUTION',
            description: 'Разработка архитектуры интерфейсов, руководство командой дизайнеров и фронтенд-разработчиков.'
        }
    ],
    education: [
        {
            period: '2012 - 2014',
            institution: 'ART CREATIVE SOLUTION',
            description: 'Изучение современных принципов проектирования ПО и алгоритмов.'
        }
    ]
}