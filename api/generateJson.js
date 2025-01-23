const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { kv } = require('@vercel/kv');
const cache = require('../cache');

const router = express.Router();
router.use(bodyParser.json({ limit: "500mb" }));
router.use(bodyParser.urlencoded({ extended: true, extended: true  }));

const wordpressUrl = "https://wordpress-1074629-4621962.cloudwaysapps.com";

router.post('/', async (req, res) => {
    const type = req.body.type;
    const id = req.body.id;
    const json = req.body.json;
    let pathName;
    try {
      if (id === "options") {
        pathName = "cnc-options";
      } else if (id) {
        pathName = `cnc-${type}-${id}`;
      } else {
        pathName = `cnc-${type}`;
      }
  
      await kv.set(pathName, json);
      cache.del(pathName);
  
      res.status(200).send({
        success: true,
        slug,
        type,
        message: `Data has been successfully saved for the key ${pathName} in kv storage with json ${JSON.stringify(
          json
        )}`,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save data.",
        error: error.message,
      });
    }
});

module.exports = router;
