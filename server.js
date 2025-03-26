// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// const placesTumen = require("./src/components/arrays/placesTumen.json");
// const placesEkb = require("./src/components/arrays/placesEkb.json");

// // Настраиваем multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "public", "uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // ============== GET (для Тюмени и Екб) ======================
// app.get("/api/places/tumen", (req, res) => {
//   res.json(placesTumen);
// });

// app.get("/api/places/ekb", (req, res) => {
//   res.json(placesEkb);
// });

// // ============== POST (добавление) ======================
// app.post("/api/places/tumen", upload.array("images", 10), (req, res) => {
//   const { name, address, info, map, maplink } = req.body;
//   const images = req.files.map((file) => `/uploads/${file.filename}`);

//   // Ищем максимальный id в массиве, затем +1
//   const newId =
//     placesTumen.reduce((max, place) => Math.max(max, place.id), 0) + 1;

//   const newPlace = {
//     id: newId,
//     modal: `tumen${newId}`,
//     name,
//     address,
//     info,
//     map,
//     maplink,
//     img: images,
//   };

//   placesTumen.push(newPlace);

//   fs.writeFile(
//     path.join(__dirname, "src", "components", "arrays", "placesTumen.json"),
//     JSON.stringify(placesTumen, null, 2),
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to save place" });
//       }
//       res.json(newPlace);
//     }
//   );
// });

// app.post("/api/places/ekb", upload.array("images", 10), (req, res) => {
//   const { name, address, info, map, maplink } = req.body;
//   const images = req.files.map((file) => `/uploads/${file.filename}`);

//   // Ищем максимальный id в массиве, затем +1
//   const newId =
//     placesEkb.reduce((max, place) => Math.max(max, place.id), 0) + 1;

//   const newPlace = {
//     id: newId,
//     modal: `ekb${newId}`,
//     name,
//     address,
//     info,
//     map,
//     maplink,
//     img: images,
//   };

//   placesEkb.push(newPlace);

//   fs.writeFile(
//     path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
//     JSON.stringify(placesEkb, null, 2),
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to save place" });
//       }
//       res.json(newPlace);
//     }
//   );
// });

// // ============== PUT (редактирование) ======================
// app.put("/api/places/ekb/:id", upload.array("images", 10), (req, res) => {
//   const { id } = req.params;
//   const placeIndex = placesEkb.findIndex((place) => place.id == id);

//   if (placeIndex === -1) {
//     return res.status(404).json({ error: "Place not found" });
//   }

//   const { name, address, info, map, maplink } = req.body;

//   // Если пользователь загрузил новые изображения – заменим старые.
//   // Если нет, то оставим прежние (чтобы не потерять картинки).
//   let updatedImages = placesEkb[placeIndex].img;
//   if (req.files && req.files.length > 0) {
//     updatedImages = req.files.map((file) => `/uploads/${file.filename}`);
//   }

//   placesEkb[placeIndex] = {
//     ...placesEkb[placeIndex],
//     name,
//     address,
//     info,
//     map,
//     maplink,
//     img: updatedImages,
//   };

//   fs.writeFile(
//     path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
//     JSON.stringify(placesEkb, null, 2),
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to update place" });
//       }
//       res.json(placesEkb[placeIndex]);
//     }
//   );
// });

// // ============== DELETE (удаление) ======================
// app.delete("/api/places/tumen/:id", (req, res) => {
//   const { id } = req.params;
//   const placeIndex = placesTumen.findIndex((place) => place.id == id);

//   if (placeIndex === -1) {
//     return res.status(404).json({ error: "Place not found" });
//   }

//   const deletedPlace = placesTumen.splice(placeIndex, 1);

//   fs.writeFile(
//     path.join(__dirname, "src", "components", "arrays", "placesTumen.json"),
//     JSON.stringify(placesTumen, null, 2),
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to delete place" });
//       }
//       res.json(deletedPlace);
//     }
//   );
// });

// app.delete("/api/places/ekb/:id", (req, res) => {
//   const { id } = req.params;
//   const placeIndex = placesEkb.findIndex((place) => place.id == id);

//   if (placeIndex === -1) {
//     return res.status(404).json({ error: "Place not found" });
//   }

//   const deletedPlace = placesEkb.splice(placeIndex, 1);

//   fs.writeFile(
//     path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
//     JSON.stringify(placesEkb, null, 2),
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to delete place" });
//       }
//       res.json(deletedPlace);
//     }
//   );
// });

// // =======================================================
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//-----------------------------------------------------
// ФАЙЛ: server.js
//-----------------------------------------------------

/* УДАЛИТЬ эти строки, если вы не хотите хранить "закомментированный" старый код:

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// const placesTumen = require("./src/components/arrays/placesTumen.json");
// const placesEkb = require("./src/components/arrays/placesEkb.json");

// ...
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
*/

// ОСТАВИТЬ/ИСПОЛЬЗОВАТЬ этот код:
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

const placesTumen = require("./src/components/arrays/placesTumen.json");
const placesEkb = require("./src/components/arrays/placesEkb.json");

