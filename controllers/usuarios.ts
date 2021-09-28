import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: true,
    },
  });
  res.json({
    usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(404).json({
      error: `No existe el usuario con el id ${id}`,
    });
  } else {
    res.json({
      usuario,
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });
    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el email ${body.email}`,
      });
    }
    const usuario = Usuario.build(body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const existeUsuario = await Usuario.findByPk(id);
    if (!existeUsuario) {
      return res.status(404).json({
        msg: "No se ha podido encontrar el usuario con el ID: " + id,
      });
    }
    await existeUsuario.update(body);
    res.json({
      msg: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: "No existe usuario con el ID" + usuario,
    });
  }
  usuario.update({ estado: false });
  res.json(`El usuario con el ID ${id} ha sido eliminado`);
};
