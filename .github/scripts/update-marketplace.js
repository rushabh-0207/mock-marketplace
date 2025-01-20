const fs = require('fs');
const path = require('path');

(async () => {
  const rootDir = './';
  const marketplaceJsonPath = path.join(rootDir, 'marketplace.json');
  const repoUrl = 'https://raw.githubusercontent.com/rushabh-0207/mock-marketplace/main';

  const folders = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const ids = new Set(); // To track unique IDs
  const updatedData = folders
    .map(folder => {
      const folderPath = path.join(rootDir, folder);
      const configPath = path.join(folderPath, 'config.json');
      const iconFile = path.join(folderPath, 'icon.svg');
      const scriptFile = path.join(folderPath, 'script.sh');

      if (fs.existsSync(configPath) && fs.existsSync(scriptFile)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        if (ids.has(config.id)) {
          throw new Error(`Duplicate ID found: ${config.id} in folder: ${folder}`);
        }
        ids.add(config.id);

        if (config.status === 'publish' && ((config.type === "cpu" && !!config.cpuConfig) || (config.type === "gpu" && !!config.gpuConfig))) {
          return {
            id: config.id,
            title: config.title,
            description: config.description,
            blogLink: config.blogLink,
            type: config.type,
            prerequisites: config.prerequisites,
            cpuConfig: config.type === "cpu" ? {
              cpu: config.cpuConfig.cpu,
              ramInGb: config.cpuConfig.ramInGb,
              storageInGb: config.cpuConfig.storageInGb
            }: null,
            gpuConfig: config.type === "gpu" ? {
              dockerImageName: config.gpuConfig.dockerImageName,
              dockerRunOptions: config.gpuConfig.dockerRunOptions,
              requiredDiskSpaceInGb: config.gpuConfig.requiredDiskSpaceInGb
            }: null,
            script: encodeURI(`${repoUrl}/${folder}/script.sh`),
            iconBase64: fs.existsSync(iconFile) ? `data:image/png;base64,${fs.readFileSync(iconFile, 'base64')}` : null,
          };
        }
      }
      return null;
    })
    .filter(Boolean);

  fs.writeFileSync(marketplaceJsonPath, JSON.stringify(updatedData, null, 2));
  console.log('marketplace.json updated successfully');
})();
