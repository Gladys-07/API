import crypto from "crypto";

export const getSalt =( )=> {
    return crypto.randomBytes(24).toString("base64url").substring(0, process.env.SALT_SIZE);
};

export const hashPassword=(text,salt)=>{
    const hashing=crypton.createHash("sha512");
    return hashing.update(salt+text).digest("base64url");
    
};
