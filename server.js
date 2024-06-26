const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const placesTumen = require('./src/components/arrays/placesTumen.json');
const placesEkb = require('./src/components/arrays/placesEkb.json');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

app.get('/api/places/tumen', (req, res) => {
    res.json(placesTumen);
});

app.get('/api/places/ekb', (req, res) => {
    res.json(placesEkb);
});

app.post('/api/places/tumen', upload.array('images', 10), (req, res) => {
    const { name, address, info, map, maplink } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newPlace = {
        id: placesTumen.length + 1,
        modal: `tumen${placesTumen.length + 1}`,
        name,
        address,
        info,
        map,
        maplink,
        img: images
    };

    placesTumen.push(newPlace);

    fs.writeFile(
        path.join(__dirname, 'src', 'components', 'arrays', 'placesTumen.json'),
        JSON.stringify(placesTumen, null, 2),
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save place' });
            }
            res.json(newPlace);
        }
    );
});

app.post('/api/places/ekb', upload.array('images', 10), (req, res) => {
    const { name, address, info, map, maplink } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    const newPlace = {
        id: placesEkb.length + 1,
        modal: `ekb${placesEkb.length + 1}`,
        name,
        address,
        info,
        map,
        maplink,
        img: images
    };

    placesEkb.push(newPlace);

    fs.writeFile(
        path.join(__dirname, 'src', 'components', 'arrays', 'placesEkb.json'),
        JSON.stringify(placesEkb, null, 2),
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save place' });
            }
            res.json(newPlace);
        }
    );
});

app.delete('/api/places/tumen/:id', (req, res) => {
    const { id } = req.params;
    const placeIndex = placesTumen.findIndex(place => place.id == id);

    if (placeIndex === -1) {
        return res.status(404).json({ error: 'Place not found' });
    }

    const deletedPlace = placesTumen.splice(placeIndex, 1);

    fs.writeFile(
        path.join(__dirname, 'src', 'components', 'arrays', 'placesTumen.json'),
        JSON.stringify(placesTumen, null, 2),
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete place' });
            }
            res.json(deletedPlace);
        }
    );
});

app.delete('/api/places/ekb/:id', (req, res) => {
    const { id } = req.params;
    const placeIndex = placesEkb.findIndex(place => place.id == id);

    if (placeIndex === -1) {
        return res.status(404).json({ error: 'Place not found' });
    }

    const deletedPlace = placesEkb.splice(placeIndex, 1);

    fs.writeFile(
        path.join(__dirname, 'src', 'components', 'arrays', 'placesEkb.json'),
        JSON.stringify(placesEkb, null, 2),
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete place' });
            }
            res.json(deletedPlace);
        }
    );
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
