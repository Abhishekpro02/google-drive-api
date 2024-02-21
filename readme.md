### Gdrive file upload using node.js

This is a simple node.js script to upload files to google drive using google drive api. This script uses googleapis library to authenticate and upload files to google drive.

## Prerequisites

- Node.js
- Google Drive API credentials
- Google Drive API Node.js client library

## Getting Started

1. Clone this repository
2. Install the required packages using `npm install`
3. Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
4. Enable Google Drive API for the project
5. Create credentials for the project
6. Download the credentials file and rename it to `credentials.json`
7. Place the `credentials.json` file in the root of the project
8. Run the script using `node index.js`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## upload endpoint

- POST /upload
- Request body:
  - file: file to be uploaded
  - folderId: folder id in which the file should be uploaded
