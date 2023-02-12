const { db } = require("../config/connection");

/*Consultar rentas existentes */
const getRentas = async (req, res) => {
  const response = await db.any(
    'SELECT renta_id, cli_nombre, cli_cedula, ren_articulo, ren_precio FROM "renta";'
  );
  res.json(response);
};

/*Consultar renta existente por ID */
const getRentaById = async (req, res) => {
  const id = req.params.id;
  const response = await db.any(
    'SELECT renta_id, cli_nombre, cli_cedula, ren_articulo, ren_precio FROM "renta" WHERE renta_id=$1::int;',
    [id]
  );
  res.json(response);
};

/*Crear renta*/
const createRenta = async (req, res) => {
  const { cli_nombre, cli_cedula, ren_articulo, ren_precio } = req.query;
  if (!cli_nombre || !cli_cedula || !ren_articulo || !ren_precio) {
    return res.status(400).json({
      error: "Todos los campos son requeridos"
    });
  }
  const response = await db.one(
    'INSERT INTO public."renta"(cli_nombre, cli_cedula, ren_articulo, ren_precio) VALUES ($1, $2, $3, $4) returning *;',[cli_nombre, cli_cedula, ren_articulo, ren_precio])
  res.json(response)
};


/*Actualizar renta*/
const putUpdateRenta = async (req, res) => {
  const { renta_id, cli_nombre, cli_cedula, ren_articulo, ren_precio } = req.query;
  const response = await db.query(
    'UPDATE "renta" SET cli_nombre=$2, cli_cedula=$3, ren_articulo=$4, ren_precio=$5 WHERE renta_id=$1;',
    [renta_id, cli_nombre, cli_cedula, ren_articulo, ren_precio]
  );

  res.json({
    message: "Renta Actualizada con éxito",
    body: {
      renta: { renta_id, cli_nombre, cli_cedula, ren_articulo, ren_precio },
    },
  });
};

/*Eliminar renta*/
const deleteRenta = async (req, res) => {
  const { renta_id } = req.query;
  const response = await db.query('DELETE FROM "renta" WHERE renta_id=$1::int;', [renta_id]);

  res.json({
    message: "Renta Eliminada con éxito",
    body: {
      renta: { renta_id },
    },
  });
};

module.exports = {
  getRentas,
  getRentaById,
  createRenta,
  putUpdateRenta,
  deleteRenta
  };