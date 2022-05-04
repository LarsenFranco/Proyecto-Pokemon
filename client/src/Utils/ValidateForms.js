export const validator = (data) => {
    
 
    let errors = {};
    
    if (!data.name || data.name.length > 20)
    errors.name = "El nombre no puede tener más de 20 carácteres";
    if (data.hp < 1 || data.hp > 200)
      errors.hp = "El rango debe ser entre 1 y 200";
    if (data.attack <1 || data.attack > 200)
      errors.attack = "El rango debe ser entre 1 y 200";
    if (data.defense < 1 || data.defense > 200)
    errors.defense = "El rango debe ser entre 1 y 200";
    if (data.speed < 1 || data.speed > 200)
      errors.speed = "El rango debe ser entre 1 y 200";
    if (data.height < 1 || data.height > 200)
    errors.height = "El rango debe ser entre 1 y 200";
    if (data.weight < 1 || data.weight > 200)
      errors.weight = "El rango debe ser entre 1 y 200";
   
    return errors;
  }