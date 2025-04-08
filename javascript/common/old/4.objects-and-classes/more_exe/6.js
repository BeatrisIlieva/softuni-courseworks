function solve(data, actions) {
    const commandForOpeningTab = 'Open';
    const commandForClosingTab = 'Close';

    actions.forEach((action) => {
        if (action.includes(commandForOpeningTab)) {
            const websiteName = action.substring(commandForOpeningTab.length + 1);
            data['Open Tabs'].push(websiteName);
            data['Browser Logs'].push(action);
        } else if (action.includes(commandForClosingTab)) {
            const websiteName = action.substring(commandForClosingTab.length + 1);

            const websiteIndex = data['Open Tabs'].indexOf(websiteName);
            const indexIsValid = websiteIndex >= 0;

            if (indexIsValid) {
                data['Open Tabs'].splice(websiteIndex, 1);
                data['Browser Logs'].push(action);
                data['Recently Closed'].push(websiteName);
            }
        } else if (action === 'Clear History and Cache') {
            data['Open Tabs'].length = 0;
            data['Recently Closed'].length = 0;
            data['Browser Logs'].length = 0;
        }
    });

    console.log(data['Browser Name']);
    console.log(`Open Tabs: ${data['Open Tabs'].join(', ')}`);
    console.log(`Recently Closed: ${data['Recently Closed'].join(', ')}`);
    console.log(`Browser Logs: ${data['Browser Logs'].join(', ')}`);
}

solve(
    {
        'Browser Name': 'Mozilla Firefox',

        'Open Tabs': ['YouTube'],

        'Recently Closed': ['Gmail', 'Dropbox'],

        'Browser Logs': [
            'Open Gmail',

            'Close Gmail',
            'Open Dropbox',

            'Open YouTube',
            'Close Dropbox',
        ],
    },

    ['Open Wikipedia', 'Clear History and Cache', 'Open Twitter']
);
