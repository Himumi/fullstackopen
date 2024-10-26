New Note in Single Page App Diagram

```mermaid
sequenceDiagram

    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{ content: "a new note" }]
    activate server
    server->>browser: 201 statuscode, JSON { message: "note created" }
    deactivate server

    Note right of browser: The browser adds just a new note

```