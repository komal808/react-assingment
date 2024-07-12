
# Front-end


This project is a React application configured with Vite and TypeScript, featuring an image gallery with drag-and-drop functionality. The application interacts with a pseudo backend using MSW for API mocking and Axios for making HTTP requests.

## How to run

1. Clone the repository 

```sh 
git clone [url](https://github.com/komal808/react-assingment)
```

2. Navigate to the project directory:

```sh
cd  react-assingment
```

3. Install dependecies

```sh
yarn install
```
4. Start the development server:

```sh
yarn run dev
```


### Thought Process

* Drag and Drop: Images in the gallery can be dragged and dropped onto each other, triggering automatic re-ordering. 
* Auto-Saving API: A parallel API runs every 5 seconds to simulate data saving, displaying "saving ..." on the DOM.
* Local Storage Handling: Utilizes local storage to persist data in JSON format. Initially posts data if not present in local storage, otherwise retrieves and uses existing data.
* Components: Created two main components: ImageGridList and ImageCard to manage the gallery layout and individual image cards.
* API Endpoints: Implemented endpoints for bulk data update, retrieval, and initial posting of data.
* Last Updated Timestamp: Tracks the last update time in local storage, updating it with each saving API call. This timestamp is also returned by the initial posting API for reference.
* Modal Interaction: Clicking on any image opens it in a modal, which can be closed either by pressing ESC or clicking on the cross icon at the top right corner.

### Functionality
* Drag images to rearrange.
* Observe auto-saving simulation.
* Click on images to view in modal.

### Technologies Used
* React
* TypeScript
* React Hooks
* Vite
* MSW (Mock Service Worker)
* Axios