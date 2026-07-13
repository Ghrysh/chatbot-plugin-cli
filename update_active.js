const fs = require('fs');
const path = require('path');

const templatesDir = '/home/ype_/projects/chatbot-plugin-cli/templates';
const files = ['ChatbotWidget.vue', 'chatbot-component.jsx', 'chatbot-ui.blade.php', 'chatbot-ui.html', 'chatbot-ui.js'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(templatesDir, file), 'utf8');

    // 1. Add isActive: true to state
    content = content.replace(
        "botName: 'Chatbot Ai',\n                botColor: '#2563eb',",
        "botName: 'Chatbot Ai',\n                botColor: '#2563eb',\n                isActive: true,"
    );

    // 2. Fetch config and update isActive
    content = content.replace(
        "if (data.bot_color) this.botColor = data.bot_color;",
        "if (data.bot_color) this.botColor = data.bot_color;\n                            if (data.is_active !== undefined) this.isActive = data.is_active;"
    );

    // 3. Hide widget if isActive is false.
    // Easiest is to add x-show="isActive" to the main parent wrapper.
    // In templates, the root usually is a div.
    if (file === 'chatbot-ui.js') {
        // the js file injects HTML as a string
        content = content.replace(
            `<div id="chatbot-widget-container" class="fixed bottom-6 right-6 z-50 font-sans" x-data="chatbotWidget()">`,
            `<div id="chatbot-widget-container" class="fixed bottom-6 right-6 z-50 font-sans" x-data="chatbotWidget()" x-show="isActive" style="display: none;">`
        );
        content = content.replace(
            `botColor: '#2563eb',`,
            `botColor: '#2563eb',\n                isActive: false,`
        );
    } else if (file === 'chatbot-ui.html' || file === 'chatbot-ui.blade.php' || file === 'ChatbotWidget.vue') {
        content = content.replace(
            `<div class="fixed bottom-6 right-6 z-50 font-sans" x-data="chatbotWidget()">`,
            `<div class="fixed bottom-6 right-6 z-50 font-sans" x-data="chatbotWidget()" x-show="isActive" style="display: none;" x-cloak>`
        );
        content = content.replace(
            `botColor: '#2563eb',`,
            `botColor: '#2563eb',\n                isActive: false,`
        );
    } else if (file === 'chatbot-component.jsx') {
        content = content.replace(
            `<div className="fixed bottom-6 right-6 z-50 font-sans"`,
            `{isActive && (\n        <div className="fixed bottom-6 right-6 z-50 font-sans"`
        );
        // Find closing div. It's too complex to regex JSX accurately, let's just do it.
        // Actually, in jsx, isActive is state.
        content = content.replace(
            `const [botColor, setBotColor] = useState('#2563eb');`,
            `const [botColor, setBotColor] = useState('#2563eb');\n    const [isActive, setIsActive] = useState(false);`
        );
        content = content.replace(
            `if (data.bot_color) setBotColor(data.bot_color);`,
            `if (data.bot_color) setBotColor(data.bot_color);\n                if (data.is_active !== undefined) setIsActive(data.is_active);`
        );
        
        // Wrap return statement
        content = content.replace(
            `return (\n        <div className="fixed bottom-6 right-6 z-50 font-sans"`,
            `if (!isActive) return null;\n\n    return (\n        <div className="fixed bottom-6 right-6 z-50 font-sans"`
        );
    }

    fs.writeFileSync(path.join(templatesDir, file), content);
    console.log(`Updated ${file}`);
});
