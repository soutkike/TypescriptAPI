import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json({
    msg: "getUsuarios",
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
    const usuario = Usuario.build(body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
  }

  res.json({
    msg: "postUsuario",
    body,
  });
};

export const putUsuario = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  res.json({
    msg: "put Usuario",
    body,
  });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: "delete usuario",
    id,
  });
};
