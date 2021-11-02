import role from "../models/role.js";

const registerRole = async (req, res) => {
  //Si el request con los datos nombres y descripcion no existen envia un error 400
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Imcomplete data");

  //Con findOne busca el primer campo, en este caso seria nombre y ver si existe
  const existingRole = await role.findOne({ name: req.body.name });
  if (existingRole) return res.status(400).send("The role already exist");

  //Creamos el Schema con nombre, descipción y status
  const roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  //Va a la base de datos y guarda los campos de JSON
  const result = await roleSchema.save();
  if (!result) return res.status(400).send("Failed to register");

  return res.status(200).send({ result });
};

export default {registerRole};