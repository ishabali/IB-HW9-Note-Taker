const path = require("path");
const { request } = require ("express");
const fs = require('fs');

exports.routes = (app) => {
    
    // exporting API routes

    //retriving all notes from db.json
    app.get("/api/notes", (req,res) => {
        console.log("+++++++api/notes+++++++++++++")
        const raw_data = fs.readFileSync("./db/db.json");
        const note_data = JSON.parse(raw_data);
        res.json(note_data);
    });
    
    //saving new notes to db.json
    app.post("/api/notes", (req,res) => {
        //getting array with notes
        const raw_data = fs.readFileSync("./db/db.json");
        let data = JSON.parse(raw_data);
        console.log(data);
        //adding new note into array
        data.push(req.body);
        console.log("note been pushed", data);
        //changin ids for each object in array
        for (let i =0; i < data.length; i++) {
            data[i].id = i+1;
            console.log("ids were added", data);
        }
        //saving adjasted array in the db.json
        let note_data = JSON.stringify(data);
        fs.writeFileSync("./db/db.json", note_data);
       
        console.log("+++++++NOTE_POSTed+++++++++++++")
        res.json(true);
        
    });
    
    //deleting note from db.json by id
    app.delete("/api/notes/:id", (req,res) => {
        const id = req.params.id;
        console.log("+++++DELETE BEEN CALLED++++++ id:", id);
        //getting array with notes
        const raw_data = fs.readFileSync("./db/db.json");
        const note_data = JSON.parse(raw_data);
        console.log(note_data);
        //searching object by "id" and deleting it from array
        for (var i = 0; i < note_data.length; i++) {
            console.log(note_data[i].id);
            if (note_data[i].id==id){
                console.log("=====LOOP=====");
                console.log(note_data[i]);
                //deleting 1 item by matched "id"
                note_data.splice(i, 1);
                console.log(note_data);
                break
            }
        };
        //saving adjasted array in the db.json
        data = JSON.stringify(note_data);
        fs.writeFileSync("./db/db.json", data);
        console.log("+++++++NOTE_DELETed+++++++++++++")
        res.json(true);
    });
    
    // exporting html paths
    app.get("/notes", (req,res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
        
};