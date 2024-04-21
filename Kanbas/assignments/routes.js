import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // Route to get all assignments
    app.get('/assignments', (req, res) => {
        // Fetch assignments from database
        res.json({ assignments: Database.assignments });
    });

    // Route to create a new assignment
    app.post('/assignments', (req, res) => {
        // Add a new assignment to the database
        const newAssignment = req.body;  // Ensure you're receiving a valid assignment object
        Database.assignments.push(newAssignment); // Push new assignment to the database
        res.status(201).send(newAssignment); // Return the added assignment
    });

    // Route to update an existing assignment
    app.put('/assignments/:id', (req, res) => {
        // Update an existing assignment
        const id = req.params.id;
        const assignmentUpdates = req.body;
        let assignmentFound = false;
        Database.assignments = Database.assignments.map(assignment => {
            if (assignment.id === id) {
                assignmentFound = true;
                return { ...assignment, ...assignmentUpdates };
            }
            return assignment;
        });

        if (assignmentFound) {
            res.send(`Assignment with id ${id} updated`);
        } else {
            res.status(404).send(`Assignment with id ${id} not found`);
        }
    });

    // Route to delete an assignment
    app.delete('/assignments/:id', (req, res) => {
        // Delete an assignment
        const id = req.params.id;
        const initialLength = Database.assignments.length;
        Database.assignments = Database.assignments.filter(assignment => assignment.id !== id);
        
        if (initialLength > Database.assignments.length) {
            res.status(204).send();
        } else {
            res.status(404).send(`Assignment with id ${id} not found`);
        }
    });
}
