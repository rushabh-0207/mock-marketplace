
# Marketplace Folder Structure

Each marketplace is represented by its own folder, named after the marketplace. This structure ensures that all information related to a specific marketplace is organized and easy to locate.

## Folder Contents
Each marketplace folder must contain the following items:

### 1. `config.json`
- **Description**: A JSON file containing configuration details for the marketplace.
- **Structure**:
  ```json
  {
    "id": 1,
    "title": "marketpalce_title",
    "description": "marketpalce_description",
    "status": "publish/draft",
    "blogLink": "blog_link",
    "prerequisites": "prerequisites",
    "gpuConfig": {
      "dockerImageName": "doker_image",
      "dockerRunOptions": "doker_run_options",
      "requiredDiskSpaceInGb": "disk_size_in_gb"
    }
  }
  ```
- **Fields**:
  - `id`: Unique identifier for the marketplace.
  - `title`: Name of the marketplace.
  - `description`: A brief description of the marketplace.
  - `status`: Indicates whether the marketplace is published or in draft mode.
  - `blogLink`: URL to the related blog post.
  - `prerequisites`: Required resource specification.
  - `gpu` (Object):
    - `dockerImageName`: Name of the Docker image to use.
    - `dockerOptions`: Options for launching the Docker container (e.g., exposed ports, arguments).
    - `requiredDiskSpace`: Amount of disk space required (in GB).

### 2. `script.sh`
- **Description**: This file contains either the path or the actual content of the marketplace script.
- **Purpose**: Defines the logic or operations specific to the marketplace.

### 3. `light-icon.svg`
- **Description**: This file contains the path to the icon representing the marketplace.
- **Purpose**: Used for visual identification in user interfaces.

### 4. `dark-icon.svg`
- **Description**: This file contains the path to the icon representing the marketplace.
- **Purpose**: Used for visual identification in user interfaces.

## GitHub Pipeline
Upon merging a pull request (PR):
1. The GitHub pipeline automatically updates the `gpu-marketplace.json` file.
2. This ensures that the main configuration file remains synchronized with the individual marketplace folders.

### Notes
- All required files must be present in each marketplace folder to ensure smooth pipeline execution.
- Ensure that `config.json` adheres to the expected schema for proper validation during the pipeline process.