/**
 * ДОБАВЛЯЕМ новую функцию парсинга строки map:
 * Если пользователь вставил весь <iframe ...>, мы вытащим только src
 * Если не нашли iframe, возвращаем исходное значение
 */
function extractMapSrc(html) {
  if (!html) return "";

  // Простейшая регулярка, ищет <iframe ... src="..." ...>
  const regex = /<iframe[^>]+src=["']([^"']+)["']/i;
  const match = regex.exec(html);
  if (match && match[1]) {
    return match[1];
  }
  return html;
}

// Настраиваем multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ============== GET (для Тюмени и Екб) ======================
app.get("/api/places/tumen", (req, res) => {
  res.json(placesTumen);
});

app.get("/api/places/ekb", (req, res) => {
  res.json(placesEkb);
});

// ============== POST (добавление) ======================
// (1) ТЮМЕН
app.post("/api/places/tumen", upload.array("images", 10), (req, res) => {
  const { name, address, info, map, maplink } = req.body;
  // ДОБАВИТЬ строку, которая «очищает» map:
  const pureMap = extractMapSrc(map);

  const images = req.files.map((file) => `/uploads/${file.filename}`);

  // Ищем максимальный id в массиве, затем +1
  const newId =
    placesTumen.reduce((max, place) => Math.max(max, place.id), 0) + 1;

  const newPlace = {
    id: newId,
    modal: `tumen${newId}`,
    name,
    address,
    info,
    // ЗДЕСЬ ПОДМЕНЯЕМ, чтобы сохранить только чистую ссылку:
    map: pureMap,
    maplink,
    img: images,
  };

  placesTumen.push(newPlace);

  fs.writeFile(
    path.join(__dirname, "src", "components", "arrays", "placesTumen.json"),
    JSON.stringify(placesTumen, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save place" });
      }
      res.json(newPlace);
    }
  );
});

// (2) ЕКБ
app.post("/api/places/ekb", upload.array("images", 10), (req, res) => {
  const { name, address, info, map, maplink } = req.body;
  // ДОБАВИТЬ строку, которая «очищает» map:
  const pureMap = extractMapSrc(map);

  const images = req.files.map((file) => `/uploads/${file.filename}`);

  // Ищем максимальный id в массиве, затем +1
  const newId =
    placesEkb.reduce((max, place) => Math.max(max, place.id), 0) + 1;

  const newPlace = {
    id: newId,
    modal: `ekb${newId}`,
    name,
    address,
    info,
    // ЗДЕСЬ ПОДМЕНЯЕМ, чтобы сохранить только чистую ссылку:
    map: pureMap,
    maplink,
    img: images,
  };

  placesEkb.push(newPlace);

  fs.writeFile(
    path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
    JSON.stringify(placesEkb, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save place" });
      }
      res.json(newPlace);
    }
  );
});

// ============== PUT (редактирование) ======================
app.put("/api/places/ekb/:id", upload.array("images", 10), (req, res) => {
  const { id } = req.params;
  const placeIndex = placesEkb.findIndex((place) => place.id == id);

  if (placeIndex === -1) {
    return res.status(404).json({ error: "Place not found" });
  }

  // ДОБАВИТЬ строку, «очищаем» map:
  const pureMap = extractMapSrc(req.body.map);

  const { name, address, info, maplink } = req.body;

  // Если пользователь загрузил новые изображения – заменим старые.
  // Если нет, то оставим прежние (чтобы не потерять картинки).
  let updatedImages = placesEkb[placeIndex].img;
  if (req.files && req.files.length > 0) {
    updatedImages = req.files.map((file) => `/uploads/${file.filename}`);
  }

  placesEkb[placeIndex] = {
    ...placesEkb[placeIndex],
    name,
    address,
    info,
    map: pureMap, // Сохраняем очищенное значение
    maplink,
    img: updatedImages,
  };

  fs.writeFile(
    path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
    JSON.stringify(placesEkb, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update place" });
      }
      res.json(placesEkb[placeIndex]);
    }
  );
});

// ============== DELETE (удаление) ======================
app.delete("/api/places/tumen/:id", (req, res) => {
  const { id } = req.params;
  const placeIndex = placesTumen.findIndex((place) => place.id == id);

  if (placeIndex === -1) {
    return res.status(404).json({ error: "Place not found" });
  }

  const deletedPlace = placesTumen.splice(placeIndex, 1);

  fs.writeFile(
    path.join(__dirname, "src", "components", "arrays", "placesTumen.json"),
    JSON.stringify(placesTumen, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete place" });
      }
      res.json(deletedPlace);
    }
  );
});

app.delete("/api/places/ekb/:id", (req, res) => {
  const { id } = req.params;
  const placeIndex = placesEkb.findIndex((place) => place.id == id);

  if (placeIndex === -1) {
    return res.status(404).json({ error: "Place not found" });
  }

  const deletedPlace = placesEkb.splice(placeIndex, 1);

  fs.writeFile(
    path.join(__dirname, "src", "components", "arrays", "placesEkb.json"),
    JSON.stringify(placesEkb, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete place" });
      }
      res.json(deletedPlace);
    }
  );
});

// =======================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
