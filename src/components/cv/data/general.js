import {
    confluence,
    css,
    docker,
    flyway,
    git,
    gitHub,
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
    keycloak,
    kotlin,
    linux,
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
    springWebFlux,
    trello,
    vue3,
    vuetify,
    webSockets,
    windows,
} from './techCatalog.js'

export const general = {
    avatar: '/profile.png',
    contacts: [
        { icon: 'mdi-phone', text: 'МТС', url: 'tel:+375295630839' },
        { icon: '$GmailIcon', text: 'Gmail', url: 'mailto:DitarRogozhnikov@gmail.com' },
        { icon: '$GitHubIcon', text: 'GitHub', url: 'https://github.com/drogozhnikov/' },
        { icon: '$GitHubIcon', text: 'GitHubOrg', url: 'https://github.com/orgs/ditardev/repositories' },
        { icon: '$LinkedInIcon', text: 'LinkedIn', url: 'https://www.linkedin.com/in/дмитрий-рогожников-449245199/' },
        { icon: '$TelegramIcon', text: 'Telegram', url: 'https://t.me/drogozhnikov' },
    ],
    software: [
        kotlin,
        java,
        vuetify,
        springFramework,
        postgresql,
        docker,
    ],
    technologies: [
        {
            category: 'Frontend',
            items: [
                vue3,
                vuetify,
                html5,
                javascript,
                css,
                sass,
            ]
        },
        {
            category: 'Backend & Core',
            items: [
                springBoot,
                springCloud,
                springDataJpa,
                springSecurity,
                springWebFlux,
                flyway,
                webSockets,
                restApi,
                kafka,
                minio,
                keycloak,
            ]
        },
        {
            category: 'Testing & Quality',
            items: [
                junit5,
                mockito,
                sonarLint,
            ]
        },
        {
            category: 'Observability & Build',
            items: [
                jwt,
                grafana,
                prometheus,
                git,
                maven,
                gradle,
            ]
        },
        {
            category: 'Environment & Tools',
            items: [
                linux,
                windows,
                gitLab,
                gitHub,
                jira,
                trello,
                confluence,
            ]
        }
    ]
}
