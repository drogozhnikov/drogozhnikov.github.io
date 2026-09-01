// resumeEng.js
import { general } from './general'

export const resumeEng = {
    ...general,
    firstName: 'Dmitry',
    surname: 'Evgenievich',
    lastName: 'Rogozhnikov',
    profession: 'Software Team Lead',

    labels: {
        about: 'ABOUT',
        experience: 'EXPERIENCE',
        education: 'EDUCATION',
        contact: 'CONTACT',
        personal: 'PERSONAL',
        skills: 'SKILLS',
        software: 'SOFTWARE',
        technologies: 'TECHNOLOGIES',
        hobbies: 'HOBBIES'
    },

    about: 'Experienced developer and team lead focused on architecture design, scalable backend/frontend applications, and team management.',
    personal: [
        { label: 'Birthday', value: '28th April 1995' },
        { label: 'Citizenship', value: 'Belarus / Minsk' },
        { label: 'Languages', value: 'Russian (native), English (B1)' }
    ],
    skills: [
        { name: 'Communication', level: 90 },
        { name: 'Creativity', level: 85 },
        { name: 'Teamwork', level: 95 },
        { name: 'Innovative', level: 80 }
    ],
    hobbies: [
        { name: 'Architecture Design', icon: 'mdi-pencil-ruler' },
        { name: 'Development', icon: 'mdi-code-tags' },
        { name: '3D Modeling', icon: 'mdi-cube-outline' },
        { name: 'Woodcarving', icon: 'mdi-saw-blade' },
        { name: 'Traveling', icon: 'mdi-airplane' }
    ],
    experience: [
        {
            period: '2017 - 2018',
            role: 'Lead Web Designer',
            company: 'ART CREATIVE SOLUTION',
            description: 'Interface architecture design, managing a team of designers and frontend developers.'
        }
    ],
    education: [
        {
            period: '2012 - 2014',
            institution: 'ART CREATIVE SOLUTION',
            description: 'Studied modern software engineering principles and algorithms.'
        }
    ]
}