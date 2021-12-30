import { Request,Response } from "express"
import UsuarioModel from '../models/usuario';


export const getUsuarios = async(req:Request,res:Response)=>{

    const usuarios = UsuarioModel.findAll();

    return res.json({usuarios})
}

export const getUsuario = async (req:Request,res:Response)=>{
    const {id} = req.params;
    const usuario =  await UsuarioModel.findByPk(id);
    if(usuario){
        return res.json({usuario});
    }else{
        return res.status(404).json({
            msg:`No existe el usuario con el id ${id}`
        })
    }
}


export const postUsuario = async(req:Request,res:Response)=>{
    const {body} = req;

    try {
        const existeEmail = await  UsuarioModel.findOne({
            where:{
                email:body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg:`Ya existe un usuario con el email ${body.email}`
            })
        }

        const usuario =  UsuarioModel.build(body);
        await usuario.save();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Hable con el adminsitrador'});
    }
}

export const putUsuario = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const {body} = req;
    try {
        const existeUsuario= await  UsuarioModel.findByPk(id)

        if(existeUsuario){
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }

        await existeUsuario!.update(body);
        return res.status(201).json({
            existeUsuario
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Hable con el adminsitrador'});
    }
}

export const deleteUsuario =async (req:Request,res:Response)=>{
    const {id} = req.params;
    try {
        const existeUsuario= await  UsuarioModel.findByPk(id)

        if(existeUsuario){
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }

        //await existeUsuario!.destroy();//Eliminacion completa Referencial
        await existeUsuario!.update({estado:false});

        return res.status(201).json({
            existeUsuario
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Hable con el adminsitrador'});
    }
}