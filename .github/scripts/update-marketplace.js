const fs = require('fs');
const path = require('path');

(async () => {
  const rootDir = './';
  const marketplaceJsonPath = path.join(rootDir, 'gpu-marketplace.json');
  const repoUrl = 'https://raw.githubusercontent.com/rushabh-0207/mock-marketplace/main';

  const folders = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const ids = new Set(); // To track unique IDs
  const updatedData = folders
    .map(folder => {
      const folderPath = path.join(rootDir, folder);
      const configPath = path.join(folderPath, 'config.json');
      const lightIconFile = path.join(folderPath, 'light-icon.svg');
      const darkIconFile = path.join(folderPath, 'dark-icon.svg');
      const scriptFile = path.join(folderPath, 'script.sh');

      if (fs.existsSync(configPath) && fs.existsSync(scriptFile)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        if (ids.has(config.id)) {
          throw new Error(`Duplicate ID found: ${config.id} in folder: ${folder}`);
        }
        ids.add(config.id);

        if (config.status === 'publish' && config.type === "gpu" && !!config.gpuConfig) {
          return {
            id: config.id,
            title: config.title,
            description: config.description,
            blogLink: config.blogLink,
            minimumSpecs: config.minimumSpecs,
            gpuConfig:{
              dockerImageName: config.gpuConfig.dockerImageName,
              dockerRunOptions: config.gpuConfig.dockerRunOptions,
              requiredDiskSpaceInGb: config.gpuConfig.requiredDiskSpaceInGb
            },
            scriptUrl: encodeURI(`${repoUrl}/${folder}/script.sh`),
            lightIcon: fs.existsSync(lightIconFile) ? encodeURI(`${repoUrl}/${folder}/light-icon.svg`) : null,
            darkIcon: fs.existsSync(darkIconFile) ? encodeURI(`${repoUrl}/${folder}/dark-icon.svg'`) : null,
          };
        }
      }
      return null;
    })
    .filter(Boolean);

  fs.writeFileSync(marketplaceJsonPath, JSON.stringify(updatedData, null, 2));
  console.log('marketplace.json updated successfully');
})();
