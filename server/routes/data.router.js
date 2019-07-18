const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// GET list of states
router.get('/state', (req, res) => {
  const action = 'SELECT * FROM "state" ORDER BY "state"."state_name";';

  pool.query(action)
    .then((response) => {
      res.send(response.rows);
    }).catch(() => {
      res.sendStatus(500);
    });
});

// GET list of districts in a state
router.get('/district/:state', (req, res) => {
  const state = req.params.state;
  const action = 'SELECT * FROM "LEA" WHERE "state_ref" = $1 ORDER BY "LEA"."LEA_name";';

  pool.query(action, [state])
    .then((response) => {
      res.send(response.rows);
    }).catch(() => {
      res.sendStatus(500);
    });
});

// GET list of schools in a given district in a state
router.get('/school/:district', (req, res) => {
  const district = req.params.district;
  const action = 'SELECT * FROM "school" WHERE "LEA_ref" = $1 ORDER BY "school"."school_name";';

  pool.query(action, [district])
    .then((response) => {
      res.send(response.rows);
    }).catch(() => {
      res.sendStatus(500);
    });
});

// GET list of datasets available to a given scope
router.get('/dataset/:scope/:scopeSelector', (req, res) => {
  const scope = req.params.scope;
  const scopeSelector = req.params.scopeSelector;

  const firstAction = `SELECT DISTINCT TABLE_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE COLUMN_NAME = 'school_id';`;

  pool.query(firstAction)
    .then(async (response) => {
      const datasetList = response.rows;
      const datasetListArray = [];
      await Promise.all(datasetList.map(async (dataset) => {
        const { table_name: table } = dataset;
        let secondAction = '';
        if (scope === 'state') {
          secondAction = `SELECT DISTINCT "table_name", "state_ref", "Year" FROM INFORMATION_SCHEMA.COLUMNS
                    CROSS JOIN "${table}"
                    INNER JOIN "school" ON "school"."NCES_school_id" =
                      "${table}"."school_id"
                    INNER JOIN "state" ON "school"."state_ref" = "state"."state"
                    WHERE TABLE_NAME = '${table}'
                    AND "state_ref" = $1;`;
        } else if (scope === 'district') {
          secondAction = `SELECT DISTINCT TABLE_NAME,
                    left("school_id"::text, 7) AS "LEA_ref",
                    "${table}"."Year"
                    FROM INFORMATION_SCHEMA.COLUMNS, "${table}"
                    WHERE TABLE_NAME = '${table}'
                    AND left("school_id"::text, 7) = $1::text;`;
        } else if (scope === 'school') {
          secondAction = `SELECT DISTINCT TABLE_NAME,
                    "${table}"."school_id",
                    "${table}"."Year"
                    FROM INFORMATION_SCHEMA.COLUMNS
                    CROSS JOIN "${table}"
                    WHERE TABLE_NAME = '${table}'
                      AND "school_id" = $1;`;
        }

        await pool.query(secondAction, [scopeSelector])
          .then((response) => {
            datasetListArray.push(...response.rows);
          })
          .catch((error) => {
            console.log('error referencing database:', error);
            res.sendStatus(500);
          });
      }));
      res.send(datasetListArray);
    }).catch(() => {
      res.sendStatus(500);
    });
});

// GET specific dataset based on user request
router.get('/scope/:scope/:scopeSelector/:dataset/:year', async (req, res) => {
  const scope = req.params.scope;
  const scopeSelector = req.params.scopeSelector;
  const datasetName = req.params.dataset;
  const year = req.params.year;
  let action = '';

  // Fetches list of valid datasets
  let verifiedDataset = await pool.query(`
      SELECT DISTINCT TABLE_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE COLUMN_NAME = 'school_id';
   `).catch((error) => {
    res.sendStatus(500);
    console.log(error);
  });

  // Converts response into an array of dataset names
  verifiedDataset = verifiedDataset.rows.map(x => x.table_name);

  // If the datasetName provided by client is valid, then proceed
  if (verifiedDataset.includes(datasetName)) {
    // Determine database query based on definition of scope
    if (scope === 'state') {
      action = `SELECT "Category",
            SUM("American Indian or Alaska Native") AS "American Indian or Alaska Native",
            SUM("Asian") AS "Asian",
            SUM("Hawaiian/ Pacific Islander") AS "Hawaiian/ Pacific Islander",
            SUM("Hispanic") AS "Hispanic",
            SUM("Black") AS "Black",
            SUM("White") AS "White",
            SUM("Two or more races") AS "Two or more races",
            SUM("Total") AS "Total",
            SUM("LEP") AS "LEP"
            FROM "${datasetName}"
            JOIN "school" ON "school"."NCES_school_id" = "school_id"
            WHERE "school"."state_ref" = $1 AND "Year" = $2
            GROUP BY "Category";`;
    } else if (scope === 'district') {
      action = `SELECT "Category",
            SUM("American Indian or Alaska Native") AS "American Indian or Alaska Native",
            SUM("Asian") AS "Asian",
            SUM("Hawaiian/ Pacific Islander") AS "Hawaiian/ Pacific Islander",
            SUM("Hispanic") AS "Hispanic",
            SUM("Black") AS "Black",
            SUM("White") AS "White",
            SUM("Two or more races") AS "Two or more races",
            SUM("Total") AS "Total",
            SUM("LEP") AS "LEP"
            FROM "${datasetName}"
            JOIN "school" ON "school"."NCES_school_id" = "school_id"
            WHERE "school"."LEA_ref" = $1 AND "Year" = $2
            GROUP BY "Category";`;
    } else if (scope === 'school') {
      action = `SELECT * FROM "${datasetName}"
            JOIN "school" ON "school"."NCES_school_id" = "school_id"
            WHERE "school_id" = $1 AND "Year" = $2
            ORDER BY "school"."school_name";`;
    }

    pool.query(action, [scopeSelector, year])
      .then((response) => {
        res.send(response.rows);
      }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
      });
  }
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {
// });

module.exports = router;
