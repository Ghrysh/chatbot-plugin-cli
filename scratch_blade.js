const fs = require('fs');
const jsContent = fs.readFileSync('/home/ype_/projects/chatbot-plugin-cli/templates/chatbot-ui.js', 'utf8');

const htmlMatch = jsContent.match(/const htmlContent = `([\s\S]*?)`;/);
const html = htmlMatch[1];

const cssMatch = jsContent.match(/const cssContent = `([\s\S]*?)`;/);
const css = cssMatch[1];

const logicMatch = jsContent.match(/logicScript\.innerHTML = `([\s\S]*?)`;/);
const logic = logicMatch[1];

const bladeTemplate = `<!-- FutureCloud Chatbot UI (Blade Template) -->
<style>
${css.replace(/\\\$/g, '$').replace(/\\`/g, '`').replace(/\\\\/g, '\\')}
</style>

<!-- Load Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Chatbot Widget HTML -->
<div id="fc-widget-container">
${html}
</div>

<script>
${logic.replace(/\\\$/g, '$').replace(/\\`/g, '`').replace(/\\\\/g, '\\')}
</script>
`;

fs.writeFileSync('/home/ype_/projects/chatbot-plugin-cli/templates/chatbot-ui.blade.php', bladeTemplate);
console.log('Blade template updated!');
