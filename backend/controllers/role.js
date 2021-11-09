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

//Tercera parte
const listRole = async (req, res) => {
  const roleSchema = await role.find();
  //Que tenga algun esquema y que tenga items
  if (!roleSchema || roleSchema.length == 0)
    return res.status(400).send("Empty role list");
  //Se envia roleSchema con parentesis para que se muestre el JSON en formato texto
  return res.status(200).send({ roleSchema });

  /*Operador ternario
  !roleSchema || roleSchema.length == 0 ? res.status(400).send("Empty role list") : res.status(200).send({roleSchema});*/
};

//Cuarta parte
//Función para editar un role
const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Imcomplete data");

  const existingRole = await role.findOne({
    name: req.body.name,
    description: req.body.description,
  });

  if (existingRole) return res.status(400).send("The role already exist");

  const roleUpdate = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !roleUpdate
    ? res.status(400).send("Error editing role")
    : res.status(200).send({ roleUpdate });
};

//Cuarta parte
//Función eliminar role
const deleteRole = async (req, res) => {
  const roleDelete = await role.findOneAndDelete({ _id: req.params["_id"] });

  return !roleDelete
    ? res.status(400).send("Role no found")
    : res.status(200).send("Role deleted");
};

//Cuarta parte
//Función para consultar un  Role por id
//Login JWT {545154154151541541d}
const findRole = async (req, res) => {
  const roleId = await role.findById({ _id: req.params["_id"] });
  return !roleId
    ? res.status(400).send("No search results")
    : res.status(200).send({ roleId });
};

export default { registerRole, listRole, findRole, updateRole, deleteRole };
